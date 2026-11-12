import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const CONTEXT_MODULES = [
  "QUALITY", "SECURITY", "TESTING", "API", "DATABASE", "INTEGRITY",
  "FRONTEND-UX", "FORMATTING", "INTERNATIONALIZATION", "PRIVACY-LGPD",
  "PERFORMANCE", "RESILIENCE", "OBSERVABILITY", "DELIVERY",
  "SUPPLY-CHAIN", "BACKUP-RECOVERY", "QUALITY-SCORE"
];

const BASE_MODULES = ["QUALITY", "SECURITY", "TESTING"];
const SIGNALS = [
  { pattern: /(^|\/)(api|apis|routes?|controllers?|handlers?|endpoints?)(\/|$)|openapi|swagger/i, modules: ["API", "SECURITY"] },
  { pattern: /(^|\/)(prisma|migrations?|database|db|repositories|models)(\/|$)|schema\.(prisma|sql)|\.sql$/i, modules: ["DATABASE", "INTEGRITY", "SECURITY"] },
  { pattern: /(^|\/)(auth|authentication|authorization|permissions?|rbac|sessions?|identity)(\/|$)|middleware.*auth|login|oauth|sso/i, modules: ["SECURITY", "API", "PRIVACY-LGPD"] },
  { pattern: /(^|\/)(components?|pages?|app|views?|layouts?|public|styles?)(\/|$)|\.(tsx|jsx|vue|svelte|scss|css)$/i, modules: ["FRONTEND-UX", "FORMATTING"] },
  { pattern: /(^|\/)(__tests__|tests?|spec|fixtures|mocks?)(\/|$)|\.(test|spec)\./i, modules: ["TESTING"] },
  { pattern: /(^|\/)(\.github|\.gitlab|\.husky|docker|k8s|kubernetes|helm|terraform|infra|deploy|scripts)(\/|$)|dockerfile|compose|\.ya?ml$/i, modules: ["DELIVERY", "SUPPLY-CHAIN"] },
  { pattern: /(^|\/)(logs?|metrics|tracing|telemetry|monitoring|observability)(\/|$)|logger|prometheus|grafana/i, modules: ["OBSERVABILITY"] },
  { pattern: /(^|\/)(backup|backups|restore|recovery)(\/|$)|retention|disaster/i, modules: ["BACKUP-RECOVERY", "RESILIENCE"] },
  { pattern: /(^|\/)(i18n|l10n|locales?|translations?)(\/|$)|intl|messages\.(json|ya?ml)$/i, modules: ["INTERNATIONALIZATION", "FORMATTING"] },
  { pattern: /(^|\/)(performance|benchmark|load|stress)(\/|$)|cache|profil(e|ing)|query-plan/i, modules: ["PERFORMANCE", "RESILIENCE"] },
  { pattern: /(^|\/)(privacy|lgpd|gdpr|consent)(\/|$)|personal.?data|data.?subject/i, modules: ["PRIVACY-LGPD", "SECURITY"] },
  { pattern: /(^|\/)(dependencies|vendor|third.party|supply.chain)(\/|$)|lock$|lock\./i, modules: ["SUPPLY-CHAIN"] },
  { pattern: /format|mask|currency|decimal|date|phone|postal|cpf|cnpj/i, modules: ["FORMATTING"] }
];

function normalizeFile(file) {
  return String(file).replaceAll("\\", "/").replace(/^\.\/+/, "").replace(/^\/+/, "");
}

export function collectChangedFiles(root = process.cwd()) {
  const diff = spawnSync("git", ["diff", "--name-only", "HEAD", "--"], { cwd: root, encoding: "utf8", shell: false });
  if (diff.error || diff.status !== 0) {
    throw new Error("Não foi possível consultar o Git. Informe os caminhos com --file ou execute dentro de um repositório Git.");
  }
  const untracked = spawnSync("git", ["ls-files", "--others", "--exclude-standard"], { cwd: root, encoding: "utf8", shell: false });
  if (untracked.error || untracked.status !== 0) throw new Error("Não foi possível listar arquivos novos no Git.");
  return [...new Set([...diff.stdout.split(/\r?\n/), ...untracked.stdout.split(/\r?\n/)].map(normalizeFile).filter(Boolean))].sort();
}

export function createContextPlan(options = {}) {
  const root = path.resolve(options.root || process.cwd());
  const skillRoot = path.resolve(options.skillRoot || path.join(path.dirname(fileURLToPath(import.meta.url)), "../../skills/devexcellence"));
  const files = (options.all ? (options.files || []) : (options.files?.length ? options.files : collectChangedFiles(root))).map(normalizeFile);
  const selected = new Map();
  const add = (id, reason) => {
    const previous = selected.get(id);
    if (previous) {
      if (!previous.reasons.includes(reason)) previous.reasons.push(reason);
    } else selected.set(id, { id, reasons: [reason] });
  };

  for (const id of BASE_MODULES) add(id, "Base proporcional para preservar qualidade, segurança e testes.");
  if (options.all) {
    for (const id of CONTEXT_MODULES) add(id, "Modo amplo solicitado explicitamente.");
  } else {
    for (const file of files) {
      let matched = false;
      for (const signal of SIGNALS) {
        if (!signal.pattern.test(file)) continue;
        matched = true;
        for (const id of signal.modules) add(id, "Sinal em " + file);
      }
      if (!matched && /\.(js|jsx|mjs|cjs|ts|tsx|py|go|rs|java|kt|cs|php|rb|vue|svelte)$/i.test(file)) {
        add("SECURITY", "Código executável alterado: revisar fronteiras de confiança pertinentes (" + file + ").");
      }
    }
  }

  const modules = [...selected.values()].map((item) => {
    const relativePath = "checklists/" + item.id + ".md";
    const fullPath = path.join(skillRoot, relativePath);
    let bytes = 0, available = false;
    try { bytes = fs.statSync(fullPath).size; available = fs.statSync(fullPath).isFile(); } catch {}
    return {
      id: item.id,
      path: "skills/devexcellence/" + relativePath,
      reasons: item.reasons,
      available,
      bytes,
      estimatedTokens: available ? Math.ceil(bytes / 4) : null
    };
  });
  const totalBytes = modules.reduce((sum, item) => sum + item.bytes, 0);
  return {
    tool: "DevExcellence Context Plan",
    version: "0.4.0",
    mode: options.all ? "broad" : "incremental",
    projectRoot: root,
    changedFiles: files,
    modules,
    summary: {
      changedFiles: files.length,
      selectedModules: modules.length,
      totalChecklistBytes: totalBytes,
      estimatedTokens: Math.ceil(totalBytes / 4)
    },
    estimate: {
      method: "bytes / 4",
      exact: false,
      note: "Estimativa grosseira para comparação; tokens reais variam conforme o tokenizer, idioma e provedor."
    },
    guidance: files.length
      ? "Leia somente os módulos listados, além das instruções do projeto e dos arquivos diretamente relacionados. Amplie o escopo quando novos riscos aparecerem."
      : "Nenhum arquivo alterado foi detectado. Revise o perfil do projeto; use --all para uma auditoria ampla ou --file para informar o escopo.",
    limitations: [
      "A seleção é heurística e depende dos caminhos informados/detectados; revise-a diante de riscos não refletidos no nome dos arquivos.",
      "O plano reduz leitura redundante, mas não mede o consumo real do provedor nem substitui verificações de segurança ou testes."
    ]
  };
}

export function renderContextPlanText(plan) {
  const lines = [
    "DevExcellence Context Plan " + plan.version,
    "Modo: " + plan.mode,
    "Arquivos alterados: " + plan.summary.changedFiles,
    "Checklists selecionados: " + plan.summary.selectedModules,
    "Contexto dos checklists: " + plan.summary.totalChecklistBytes + " bytes (estimativa ~" + plan.summary.estimatedTokens + " tokens; não é medição real)",
    "",
    "Arquivos de entrada:",
    ...(plan.changedFiles.length ? plan.changedFiles.map((file) => "- " + file) : ["- Nenhum arquivo alterado detectado"]),
    "",
    "Carregar somente estes checklists:",
    ...plan.modules.map((item) => "- " + item.path + (item.available ? "" : " [não encontrado]") + " — " + item.reasons.join("; ")),
    "",
    plan.guidance,
    "",
    "Limitações:",
    ...plan.limitations.map((item) => "- " + item)
  ];
  return lines.join("\n");
}
