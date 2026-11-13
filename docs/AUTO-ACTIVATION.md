# Ativação automática da DevExcellence

## O comportamento esperado

A pessoa instala a DevExcellence uma vez. Depois, abre um projeto, começa uma conversa e escreve normalmente — sem mencionar o nome da skill, sem comando especial e sem precisar aprender a criar prompts.

Quando a ferramenta de IA oferece ativação implícita de skills, ela deve selecionar a DevExcellence para pedidos relacionados a software com base na descrição da skill. Na primeira conversa orientada ao projeto, a DevExcellence faz uma leitura inicial curta do workspace e usa esse contexto para ajudar.

## O que significa "primeira conversa"

A skill não é um processo que fica executando em segundo plano. Ela é carregada quando a pessoa envia uma mensagem e a ferramenta de IA decide que a descrição da skill corresponde ao pedido.

Exemplos de primeiras mensagens que devem acionar a DevExcellence quando enviadas em um workspace de software:

- "Oi, quero começar a trabalhar neste projeto. Me ajude a entender por onde começar."
- "Vamos começar."
- "Tenho uma ideia para um aplicativo."
- "Pode olhar este projeto e me ajudar a evoluir?"
- "Quero criar uma tela de cadastro."
- "O sistema está apresentando um erro. Investigue."

Uma mensagem totalmente sem relação com software não deve acionar a skill apenas porque ela está instalada.

## Como a ativação é configurada

1. O campo `description` no cabeçalho de `SKILL.md` declara quando a skill deve ser usada. Essa descrição é o principal sinal de seleção implícita em agentes compatíveis.
2. `agents/openai.yaml` declara `allow_implicit_invocation: true` para clientes OpenAI/Codex que reconhecem esse metadado.
3. O corpo de `SKILL.md` define a orientação inicial: leitura leve e somente de consulta, identificação do projeto e continuidade imediata da solicitação do usuário.
4. O instalador coloca a skill no local de descoberta do agente. A seleção efetiva continua sendo responsabilidade do host e do modelo.

## Orientação inicial do projeto

Quando a skill for carregada pela primeira vez em uma conversa:

- Verificar instruções do projeto e arquivos de contexto principais.
- Identificar a stack e o tipo de aplicação por README, manifestos e pastas principais.
- Consultar o estado do Git quando possível.
- Não editar arquivos, instalar dependências, executar migrações ou fazer alterações destrutivas só para "inicializar" a skill.
- Se a pessoa já pediu uma tarefa, começar a executá-la usando o contexto descoberto.
- Se a pessoa apenas disse algo amplo como "vamos começar", explicar em poucas frases o que foi identificado e perguntar qual resultado ela deseja primeiro.

Não transformar a primeira conversa em auditoria, entrevista ou relatório longo.

## Casos de teste de ativação

Execute os testes em um chat novo, com a pasta de um projeto de software aberta. Confirme na atividade/ferramentas do agente se a skill foi carregada; a resposta parecer útil, sozinha, não comprova a ativação.

| Mensagem do usuário | Resultado esperado |
|---|---|
| "Oi, vamos começar a trabalhar neste projeto." | Ativar e fazer orientação inicial curta |
| "Pode me explicar este projeto e sugerir por onde começar?" | Ativar e identificar a estrutura |
| "Crie uma tela de login." | Ativar e implementar o fluxo pedido |
| "Corrija o erro ao salvar." | Ativar e investigar o problema |
| "Melhore o visual desta página." | Ativar e preservar o design existente |
| "Adicione testes para esta funcionalidade." | Ativar e validar a mudança |
| "Quanto é 15% de 240?" | Não ativar |
| "Traduza este texto sem alterar o projeto." | Não ativar |
| "Me recomende um restaurante." | Não ativar |

## Limite importante

Instalar uma skill torna suas instruções disponíveis, mas não permite obrigar todos os agentes a carregá-la em qualquer mensagem. Codex, ChatGPT e alguns outros agentes suportam seleção implícita baseada na descrição; outros podem ter políticas próprias ou exigir uma ação do usuário. O comportamento deve ser validado em cada agente e versão que o projeto anunciar como compatível.

Para Codex, `allow_implicit_invocation: true` mantém permitido o acionamento implícito. A descrição permanece essencial para a seleção.

Referências oficiais:
- [OpenAI — Build skills](https://learn.chatgpt.com/docs/build-skills)
- [VS Code — Use Agent Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills)
- [Agent Skills — Overview](https://agentskills.io/home)
