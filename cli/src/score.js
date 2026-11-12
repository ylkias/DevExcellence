export const DEFAULT_DIMENSIONS = [
  { id: "security", name: "Segurança e controle de acesso", weight: 20 },
  { id: "integrity", name: "Integridade dos dados", weight: 15 },
  { id: "code_quality", name: "Qualidade de código e arquitetura", weight: 15 },
  { id: "testing", name: "Testes e validação", weight: 15 },
  { id: "apis", name: "APIs e contratos", weight: 10 },
  { id: "performance", name: "Performance e escalabilidade", weight: 10 },
  { id: "resilience", name: "Resiliência", weight: 5 },
  { id: "privacy", name: "Privacidade e proteção de dados", weight: 5 },
  { id: "operations", name: "Operação e recuperação", weight: 5 }
];
const STATUSES = new Set(["pass", "partial", "fail", "not_applicable", "not_assessed"]);
const SEVERITIES = new Set(["critical", "high", "medium", "low", "info"]);
const STATUS_VALUE = { pass: 1, partial: 0.5, fail: 0 };

export function createAssessmentTemplate(project = "Meu projeto") {
  return {
    version: 1, project, profile: "web-application", assessedAt: new Date().toISOString(), minimumCoverage: 80,
    dimensions: DEFAULT_DIMENSIONS.map((d) => ({
      id: d.id, name: d.name, weight: d.weight,
      controls: [{ id: d.id.toUpperCase() + "-001", title: "Registrar evidência: " + d.name, status: "not_assessed", evidence: "" }]
    })),
    findings: []
  };
}

export function evaluateAssessment(input, options = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input) || !Array.isArray(input.dimensions) || !input.dimensions.length) {
    throw new Error("Avaliação inválida: informe um objeto JSON com pelo menos uma dimensão.");
  }
  const ids = new Set();
  for (const d of input.dimensions) {
    if (!d || typeof d.id !== "string" || ids.has(d.id) || !Number.isFinite(d.weight) || d.weight <= 0 || !Array.isArray(d.controls) || !d.controls.length) {
      throw new Error("Dimensão inválida: IDs únicos, peso positivo e controles são obrigatórios.");
    }
    ids.add(d.id);
    const controlIds = new Set();
    for (const c of d.controls) {
      if (!c || typeof c.id !== "string" || controlIds.has(c.id) || !STATUSES.has(c.status)) throw new Error("Controle inválido na dimensão " + d.id + ".");
      controlIds.add(c.id);
      if (c.status !== "not_assessed" && !(typeof c.evidence === "string" && c.evidence.trim())) throw new Error("Evidência/justificativa obrigatória para " + c.id + ".");
    }
  }
  const findings = input.findings ?? [];
  if (!Array.isArray(findings) || findings.some((f) => !f || !SEVERITIES.has(f.severity) || !["open", "accepted", "resolved", "false_positive"].includes(f.status) || typeof f.title !== "string")) {
    throw new Error("Achados inválidos: informe título, severidade e status válidos.");
  }
  const minCoverage = options.minimumCoverage ?? input.minimumCoverage ?? 80;
  if (!Number.isFinite(minCoverage) || minCoverage < 0 || minCoverage > 100) throw new Error("Cobertura mínima deve estar entre 0 e 100.");

  let applicable = 0, evaluated = 0, earned = 0;
  const dimensions = input.dimensions.map((d) => {
    const unit = d.weight / d.controls.length;
    let da = 0, de = 0, ds = 0;
    for (const c of d.controls) {
      if (c.status === "not_applicable") continue;
      da += unit;
      if (c.status === "not_assessed") continue;
      de += unit;
      ds += unit * STATUS_VALUE[c.status];
    }
    applicable += da; evaluated += de; earned += ds;
    return {
      id: d.id, name: d.name || d.id, weight: d.weight,
      score: de ? round(ds / de * 100) : null,
      coverage: da ? round(de / da * 100) : 100,
      assessed: d.controls.filter((c) => !["not_assessed", "not_applicable"].includes(c.status)).length,
      notAssessed: d.controls.filter((c) => c.status === "not_assessed").length
    };
  });
  const score = evaluated ? round(earned / evaluated * 100) : null;
  const coverage = applicable ? round(evaluated / applicable * 100) : 0;
  const open = (severity) => findings.filter((f) => f.severity === severity && f.status === "open");
  const critical = open("critical"), high = open("high");
  let releaseGate = "PASS";
  if (critical.length) releaseGate = "BLOCKED";
  else if (score === null || coverage < minCoverage) releaseGate = "PROVISIONAL";
  else if (high.length) releaseGate = "REVIEW_REQUIRED";
  return {
    project: input.project || "Projeto não identificado", profile: input.profile || "não informado",
    assessedAt: input.assessedAt || null, score, coverage, minimumCoverage: minCoverage,
    classification: score === null ? "Sem dados" : score >= 90 ? "Forte" : score >= 80 ? "Bom" : score >= 70 ? "Atenção" : "Insuficiente",
    releaseGate, dimensions, openFindings: Object.fromEntries(["critical","high","medium","low","info"].map((s) => [s, open(s).length])),
    blockers: critical.map((f) => f.title), reviewRequired: high.map((f) => f.title),
    rules: { pass: 1, partial: 0.5, fail: 0, notApplicableExcluded: true, notAssessedReducesCoverage: true }
  };
}
function round(n) { return Math.round((n + Number.EPSILON) * 10) / 10; }

export function renderScoreMarkdown(r) {
  const out = [
    "# Quality Score — " + r.project, "", "- Perfil: " + r.profile, "- Data: " + (r.assessedAt || "não informada"),
    "- Score: " + (r.score === null ? "sem dados" : r.score + "/100 (" + r.classification + ")"),
    "- Cobertura: " + r.coverage + "% (mínimo " + r.minimumCoverage + "%)", "- Gate: " + r.releaseGate, "",
    "| Dimensão | Peso | Score | Cobertura |", "|---|---:|---:|---:|"
  ];
  for (const d of r.dimensions) out.push("| " + d.name.replaceAll("|", "\\|") + " | " + d.weight + " | " + (d.score === null ? "sem dados" : d.score + "%") + " | " + d.coverage + "% |");
  out.push("", "## Achados abertos", "", "| Severidade | Quantidade |", "|---|---:|");
  for (const [s, n] of Object.entries(r.openFindings)) out.push("| " + s + " | " + n + " |");
  if (r.blockers.length) out.push("", "## Bloqueios críticos", ...r.blockers.map((x) => "- " + x));
  if (r.reviewRequired.length) out.push("", "## Revisão necessária", ...r.reviewRequired.map((x) => "- " + x));
  out.push("", "> Score calculado somente sobre evidências declaradas. A ferramenta não verifica a veracidade dessas evidências e não é certificação de segurança ou conformidade.");
  return out.join("\n");
}