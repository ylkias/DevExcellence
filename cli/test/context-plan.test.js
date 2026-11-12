import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createContextPlan, collectChangedFiles } from "../src/context-plan.js";

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "devexcellence-context-"));
  const skillRoot = path.join(root, "skills", "devexcellence");
  fs.mkdirSync(path.join(skillRoot, "checklists"), { recursive: true });
  for (const name of ["QUALITY","SECURITY","TESTING","API","DATABASE","INTEGRITY","FRONTEND-UX","FORMATTING","INTERNATIONALIZATION","PRIVACY-LGPD","PERFORMANCE","RESILIENCE","OBSERVABILITY","DELIVERY","SUPPLY-CHAIN","BACKUP-RECOVERY","QUALITY-SCORE"]) {
    fs.writeFileSync(path.join(skillRoot, "checklists", name + ".md"), "# " + name + "\n");
  }
  return { root, skillRoot };
}

test("mantém checklists-base e seleciona API por arquivo alterado", () => {
  const f = fixture();
  try {
    const plan = createContextPlan({ root: f.root, skillRoot: f.skillRoot, files: ["src/api/orders.ts"] });
    const ids = plan.modules.map((item) => item.id);
    assert.deepEqual(ids.slice(0, 3), ["QUALITY", "SECURITY", "TESTING"]);
    assert.ok(ids.includes("API"));
    assert.equal(ids.includes("DATABASE"), false);
    assert.equal(plan.mode, "incremental");
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});

test("seleciona banco e integridade para migrations e schema", () => {
  const f = fixture();
  try {
    const plan = createContextPlan({ root: f.root, skillRoot: f.skillRoot, files: ["prisma/schema.prisma", "prisma/migrations/001.sql"] });
    const ids = plan.modules.map((item) => item.id);
    assert.ok(ids.includes("DATABASE"));
    assert.ok(ids.includes("INTEGRITY"));
    assert.ok(ids.includes("SECURITY"));
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});

test("modo amplo inclui todos os checklists sem depender do Git", () => {
  const f = fixture();
  try {
    const plan = createContextPlan({ root: f.root, skillRoot: f.skillRoot, files: [], all: true });
    assert.equal(plan.modules.length, 17);
    assert.equal(plan.mode, "broad");
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});

test("estimativa é declarada como aproximada, nunca como uso real", () => {
  const f = fixture();
  try {
    const plan = createContextPlan({ root: f.root, skillRoot: f.skillRoot, files: ["src/components/Button.tsx"] });
    assert.equal(plan.estimate.exact, false);
    assert.equal(plan.summary.totalChecklistBytes, plan.modules.reduce((sum, item) => sum + item.bytes, 0));
    assert.ok(plan.summary.estimatedTokens > 0);
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});

test("coleta arquivos versionados alterados e untracked em um repositório Git", () => {
  const f = fixture();
  try {
    assert.equal(spawnSync("git", ["init"], { cwd: f.root }).status, 0);
    spawnSync("git", ["config", "user.email", "test@example.invalid"], { cwd: f.root });
    spawnSync("git", ["config", "user.name", "Test"], { cwd: f.root });
    fs.writeFileSync(path.join(f.root, "tracked.js"), "const x = 1;\n");
    assert.equal(spawnSync("git", ["add", "tracked.js"], { cwd: f.root }).status, 0);
    assert.equal(spawnSync("git", ["commit", "-m", "fixture"], { cwd: f.root }).status, 0);
    fs.writeFileSync(path.join(f.root, "tracked.js"), "const x = 2;\n");
    fs.writeFileSync(path.join(f.root, "new.ts"), "export {};\n");
    const changed = collectChangedFiles(f.root);
    assert.deepEqual(changed, ["new.ts", "tracked.js"]);
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});
