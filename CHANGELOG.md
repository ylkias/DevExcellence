# Changelog

## Documentação de instalação — Eve e PromptScript

- Documenta a instalação global para agentes compatíveis e a instalação por projeto para Eve e PromptScript, usando o mesmo repositório e a mesma skill.
- Esclarece que avisos de incompatibilidade com instalação global nesses dois agentes não representam falha da instalação nos demais.

## Direção do produto — foco em Vibe Coding

- Posiciona a DevExcellence como uma skill prática para transformar ideias em aplicações funcionais por meio de linguagem natural e iteração rápida.
- Mantém segurança e qualidade como guardrails proporcionais, não como auditoria empresarial obrigatória em toda tarefa.
- Prioriza construir, executar, corrigir e iterar, com interação simples e mínima burocracia para o usuário.

## 0.4.0 — eficiência de contexto e redução de tokens

- Added an incremental context planner that selects relevant engineering checklists from changed Git paths, with an explicit broad-audit mode.
- Added the provider-neutral token-efficiency protocol covering progressive context loading, local deterministic tools, evidence reuse, bounded outputs, and model/delegation discipline.
- Added approximate checklist-size reporting with an explicit warning that it is not provider token usage.
- Added automated tests for path selection, broad mode, estimates, and Git changed/untracked file discovery.
- Simplified end-user onboarding to one global installation command for detected agents that support global skills. Eve and PromptScript are documented as project-scoped installation exceptions.


## 0.3.0 — bloqueio de arquivos de teste em produção

- Added a release-blocking production artifact audit for test-only files, directories, mocks, fixtures, test framework configuration and coverage outputs.
- Added Docker build-context checks when Dockerfiles copy the entire build context and provide no sufficient .dockerignore exclusions.
- Added deployment checklist requirements and a production .dockerignore example.
- Added automated tests for clean/contaminated artifacts, scan limits, Docker context rules and CLI exit codes.


## 0.2.0 — auditoria de testes e validação reforçada

- Added static test-file auditing for common JavaScript/TypeScript, Python, Go, Java/Kotlin, C#, PHP and Ruby test conventions.
- Added findings for missing assertions, weak/tautological assertions, skipped tests, mock-only validation and unrecognized negative/edge scenarios.
- Added explicit test-quality evidence controls to the Quality Score and AI-generated-test review requirements to the installable skill.
- Added automated unit tests for the test auditor and documented that AI authorship cannot be reliably inferred from source text.

## Unreleased — initial foundation

- Established the provider-neutral DevExcellence skill.
- Defined mandatory pre-development, continuous, and post-development validation.
- Added engineering domain checklists and evidence-based report templates.
- Documented optional multi-agent orchestration and methodology selection.
- Documented measurable performance and scalability validation.
- Implemented local CLI 0.1.0 with project hygiene checks, heuristic secret scanning, optional argv-only commands, JSON/Markdown reports and exit gates.
- Added evidence-based Quality Score calculation, assessment template and release gates for critical/high findings.
- Added automated CLI unit tests, Agent Skill package validation and GitHub Actions CI for Node.js 20/22.
- Added structured task/result templates for optional provider-neutral multi-agent workflows; executable orchestration remains out of scope.

- Added adaptive selection of verification modules by application profile and risk.
- Added checklists for data integrity, resilience, privacy/LGPD, frontend/accessibility, software supply chain, observability, backup/recovery, internationalization, delivery, and Quality Score.
- Added evidence coverage, provisional scoring, and release-blocking rules for critical findings.
- Packaged the complete skill, checklists, references, and report templates under `skills/devexcellence/` for Skills CLI discovery.
