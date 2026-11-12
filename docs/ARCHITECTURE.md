# Architecture

## Product boundary

The canonical installable skill lives in `skills/devexcellence/` and follows the Skills CLI discovery layout `skills/<name>/SKILL.md`. Keep its checklists, references, and templates inside that directory so they travel with the skill when installed. The repository root contains project documentation and the source-of-truth checklists/templates for maintainers.

The core product is the portable engineering skill. Its purpose is to guide the AI agent through understanding, planning, implementation, verification, and reporting. Keep the skill easy to install and detailed enough to produce consistent engineering behavior.

Supporting layers:

1. Core skill: provider-neutral instructions, checklists, and report templates.
2. Host adapters (optional): thin integration metadata for agents that require a special format or discovery path.
3. CLI (planned): deterministic local checks and machine-readable results.
4. CI/CD integrations (planned/examples): run repeatable checks and enforce repository policies.
5. Reports: human-readable and, later, machine-readable evidence from each run.

## Design constraints

- No dependency on a particular LLM vendor.
- No dependency on a particular editor or language.
- Discover tools from the target repository instead of assuming a stack.
- Keep provider-specific syntax out of the core skill.
- Allow partial capability: if a scanner is absent, report it as unavailable rather than simulate it.
- Do not send code or source files to external services unless the user and tool configuration authorize it.

## Multi-agent model

Multi-agent execution is optional. A coordinator may assign independent, bounded reviews to specialist roles. Specialists return structured evidence; the coordinator deduplicates, prioritizes, and produces the final result. A single agent must always be able to run the full workflow.

## CLI boundary

The CLI should execute deterministic checks, normalize results, and produce reports. It should not replace the LLM's contextual understanding of requirements or architecture. The skill remains usable without the CLI.

## Reporting model

Each report should include run metadata, scope, changed files, findings, severity, confidence, evidence, remediation, check outcomes, residual risks, and overall status. Keep sensitive reports local by default. The project owner decides whether to retain or commit them.
