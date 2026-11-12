# Example requests

These examples are provider-neutral. Use the form that is natural in the selected coding agent.

## Audit only

"Use DevExcellence in Audit mode. Inspect this repository for incomplete logic, dead code, unsafe APIs, authentication/authorization gaps, database risks, weak tests, and performance concerns. Do not modify files. Produce a report with evidence, severity, confidence, and prioritized fixes."

## Before feature development

"Before coding, apply the DevExcellence pre-development gate. Inspect the relevant architecture, clarify acceptance criteria, identify risks, select an appropriate test strategy, and present a concise implementation plan. Wait for approval if the plan includes destructive or externally impactful changes."

## Implement with tests

"Implement this requirement using DevExcellence. Choose TDD, BDD, or ATDD where appropriate. Work in small steps, validate continuously, preserve existing behavior, and report the exact checks and outcomes."

## Security review

"Use DevExcellence to review authentication, authorization, object-level access, tenant isolation, secrets, API exposure, input validation, and relevant OWASP risks. Do not perform active testing outside the authorized environment."

## Final verification

"Run the DevExcellence post-development gate against the current diff. Execute applicable build, lint, type, test, dependency, security, and migration checks. Do not claim checks passed unless they ran. Produce the final report and list residual risks."

## Scalability review

"Use DevExcellence to create a measurable load-test plan for the target concurrency. Distinguish active sessions, concurrent operations, and requests per second. Define workload, environment, metrics, thresholds, and safe test boundaries."
