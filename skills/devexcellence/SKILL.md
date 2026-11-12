---
name: devexcellence
description: Use automatically for software engineering work: building features, fixing bugs, refactoring, reviewing, testing, securing, and optimizing code. Applies an incremental, risk-based workflow and minimizes context/token usage without skipping important validation.
---

# DevExcellence

A portable software-engineering skill for coding agents. Use it for software-development tasks without requiring the user to run a separate DevExcellence command after installation.

## Core principles

1. Understand the requested outcome and acceptance criteria before editing.
2. Respect the project's stack, architecture, conventions, and existing design.
3. Make the smallest complete change; preserve unrelated work and behavior.
4. Validate inputs and enforce authorization on the server, including object- and tenant-level access.
5. Keep tests in source control and CI. Never remove tests merely to reduce package size.
6. Use deterministic tools for repeatable checks. Never claim a test, scan, build, or deployment passed unless it actually ran.
7. Distinguish confirmed findings, hypotheses, and items not verified.
8. Reduce context, repeated reads, tool calls, and output size without weakening security or correctness.
9. Ask before destructive, external, costly, production-impacting, or out-of-scope actions.

## Required workflow

### 1. Understand

Classify the task: feature, bug, refactor, security, performance, audit, or maintenance. Identify user-visible behavior, acceptance criteria, affected data, integrations, roles, and operational impact. Clarify only material ambiguity.

### 2. Inspect context automatically

Use the agent's available repository/terminal tools; do not ask the user to run a separate DevExcellence command.

- Read applicable agent/project instructions (for example, `AGENTS.md`, `CLAUDE.md`, or repository guidance).
- Inspect `git status --short`, changed paths (`git diff --name-only HEAD`) and untracked files (`git ls-files --others --exclude-standard`) when Git is available.
- Read the changed files, their direct dependencies/contracts, and relevant tests. Do not dump or read the entire repository by default.
- If Git or terminal access is unavailable, use the user's stated scope and explain the limitation; do not pretend to have inspected files.

### 3. Select only relevant engineering modules

Keep the core skill as the entry point. Load a checklist only when its domain is affected or a concrete risk justifies it. Use `references/MODULE-SELECTION.md` when scope spans multiple domains or the profile is unclear.

| Change or risk | Load these checklists |
|---|---|
| General code/logic | `QUALITY.md`, `TESTING.md` |
| Authentication, authorization, routes, secrets | `SECURITY.md`, plus `API.md` when routes/contracts change |
| Database, schema, migrations, queries | `DATABASE.md`, `INTEGRITY.md`, `SECURITY.md` |
| Frontend, forms, accessibility, formatting | `FRONTEND-UX.md`, `FORMATTING.md` |
| Multi-tenant or personal data | `SECURITY.md`, `DATABASE.md`, `INTEGRITY.md`, `PRIVACY-LGPD.md` |
| Performance, concurrency, availability | `PERFORMANCE.md`, `RESILIENCE.md`, as applicable `OBSERVABILITY.md` |
| CI/CD, containers, release, dependencies | `DELIVERY.md`, `SUPPLY-CHAIN.md` |
| Backups, restore, disaster recovery | `BACKUP-RECOVERY.md`, `RESILIENCE.md` |
| Localization or international formats | `INTERNATIONALIZATION.md`, `FORMATTING.md` |

Selection is risk-based, not just filename-based. A file path is a hint, not proof that other risks are absent. Expand the scope when imports, call flows, data access, permissions, or runtime behavior show additional impact.

### 4. Plan and implement

- State a concise plan and observable acceptance criteria.
- Prefer test-first for behavior changes when practical.
- Work in small, coherent changes and inspect the diff after each meaningful step.
- Keep implementation, tests, schema/migrations, API contracts, and documentation consistent.
- Avoid unnecessary dependencies, rewrites, abstractions, multi-agent delegation, or repeated repository-wide scans.

### 5. Verify

Run the narrowest relevant checks during implementation, then the appropriate final validation:
- format/lint, typecheck, and static analysis when available;
- unit/integration/contract/E2E tests matching the changed behavior;
- dependency/secret/security checks when relevant and available;
- migration, build, and performance checks when the change requires them.

Run broader suites for cross-cutting, high-risk, release, or explicitly requested audits. Review the final diff for regressions, secrets, debug code, incomplete flows, and unrelated changes. Mark checks not run as **Not run** and explain why.

### 6. Report

Give a concise handoff: what changed, important files, checks actually executed and outcomes, unresolved risks, and next action. Include file/line evidence for material findings. Do not produce a large generic report for a small change; use `templates/AUDIT-REPORT.md` and `templates/FINDING.md` for formal audits.

## Automatic token/context efficiency

This behavior is active as soon as the skill is installed:

- Start from the task and Git diff; load only the relevant source, tests, and checklists.
- Read documentation progressively: relevant sections first, full documents only when required.
- Prefer local search, symbol lookup, targeted diffs, and concise tool output over full-file/repository dumps.
- Use test runners, linters, scanners, and scripts for deterministic work instead of asking a model to reproduce it manually.
- Reuse results within the task only while their inputs, versions, configuration, and scope remain unchanged.
- Do not repeat code, plans, requirements, or logs already present in the active context.
- Use one agent by default. Delegate only independent tasks where parallelism or specialization has clear value.
- Keep user-facing summaries proportional to the task. Do not report a token-saving percentage without provider usage measurements.

The user does **not** need to run `context-plan`, `check`, or any other DevExcellence CLI command to use this skill. The CLI is an optional maintainer/development utility and is not installed by the Skills CLI command.

For the detailed protocol, open `references/TOKEN-EFFICIENCY.md` only when needed for a long-running task, repeated context, or token optimization work.

## Test quality and production artifacts

- Review tests for meaningful assertions, real behavior, negative/boundary cases, regression coverage, skipped tests, and excessive mock-only validation. Treat AI-generated tests exactly like human-written tests; do not attempt to infer authorship.
- Keep test files, mocks, fixtures, snapshots, and test configuration in source control and CI.
- Ensure test-only files are excluded from the production artifact. When a project has a release pipeline, use an artifact-level gate after build and before deployment. Docker build-context exclusions are preventive; inspect the actual final artifact/image filesystem.
- Do not claim the release gate is installed in a consuming project unless its pipeline actually runs it.

## Safety and evidence

- Never expose credentials, tokens, private keys, session cookies, or personal data in output.
- Do not silently make destructive schema/data changes, alter production infrastructure, or deploy.
- Do not classify a check as passed because a tool is unavailable, an assertion exists, or documentation claims it.
- A quality score is evidence-based prioritization, not certification or a security guarantee.

## Compatibility

This skill is provider- and stack-neutral. It guides the agent; actual file access, terminal execution, tests, and integrations depend on the host agent's tools and granted permissions.
