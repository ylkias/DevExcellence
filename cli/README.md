# DevExcellence CLI (planned)

The CLI is a complementary deterministic execution layer. The skill remains the primary product and must remain usable without this CLI.

## Intended responsibilities

- Detect project stack and available tools.
- Run configured lint, typecheck, tests, dependency and secret checks.
- Normalize results into a consistent report format.
- Support local execution and CI/CD.
- Return meaningful exit codes for configured quality gates.
- Avoid uploading source code or reports to external services by default.

## Non-goals

- Replacing the skill's contextual reasoning.
- Claiming to detect every vulnerability.
- Enforcing a universal technology stack.
- Requiring users to adopt a particular LLM provider.

Implementation decisions, supported platforms, packaging, configuration, and security model must be specified before the CLI is built.
