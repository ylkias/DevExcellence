#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runProjectChecks, renderCheckText, renderCheckMarkdown, shouldFail } from "../src/check.js";
import { createAssessmentTemplate, evaluateAssessment, renderScoreMarkdown } from "../src/score.js";
import { auditProductionArtifact, renderProductionAuditMarkdown } from "../src/production-audit.js";
const here = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.resolve(here, "../package.json"), "utf8"));
function value(args, flag, fallback) { const i = args.indexOf(flag); return i < 0 ? fallback : args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true; }
function has(args, flag) { return args.includes(flag); }
function save(file, text) { const target = path.resolve(file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, text, "utf8"); process.stderr.write("Relatório salvo em: " + target + "\n"); }
function help() {
  console.log("DevExcellence CLI " + pkg.version + "\n\nComandos:\n  check [--json] [--output arquivo] [--fail-on critical|high|medium|low|never] [--run] [--no-secrets] [--no-test-audit]\n  production-audit --path <artefato> [--json] [--output arquivo.md] [--max-files 50000]\n  release-audit --path <artefato> [--json] [--output arquivo.md] [--max-files 50000]\n  init [--force] [--project nome]\n  score [--input arquivo] [--json] [--output arquivo.md] [--min-coverage 80]\n\nproduction-audit é obrigatório após o build e antes de publicar/deployar. Audite o diretório real do artefato, nunca a raiz do repositório. O CLI não usa rede nem envia arquivos.");
}
async function main() {
  const args = process.argv.slice(2), command = args[0] || "help";
  if (["help","--help","-h"].includes(command)) return help(), 0;
  if (["version","--version"].includes(command)) return console.log(pkg.version), 0;
  if (command === "init") {
    const file = path.resolve(".devexcellence/assessment.json");
    if (fs.existsSync(file) && !has(args,"--force")) { console.error("Avaliação já existe; use --force para substituir."); return 2; }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(createAssessmentTemplate(value(args,"--project",path.basename(process.cwd()))),null,2)+"\n");
    console.log("Modelo criado em " + file + ". Registre evidências antes de calcular.");
    return 0;
  }
  if (command === "check") {
    const failOn = value(args,"--fail-on","critical");
    if (!["critical","high","medium","low","never"].includes(failOn)) { console.error("--fail-on inválido."); return 2; }
    const report = runProjectChecks({ runCommands: has(args,"--run"), failOn, includeSecrets: !has(args,"--no-secrets"), testAudit: !has(args,"--no-test-audit") });
    const json = has(args,"--json"), output = value(args,"--output",null);
    if (output) save(output, output.endsWith(".json") ? JSON.stringify(report,null,2)+"\n" : renderCheckMarkdown(report)+"\n");
    console.log(json ? JSON.stringify(report,null,2) : renderCheckText(report));
    return shouldFail(report) ? 1 : 0;
  }
  if (command === "production-audit" || command === "release-audit") {
    const artifactPath = value(args, "--path", undefined);
    if (typeof artifactPath !== "string" || !artifactPath.trim()) {
      console.error("Informe o diretório real do artefato com --path <diretório>.");
      return 2;
    }
    const maxRaw = value(args, "--max-files", undefined);
    const maxFiles = maxRaw === undefined ? undefined : Number(maxRaw);
    if (maxFiles !== undefined && (!Number.isInteger(maxFiles) || maxFiles < 1)) {
      console.error("--max-files precisa ser um inteiro positivo.");
      return 2;
    }
    let report;
    try {
      report = auditProductionArtifact(artifactPath, { maxFiles });
    } catch (error) {
      console.error(error.message);
      return 2;
    }
    const json = has(args, "--json");
    const output = value(args, "--output", null);
    if (output) {
      const target = path.resolve(output);
      const artifact = path.resolve(artifactPath);
      if (target === artifact || target.startsWith(artifact + path.sep)) {
        console.error("O relatório precisa ser salvo fora do diretório auditado para não modificar o artefato.");
        return 2;
      }
      const content = output.endsWith(".json") ? JSON.stringify(report, null, 2) + "\n" : renderProductionAuditMarkdown(report) + "\n";
      save(output, content);
    }
    console.log(json ? JSON.stringify(report, null, 2) : renderProductionAuditMarkdown(report));
    return report.summary.clean ? 0 : 1;
  }
  if (command === "score") {
    const file = path.resolve(value(args,"--input",".devexcellence/assessment.json"));
    if (!fs.existsSync(file)) { console.error("Avaliação não encontrada: " + file + ". Execute devexcellence init."); return 2; }
    let input;
    try { input = JSON.parse(fs.readFileSync(file,"utf8")); } catch (e) { console.error("JSON inválido: " + e.message); return 2; }
    const rawCoverage = value(args,"--min-coverage",undefined), min = rawCoverage === undefined ? undefined : Number(rawCoverage);
    if (min !== undefined && (!Number.isFinite(min) || min < 0 || min > 100)) { console.error("--min-coverage deve estar entre 0 e 100."); return 2; }
    let report;
    try { report = evaluateAssessment(input,{minimumCoverage:min}); } catch (e) { console.error(e.message); return 2; }
    const markdown = renderScoreMarkdown(report);
    if (value(args,"--output",null)) save(value(args,"--output",null),markdown+"\n");
    console.log(has(args,"--json") ? JSON.stringify(report,null,2) : markdown);
    return report.releaseGate === "PASS" ? 0 : 1;
  }
  console.error("Comando desconhecido: " + command); help(); return 2;
}
main().then((code) => { process.exitCode = code; }).catch((error) => { console.error(error.stack || error); process.exitCode = 2; });