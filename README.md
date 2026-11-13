# DevExcellence

**Crie e melhore aplicações conversando com uma inteligência artificial.**

A DevExcellence ajuda ferramentas de programação com IA a transformar suas ideias em software. Você explica o que precisa em linguagem natural; a IA entende o projeto, implementa as mudanças, executa as verificações disponíveis e ajusta o que não funcionar.

**A proposta é simples: instalar uma vez e desenvolver conversando.**

## O que é a DevExcellence?

A DevExcellence é uma **skill**: um conjunto de instruções que uma ferramenta de programação com IA usa para trabalhar melhor no seu projeto.

Pense nela como um guia de trabalho para a IA. Ela orienta a ferramenta a entender o que você quer, respeitar o código que já existe, desenvolver em etapas e conferir o resultado.

A DevExcellence **não é um modelo de IA e não substitui** ferramentas como Claude Code, Codex ou Cursor. Ela complementa essas ferramentas.

## O que você pode fazer com ela?

Você pode pedir, por exemplo:

- "Crie um sistema simples para controlar minhas tarefas."
- "Adicione uma tela de login ao meu projeto."
- "Deixe esta página mais bonita e adaptada para celular."
- "O botão salvar não funciona. Encontre e corrija o problema."
- "Adicione um relatório com filtros por período."
- "Explique como executar o projeto no meu computador."

A DevExcellence orienta a IA a entender o projeto, implementar o que foi pedido, testar o que estiver ao alcance das ferramentas e explicar o que foi feito.

## Como começar

Você precisa de uma ferramenta de programação com IA e do Node.js instalado no computador. A instalação é feita pelo Skills CLI.

### 1. Para ferramentas com instalação global

Abra o terminal e execute:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --agent '*' --global --yes
```

Essa opção é feita uma vez no computador e deixa a skill disponível em vários projetos, nos agentes compatíveis encontrados pelo instalador.

### 2. Para Eve e PromptScript

Eve e PromptScript também são ferramentas de IA usadas para trabalhar com código, mas o instalador não oferece instalação global para elas.

Para usá-las, abra o terminal **na pasta principal do projeto** e execute:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --yes --agent eve promptscript
```

Esse é o mesmo repositório e a mesma DevExcellence. A diferença é que a instalação fica somente no projeto em que o comando foi executado. Repita em cada projeto onde quiser usar a skill.

### 3. Comece a conversar

Depois da instalação, abra ou reinicie sua ferramenta de programação com IA. Entre no projeto e peça o que deseja fazer, usando suas próprias palavras.

Você não precisa executar comandos da DevExcellence antes de cada pedido, conhecer checklists ou escrever prompts especiais.

**Primeira conversa no projeto:** depois de instalar e reabrir a ferramenta de IA, envie uma mensagem normal sobre o projeto — por exemplo, “Oi, me ajude a começar este projeto”. Em ferramentas que oferecem ativação automática, a descrição da DevExcellence permite que ela seja carregada sem você chamar a skill pelo nome. Na primeira ativação, ela faz uma leitura inicial breve do projeto. Abrir a pasta sem enviar uma mensagem não inicia a skill; a ativação acontece quando a ferramenta recebe seu pedido.

Consulte o [guia de instalação](docs/INSTALLATION.md) e o [guia de ativação automática](docs/AUTO-ACTIVATION.md) para mais detalhes e solução de problemas.

## O que a DevExcellence faz durante o desenvolvimento?

1. Entende o que você quer construir ou corrigir.
2. Analisa as partes relevantes do projeto.
3. Faz a alteração necessária, aproveitando o que já existe.
4. Executa a aplicação ou os testes disponíveis, quando a ferramenta permite.
5. Corrige os problemas encontrados e explica o resultado.

Ela procura fazer mudanças pequenas e úteis, sem complicar tarefas simples. Para assuntos importantes, como login, permissões, dados pessoais e pagamentos, orienta a IA a tomar cuidados adicionais.

## O que ela não faz?

- Não fornece, por conta própria, um modelo de inteligência artificial.
- Não substitui sua ferramenta de programação com IA.
- Não garante que todo código esteja livre de erros ou pronto para produção.
- Não executa testes, publica sistemas ou acessa serviços sem que a ferramenta utilizada tenha os recursos e as permissões necessários.

## Perguntas frequentes

**Preciso saber programar?**

Não é necessário conhecer os comandos ou a estrutura interna da DevExcellence. Você pode explicar o resultado desejado com palavras simples. A ferramenta de IA usada continua tendo os limites e as capacidades dela.

**O que é uma skill?**

É um conjunto de instruções que uma ferramenta de IA pode carregar para seguir uma forma de trabalho. Neste projeto, essas instruções ajudam a IA durante o desenvolvimento de software.

**O que é Eve?**

Eve é uma das ferramentas de IA para programação que pode usar skills. Ela não faz parte da DevExcellence e você não precisa instalar Eve para usar este projeto. Para Eve, a instalação da DevExcellence é feita dentro de cada projeto.

**Preciso usar Eve ou PromptScript?**

Não. Eles são apenas duas das opções. Você pode usar outras ferramentas de programação com IA que aceitem esse tipo de instrução adicional (skill).

**Posso usar a DevExcellence gratuitamente?**

Sim. A licença permite utilizar, estudar, modificar e compartilhar o projeto para fins não comerciais.

**Posso vender a DevExcellence ou usá-la comercialmente?**

Não. A licença não permite vender, oferecer como serviço pago ou incorporar o projeto em produtos e serviços comerciais sem autorização específica do titular dos direitos. Em caso de dúvida sobre uma situação concreta, peça autorização antes de usar.

**Posso modificar e compartilhar minha versão?**

Sim, desde que o uso e a distribuição continuem dentro das condições não comerciais da licença e que o aviso de licença seja mantido.

**Posso contribuir com o projeto?**

Sim. Qualquer pessoa pode sugerir melhorias, relatar problemas e enviar alterações por meio de Pull Requests. As contribuições aceitas serão distribuídas sob a mesma licença não comercial. Você mantém os direitos autorais do que criou e confirma que tem autorização para enviar o conteúdo.

**A DevExcellence é open source?**

O código fica disponível para consulta, estudo, modificação e compartilhamento não comercial. Como a licença restringe uso comercial, o projeto é *source-available* (código-fonte disponível), mas não é open source no sentido tradicional das definições da OSI.

## Para quem quer conhecer os detalhes técnicos

O uso normal não exige conhecer a estrutura interna. Quem quiser entender o funcionamento pode consultar:

- [Como funciona o Vibe Coding](docs/VIBECODING.md)
- [Guia de instalação](docs/INSTALLATION.md)
- [Histórico de alterações](CHANGELOG.md)
- [Como contribuir](CONTRIBUTING.md)
- [Política de segurança](SECURITY.md)

## Licença e uso

Este projeto é disponibilizado sob a **PolyForm Noncommercial License 1.0.0**. Ela permite uso, estudo, modificação e distribuição para fins não comerciais. O uso comercial não está autorizado por esta licença.

Leia o texto completo em [LICENSE](LICENSE) ou no [site oficial da PolyForm](https://polyformproject.org/licenses/noncommercial/1.0.0).

