import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { runProjectChecks, shouldFail } from "../src/check.js";
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(),"devexcellence-"));
  fs.writeFileSync(path.join(root,"package.json"),JSON.stringify({scripts:{test:"node --test"}}));
  fs.writeFileSync(path.join(root,"yarn.lock"),"");
  fs.writeFileSync(path.join(root,"README.md"),"# test");
  fs.writeFileSync(path.join(root,".gitignore"),".env\n.env.*\n");
  fs.mkdirSync(path.join(root,".github","workflows"),{recursive:true});
  return root;
}
test("identifica stack e controles de estrutura",() => {
  const root=fixture();
  try {
    const r=runProjectChecks({root});
    assert.ok(r.stack.includes("Node.js/JavaScript/TypeScript"));
    assert.equal(r.results.find(x=>x.id==="PROJECT-006").status,"pass");
    assert.equal(r.results.find(x=>x.id==="PROJECT-007").status,"pass");
    assert.ok(r.summary.testAudit);
    assert.equal(r.scope.testFileAudit,true);
    assert.equal(shouldFail(r),false);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
test("aponta segredo provável sem expor valor",() => {
  const root=fixture();
  try {
    fs.writeFileSync(path.join(root,"config.js"),'const api_'+'key = "'+'AbCdEfGhIjKlMnOpQrStUvWxYz012345'+'";');
    const r=runProjectChecks({root});
    const f=r.results.find(x=>x.id==="SEC-CLI-003");
    assert.ok(f);
    assert.equal(f.evidence.includes("AbCdEfGhIjKlMnOpQrStUvWxYz012345"),false);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
test("fail-on never não bloqueia por severidade",() => {
  const root=fixture();
  try {
    fs.writeFileSync(path.join(root,"secret.js"),'const key = "'+'AKIA'+'1234567890ABCDEF'+'";');
    assert.equal(shouldFail(runProjectChecks({root,failOn:"never"})),false);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
test("comandos externos exigem execução explícita e usam argv",() => {
  const root=fixture(), marker=path.join(root,"ran.txt");
  try {
    fs.mkdirSync(path.join(root,".devexcellence"));
    fs.writeFileSync(path.join(root,".devexcellence","config.json"),JSON.stringify({commands:[{name:"test marker",argv:["node","-e","require('node:fs').writeFileSync("+JSON.stringify(marker)+",'yes')"],required:true}]}));
    runProjectChecks({root});
    assert.equal(fs.existsSync(marker),false);
    const r=runProjectChecks({root,runCommands:true});
    assert.equal(fs.readFileSync(marker,"utf8"),"yes");
    assert.ok(r.results.some(x=>x.id==="RUN-1"&&x.status==="pass"));
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
test("alerta quando Dockerfile copia todo o contexto sem .dockerignore", () => {
  const root=fixture();
  try {
    fs.writeFileSync(path.join(root,"Dockerfile"), "FROM node:22\nWORKDIR /app\nCOPY . .\n");
    const r=runProjectChecks({root,includeSecrets:false});
    assert.ok(r.results.some(x=>x.id==="PROD-DOCKER-001"&&x.status==="review"));
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
test("reconhece exclusões de diretórios e arquivos de teste no .dockerignore", () => {
  const root=fixture();
  try {
    fs.writeFileSync(path.join(root,"Dockerfile"), "FROM node:22\nWORKDIR /app\nCOPY . .\n");
    fs.writeFileSync(path.join(root,".dockerignore"),"**/tests\n**/__tests__\n**/__mocks__\n**/*.test.*\n**/*.spec.*\n**/*_test.go\n**/coverage\n");
    const r=runProjectChecks({root,includeSecrets:false});
    assert.ok(r.results.some(x=>x.id==="PROD-DOCKER-002"&&x.status==="pass"));
    assert.ok(!r.results.some(x=>x.id==="PROD-DOCKER-001"));
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
