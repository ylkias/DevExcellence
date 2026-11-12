# Installation and compatibility

DevExcellence is distributed primarily as a portable SKILL.md. The editor is not the agent: installation depends on the AI coding assistant or extension that reads instructions or skills.

## Generic installation

1. Clone or download this repository.
2. Read the host agent's current documentation for its supported skill/instruction directory and format.
3. Copy or link the skill and its supporting checklists/templates into that location.
4. Restart or reload the agent if required.
5. Ask the agent to explain the DevExcellence lifecycle and perform a read-only sample review.
6. Confirm the agent can access the project tools you expect it to use.

Clone command:

    git clone https://github.com/ylkias/DevExcellence.git

Do not assume every VS Code extension, terminal agent, or hosted LLM uses the same installation path. Follow the selected host's documentation. Provider-specific adapters may be added only when they add real value and do not fork the core rules.

## Project-local use

Where supported, keep a pinned copy or submodule in the project and reference its SKILL.md from the host agent's project instructions. Record the DevExcellence version/commit so reviews are reproducible.

## CLI and CI/CD

The CLI is a complementary deterministic execution layer, not a requirement for the skill. Once implemented, install it using published package instructions and configure CI jobs to run deterministic checks. Do not copy untrusted scripts from arbitrary branches into production pipelines.

## Updates

Review release notes and breaking changes before updating. In critical repositories, pin a tagged version/commit and update deliberately.
