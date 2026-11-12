# DevExcellence — foco em Vibe Coding

## O que é

A DevExcellence é uma skill para tornar o desenvolvimento com IA mais simples e produtivo. A pessoa descreve em linguagem natural o que quer construir; o agente entende a base, implementa uma primeira versão funcional, testa, corrige e evolui o produto em ciclos curtos.

A DevExcellence não é um framework, um gerador de boilerplate, uma plataforma AppSec ou uma metodologia corporativa que o usuário precise operar. É uma camada de orientação para agentes de programação.

## Experiência desejada

**Instalar uma vez. Desenvolver conversando.**

Depois que a skill estiver instalada em um agente compatível, o usuário deve poder pedir:
- "Crie um sistema simples para controlar minhas tarefas."
- "Adicione login e recuperação de senha."
- "Melhore essa tela para ficar mais profissional e responsiva."
- "O botão salvar não funciona. Encontre e corrija."
- "Adicione um relatório com filtros por período."
- "Prepare uma primeira versão que eu consiga testar."

Não deve precisar conhecer o nome de checklists, metodologias, comandos do CLI ou ferramentas internas da DevExcellence.

## Ciclo principal

1. **Ideia:** entender o problema e o resultado esperado.
2. **Primeira versão:** propor o menor escopo útil e construir uma funcionalidade completa.
3. **Execução:** rodar o projeto ou os testes disponíveis e observar erros.
4. **Correção:** corrigir o que falhou e completar estados de interface e fluxos.
5. **Iteração:** incorporar feedback do usuário sem recomeçar desnecessariamente.
6. **Entrega:** resumir o que funciona, como testar e o que ainda falta.

O agente deve perguntar somente quando uma decisão bloquear o trabalho ou tiver impacto significativo. Nos demais casos, deve adotar padrões simples e reversíveis.

## Qualidade sem burocracia

- Preservar stack, design e estrutura já existentes.
- Não criar arquitetura, abstrações, agentes ou dependências sem necessidade.
- Construir fluxos completos, não apenas telas estáticas.
- Validar o comportamento alterado com ferramentas reais.
- Explicar limitações e não inventar resultados.
- Manter segurança básica no código sem submeter cada tarefa a uma auditoria extensa.

## Papel da segurança

Segurança é um conjunto de proteções incorporadas ao desenvolvimento: segredos fora do código, validação no servidor, autorização correta, proteção de dados e cautela com operações destrutivas. Checklists e scanners especializados entram quando o contexto exige ou quando o usuário pede revisão de segurança.

A DevExcellence não afirma que um projeto está seguro, certificado ou pronto para produção sem evidências adequadas.

## O que não deve acontecer

- Pedir ao usuário para rodar comandos DevExcellence antes de cada tarefa.
- Responder com um plano longo quando o pedido é claro e a implementação está autorizada.
- Ler todos os checklists em toda solicitação.
- Fazer uma auditoria empresarial completa para ajustar um botão.
- Reescrever o projeto inteiro para adicionar uma pequena funcionalidade.
- Entregar uma tela visual sem conectar os comportamentos necessários.
- Esconder erros de build/teste ou dizer que algo foi validado quando não foi.

## Princípio do produto

A melhor experiência é aquela em que a pessoa se concentra na ideia e no feedback, enquanto a skill ajuda o agente a cuidar da implementação, da coerência técnica e das verificações necessárias.
