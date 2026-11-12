# Installation and compatibility

DevExcellence follows the open Agent Skills directory format: a skill directory contains a `SKILL.md` with YAML frontmatter including a unique lowercase `name` and a useful `description`.

The repository root currently acts as the skill directory. The Skills CLI supports a repository-root `SKILL.md`, so a separate wrapper directory is not required for the initial single-skill package.

## Recommended: install with Skills CLI

Requirements: Node.js compatible with the current Skills CLI release. The upstream project currently documents Node.js 22.20 or later.

Install the named skill:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence
```

List available skills before installing:

```bash
npx skills add https://github.com/ylkias/DevExcellence --list
```

Install globally (available across projects):

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --global
```

Target a particular supported agent:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --agent claude-code
```

The interactive installer can also let the developer choose the available agents and project/global installation scope. Agent support and installation paths are maintained by the Skills CLI and may change over time.

## Private repository during development

The DevExcellence repository is private during initial development. Only users who already have repository access and Git authentication configured can install it.

The Skills CLI uses the Git credentials already configured for the repository URL. For GitHub HTTPS/shorthand sources it can use normal Git credentials, GitHub CLI authentication, or SSH fallback. Before installing, authenticate using the developer's normal GitHub workflow, for example:

```bash
gh auth login
```

Then run the installation command above. Alternatively, configure Git SSH access and use the SSH repository URL supported by the CLI.

Do not put a personal access token directly in a command, README, shell history, or project file. The CLI also supports explicitly supplied `GITHUB_TOKEN` or `GH_TOKEN` for GitHub API access; prefer the user's existing secure credential manager where possible.

When the repository becomes public, anyone can run the same installation command without private-repository permissions.

## Manual installation

If a host agent does not support the Skills CLI, clone or download the repository and follow that agent's current documentation for its skill/instruction directory. Copy the repository's skill contents together so that `SKILL.md` can resolve its supporting `checklists/`, `docs/`, and `templates/` files.

The editor is not the agent: VS Code extensions, terminal agents, and hosted LLM products may use different discovery paths. Do not assume one universal folder for all products.

## Project-local versus global

- Project-local installation is appropriate when a team wants a skill available in one repository and shareable with collaborators.
- Global installation is appropriate when the developer wants the skill across multiple projects.

Use the installation scope offered by the CLI and verify the skill appears in the selected agent.

## Updates and reproducibility

Use the Skills CLI's update command to check or update installed skills. For critical engineering environments, pin a reviewed release tag or commit when the workflow supports it, and review release notes before updating.

## CLI and CI/CD

The DevExcellence CLI is a complementary deterministic execution layer, not a requirement for using the skill. Once implemented and released, it will provide repeatable local and CI checks. The skill itself must remain useful without the CLI.
