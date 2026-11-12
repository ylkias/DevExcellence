# DevExcellence

**An AI-agnostic software engineering skill for better, safer, and more reliable software delivery.**

DevExcellence helps AI coding agents and developers understand a codebase, plan changes, implement complete solutions, validate quality, reduce security risk, and report evidence. It is designed to work across LLM providers, editors, languages, frameworks, and development environments.

> Status: early development. The skill guides engineering work; deterministic tools and CI checks provide repeatable evidence. No scan or test is considered passed unless it was actually run.

## Core purpose

The primary product is the **skill**: a portable set of instructions and engineering workflows that can be installed into supported AI coding agents. The CLI is complementary: it runs deterministic checks and helps enforce rules in local workflows and CI/CD.

DevExcellence must remain lightweight to adopt and useful to individual developers as well as teams. It must not become an oversized framework that adds ceremony, unnecessary tokens, or technology lock-in.

## What it helps with

- Understand an existing project before changing it.
- Validate requirements, acceptance criteria, and architecture before code generation.
- Detect incomplete logic, dead code, unsafe shortcuts, duplication, and obsolete code.
- Review authentication, authorization, sessions, roles, permissions, and audit trails.
- Find risky API routes, unintended public endpoints, missing validation, pagination, and rate limits.
- Review database modeling, relationships, indexes, parameterized queries, transactions, connection lifecycle, and migrations.
- Apply suitable practices such as TDD, BDD, ATDD, DDD, SOLID, Clean Code, Clean Architecture, and DevSecOps where relevant.
- Run and interpret tests, static analysis, dependency checks, and performance tests using available project tools.
- Improve maintainability, performance, scalability, and token/context efficiency.
- Produce an actionable report with findings, evidence, fixes, residual risks, and before/after status.

## Principles

1. **Skill first:** establish engineering criteria before implementation.
2. **Validate continuously:** review changes as they are made, not only at the end.
3. **Evidence over claims:** never invent test, scanner, or load-test results.
4. **Minimal necessary change:** preserve existing behavior and project conventions.
5. **Secure by default:** enforce authorization on the server and validate trust boundaries.
6. **Stack agnostic:** discover the project's actual tools; do not force a preferred stack.
7. **LLM agnostic:** keep core guidance provider-neutral and use adapters only where required.
8. **Efficient context:** avoid redundant reads and model calls without skipping important checks.
9. **Human control:** request approval for destructive, external, costly, or out-of-scope actions.
10. **Transparent reporting:** distinguish confirmed findings, hypotheses, and unverified areas.

## Lifecycle

1. Discover project instructions, architecture, language, framework, tooling, and Git state.
2. Convert the request into requirements, risks, and acceptance criteria.
3. Select relevant engineering practices and verification checks.
4. Plan the smallest coherent implementation.
5. Implement in small steps with tests and continuous review.
6. Run applicable deterministic checks and security reviews.
7. Inspect the final diff and generate a report.

The skill is designed to be used before implementation, during coding, and after changes. A CI/CD integration can act as an additional enforcement layer; a prompt alone cannot guarantee that every change is validated.

## Repository layout

- `SKILL.md`: core, provider-neutral skill instructions.
- `checklists/`: code quality, security, API, database, testing, and performance checklists.
- `docs/`: installation, architecture, operating modes, methods, multi-agent orchestration, reporting, and scalability.
- `templates/`: audit report, implementation plan, and reusable finding templates.
- `examples/`: sample findings and reusable prompts.
- `cli/`: planned deterministic CLI scope.
- `CHANGELOG.md`, `CONTRIBUTING.md`, and `SECURITY.md`: project governance.

## Installation

See [docs/INSTALLATION.md](docs/INSTALLATION.md). Installation paths and discovery rules differ between agents and editors; follow the official documentation for the specific host.

## Current scope and limitations

- The skill can guide any stack, but actual checks depend on tools installed and permissions granted.
- The CLI is planned as a separate deterministic execution layer and is not yet implemented.
- Multi-agent execution is optional; a single agent can execute the complete workflow.
- A target of 5,000 concurrent users must be defined as a measurable workload and proven through load testing; it is not guaranteed by architecture review alone.
- The repository is private during initial development. Choose an explicit open-source license and review contribution terms before making it public.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Contributions should be focused, reproducible, documented, and avoid proprietary code, credentials, and real personal data.
