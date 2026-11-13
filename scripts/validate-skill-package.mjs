import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const pkg=path.join(root,"skills","devexcellence");
const errors=[];
const requireFile=(p)=>{if(!fs.existsSync(path.join(pkg,p)))errors.push("Ausente: skills/devexcellence/"+p);};
requireFile("SKILL.md"); requireFile("references/MODULE-SELECTION.md"); requireFile("references/AUTO-ACTIVATION.md"); requireFile("agents/openai.yaml");
for(const p of ["checklists","references","templates"]) if(!fs.statSync(path.join(pkg,p),{throwIfNoEntry:false})?.isDirectory()) errors.push("Diretório ausente: "+p);
if(fs.existsSync(path.join(root,"SKILL.md"))) errors.push("Remova SKILL.md da raiz; o pacote canônico fica em skills/devexcellence.");
const skill=fs.existsSync(path.join(pkg,"SKILL.md"))?fs.readFileSync(path.join(pkg,"SKILL.md"),"utf8"):"";
const fm=skill.match(/^---\s*\n([\s\S]*?)\n---/);
if(!fm||!/^name:\s*devexcellence\s*$/m.test(fm[1])||!/^description:\s*\S/m.test(fm[1]))errors.push("Frontmatter Agent Skills inválido.");
if(fm){
  const description=fm[1].match(/^description:\s*(.+)$/m)?.[1]??"";
  if(description.length>1024)errors.push("A description excede 1024 caracteres.");
  if(!/automatically activate/i.test(description)||!/first conversation/i.test(description))errors.push("A description precisa declarar ativação automática na primeira conversa.");
}
const openaiPath=path.join(pkg,"agents","openai.yaml");
if(fs.existsSync(openaiPath)){
  const openai=fs.readFileSync(openaiPath,"utf8");
  if(!/^policy:\s*\n\s+allow_implicit_invocation:\s*true\s*$/m.test(openai))errors.push("agents/openai.yaml precisa manter allow_implicit_invocation: true.");
}
for(const [,link] of skill.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){
  if(/^(https?:|mailto:|#)/i.test(link))continue;
  const target=path.resolve(pkg,decodeURIComponent(link.split("#")[0]));
  if(!target.startsWith(pkg+path.sep)||!fs.existsSync(target))errors.push("Link local inválido: "+link);
}
const rootChecks=path.join(root,"checklists"), pkgChecks=path.join(pkg,"checklists");
if(fs.existsSync(rootChecks)&&fs.existsSync(pkgChecks)){
  const a=fs.readdirSync(rootChecks).filter(x=>x.endsWith(".md")).sort(), b=fs.readdirSync(pkgChecks).filter(x=>x.endsWith(".md")).sort();
  if(JSON.stringify(a)!==JSON.stringify(b))errors.push("A lista de checklists diverge.");
  for(const f of a)if(!fs.readFileSync(path.join(rootChecks,f)).equals(fs.readFileSync(path.join(pkgChecks,f))))errors.push("Checklist divergente: "+f);
}
const rootTpl=path.join(root,"templates"),pkgTpl=path.join(pkg,"templates");
for(const f of fs.readdirSync(rootTpl).filter(x=>x.endsWith(".md"))){
  if(!fs.existsSync(path.join(pkgTpl,f))||!fs.readFileSync(path.join(rootTpl,f)).equals(fs.readFileSync(path.join(pkgTpl,f))))errors.push("Template ausente/divergente no pacote: "+f);
}
const count=fs.existsSync(pkgChecks)?fs.readdirSync(pkgChecks).filter(x=>x.endsWith(".md")).length:0;
if(count<10)errors.push("Quantidade inesperada de checklists: "+count);
const result={ok:errors.length===0,package:"skills/devexcellence",checklistCount:count,errors};
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exitCode=1;