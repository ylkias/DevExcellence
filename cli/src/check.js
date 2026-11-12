import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { auditTestFiles } from "./test-audit.js";

const SKIP = new Set([".git", "node_modules", ".next", ".nuxt", "dist", "build", "coverage", ".turbo", ".venv", "vendor", "__pycache__"]);
const TEXT_EXT = new Set([".js",".jsx",".mjs",".cjs",".ts",".tsx",".json",".yml",".yaml",".toml",".ini",".env",".py",".go",".rs",".java",".kt",".php",".rb",".cs",".sh",".ps1",".sql",".html",".css",".scss",".vue",".svelte",".md",".txt",".xml",".properties"]);
const RANK = { info: 0, low: 1, medium: 2, high: 3, critical: 4 };

function add(results, id, title, severity, status, evidence, extra = {}) {
  results.push({ id, title, severity, status, evidence, ...extra });
}
function walk(root, limit = 3000) {
  const files = [];
  function visit(dir, rel = "") {
    if (files.length >= limit) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (files.length >= limit) break;
      if (entry.isSymbolicLink()) continue;
      const full = path.join(dir, entry.name), relative = path.posix.join(rel, entry.name);
      if (entry.isDirectory()) { if (!SKIP.has(entry.name)) visit(full, relative); }
      else if (entry.isFile() && (TEXT_EXT.has(path.extname(entry.name).toLowerCase()) || /^\.env(?:\.|$)/.test(entry.name))) files.push({ full, relative });
    }
  }
  visit(root);
  return { files, truncated: files.length >= limit };
}
export function detectStack(root) {
  const has = (...names) => names.some((n) => fs.existsSync(path.join(root, n)));
  const stack = [];
  if (has("package.json")) stack.push("Node.js/JavaScript/TypeScript");
  if (has("pyproject.toml","requirements.txt","Pipfile")) stack.push("Python");
  if (has("go.mod")) stack.push("Go");
  if (has("Cargo.toml")) stack.push("Rust");
  if (has("pom.xml","build.gradle","build.gradle.kts")) stack.push("Java/Kotlin");
  if (has("composer.json")) stack.push("PHP");
  if (has("Gemfile")) stack.push("Ruby");
  if (fs.readdirSync(root).some((n) => /\.csproj$|\.sln$/i.test(n))) stack.push(".NET");
  if (has("Dockerfile","compose.yaml","docker-compose.yml")) stack.push("Docker");
  if (has("next.config.js","next.config.mjs","next.config.ts")) stack.push("Next.js");
  return [...new Set(stack)];
}
function checkIgnore(root) {
  const file = path.join(root, ".gitignore");
  if (!fs.existsSync(file)) return false;
  return fs.readFileSync(file, "utf8").split(/\r?\n/).map((x) => x.trim()).some((x) => [".env", ".env.*", "**/.env", "**/.env.*"].includes(x));
}
function secretScan(files, results) {
  const patterns = [
    { id: "SEC-CLI-001", title: "Possível chave AWS", severity: "critical", regex: /\bAKIA[0-9A-Z]{16}\b/g },
    { id: "SEC-CLI-002", title: "Possível chave privada", severity: "critical", regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g },
    { id: "SEC-CLI-003", title: "Possível segredo hardcoded", severity: "high", regex: /(?:api[_-]?key|client[_-]?secret|access[_-]?token|password|passwd)\s*[:=]\s*["']?([A-Za-z0-9+/_.=-]{24,})/gi }
  ];
  let count = 0;
  for (const file of files) {
    if (count >= 100) break;
    if (/^\.env(?:\.|$)/.test(path.posix.basename(file.relative))) {
      add(results, "SEC-CLI-004", "Arquivo de ambiente encontrado", "medium", "review", "Verifique se contém configuração sensível e está fora do versionamento.", { file: file.relative });
    }
    let stat, text;
    try { stat = fs.statSync(file.full); if (stat.size > 1024 * 1024) continue; text = fs.readFileSync(file.full, "utf8"); } catch { continue; }
    if (text.includes("\u0000")) continue;
    for (const p of patterns) {
      p.regex.lastIndex = 0;
      let match;
      while ((match = p.regex.exec(text)) !== null && count < 100) {
        const line = text.slice(0, match.index).split("\n").length;
        add(results, p.id, p.title, p.severity, "review", "Possível segredo; valor omitido. Confirme e rotacione se for real.", { file: file.relative, line });
        count++;
        if (!match[0].length) p.regex.lastIndex++;
      }
    }
  }
  return { count, capped: count >= 100 };
}
function runConfigured(root, results) {
  const configPath = path.join(root, ".devexcellence", "config.json");
  if (!fs.existsSync(configPath)) return;
  let config;
  try { config = JSON.parse(fs.readFileSync(configPath, "utf8")); }
  catch { add(results, "CFG-001", "Configuração inválida", "medium", "fail", "config.json não contém JSON válido."); return; }
  if (!Array.isArray(config.commands)) { add(results, "CFG-002", "Comandos inválidos", "medium", "fail", "commands deve ser uma lista de objetos com argv."); return; }
  config.commands.forEach((item, i) => {
    if (!item || !Array.isArray(item.argv) || !item.argv.length || item.argv.some((x) => typeof x !== "string")) {
      add(results, "RUN-" + (i + 1), "Comando inválido", "medium", "fail", "Use argv como lista de strings; shell não é utilizado."); return;
    }
    const timeout = Number.isInteger(item.timeoutMs) ? Math.min(600000, Math.max(1000, item.timeoutMs)) : 120000;
    const r = spawnSync(item.argv[0], item.argv.slice(1), { cwd: root, encoding: "utf8", timeout, shell: false, stdio: "ignore" });
    const ok = !r.error && r.status === 0;
    add(results, "RUN-" + (i + 1), item.name || item.argv[0], item.required ? "high" : "medium", ok ? "pass" : "fail",
      r.error ? "Não executado: " + r.error.message : "Código de saída: " + r.status, { command: item.argv });
  });
}

function auditDockerBuildContext(root, results) {
  let entries = [];
  try { entries = fs.readdirSync(root); } catch { return; }
  const dockerfiles = entries.filter((name) => /^Dockerfile(?:\..+)?$/i.test(name));
  for (const dockerfile of dockerfiles) {
    const full = path.join(root, dockerfile);
    let content;
    try { content = fs.readFileSync(full, "utf8"); } catch { continue; }
    const copiesWholeContext = /^\s*(?:COPY|ADD)\s+(?:--[^\s]+\s+)*\.\/?\s+/im.test(content);
    if (!copiesWholeContext) continue;
    const specificIgnore = path.join(root, dockerfile + ".dockerignore");
    const ignorePath = fs.existsSync(specificIgnore) ? specificIgnore : path.join(root, ".dockerignore");
    let lines = [];
    if (fs.existsSync(ignorePath)) {
      try {
        lines = fs.readFileSync(ignorePath, "utf8").split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
      } catch {}
    }
    const excludesTestDirs = lines.some((line) => /(?:^|\/)(?:test|tests|__tests__|__mocks__|__fixtures__|__snapshots__)(?:\/|$)/i.test(line));
    const excludesTestFiles = lines.some((line) => /(?:\*\.test\.\*|\*\.spec\.\*|\*_test\.(?:go|py)|test_\*\.py)/i.test(line));
    if (!excludesTestDirs || !excludesTestFiles) {
      add(results, "PROD-DOCKER-001", "Contexto Docker pode incluir arquivos de teste", "high", "review",
        !fs.existsSync(ignorePath)
          ? "Dockerfile copia todo o contexto e não possui .dockerignore específico; arquivos de teste podem entrar na imagem. Crie exclusões e valide a imagem/artefato final."
          : "As regras do .dockerignore não demonstram exclusão de diretórios e arquivos de teste. Revise os padrões e valide o artefato final.",
        { file: dockerfile, ignoreFile: fs.existsSync(ignorePath) ? path.basename(ignorePath) : null });
    } else {
      add(results, "PROD-DOCKER-002", "Exclusões de testes no contexto Docker", "info", "pass",
        "Foram encontradas regras para diretórios e arquivos de teste em " + path.basename(ignorePath) + ". A imagem final ainda precisa passar por production-audit.",
        { file: dockerfile, ignoreFile: path.basename(ignorePath) });
    }
  }
}

export function runProjectChecks(options = {}) {
  const root = path.resolve(options.root || process.cwd());
  const results = [], stack = detectStack(root);
  add(results, "PROJECT-001", "Detecção de stack", "info", "pass", stack.join(", ") || "Stack não identificada.");
  const lockfiles = ["package-lock.json","npm-shrinkwrap.json","yarn.lock","pnpm-lock.yaml","bun.lockb","bun.lock","poetry.lock","Pipfile.lock","Cargo.lock","go.sum","composer.lock","Gemfile.lock"];
  const lock = lockfiles.find((x) => fs.existsSync(path.join(root, x)));
  add(results, "PROJECT-002", "Lockfile de dependências", lock ? "info" : "medium", lock ? "pass" : "review", lock ? "Localizado: " + lock : "Nenhum lockfile conhecido localizado.");
  const readme = ["README.md","README","readme.md"].some((x) => fs.existsSync(path.join(root, x)));
  add(results, "PROJECT-003", "Documentação inicial", readme ? "info" : "low", readme ? "pass" : "review", readme ? "README localizado." : "README não localizado.");
  const license = ["LICENSE","LICENSE.md","LICENCE"].some((x) => fs.existsSync(path.join(root, x)));
  add(results, "PROJECT-004", "Declaração de licença", license ? "info" : "low", license ? "pass" : "review", license ? "Arquivo localizado; titularidade e termos não foram avaliados." : "Nenhum arquivo de licença localizado.");
  const ignored = checkIgnore(root);
  add(results, "PROJECT-005", "Proteção de arquivos .env", ignored ? "info" : "medium", ignored ? "pass" : "review", ignored ? ".gitignore contém regra para .env." : "Confirme .gitignore e exclusão dos arquivos de ambiente.");
  const packageJson = (() => { try { return JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")); } catch { return {}; } })();
  const hasTests = Boolean(packageJson.scripts?.test) || ["test","tests","__tests__","spec"].some((x) => fs.existsSync(path.join(root, x)));
  add(results, "PROJECT-006", "Estrutura de testes", hasTests ? "info" : "medium", hasTests ? "pass" : "review", hasTests ? "Script/diretório de testes localizado; não executado." : "Nenhuma estrutura de testes reconhecida.");
  const ci = fs.existsSync(path.join(root, ".github", "workflows")) || [".gitlab-ci.yml","Jenkinsfile","azure-pipelines.yml"].some((x) => fs.existsSync(path.join(root, x)));
  add(results, "PROJECT-007", "Pipeline CI/CD", ci ? "info" : "medium", ci ? "pass" : "review", ci ? "Configuração localizada; não executada." : "Pipeline não localizada.");
  auditDockerBuildContext(root, results);
  const inventory = walk(root);
  const testAudit = options.testAudit === false
    ? { summary: { files: 0, testCases: 0, assertions: 0, filesWithoutAssertions: 0, weakAssertionFiles: 0, skippedTests: 0, filesWithoutNegativeCases: 0 }, results: [] }
    : auditTestFiles(inventory.files);
  results.push(...testAudit.results);
  const trackedEnv = (() => {
    const r = spawnSync("git", ["ls-files", "--cached", "--", ".env", ".env.*"], { cwd: root, encoding: "utf8" });
    return !r.error && r.status === 0 ? r.stdout.trim().split(/\r?\n/).filter(Boolean) : [];
  })();
  if (trackedEnv.length) for (const file of trackedEnv) add(results, "SEC-CLI-005", "Arquivo .env versionado", "critical", "fail", "Arquivo de ambiente parece estar no Git; remova-o do histórico conforme política e rotacione segredos.", { file });
  else if (!ignored) add(results, "SEC-CLI-006", "Regras de exclusão .env", "medium", "review", "Não foi encontrada regra explícita de exclusão .env.");
  if (options.includeSecrets !== false) {
    const scan = secretScan(inventory.files, results);
    if (scan.capped || inventory.truncated) add(results, "SEC-CLI-007", "Limite da varredura", "medium", "review", "A varredura local atingiu um limite; pode estar incompleta.");
  }
  if (options.runCommands) runConfigured(root, results);
  const threshold = options.failOn === "never" ? Infinity : RANK[options.failOn] ?? RANK.critical;
  const blocking = results.some((x) => ["fail","review"].includes(x.status) && RANK[x.severity] >= threshold);
  return {
    tool: "DevExcellence CLI", version: "0.4.0", projectRoot: root, generatedAt: new Date().toISOString(), stack,
    scope: { networkAccess: false, filesUploaded: false, secretPatternScan: options.includeSecrets !== false, testFileAudit: options.testAudit !== false, configuredCommandsExecuted: Boolean(options.runCommands) },
    summary: { checks: results.length, findings: results.filter((x) => ["fail","review"].includes(x.status)).length, gate: blocking ? "FAIL" : "PASS", failOn: options.failOn || "critical", testAudit: testAudit.summary },
    results,
    limitations: ["Varredura de segredos é heurística e pode gerar falsos positivos/negativos.", "Auditoria de testes é estática/heurística; não identifica com confiabilidade autoria IA/humana e não prova efetividade.", "Não executa SAST/DAST, pentest, análise completa de dependências, mutation testing automático ou teste de carga.", "Comandos externos só executam com opção explícita --run e configuração argv.", "Resultado não é certificação de segurança, qualidade ou conformidade."]
  };
}
export function shouldFail(report) { return report.summary.gate === "FAIL"; }
export function renderCheckText(report) {
  return ["DevExcellence CLI " + report.version, "Projeto: " + report.projectRoot, "Stack: " + (report.stack.join(", ") || "não identificada"),
    "Gate: " + report.summary.gate + " | Verificações: " + report.summary.checks + " | Itens para revisão: " + report.summary.findings,
    "Auditoria de testes: " + report.summary.testAudit.files + " arquivo(s), " + report.summary.testAudit.testCases + " caso(s), " + report.summary.testAudit.assertions + " assertion(s), " + report.summary.testAudit.filesWithoutAssertions + " arquivo(s) sem assertions, " + report.summary.testAudit.skippedTests + " teste(s) ignorado(s).", "",
    ...report.results.map((x) => "[" + x.status.toUpperCase() + "] " + x.id + " — " + x.title + " (" + x.severity + ")\n  " + x.evidence),
    "", "Limitações:", ...report.limitations.map((x) => "- " + x)].join("\n");
}
export function renderCheckMarkdown(report) {
  return ["# Relatório DevExcellence", "", "- Projeto: " + report.projectRoot, "- Gerado em: " + report.generatedAt,
    "- Stack: " + (report.stack.join(", ") || "não identificada"), "- Gate: " + report.summary.gate,
    "- Auditoria de testes: " + report.summary.testAudit.files + " arquivo(s), " + report.summary.testAudit.testCases + " caso(s), " + report.summary.testAudit.assertions + " assertion(s), " + report.summary.testAudit.filesWithoutAssertions + " arquivo(s) sem assertions, " + report.summary.testAudit.skippedTests + " teste(s) ignorado(s).", "",
    "| ID | Verificação | Severidade | Status | Evidência |", "|---|---|---|---|",
    ...report.results.map((x) => "| " + x.id + " | " + x.title.replaceAll("|","\\|") + " | " + x.severity + " | " + x.status + " | " + x.evidence.replaceAll("|","\\|").replaceAll("\n"," ") + " |"),
    "", "## Limitações", ...report.limitations.map((x) => "- " + x), ""].join("\n");
}