import test from "node:test";
import assert from "node:assert/strict";
import { createAssessmentTemplate, evaluateAssessment, renderScoreMarkdown } from "../src/score.js";
function assessment(status="pass") {
  const a=createAssessmentTemplate("Fixture");
  a.dimensions=[{id:"security",name:"Segurança",weight:100,controls:[{id:"SEC-001",title:"Autorização",status,evidence:status==="not_assessed"?"":"Teste registrado."}]}];
  return a;
}
test("nota 100 exige evidência",()=>assert.equal(evaluateAssessment(assessment()).score,100));
test("parcial recebe 50%",()=>assert.equal(evaluateAssessment(assessment("partial")).score,50));
test("não avaliado reduz cobertura",()=>{const r=evaluateAssessment(assessment("not_assessed"));assert.equal(r.coverage,0);assert.equal(r.releaseGate,"PROVISIONAL");});
test("não aplicável exige justificativa e sai do denominador",()=>{const a=assessment();a.dimensions[0].controls.push({id:"SEC-002",status:"not_applicable",evidence:"Não se aplica: serviço sem autenticação, validado na arquitetura."});assert.equal(evaluateAssessment(a).coverage,100);a.dimensions[0].controls[1].evidence="";assert.throws(()=>evaluateAssessment(a),/Evidência/);});
test("achado crítico aberto bloqueia",()=>{const a=assessment();a.findings=[{severity:"critical",status:"open",title:"IDOR confirmado"}];assert.equal(evaluateAssessment(a).releaseGate,"BLOCKED");});
test("achado alto aberto exige revisão",()=>{const a=assessment();a.findings=[{severity:"high",status:"open",title:"Rate limit ausente"}];assert.equal(evaluateAssessment(a).releaseGate,"REVIEW_REQUIRED");});
test("relatório mostra cobertura e limitação",()=>{const md=renderScoreMarkdown(evaluateAssessment(assessment()));assert.match(md,/Cobertura/);assert.match(md,/não é certificação/);});
test("modelo inclui critérios específicos para testes produzidos por IA",()=>{
  const a=createAssessmentTemplate("AI tests");
  const d=a.dimensions.find(x=>x.id==="testing");
  assert.deepEqual(d.controls.map(x=>x.id),["TEST-001","TEST-002","TEST-003","TEST-004"]);
  assert.equal(d.controls.every(x=>x.status==="not_assessed"),true);
  assert.equal(d.weight,15);
});
