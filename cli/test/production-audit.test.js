import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { auditProductionArtifact } from "../src/production-audit.js";

function fixture() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "devexcellence-production-"));
}
function write(root, relative, content = "") {
  const full = path.join(root, relative);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}
test("aprova artefato sem arquivos exclusivos de teste", () => {
  const root = fixture();
  try {
    write(root, "server/index.js", "export const ready = true;");
    write(root, "public/logo.svg", "<svg/>");
    const r = auditProductionArtifact(root);
    assert.equal(r.summary.status, "PASS");
    assert.equal(r.summary.clean, true);
    assert.equal(r.summary.forbiddenItems, 0);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test("bloqueia arquivos test/spec JavaScript e TypeScript", () => {
  const root = fixture();
  try {
    write(root, "server/orders.js");
    write(root, "server/orders.test.js");
    write(root, "server/orders.spec.ts");
    const r = auditProductionArtifact(root);
    assert.equal(r.summary.status, "BLOCKED");
    assert.equal(r.summary.forbiddenItems, 2);
    assert.ok(r.forbiddenItems.some(x => x.path === "server/orders.test.js"));
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test("bloqueia diretórios de testes e não precisa listar cada arquivo interno", () => {
  const root = fixture();
  try {
    write(root, "app/tests/orders.test.ts");
    write(root, "app/tests/fixtures/orders.json", "{}");
    const r = auditProductionArtifact(root);
    assert.equal(r.summary.forbiddenItems, 1);
    assert.equal(r.forbiddenItems[0].path, "app/tests");
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test("bloqueia padrões Python Go Java C# Ruby e configurações de teste", () => {
  const root = fixture();
  try {
    write(root, "python/test_orders.py");
    write(root, "go/orders_test.go");
    write(root, "java/OrderServiceTests.java");
    write(root, "dotnet/OrderTests.cs");
    write(root, "ruby/order_service_spec.rb");
    write(root, "config/vitest.config.ts");
    const r = auditProductionArtifact(root);
    assert.equal(r.summary.status, "BLOCKED");
    assert.equal(r.summary.forbiddenItems, 6);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test("não confunde nomes normais com testes", () => {
  const root = fixture();
  try {
    write(root, "server/contest.js");
    write(root, "server/testimonials.js");
    write(root, "server/latest.js");
    const r = auditProductionArtifact(root);
    assert.equal(r.summary.status, "PASS");
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test("falha de forma fechada quando o limite de varredura é atingido", () => {
  const root = fixture();
  try {
    write(root, "a.js");
    write(root, "b.js");
    const r = auditProductionArtifact(root, { maxFiles: 1 });
    assert.equal(r.summary.status, "BLOCKED");
    assert.equal(r.summary.truncated, true);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test("exige caminho existente que seja diretório e recusa a raiz Git", () => {
  const root = fixture();
  try {
    assert.throws(() => auditProductionArtifact(path.join(root, "missing")), /não encontrado/);
    write(root, ".git/config", "");
    assert.throws(() => auditProductionArtifact(root), /Não audite a raiz do repositório/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test("bloqueia link simbólico que aponta para diretório de testes", () => {
  const root = fixture();
  try {
    const tests = path.join(root, "tests");
    fs.mkdirSync(tests);
    fs.writeFileSync(path.join(tests, "hidden.test.js"), "test('hidden', () => {});");
    fs.symlinkSync("tests", path.join(root, "test-assets"), "dir");
    const r = auditProductionArtifact(root);
    assert.equal(r.summary.status, "BLOCKED");
    assert.ok(r.forbiddenItems.some(x => x.kind === "symlink" && x.path === "test-assets"));
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test("bloqueia link simbólico com destino fora do artefato", () => {
  const root = fixture();
  try {
    fs.symlinkSync("../outside.js", path.join(root, "external.js"));
    const r = auditProductionArtifact(root);
    assert.equal(r.summary.status, "BLOCKED");
    assert.ok(r.forbiddenItems.some(x => x.kind === "symlink"));
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
