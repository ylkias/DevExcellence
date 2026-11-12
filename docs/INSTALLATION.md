# Instalação e compatibilidade

A skill principal está em `skills/devexcellence/`, no formato Agent Skills: um diretório de skill contém `SKILL.md` com frontmatter YAML e os arquivos auxiliares necessários. Essa estrutura evita que o instalador selecione uma instrução genérica na raiz e deixe de levar os checklists e templates junto.

## Instalação recomendada: Skills CLI

Requisitos: Node.js compatível com a versão atual do Skills CLI. Consulte a documentação oficial do instalador para os requisitos vigentes.

Para listar as skills detectadas no repositório:

```bash
npx skills add https://github.com/ylkias/DevExcellence --list
```

Para instalar a DevExcellence:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence
```

Para instalar globalmente, em vez de somente no projeto atual:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --global
```

Para direcionar a instalação a um agente específico, use o identificador suportado pelo CLI:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --agent claude-code
```

O instalador pode permitir a seleção interativa dos agentes e do escopo. A lista de agentes e os caminhos de instalação dependem da versão do Skills CLI.

## Repositório privado durante o desenvolvimento

Enquanto o repositório estiver privado, somente colaboradores com acesso e autenticação Git configurada poderão instalar a skill.

Autentique-se pelo fluxo normal do GitHub CLI:

```bash
gh auth login
```

Depois execute o comando de instalação. Também é possível usar autenticação SSH do Git, conforme a configuração da máquina.

Não coloque Personal Access Tokens diretamente nos comandos, no README, no histórico do shell ou em arquivos do projeto. Prefira o gerenciador seguro de credenciais já utilizado pelo desenvolvedor.

Quando o repositório se tornar público, qualquer pessoa poderá utilizar o mesmo comando sem precisar de autorização privada.

## Instalação manual

Se o agente não suportar o Skills CLI, clone ou baixe o repositório e siga a documentação do agente para instalar uma skill. Copie toda a pasta `skills/devexcellence/`, preservando `SKILL.md`, `checklists/`, `references/` e `templates/`.

O editor não é necessariamente o agente. Extensões diferentes do VS Code, agentes de terminal e serviços de LLM podem usar caminhos de descoberta diferentes.

## Atualização e reprodutibilidade

Consulte os comandos atuais do Skills CLI para verificar e atualizar skills instaladas. Em ambientes críticos, prefira uma versão/tag revisada ou commit fixado, quando suportado, e revise as notas de versão antes de atualizar.

## CLI e CI/CD

O CLI 0.1.0 está implementado como ferramenta local complementar e exige Node.js 20+. Após clonar o repositório, execute `node cli/bin/devexcellence.js help`. Para validar o próprio CLI: `cd cli && npm test`. O CLI ainda não está publicado no npm e não é requisito para utilizar a skill.

O workflow `.github/workflows/ci.yml` valida sintaxe, executa testes, verifica a integridade do pacote `skills/devexcellence/` e faz um smoke test em Node.js 20 e 22. A configuração foi adicionada ao repositório; consulte o status das execuções no GitHub Actions para confirmar os resultados do ambiente remoto.

A instalação real pelo Skills CLI em repositório privado depende da autenticação GitHub do usuário e ainda precisa ser verificada no ambiente consumidor.
