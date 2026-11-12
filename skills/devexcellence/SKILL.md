---
name: devexcellence
description: Universal LLM-agnostic software engineering skill. Use before and during implementation, and when auditing, testing, refactoring, securing, optimizing, or reviewing software. Guides requirements, architecture, quality, security, APIs, databases, TDD/BDD/ATDD, performance, scalability, and evidence-based reporting.
---

# DevExcellence — Universal Software Engineering Skill

## Purpose

Help any developer or AI coding agent deliver better software with less avoidable risk. The primary product is this portable skill: a practical workflow that guides the model before it writes code, while it writes code, and after it changes code.

This is not a framework, a mandatory technology stack, or a replacement for engineering judgment. Discover and respect the project's language, architecture, conventions, tools, and constraints. The CLI and CI integrations are complementary enforcement layers; they are not prerequisites for using the skill.

## Non-negotiable principles

1. Understand the repository and requested outcome before proposing or changing code.
2. Define requirements, acceptance criteria, risks, and validation before implementation.
3. Make the smallest coherent change that solves the actual problem.
4. Preserve existing behavior unless a change is explicitly required and understood.
5. Complete the full flow: success, validation errors, failures, timeouts, cancellation, and resource cleanup.
6. Enforce authentication and authorization on the server, not merely in the UI.
7. Use deterministic tools for repeatable checks; use model reasoning to interpret evidence and design solutions.
8. Never invent test, scanner, build, coverage, or load-test results.
9. Separate confirmed findings, hypotheses, and unverified areas.
10. Reduce context and token waste without skipping safety-critical work.
11. Ask before destructive, external, costly, production-impacting, or out-of-scope actions.
12. Keep the workflow useful for an individual developer; multi-agent execution is optional, not mandatory.

## Required lifecycle: Validate → Plan → Build → Verify → Report

### Phase 0 — Understand the request

Classify the work as a new feature, bug fix, refactor, security remediation, performance/scalability change, audit/review, or documentation/maintenance. Clarify material ambiguity before implementation. Convert the request into observable behavior and acceptance criteria. Identify sensitive data, trust boundaries, roles, integrations, data changes, and operational impact.

### Phase 1 — Pre-development quality gate (mandatory)

Before generating or editing implementation code:

1. Read project instructions and relevant documentation, including agent instructions, README, architecture notes, and contribution rules.
2. Inspect relevant modules and dependencies; do not dump the entire repository unnecessarily.
3. Identify stack, versions, package manager, build/test/lint/typecheck commands, database, API patterns, authentication, authorization, and deployment assumptions.
4. Inspect Git status and preserve unrelated/pre-existing user changes.
5. Map requested behavior to existing routes, services, repositories, schemas, UI, jobs, and tests.
6. Identify design risks: incomplete flows, duplicate logic, unsafe routes, data exposure, tenant isolation, query cost, concurrency, and compatibility.
7. Choose relevant engineering practices and tests; do not apply every methodology mechanically.
8. Produce a concise implementation plan and explicit acceptance criteria.

If the user requests audit-only, do not edit files. If the environment prevents inspection, state what is unknown and proceed only within the safe, authorized scope.

### Phase 2 — Implementation with continuous validation

- Work in small, coherent increments.
- For behavior changes, prefer test-first development when practical.
- Keep code, tests, schemas, API contracts, migrations, and documentation consistent.
- After each meaningful change, inspect the diff and run the narrowest useful checks.
- Reassess the plan when evidence reveals a different root cause.
- Do not leave placeholder logic, fake success responses, unreachable branches, unhandled errors, or undocumented TODOs on production paths.
- Do not introduce dependencies without a clear need and review of maintenance, security, license, and footprint.

### Phase 3 — Post-development verification (mandatory)

Run applicable checks available in the project: format/lint, static analysis and type checking, unit tests, integration and contract tests, end-to-end tests, dependency and secret scans, security checks, migration validation, and performance/load tests for relevant changes.

Review the final diff for scope creep, leaked secrets, debug code, dead code, missing cleanup, broken contracts, and regressions. Record exact commands and outcomes. If a check was not run, mark it Not run and explain why.

### Phase 4 — Report and handoff (mandatory)

Produce an actionable report using the report template. Include what was reviewed or changed; findings by severity and confidence; evidence and file/line references; recommended or completed corrections; checks actually executed and their results; before/after status where comparable; unresolved items, limitations, residual risks, and next steps.

When approved by the project owner, store persistent local reports under .devexcellence/reports/ with a timestamp or run identifier. Do not commit reports automatically. Reports can expose internal paths, architecture, or vulnerabilities; keep them local and restricted by default.

## Engineering domains

Use the domain checklists in checklists/ as applicable.

### 1. Requirements and architecture
- Identify actors, use cases, business rules, invariants, and acceptance criteria.
- Respect established architecture unless a documented defect justifies change.
- Maintain clear module boundaries, dependency direction, and separation of concerns.
- Avoid overengineering, premature abstraction, and unnecessary rewrites.
- Consider failure modes, observability, deployment, rollback, and backward compatibility.

### 2. Code quality and logical completeness
Detect and assess incomplete functions, branches, state transitions, and workflows; dead, unreachable, duplicated, obsolete, or unused code; unused imports, variables, dependencies, and routes; stubs, mocks, sample data, hardcoded success, and unfinished TODOs in production paths; excessive complexity, tight coupling, unclear naming, and mixed responsibilities; missing input validation, error handling, boundary handling, and resource cleanup.

Do not remove code merely because it appears unused. Confirm references, dynamic loading, reflection, plugin registration, generated code, and compatibility first.

### 3. Application and security
Review applicable OWASP risks, including injection, broken access control, authentication failures, cryptographic failures, insecure design, security misconfiguration, vulnerable components, and logging/monitoring failures. Also assess XSS, CSRF, SSRF, path traversal, command injection, unsafe uploads, and deserialization where relevant.

- Validate untrusted input at trust boundaries.
- Apply authorization on every protected server operation.
- Enforce least privilege and deny-by-default.
- Check object-level and function-level access (IDOR/BOLA).
- Keep secrets out of source, logs, fixtures, and client bundles.
- Use secure password hashing (prefer Argon2id; bcrypt where appropriate), safe session handling, and secure recovery flows.
- Review rate limits, abuse controls, security headers, CORS, and CSRF according to architecture.
- Avoid logging passwords, tokens, session cookies, keys, or unnecessary personal data.

### 4. API and routes
- Inventory routes, methods, middleware, handlers, and exposure.
- Classify each route as public, authenticated, or privileged.
- Public routes must be intentional, minimal, documented, and protected against abuse.
- Protect admin, debug, internal, metrics, and maintenance endpoints.
- Validate schemas, IDs, filters, sorting, payload size, and content type.
- Implement stable pagination and bounded results.
- Apply authorization at object and tenant level.
- Use consistent status codes and safe error responses.
- Add timeout and bounded retry behavior to outbound integrations.
- Do not mistake a hidden frontend link for server-side protection.

### 5. Database and persistence
- Review entities, relationships, cardinality, constraints, nullability, types, and indexes.
- Parameterize all data queries; never concatenate untrusted input into SQL.
- Avoid N+1 queries, unbounded scans, and unnecessary columns.
- Analyze query plans for critical paths where tooling permits.
- Use transactions for multi-step invariants and define rollback behavior.
- Release connections, cursors, statements, streams, locks, and other resources on every path using the language's safe lifecycle pattern.
- Review connection pool limits, lock contention, deadlocks, isolation levels, and concurrency.
- Version migrations; destructive changes require explicit approval and a recovery strategy.
- Evaluate backup, restore, retention, encryption, and least-privilege database access.
- For multi-tenant systems, enforce tenant scoping in server-side data access and test cross-tenant isolation.

### 6. Identity, permissions, and audit trail
- Support the authentication methods required by the product: email/password, username/password, SSO, or combinations.
- Apply role-based or attribute-based authorization consistently.
- Log security-relevant events: sign-in/out, failed authentication, permission changes, privileged actions, and sensitive data changes.
- Record actor, action, target, timestamp, outcome, and correlation ID where useful.
- Protect audit logs against unauthorized modification and excessive exposure.
- Ensure logs do not become a secondary source of sensitive data.

### 7. Testing and engineering practices
Select methodologies based on the nature of the change:
- TDD: Red → Green → Refactor for behavior-driven code changes where practical.
- BDD: describe expected behavior with concrete Given/When/Then scenarios.
- ATDD: agree acceptance examples before implementation.
- DDD: use domain language, boundaries, and aggregates when domain complexity warrants it.
- SOLID: use as design guidance, not as a reason to create needless classes.
- Clean Code: favor clarity and maintainability over cleverness.
- Clean Architecture: separate domain rules from infrastructure when useful for the project.
- DevSecOps: integrate security checks throughout development and delivery.

Test layers as appropriate: unit, integration, contract, end-to-end, regression, security, accessibility, compatibility, performance, load, stress, and soak. Coverage percentage is a signal, not proof of test quality.

### 8. Performance and scalability
- Establish workload, service-level objectives, and measurable acceptance criteria.
- Measure latency percentiles, throughput, error rate, saturation, CPU, memory, network, storage, queues, and database behavior.
- Review caching, invalidation, data consistency, and tenant isolation.
- Bound concurrency, payloads, queues, retries, and memory growth.
- Use asynchronous processing for suitable long-running tasks.
- Review statelessness, horizontal scaling, shared session state, and bottlenecks.
- Test graceful degradation and dependency failure.

A requested target such as 5,000 concurrent users is not automatically guaranteed. Distinguish registered users, active sessions, concurrent operations, and requests per second. Document the workload model and validate it with reproducible tests in a representative environment.

### 9. Documentation and maintainability
Update API documentation, environment variables, setup steps, migration notes, architecture decisions, and operational instructions when behavior changes. Never include real credentials or sensitive production data.

### 10. Token and context efficiency
- Discover the project once and retain a concise task-local summary.
- Read relevant files and targeted ranges rather than repeatedly reading entire trees.
- Prefer focused searches and concise tool output.
- Reuse available test/scanner output; do not rerun identical expensive checks without reason.
- Use deterministic tools for deterministic checks and reserve LLM reasoning for interpretation, design, and non-trivial remediation.
- Batch independent inspections only when doing so does not hide dependencies or failure context.
- Summarize long logs while preserving exact errors, file paths, line numbers, and evidence.
- Never skip a security or correctness check solely to save tokens.
- Do not claim that a model has been trained or learned from project data unless an actual, documented learning pipeline exists.

## Multi-agent operation (optional)

A coordinator may delegate bounded reviews to specialist agents: Architecture, Code Quality, Security, API, Database, Testing, Performance, and Documentation. Each specialist returns findings with evidence, confidence, severity, and recommendations. The coordinator deduplicates findings, resolves contradictions, prioritizes work, and owns the final report. Do not spawn agents when the task is small or delegation costs exceed the benefit. All agents follow this same skill and the host platform's permission boundaries.

## Severity and confidence

- Critical: likely broad compromise, remote code execution, exposed credentials, severe unauthorized access, or major data loss.
- High: exploitable authentication/authorization failure, serious injection, sensitive data exposure, or material integrity risk.
- Medium: bounded weakness, meaningful reliability/performance issue, or maintainability risk with operational consequences.
- Low: limited impact or defensive improvement.
- Informational: observation or optional improvement.

Also label confidence as High, Medium, or Low. Do not infer exploitability from a suspicious pattern alone.

## Safety boundaries

Only assess systems the user is authorized to test. Prefer local, development, or staging environments. Do not perform destructive tests, denial-of-service, credential attacks, production exploitation, data deletion, or external changes without explicit authorization, scope, and a safe plan.

## Definition of Done

A task is complete only when requested behavior and acceptance criteria are addressed; applicable checks are actually executed and reported; security, authorization, and data handling are reviewed; error paths and resource cleanup are addressed; regression risk is assessed; the final diff is reviewed; documentation and report are updated where appropriate; and unverified items and residual risks are explicit.

## Response style

Be direct and actionable. Lead with critical issues. Explain why each finding matters and how to fix it. Do not overwhelm the developer with generic advice unrelated to the change. Make the skill increase delivery value rather than add ceremony.
