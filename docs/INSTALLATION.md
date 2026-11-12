# Instalação e uso da DevExcellence

## Um único comando

Pré-requisito: Node.js compatível com a versão atual do Skills CLI. A documentação atual do CLI informa Node.js 22.20 ou superior.

Execute uma única vez no terminal:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --agent '*' --global --yes
```

O comando instala a DevExcellence globalmente para todos os agentes compatíveis detectados pelo Skills CLI, sem perguntas interativas.

## Começar a usar

1. Abra ou recarregue seu agente de programação (Claude Code, Codex, Cursor ou outro agente compatível).
2. Entre em qualquer projeto e descreva normalmente o que deseja criar, mudar ou corrigir.
3. A skill orienta o agente a construir uma primeira versão, executar, corrigir e evoluir o projeto em ciclos curtos.

O foco é Vibe Coding: você conversa sobre o produto e dá feedback; não precisa operar checklists, metodologias ou comandos internos. Veja [VIBECODING.md](VIBECODING.md) para conhecer a experiência.

**Não é necessário clonar o repositório DevExcellence, instalar o CLI, executar `context-plan` ou chamar um comando especial antes de cada tarefa.** O comando de instalação é a única etapa de instalação da skill.

## Acesso ao repositório privado

Enquanto `ylkias/DevExcellence` permanecer privado, cada usuário precisa ter permissão de leitura e autenticação GitHub configurada na máquina. Pode usar a sessão existente do GitHub CLI (`gh auth login`), credenciais Git seguras ou SSH. Faça essa autenticação uma única vez por máquina; não coloque tokens diretamente no comando, README ou histórico do shell.

O comando único funciona para todos os colaboradores autorizados. Para permitir instalação por qualquer pessoa sem autenticação, o repositório precisaria ser público ou a skill teria de ser distribuída por outro canal autorizado.

## Atualização

Para atualizar uma instalação global, use o gerenciador de Skills CLI e atualize a skill DevExcellence. Em ambientes críticos, revise a versão/commit antes de distribuir atualizações para a equipe.

## Compatibilidade e limites

- O Skills CLI instala os arquivos da skill; ele não concede novas permissões ao agente.
- A leitura de arquivos, execução de Git, testes, scanners e alterações dependem das ferramentas e permissões do agente utilizado.
- Se o agente não identificar a skill após a instalação, feche e reabra/recarregue o agente e confira se ele está entre os agentes suportados pelo Skills CLI.
- O CLI local da DevExcellence é opcional para mantenedores e CI/CD; não faz parte do uso básico da skill.

## CLI e CI/CD para mantenedores

O CLI 0.4.0 requer Node.js 20+ e permanece como ferramenta separada para verificações determinísticas, auditoria estática e gate de artefatos. Ele não é instalado pelo comando acima e não é necessário para a utilização cotidiana da skill. Consulte [CLI.md](CLI.md) e [TOKEN-EFFICIENCY.md](TOKEN-EFFICIENCY.md) para desenvolvimento do próprio produto.
