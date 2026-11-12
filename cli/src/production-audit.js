import fs from "node:fs";
import path from "node:path";

const FORBIDDEN_DIRS = new Map([
  ["test", "diretório de testes"],
  ["tests", "diretório de testes"],
  ["__tests__", "diretório de testes"],
  ["__mocks__", "mocks de teste"],
  ["__fixtures__", "fixtures exclusivos de teste"],
  ["__snapshots__", "snapshots de teste"],
  ["coverage", "relatórios de cobertura"],
  [".nyc_output", "dados de cobertura"],
  ["playwright-report", "relatórios Playwright"],
  ["test-results", "resultados de testes"],
  ["allure-results", "resultados Allure"],
  ["allure-report", "relatórios Allure"]
]);

const FORBIDDEN_FILES = [
  { pattern: /\.(?:test|spec)\.[cm]?[jt]sx?$/i, reason: "arquivo de teste JavaScript/TypeScript" },
  { pattern: /(^|\/)test_[^/]+\.py$/i, reason: "arquivo de teste Python" },
  { pattern: /_test\.py$/i, reason: "arquivo de teste Python" },
  { pattern: /_test\.go$/i, reason: "arquivo de teste Go" },
  { pattern: /(?:^|\/)[^/]*(?:Test|Tests)\.(?:java|kt|cs)$/i, reason: "arquivo de teste JVM/.NET" },
  { pattern: /_spec\.rb$/i, reason: "arquivo de teste Ruby" },
  { pattern: /_test\.rb$/i, reason: "arquivo de teste Ruby" },
  { pattern: /(?:^|\/)jest\.config\.[^/]+$/i, reason: "configuração Jest" },
  { pattern: /(?:^|\/)vitest\.config\.[^/]+$/i, reason: "configuração Vitest" },
  { pattern: /(?:^|\/)playwright\.config\.[^/]+$/i, reason: "configuração Playwright" },
  { pattern: /(?:^|\/)cypress\.config\.[^/]+$/i, reason: "configuração Cypress" },
  { pattern: /(?:^|\/)karma\.conf\.[^/]+$/i, reason: "configuração Karma" },
  { pattern: /(?:^|\/)wdio\.conf\.[^/]+$/i, reason: "configuração WebdriverIO" },
  { pattern: /(?:^|\/)\.mocharc\.[^/]+$/i, reason: "configuração Mocha" },
  { pattern: /(?:^|\/)(?:pytest\.ini|tox\.ini|phpunit\.xml(?:\.dist)?)$/i, reason: "configuração de testes" },
  { pattern: /\.(?:lcov|profraw|profdata)$/i, reason: "artefato de cobertura/perfil de testes" },
  { pattern: /(?:^|\/)junit(?:-[^/]*)?\.xml$/i, reason: "relatório JUnit" }
];

const MAX_SCAN_FILES = 50000;

function testFixtureDirectory(relativePath) {
  const parts = relativePath.split("/").map((part) => part.toLowerCase());
  return parts.some((part, index) =>
    ["test", "tests", "__tests__", "spec", "specs"].includes(part) &&
    parts.slice(index + 1).some((child) => ["fixtures", "test-data", "testdata"].includes(child))
  );
}

function findForbiddenItem(relativePath, kind = "file") {
  const normalized = relativePath.replaceAll("\\", "/").replace(/^\.\/+/, "");
  const parts = normalized.split("/").filter(Boolean);
  for (let i = 0; i < parts.length; i++) {
    const dir = parts[i].toLowerCase();
    if (FORBIDDEN_DIRS.has(dir)) {
      return { path: parts.slice(0, i + 1).join("/"), kind: "directory", reason: FORBIDDEN_DIRS.get(dir) };
    }
  }
  if (testFixtureDirectory(normalized)) {
    const index = parts.findIndex((part, i) =>
      ["test", "tests", "__tests__", "spec", "specs"].includes(part.toLowerCase()) &&
      parts.slice(i + 1).some((child) => ["fixtures", "test-data", "testdata"].includes(child.toLowerCase()))
    );
    return { path: parts.slice(0, index + 2).join("/"), kind: "directory", reason: "fixtures/dados usados exclusivamente por testes" };
  }
  for (const entry of FORBIDDEN_FILES) {
    if (entry.pattern.test(normalized)) return { path: normalized, kind, reason: entry.reason };
  }
  return null;
}

export function auditProductionArtifact(inputPath, options = {}) {
  if (typeof inputPath !== "string" || !inputPath.trim()) {
    throw new Error("Informe o diretório real do artefato de produção com --path.");
  }
  const root = path.resolve(inputPath);
  if (!fs.existsSync(root)) throw new Error("Diretório do artefato não encontrado: " + root);
  if (!fs.statSync(root).isDirectory()) throw new Error("O caminho do artefato precisa ser um diretório.");
  if (fs.existsSync(path.join(root, ".git"))) {
    throw new Error("Não audite a raiz do repositório. Informe o diretório gerado pelo build/deploy, por exemplo dist, build, .next/standalone ou a pasta extraída do pacote.");
  }

  const limit = Number.isInteger(options.maxFiles) ? Math.min(200000, Math.max(1, options.maxFiles)) : MAX_SCAN_FILES;
  const findings = [];
  const reported = new Set();
  let filesScanned = 0;
  let directoriesScanned = 0;
  let truncated = false;

  function record(item) {
    if (reported.has(item.path)) return;
    reported.add(item.path);
    findings.push(item);
  }

  const visitedDirectories = new Set();
  function visit(directory, relative = "") {
    const resolvedDirectory = path.resolve(directory);
    if (visitedDirectories.has(resolvedDirectory)) return;
    visitedDirectories.add(resolvedDirectory);
    let entries;
    try {
      entries = fs.readdirSync(directory, { withFileTypes: true });
    } catch (error) {
      record({ path: relative || ".", kind: "unreadable", reason: "não foi possível ler o conteúdo do artefato: " + error.message });
      return;
    }
    directoriesScanned++;
    for (const entry of entries) {
      if (filesScanned >= limit) {
        truncated = true;
        return;
      }
      const rel = path.posix.join(relative, entry.name);
      const full = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        let targetText, targetRelative, targetFull, targetStat;
        try {
          targetText = fs.readlinkSync(full);
          targetRelative = path.posix.normalize(
            path.posix.isAbsolute(targetText)
              ? targetText.replace(/^\/+/, "")
              : path.posix.join(path.posix.dirname(rel), targetText)
          );
          if (targetRelative === ".." || targetRelative.startsWith("../") || path.posix.isAbsolute(targetRelative)) {
            record({ path: rel, kind: "symlink", reason: "link simbólico aponta para fora do artefato; destino não pode ser auditado com segurança." });
            continue;
          }
          targetFull = path.resolve(root, ...targetRelative.split("/"));
          if (!fs.existsSync(targetFull)) {
            record({ path: rel, kind: "symlink", reason: "destino do link não existe no artefato: " + targetRelative });
            continue;
          }
          targetStat = fs.statSync(targetFull);
        } catch (error) {
          record({ path: rel, kind: "symlink", reason: "não foi possível resolver o link simbólico: " + error.message });
          continue;
        }
        const forbiddenLink = findForbiddenItem(rel, "symlink");
        const forbiddenTarget = findForbiddenItem(targetRelative, "symlink-target");
        if (forbiddenLink || forbiddenTarget) {
          record({
            path: rel,
            kind: "symlink",
            reason: "link simbólico aponta para conteúdo de teste: " + (forbiddenTarget?.path || forbiddenLink?.path)
          });
          continue;
        }
        if (targetStat.isDirectory()) {
          visit(targetFull, rel);
        } else if (targetStat.isFile()) {
          filesScanned++;
          const forbiddenFile = findForbiddenItem(rel) || findForbiddenItem(targetRelative);
          if (forbiddenFile) record({ ...forbiddenFile, path: rel, kind: "symlink" });
        } else {
          record({ path: rel, kind: "symlink", reason: "tipo de destino não suportado para auditoria." });
        }
        continue;
      }

      if (entry.isDirectory()) {
        const forbidden = findForbiddenItem(rel, "directory");
        if (forbidden) {
          record(forbidden);
          continue;
        }
        visit(full, rel);
        continue;
      }
      if (!entry.isFile()) continue;
      filesScanned++;
      const forbidden = findForbiddenItem(rel);
      if (forbidden) record(forbidden);
    }
  }

  visit(root);
  const clean = findings.length === 0 && !truncated;
  return {
    tool: "DevExcellence Production Artifact Audit",
    version: "0.3.0",
    artifactPath: root,
    generatedAt: new Date().toISOString(),
    summary: {
      status: clean ? "PASS" : "BLOCKED",
      clean,
      filesScanned,
      directoriesScanned,
      forbiddenItems: findings.length,
      truncated,
      maxFiles: limit
    },
    forbiddenItems: findings,
    rules: {
      sourceTestsAllowedInRepository: true,
      testsAllowedInProductionArtifact: false,
      testDirectoriesExcluded: true,
      testFilesExcluded: true,
      incompleteScanBlocksRelease: true
    },
    limitations: [
      "A auditoria verifica nomes e caminhos dos arquivos no diretório fornecido; não inspeciona conteúdo de bundles para descobrir código de teste incorporado em arquivos compilados.",
      "A auditoria não inspeciona diretamente imagens Docker, registries ou pacotes remotos. Para esses alvos, extraia o filesystem da imagem/pacote em diretório isolado e audite esse diretório.",
      "Mantenha os testes no repositório e na CI; a regra é excluí-los do artefato de produção, não apagá-los do projeto."
    ]
  };
}

export function renderProductionAuditMarkdown(report) {
  const lines = [
    "# Auditoria de artefato de produção",
    "",
    "- Artefato: " + report.artifactPath,
    "- Data: " + report.generatedAt,
    "- Resultado: **" + report.summary.status + "**",
    "- Arquivos inspecionados: " + report.summary.filesScanned,
    "- Diretórios inspecionados: " + report.summary.directoriesScanned,
    "- Itens proibidos: " + report.summary.forbiddenItems,
    "- Varredura truncada: " + (report.summary.truncated ? "sim" : "não"),
    "",
    "| Caminho | Tipo | Motivo |",
    "|---|---|---|"
  ];
  for (const item of report.forbiddenItems) {
    lines.push("| " + item.path.replaceAll("|", "\\|") + " | " + item.kind + " | " + item.reason.replaceAll("|", "\\|") + " |");
  }
  if (!report.forbiddenItems.length) lines.push("| — | — | Nenhum arquivo/diretório de teste detectado |");
  lines.push("", "## Limitações", ...report.limitations.map((item) => "- " + item));
  return lines.join("\n");
}
