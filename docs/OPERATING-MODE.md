# Operating modes and quality gates

DevExcellence supports four explicit modes:

| Mode | Behavior | File changes |
|---|---|---|
| Audit | Inspect, classify, and report findings | No |
| Plan | Produce implementation plan and acceptance criteria | No |
| Implement | Make authorized changes and validate continuously | Yes, within scope |
| Verify | Validate existing changes and report evidence | No, unless explicitly requested |

## Three checkpoints

### Before coding
Understand the request and existing code. Identify risks, contracts, data changes, and affected modules. Define acceptance criteria and choose relevant tests. Produce a concise plan before implementation.

### During coding
Work in small increments. Validate the changed area after each meaningful step. Keep tests and implementation aligned. Stop and reassess when evidence changes the design.

### After coding
Run applicable checks. Review the final diff and security boundaries. Report results, corrections, residual risks, and unverified checks.

## Enforcement

A skill is an instruction and reasoning layer. It cannot by itself guarantee that an agent obeys every instruction or that code cannot bypass it. Stronger enforcement requires deterministic local hooks, protected branches, required CI checks, code review, and repository permissions. The CLI roadmap is intended to provide repeatable checks; CI/CD is the final gate for merge and deployment decisions.

## Status vocabulary

- Passed: executed and passed.
- Failed: executed and failed.
- Not run: not executed.
- Blocked: could not execute due to missing permission, tool, dependency, or environment.
- Not applicable: explicitly irrelevant to the change, with rationale.

Never label a blocked or unexecuted check as passed.
