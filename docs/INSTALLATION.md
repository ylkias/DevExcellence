# Como instalar a DevExcellence

Este guia mostra como instalar a DevExcellence na sua ferramenta de programação com IA.

## Antes de começar

Você precisa ter:

- Uma ferramenta de programação com IA que aceite a instalação de skills.
- Node.js instalado, para executar o comando `npx`.
- Acesso de leitura ao repositório GitHub enquanto ele estiver privado.

A DevExcellence não instala uma ferramenta de IA para você. Ela adiciona instruções à ferramenta que você já utiliza.

## Escolha como instalar

Há duas formas de instalação:

- **Global:** você instala uma vez no computador e pode usar a skill em vários projetos, nas ferramentas compatíveis.
- **Por projeto:** a skill fica disponível somente no projeto em cuja pasta você executou o comando.

Na maioria das ferramentas compatíveis, você pode instalar globalmente. Eve e PromptScript precisam da instalação dentro de cada projeto.

### Opção A — instalação global

Use esta opção para as ferramentas que aceitam skills globais.

Abra o terminal e execute:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --agent '*' --global --yes
```

O instalador procura as ferramentas compatíveis disponíveis no computador e instala a DevExcellence para elas.

### Opção B — Eve e PromptScript

Eve e PromptScript são ferramentas de programação com IA. Elas não aceitam a instalação global da skill pelo Skills CLI.

Para instalar, abra o terminal **na pasta principal do projeto** em que deseja usar a DevExcellence e execute:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --yes --agent eve promptscript
```

A instalação será feita somente nesse projeto. Para usar a DevExcellence em outro projeto com Eve ou PromptScript, repita o comando na pasta principal do outro projeto.

**Você usará o mesmo repositório e a mesma skill.** Só muda o local em que os arquivos são instalados.

## Como a skill começa a trabalhar automaticamente

1. Feche e abra novamente sua ferramenta de programação com IA, ou recarregue-a.
2. Abra o projeto em que a skill está disponível.
3. Envie uma mensagem normal sobre o projeto. Por exemplo: “Oi, quero começar a trabalhar neste projeto. Me ajude a entender por onde começar.”

Em ferramentas que suportam ativação implícita, o agente identifica o pedido pela descrição da DevExcellence e carrega a skill sem que você precise mencionar o nome dela ou digitar um comando. Na primeira ativação, ela faz uma leitura inicial breve do projeto e usa esse contexto para responder ou executar a tarefa.

**Importante:** instalar a skill a deixa disponível para o agente, mas a seleção automática depende do suporte e das regras de cada ferramenta de IA. A skill só é carregada quando você envia uma mensagem; ela não inicia sozinha em segundo plano ao abrir uma pasta. Consulte [AUTO-ACTIVATION.md](AUTO-ACTIVATION.md) para entender e testar esse comportamento.

Por exemplo:

- "Crie uma página de cadastro de clientes."
- "Corrija o erro que aparece quando tento salvar."
- "Melhore o visual desta tela sem mudar as funções."
- "Adicione filtros por data neste relatório."

Não é necessário executar um comando da DevExcellence antes de cada pedido.

## Como atualizar

Para atualizar a skill, execute novamente o comando correspondente à forma como ela foi instalada:

- Instalação global: repita o comando da Opção A.
- Eve ou PromptScript: repita o comando da Opção B dentro da pasta principal do projeto.

## Problemas comuns

**O comando `npx` não é reconhecido**

Instale o Node.js e abra um novo terminal. O comando `npx` é fornecido junto com o ambiente Node.js.

**O GitHub informa que não tenho acesso ao repositório**

Enquanto o repositório estiver privado, sua conta precisa ter permissão de leitura. Depois que ele for tornado público, qualquer pessoa poderá acessar o código sem convite ou autenticação do repositório.

**Eve ou PromptScript aparecem como incompatíveis com instalação global**

Isso é esperado. Execute o comando da Opção B dentro da pasta do projeto.

**A ferramenta não encontra a skill**

Feche e abra novamente a ferramenta. Confira se instalou no local correto: globalmente para os agentes compatíveis ou dentro da pasta do projeto para Eve e PromptScript.

## Para mantenedores

O repositório também possui um CLI opcional para verificações e automações de manutenção. Ele não é necessário para instalar ou usar a skill durante o desenvolvimento. Consulte [CLI.md](CLI.md) somente se você for trabalhar na manutenção do próprio DevExcellence.
