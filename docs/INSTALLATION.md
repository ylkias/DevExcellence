# Instalação e uso da DevExcellence

## Instalação global

Para agentes que suportam skills globais, execute uma única vez no terminal:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --agent '*' --global --yes
```

O comando instala a DevExcellence globalmente para os agentes compatíveis detectados pelo Skills CLI, sem perguntas interativas.

**Importante:** Eve e PromptScript não oferecem instalação global pelo Skills CLI. Para esses agentes, use a instalação por projeto abaixo. Quando o comando global listar esses dois como incompatíveis com o modo global, isso não significa que a instalação falhou nos demais agentes.

## Eve e PromptScript: instalação por projeto

Abra o terminal na pasta raiz do projeto em que você usa Eve ou PromptScript e execute:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --yes --agent eve promptscript
```

É o **mesmo repositório e a mesma skill**. A diferença é que o comando não usa `--global`: a DevExcellence é instalada no projeto atual, ficando disponível para o agente naquele workspace.

Repita esse comando na raiz de cada projeto em que quiser usar a skill com Eve ou PromptScript. Não é necessário clonar o repositório DevExcellence nem instalar o CLI local.

## Começar a usar

1. Abra ou recarregue seu agente de programação (Claude Code, Codex, Cursor, Eve, PromptScript ou outro agente compatível).
2. Entre no projeto em que a skill foi instalada e descreva normalmente o que deseja criar, mudar ou corrigir.
3. A skill orienta o agente a construir uma primeira versão, executar, corrigir e evoluir o projeto em ciclos curtos.

O foco é Vibe Coding: você conversa sobre o produto e dá feedback; não precisa operar checklists, metodologias ou comandos internos. Veja [VIBECODING.md](VIBECODING.md) para conhecer a experiência.

**Não é necessário executar `context-plan`, `check` ou outro comando especial antes de cada tarefa.** A instalação da skill é a única etapa de preparação no escopo escolhido (global ou projeto).

## Acesso ao repositório privado

Enquanto `ylkias/DevExcellence` permanecer privado, cada usuário precisa ter permissão de leitura e autenticação GitHub configurada na máquina. Pode usar a sessão existente do GitHub CLI (`gh auth login`), credenciais Git seguras ou SSH. Faça essa autenticação uma única vez por máquina; não coloque tokens diretamente no comando, README ou histórico do shell.

O comando funciona para usuários autorizados. Para permitir instalação por qualquer pessoa sem autenticação, o repositório precisaria ser público ou a skill teria de ser distribuída por outro canal autorizado.

## Atualização

Execute novamente o comando correspondente ao escopo em que instalou a skill: o comando global para instalações globais ou o comando de Eve/PromptScript dentro da raiz do projeto. Em ambientes críticos, revise a versão/commit antes de distribuir atualizações para a equipe.

## Compatibilidade e limites

- O Skills CLI instala os arquivos da skill; ele não concede novas permissões ao agente.
- A leitura de arquivos, execução de Git, testes, scanners e alterações dependem das ferramentas e permissões do agente utilizado.
- A disponibilidade global ou por projeto depende dos locais de skills suportados por cada agente.
- Se o agente não identificar a skill após a instalação, feche e reabra/recarregue o agente e confira se o comando foi executado no escopo correto.
- O CLI local da DevExcellence é opcional para mantenedores e CI/CD; não faz parte do uso básico da skill.

## CLI e CI/CD para mantenedores

O CLI 0.4.0 requer Node.js 20+ e permanece como ferramenta separada para verificações determinísticas, auditoria estática e gate de artefatos. Ele não é instalado pelos comandos acima e não é necessário para a utilização cotidiana da skill. Consulte [CLI.md](CLI.md) e [TOKEN-EFFICIENCY.md](TOKEN-EFFICIENCY.md) para desenvolvimento do próprio produto.
