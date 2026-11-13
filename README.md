# DevExcellence

**Uma skill universal de Vibe Coding para transformar ideias em aplicações funcionais usando agentes de IA.**

A pessoa descreve o que quer em linguagem natural. A DevExcellence orienta o agente a entender o projeto, construir uma primeira versão funcional, executar e corrigir, melhorar a interface e evoluir o produto em ciclos curtos. Funciona com diferentes agentes, LLMs, linguagens e frameworks.

> Status: skill principal disponível no pacote Agent Skills; CLI local 0.4.0 implementado e testes automatizados adicionados. O workflow de CI valida o pacote e o CLI em Node.js 20 e 22; confira o status da execução mais recente antes de fazer release. Nenhum teste ou scanner deve ser declarado como aprovado sem ter sido realmente executado.

## Propósito principal

O produto é uma **skill para Vibe Coding**. Ela ajuda o agente de IA a transformar uma ideia em software utilizável: entender o pedido, aproveitar a base existente, implementar uma funcionalidade completa, executar, corrigir erros e iterar com o feedback da pessoa.

A experiência desejada é: **instalar uma vez e desenvolver conversando**. O usuário não precisa conhecer checklists, metodologias, arquitetura ou comandos internos. A skill toma decisões técnicas reversíveis, pergunta apenas quando necessário e mantém a pessoa no controle de decisões importantes.

Qualidade e segurança são guardrails incorporados ao fluxo, não o produto principal. Auditorias extensas e scanners especializados só entram quando o risco ou o pedido justificarem. O CLI é opcional para mantenedores e CI/CD.

## O que ela ajuda a fazer

- Transformar descrições em linguagem natural em funcionalidades e aplicações utilizáveis.
- Construir MVPs e primeiras versões em fatias pequenas, completas e testáveis.
- Entender e preservar projetos, stacks, componentes, design systems e padrões já existentes.
- Implementar interfaces responsivas, interações, regras de negócio, APIs e persistência quando necessários.
- Executar a aplicação e os testes disponíveis, interpretar falhas, corrigir e iterar.
- Incorporar feedback visual e funcional sem reescrever o projeto sem motivo.
- Escolher soluções técnicas simples e reversíveis quando o usuário não especificar detalhes.
- Aplicar qualidade e segurança como proteções proporcionais ao contexto, sem burocratizar tarefas simples.
- Selecionar checklists e verificações somente quando a mudança ou o risco justificar.
- Reduzir leituras redundantes, chamadas desnecessárias e consumo de contexto/tokens.
- Explicar o que ficou pronto, como testar e quais limitações permanecem.

## Princípios

1. **Construir junto:** priorizar uma implementação funcional quando o pedido for implementar e as ferramentas permitirem.
2. **Interação simples:** conversar em linguagem natural, com o mínimo de perguntas e etapas.
3. **Iteração rápida:** entregar pequenas partes funcionais, testar e melhorar com feedback.
4. **Preservar o projeto:** respeitar stack, arquitetura e identidade visual existentes.
5. **Qualidade proporcional:** testar o que mudou e ampliar a validação quando o risco exigir.
6. **Segurança incorporada:** proteger dados, credenciais e operações sem transformar toda tarefa em auditoria.
7. **Eficiência:** reduzir contexto, leituras e chamadas redundantes.
8. **Transparência:** não inventar validações, resultados ou garantias.

## Ciclo de Vibe Coding

1. Entender a ideia e o resultado esperado sem exigir uma especificação extensa.
2. Identificar o mínimo de contexto do projeto e preservar sua stack e identidade visual.
3. Construir uma primeira fatia funcional de ponta a ponta.
4. Executar ou testar com as ferramentas disponíveis.
5. Corrigir falhas e incorporar feedback em iterações curtas.
6. Entregar um resumo do que funciona, como testar e o que ainda falta.

O agente pergunta apenas quando uma decisão bloqueia o trabalho ou traz impacto significativo. Qualidade e segurança funcionam como guardrails proporcionais; auditorias completas não são aplicadas automaticamente a tarefas simples. Veja [docs/VIBECODING.md](docs/VIBECODING.md).

## Estrutura do repositório

- `skills/devexcellence/`: pacote instalável completo, com `SKILL.md`, checklists, referências adaptativas e modelos de relatório.
- `checklists/`: fonte de trabalho dos módulos de qualidade, segurança, APIs, banco, máscaras/formatação, integridade, resiliência, privacidade/LGPD, frontend/acessibilidade, cadeia de suprimentos, observabilidade, backup/recuperação, internacionalização, entrega, testes, performance e Quality Score.
- `docs/`: instalação, fluxo de Vibe Coding, eficiência de contexto, checklists e ferramentas complementares.
- `templates/`: modelos de relatório de auditoria, plano de implementação e registro de achados.
- `examples/`: exemplos de achados e prompts reutilizáveis.
- `cli/`: CLI local 0.4.0, auditoria estática de testes, Quality Score, testes unitários e documentação.
- `CHANGELOG.md`, `CONTRIBUTING.md` e `SECURITY.md`: histórico, diretrizes de contribuição e política de segurança.

## Instalação rápida

### Instalação global

Para agentes que oferecem instalação global, instale diretamente do GitHub usando o Skills CLI:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --agent '*' --global --yes
```

O comando disponibiliza a DevExcellence globalmente para os agentes compatíveis detectados pelo Skills CLI. Depois, basta abrir/recarregar o agente e pedir tarefas de desenvolvimento normalmente: a seleção de contexto e a economia de tokens são aplicadas automaticamente pela skill.

### Eve e PromptScript (instalação por projeto)

Para usar a mesma skill no Eve ou PromptScript, abra o terminal **na pasta raiz do projeto** e execute:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --yes --agent eve promptscript
```

Esse comando usa o **mesmo repositório GitHub**, mas instala a skill somente no projeto atual. Repita-o em cada projeto onde quiser utilizá-la com esses agentes. Não inclua `--global`.

**Importante:** Eve e PromptScript não oferecem instalação global pelo Skills CLI. Portanto, se aparecerem como incompatíveis no resultado do comando global, isso não significa que a instalação falhou nos outros agentes.

Cada usuário precisa ter acesso de leitura ao repositório enquanto ele permanecer privado. Consulte [docs/INSTALLATION.md](docs/INSTALLATION.md) para autenticação, instalação por projeto e solução de problemas.

## Ferramentas complementares (opcionais)

O CLI local é destinado a mantenedores e pipelines que precisam de verificações determinísticas adicionais. Ele não é requisito para instalar ou usar a skill no dia a dia. A instalação pelo Skills CLI entrega a pasta completa `skills/devexcellence/`, incluindo checklists, referências e modelos.

## Escopo e limitações atuais

- A skill pode orientar projetos em diferentes stacks, mas as verificações reais dependem das ferramentas instaladas e das permissões concedidas.
- O CLI 0.4.0 é uma ferramenta complementar para mantenedores, incluindo auditoria estática de testes e gate do artefato de produção; a auditoria de testes é estática/heurística e não comprova efetividade, autoria por IA ou cobertura. O CLI não executa SAST/DAST, pentest, scanner completo de dependências, mutation testing automático ou testes de carga.
- A documentação define um protocolo opcional multiagente; o repositório não inclui runtime executável de orquestração. Um único agente deve conseguir executar todo o fluxo.
- Uma meta de 5.000 usuários simultâneos precisa ser definida como uma carga mensurável e comprovada por testes de carga. Ela não é garantida apenas por uma revisão de arquitetura.
- O repositório permanece privado durante o desenvolvimento inicial. Antes de torná-lo público, escolha uma licença open source explícita e revise os termos de contribuição.

## Como contribuir

Consulte [CONTRIBUTING.md](CONTRIBUTING.md). As contribuições devem ser objetivas, reproduzíveis e documentadas, sem incluir código proprietário, credenciais ou dados pessoais reais.
