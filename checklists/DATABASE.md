# Database checklist

- [ ] Entities, relationships, cardinality, and constraints are correct.
- [ ] Column types, nullability, defaults, and uniqueness are appropriate.
- [ ] Indexes support measured query patterns without excessive write cost.
- [ ] Queries are parameterized; untrusted input is never concatenated into SQL.
- [ ] N+1 queries and unbounded reads are addressed.
- [ ] Pagination and stable ordering are used where result sets may grow.
- [ ] Critical query plans and execution times are reviewed.
- [ ] Transactions protect multi-step invariants.
- [ ] Rollback and partial-failure behavior are defined.
- [ ] Connections, cursors, statements, and streams are reliably released.
- [ ] Pool limits fit database and application concurrency budgets.
- [ ] Locks, deadlocks, isolation, and race conditions are evaluated.
- [ ] Migrations are versioned, reviewed, and recoverable.
- [ ] Backups and restores are tested according to criticality.
- [ ] Tenant/user data isolation is enforced and tested.
