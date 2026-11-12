# Optional multi-agent orchestration

Multi-agent execution can improve parallel review on larger changes, but it is not required for DevExcellence and must not become a barrier to adoption.

## Suggested roles

- Coordinator: scopes work, creates the plan, delegates, deduplicates, and owns the final report.
- Architecture: requirements, boundaries, dependencies, compatibility, and design risks.
- Code Quality: incomplete logic, dead code, duplication, complexity, and maintainability.
- Security: threat surfaces, secrets, authentication, authorization, and OWASP risks.
- API: routes, contracts, validation, pagination, rate limits, and exposure.
- Database: schema, relationships, query safety, transactions, indexes, and connection lifecycle.
- Testing: test strategy, TDD/BDD/ATDD scenarios, regression, and test quality.
- Performance: profiling, caching, concurrency, bottlenecks, and load-test design.
- Documentation: setup, API, operational notes, and change records.

## Specialist output contract

Each specialist returns its role and scope, files/components inspected, findings with unique IDs, severity and confidence, exact evidence, impact and recommended remediation, checks actually executed, and limitations.

## Coordination rules

1. Delegate only when work is sufficiently large or separable.
2. Give each specialist a narrow scope and avoid conflicting edits.
3. Prefer parallel read-only reviews; centralize code modifications in the coordinator unless safe ownership is explicit.
4. Deduplicate findings and resolve contradictory conclusions using source evidence.
5. Do not let multiple agents independently run costly or destructive tests.
6. The coordinator owns final prioritization, implementation plan, validation, and report.
7. Respect the host environment's permissions, privacy, and tool restrictions.
