# Engineering methods and test practices

DevExcellence knows common engineering methods but applies them selectively. The goal is better delivery, not ceremony.

- TDD: Red → Green → Refactor. Useful for business rules, bug fixes, and well-defined behavior.
- BDD: Given/When/Then scenarios. Useful when product behavior must be clear across roles.
- ATDD: acceptance examples agreed before implementation. Useful for stakeholder-facing features.
- DDD: domain language and boundaries. Useful when domain complexity justifies the investment.
- SOLID: design heuristics. Apply where they reduce coupling and improve changeability.
- Clean Code: readability and maintainability. Avoid style-only rewrites without value.
- Clean Architecture: separation of domain rules and infrastructure. Fit it to the size and needs of the system.
- DevSecOps: security checks throughout the delivery lifecycle.

The agent should explain why a method is relevant, use the smallest suitable process, and avoid forcing a methodology on trivial changes.

## Test layers

Choose a balanced combination of unit, integration, contract, end-to-end, regression, security, accessibility, compatibility, performance, load, stress, spike, and soak tests. Coverage is a metric, not proof of meaningful assertions.
