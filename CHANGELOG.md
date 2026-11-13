# Histórico de alterações

## Licença e contribuições da comunidade

- Adota PolyForm Noncommercial License 1.0.0 para permitir uso, estudo, modificação e distribuição não comerciais.
- Esclarece que o projeto é source-available, não open source tradicional, devido à restrição de uso comercial.
- Define que contribuições aceitas permanecem sob a mesma licença e que os colaboradores mantêm os direitos autorais do próprio trabalho.
- Documenta o fluxo para Issues, Pull Requests e confirmação dos termos de contribuição.

## Documentação mais simples

- Reescreve a página inicial para explicar a DevExcellence em linguagem direta, sem exigir conhecimento prévio sobre skills ou agentes de IA.
- Explica o que é uma skill, como instalar e como começar a conversar com a ferramenta de programação.
- Mostra os comandos de instalação global e por projeto, incluindo Eve e PromptScript.
- Explica o papel de Eve e esclarece que ela não é necessária para usar a DevExcellence.

## Direção do produto — foco em Vibe Coding

- Posiciona a DevExcellence como uma skill prática para transformar ideias em aplicações funcionais por meio de linguagem natural e iteração rápida.
- Mantém segurança e qualidade como proteções proporcionais, não como auditoria obrigatória em toda tarefa.
- Prioriza construir, executar, corrigir e iterar, com interação simples para o usuário.

## 0.4.0 — eficiência de contexto e redução de tokens

- Added an incremental context planner that selects relevant engineering checklists from changed Git paths, with an explicit broad-audit mode.
- Added the provider-neutral token-efficiency protocol covering progressive context loading, local deterministic tools, evidence reuse, bounded outputs, and model/delegation discipline.
- Added approximate checklist-size reporting with an explicit warning that it is not provider token usage.
- Added automated tests for path selection, broad mode, estimates, and Git changed/untracked file discovery.
- Simplified end-user onboarding. The CLI remains optional for maintainers.

## 0.3.0 — bloqueio de arquivos de teste em produção

- Added a release-blocking production artifact audit for test-only files, directories, mocks, fixtures, test framework configuration and coverage outputs.
- Added Docker build-context checks when Dockerfiles copy the entire build context and provide no sufficient .dockerignore exclusions.
- Added deployment checklist requirements and a production .dockerignore example.
- Added automated tests for clean/contaminated artifacts, scan limits, Docker context rules and CLI exit codes.

## 0.2.0 — auditoria de testes e validação reforçada

- Added static test-file auditing for common JavaScript/TypeScript, Python, Go, Java/Kotlin, C#, PHP and Ruby test conventions.
- Added findings for missing assertions, weak/tautological assertions, skipped tests, mock-only validation and unrecognized negative/edge scenarios.
- Added explicit test-quality evidence controls to the Quality Score and AI-generated-test review requirements.
- Added automated unit tests for the test auditor and documented that AI authorship cannot be reliably inferred from source text.

## Unreleased — initial foundation

- Established the provider-neutral DevExcellence skill.
- Added engineering checklists, evidence-based report templates, adaptive module selection and an optional CLI for maintainers.
- Packaged the complete skill under `skills/devexcellence/` for Skills CLI discovery.
