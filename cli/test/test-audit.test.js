import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { auditTestFiles } from "../src/test-audit.js";

function fixture(entries) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "devexcellence-test-audit-"));
  const files = [];
  for (const [relative, content] of Object.entries(entries)) {
    const full = path.join(root, relative);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
    files.push({ full, relative });
  }
  return { root, files };
}
test("reconhece teste JavaScript com assertion baseada em resultado", () => {
  const f = fixture({ "src/calculator.test.js": 'test("adds values", () => { const result = add(2, 3); expect(result).toBe(5); });' });
  try {
    const r = auditTestFiles(f.files);
    assert.equal(r.summary.files, 1);
    assert.equal(r.summary.testCases, 1);
    assert.equal(r.summary.assertions, 1);
    assert.ok(r.results.some(x => x.id === "TEST-AI-012" && x.status === "pass"));
    assert.ok(!r.results.some(x => x.id === "TEST-AI-002"));
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});
test("detecta casos de teste sem assertions", () => {
  const f = fixture({ "tests/order.spec.ts": 'it("creates an order", async () => { await createOrder(); });' });
  try {
    const r = auditTestFiles(f.files);
    assert.equal(r.summary.filesWithoutAssertions, 1);
    assert.ok(r.results.some(x => x.id === "TEST-AI-002" && x.severity === "high"));
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});
test("detecta assertions tautológicas", () => {
  const tautology = ["test(", '"always true"', ", () => { ", "expect(", "true", ").toBe(", "true", "); });"].join("");
  const f = fixture({ "src/example.test.js": tautology });
  try {
    const r = auditTestFiles(f.files);
    assert.ok(r.results.some(x => x.id === "TEST-AI-004" && x.severity === "high"));
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});
test("detecta assertions genéricas como única validação", () => {
  const weak = ["test(", '"renders"', ", () => { expect(render()).", "toBeTruthy", "(); });"].join("");
  const f = fixture({ "src/example.test.js": weak });
  try {
    const r = auditTestFiles(f.files);
    assert.equal(r.summary.weakAssertionFiles, 1);
    assert.ok(r.results.some(x => x.id === "TEST-AI-003"));
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});
test("detecta testes desabilitados", () => {
  const skipped = ["test", ".skip(", '"not run"', ", () => { expect(run()).toBe(true); });"].join("");
  const f = fixture({ "src/example.test.js": skipped });
  try {
    const r = auditTestFiles(f.files);
    assert.equal(r.summary.skippedTests, 1);
    assert.ok(r.results.some(x => x.id === "TEST-AI-005"));
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});
test("reconhece testes Python e assert nativo", () => {
  const f = fixture({ "tests/test_math.py": "def test_addition():\n    assert add(1, 2) == 3\n" });
  try {
    const r = auditTestFiles(f.files);
    assert.equal(r.summary.testCases, 1);
    assert.equal(r.summary.assertions, 1);
    assert.ok(r.results.some(x => x.id === "TEST-AI-012"));
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});
test("sinaliza ausência de arquivos reconhecidos", () => {
  const r = auditTestFiles([{ full: "/tmp/source.js", relative: "src/source.js" }]);
  assert.ok(r.results.some(x => x.id === "TEST-AI-000"));
});

test("reconhece arquivo JavaScript dentro de diretório tests", () => {
  const f = fixture({ "tests/integration.js": 'describe("orders", () => { test("rejects invalid input", () => { expect(validate("")).toBe(false); }); });' });
  try {
    const r = auditTestFiles(f.files);
    assert.equal(r.summary.files, 1);
    assert.equal(r.summary.testCases, 1);
    assert.ok(r.results.some(x => x.id === "TEST-AI-012"));
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});

test("sinaliza assertions focadas apenas em chamadas de mocks", () => {
  const mockOnly = ["test(", '"calls dependency"', ", () => { expect(mock).", "toHaveBeenCalled", "(); });"].join("");
  const f = fixture({ "src/mock.test.js": mockOnly });
  try {
    const r = auditTestFiles(f.files);
    assert.ok(r.results.some(x => x.id === "TEST-AI-006" && x.severity === "medium"));
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});

test("reconhece assertions xUnit/NUnit em C#", () => {
  const f = fixture({ "tests/OrderTests.cs": '[Fact] public void Rejects_invalid_order() { Assert.Equal(400, response.StatusCode); }' });
  try {
    const r = auditTestFiles(f.files);
    assert.equal(r.summary.testCases, 1);
    assert.equal(r.summary.assertions, 1);
  } finally { fs.rmSync(f.root, { recursive: true, force: true }); }
});
