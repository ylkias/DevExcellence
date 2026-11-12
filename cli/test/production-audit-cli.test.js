import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../bin/devexcellence.js");
function fixture() { return fs.mkdtempSync(path.join(os.tmpdir(), "devexcellence-cli-release-")); }
function run(args) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: "utf8", timeout: 15000 });
}

test("CLI retorna 0 para artefato limpo", () => {
  const root = fixture();
  try {
    fs.writeFileSync(path.join(root, "server.js"), "console.log('ready');");
    const result = run(["production-audit", "--path", root, "--json"]);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).summary.status, "PASS");
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test("CLI bloqueia artefato com testes e retorna 1", () => {
  const root = fixture();
  try {
    const tests = path.join(root, "tests");
    fs.mkdirSync(tests);
    fs.writeFileSync(path.join(tests, "orders.test.js"), "test('order', () => {});");
    const result = run(["production-audit", "--path", root, "--json"]);
    assert.equal(result.status, 1, result.stderr);
    assert.equal(JSON.parse(result.stdout).summary.status, "BLOCKED");
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test("CLI exige diretório de artefato e retorna 2 quando falta --path", () => {
  const result = run(["production-audit", "--json"]);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /--path/);
});

test("CLI não permite salvar relatório dentro do próprio artefato", () => {
  const root = fixture();
  try {
    fs.writeFileSync(path.join(root, "server.js"), "ready");
    const result = run(["production-audit", "--path", root, "--output", path.join(root, "audit.md")]);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /fora do diretório auditado/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
