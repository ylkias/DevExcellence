# Changelog

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
