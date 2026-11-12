# Reports and findings lifecycle

Every completed DevExcellence run should produce a readable report. The report is part of the developer value: it explains what was wrong, why it matters, what changed, what improved, and what remains unverified.

## Default location

When the user approves persistent local reports, write them under:

    .devexcellence/reports/

Use a unique run identifier or timestamp in the filename. Keep the report associated with the reviewed commit/branch where possible.

## Report content

Include scope, project/commit metadata, summary, findings, severity, confidence, file/line evidence, remediation, checks and real outcomes, before/after status, unverified items, and residual risks.

## Privacy and Git

Reports may disclose internal architecture, filenames, vulnerabilities, endpoints, or operational details. The repository ignores the local reports directory by default. Do not commit reports, scanner exports, logs, or sensitive evidence automatically.

A developer may explicitly request a sanitized report to be committed. Before doing so, remove credentials, personal data, private endpoints, internal hostnames, and exploitable details that should remain confidential.

## Status tracking

A finding may move through Open, In progress, Fixed, Accepted, or Not reproducible. A finding is Fixed only after the correction has been validated with a relevant test or check. Accepted risks need an owner and rationale where the project process requires it.

## Baselines

When comparing reports, compare equivalent scope, tool versions, configuration, and commit context. Do not claim a quality improvement solely because fewer checks ran or the scan scope was reduced.
