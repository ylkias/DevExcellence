# DevExcellence

**Uma skill universal de Vibe Coding para transformar ideias em aplicações funcionais usando agentes de IA.**

A pessoa descreve o que quer em linguagem natural. A DevExcellence orienta o agente a entender o projeto, construir uma primeira versão funcional, executar e corrigir, melhorar a interface e evoluir o produto em ciclos curtos. Funciona com diferentes agentes, LLMs, linguagens e frameworks.

> Status: skill principal disponível no pacote Agent Skills; CLI local 0.4.0 implementado e testes automatizados adicionados. O workflow de CI valida o pacote e o CLI em Node.js 20 e 22; confira o status da execução mais recente antes de fazer release. Nenhum teste ou scanner deve ser declarado como aprovado sem ter sido realmente executado.

## Propósito principal

O produto é uma **skill para Vibe Coding**. Ela ajuda o agente de IA a transformar uma ideia em software utilizável: entender o pedido, aproveitar a base existente, implementar uma funcionalidade completa, executar, corrigir erros e iterar com o feedback da pessoa.

A experiência desejada é: **instalar uma vez e desenvolver conversando**. O usuário não precisa conhecer checklists, metodologias, arquitetura ou comandos internos. A skill toma decisões técnicas reversíveis, pergunta apenas quando necessário e mantém a pessoa no controle de decisões importantes.

Qualidade e segurança são guardrails incorporados ao fluxo, não o produto principal. Auditorias extensas e scanners especializados só entram quando o risco ou o pedido justificarem. O CLI é opcional para mantenedores e CI/CD.

## O que ela ajuda a fazer

- Compreender um projeto existente antes de realizar alterações.
- Validar requisitos, critérios de aceitação e arquitetura antes da geração de código.
- Identificar lógicas incompletas, código morto, atalhos inseguros, duplicações e código obsoleto.
- Revisar autenticação, autorização, sessões, funções, permissões e trilhas de auditoria.
- Identificar riscos em rotas e APIs, endpoints públicos indevidos, ausência de validação, paginação e limites de requisições.
- Revisar modelagem de banco de dados, relacionamentos, índices, queries parametrizadas, transações, integridade referencial, concorrência, ciclo de vida das conexões e migrations.
- Avaliar resiliência, privacidade/LGPD, acessibilidade, cadeia de suprimentos, observabilidade, backup/recuperação, internacionalização e entrega em produção.
- Selecionar módulos adaptativamente conforme o tipo, a criticidade e os riscos do projeto, sem aplicar checklists irrelevantes.
- Aplicar práticas adequadas ao contexto, como TDD, BDD, ATDD, DDD, SOLID, Clean Code, Clean Architecture e DevSecOps.
- Auditar a qualidade dos arquivos de teste, inclusive os gerados por IA, identificando testes vazios, assertions fracas/tautológicas, mocks excessivos, testes ignorados e lacunas de cenários.
- Executar e interpretar testes, análise estática, verificações de dependências e testes de performance usando as ferramentas disponíveis no projeto.
- Melhorar manutenibilidade, desempenho, escalabilidade e eficiência no uso de contexto e tokens.
- Gerar relatórios práticos com falhas, evidências, correções, riscos residuais e comparação antes/depois.

## Princípios

1. **A skill em primeiro lugar:** estabelecer critérios de engenharia antes da implementação.
2. **Validação contínua:** revisar as alterações durante o desenvolvimento, e não somente no final.
3. **Evidências acima de afirmações:** nunca inventar resultados de testes, scanners ou testes de carga.
4. **Menor alteração necessária:** preservar o comportamento existente e as convenções do projeto.
5. **Segurança por padrão:** aplicar autorização no servidor e validar todas as fronteiras de confiança.
6. **Independência de stack:** identificar as ferramentas reais do projeto, sem impor tecnologias.
7. **Independência de LLM:** manter as orientações centrais neutras em relação a provedores e usar adaptadores somente quando necessário.
8. **Eficiência de contexto:** evitar leituras e chamadas redundantes sem pular verificações importantes.
9. **Controle humano:** solicitar aprovação para ações destrutivas, externas, custosas ou fora do escopo.
10. **Transparência nos resultados:** diferenciar problemas confirmados, hipóteses e itens não verificados.

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

Instale diretamente do GitHub usando o Skills CLI:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence --agent '*' --global --yes
```

A instalação acima disponibiliza a DevExcellence globalmente para todos os agentes compatíveis detectados pelo Skills CLI. Depois, basta abrir/recarregar o agente e pedir tarefas de desenvolvimento normalmente: a seleção de contexto e a economia de tokens são aplicadas automaticamente pela skill. **Não é necessário executar `context-plan`, `check` ou outro comando DevExcellence para começar a usar.** Cada usuário precisa ter acesso de leitura ao repositório enquanto ele permanecer privado. Consulte [docs/INSTALLATION.md](docs/INSTALLATION.md) apenas para autenticação e solução de problemas.

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
