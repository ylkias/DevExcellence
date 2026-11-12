# DevExcellence

**Uma skill universal de engenharia de software, independente de LLM, para entregar software melhor, mais seguro e confiável.**

A DevExcellence ajuda desenvolvedores e agentes de IA a compreender uma base de código, planejar alterações, implementar soluções completas, validar qualidade, reduzir riscos de segurança e apresentar evidências dos resultados. Foi projetada para funcionar com diferentes provedores de LLM, editores, linguagens, frameworks e ambientes de desenvolvimento.

> Status: skill principal disponível no pacote Agent Skills; CLI local 0.1.0 implementado e testes automatizados adicionados. O workflow de CI foi configurado, mas a primeira execução ainda precisa ser confirmada. Nenhum teste ou scanner deve ser declarado como aprovado sem ter sido realmente executado.

## Propósito principal

O produto principal é a **skill**: um conjunto portátil de instruções e fluxos de engenharia que pode ser instalado em agentes de IA compatíveis. O CLI é complementar: executa verificações determinísticas e ajuda a aplicar regras nos fluxos locais e de CI/CD.

A DevExcellence deve continuar simples de adotar e útil tanto para desenvolvedores individuais quanto para equipes. Não deve se transformar em um framework excessivamente complexo, que adicione etapas desnecessárias, aumente o consumo de tokens ou crie dependência de tecnologias específicas.

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

## Ciclo de trabalho

1. Identificar as instruções do projeto, arquitetura, linguagem, framework, ferramentas e estado do Git.
2. Transformar a solicitação em requisitos, riscos e critérios de aceitação.
3. Selecionar as práticas de engenharia e verificações adequadas.
4. Planejar a menor implementação coerente.
5. Implementar em etapas pequenas, com testes e revisões contínuas.
6. Executar as verificações determinísticas e análises de segurança aplicáveis.
7. Revisar o diff final e gerar o relatório.

A skill deve ser utilizada antes da implementação, durante a codificação e depois das alterações. A integração com CI/CD pode atuar como uma camada adicional de controle; um prompt, isoladamente, não garante que toda alteração será validada.

## Estrutura do repositório

- `skills/devexcellence/`: pacote instalável completo, com `SKILL.md`, checklists, referências adaptativas e modelos de relatório.
- `checklists/`: fonte de trabalho dos módulos de qualidade, segurança, APIs, banco, máscaras/formatação, integridade, resiliência, privacidade/LGPD, frontend/acessibilidade, cadeia de suprimentos, observabilidade, backup/recuperação, internacionalização, entrega, testes, performance e Quality Score.
- `docs/`: documentação de instalação, arquitetura, modos de operação, metodologias, multiagentes, relatórios, escalabilidade e seleção adaptativa.
- `templates/`: modelos de relatório de auditoria, plano de implementação e registro de achados.
- `examples/`: exemplos de achados e prompts reutilizáveis.
- `cli/`: CLI local 0.1.0, testes unitários e documentação.
- `CHANGELOG.md`, `CONTRIBUTING.md` e `SECURITY.md`: histórico, diretrizes de contribuição e política de segurança.

## Instalação rápida

Instale diretamente do GitHub usando o Skills CLI:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence
```

O repositório disponibiliza a skill em `skills/devexcellence/`, com seus checklists, referências e modelos de relatório no mesmo pacote. Essa estrutura é descoberta pelo Skills CLI. O instalador permite selecionar um agente de IA compatível e o escopo da instalação. Consulte [docs/INSTALLATION.md](docs/INSTALLATION.md) para orientações sobre autenticação em repositórios privados, instalação global e alternativas manuais.

## CLI complementar

O CLI 0.1.0 funciona com Node.js 20+ e não possui dependências de runtime. Execute a partir da raiz:

```bash
node cli/bin/devexcellence.js help
node cli/bin/devexcellence.js check
node cli/bin/devexcellence.js init
node cli/bin/devexcellence.js score
```

O `check` executa verificações locais heurísticas; `init` gera uma avaliação e `score` calcula o Quality Score com base nas evidências declaradas. Consulte [docs/CLI.md](docs/CLI.md) e [cli/README.md](cli/README.md). O CLI não foi publicado no npm.

## Escopo e limitações atuais

- A skill pode orientar projetos em diferentes stacks, mas as verificações reais dependem das ferramentas instaladas e das permissões concedidas.
- O CLI 0.1.0 foi implementado como camada local complementar; não executa SAST/DAST, pentest, scanner completo de dependências ou testes de carga.
- A documentação define um protocolo opcional multiagente; o repositório não inclui runtime executável de orquestração. Um único agente deve conseguir executar todo o fluxo.
- Uma meta de 5.000 usuários simultâneos precisa ser definida como uma carga mensurável e comprovada por testes de carga. Ela não é garantida apenas por uma revisão de arquitetura.
- O repositório permanece privado durante o desenvolvimento inicial. Antes de torná-lo público, escolha uma licença open source explícita e revise os termos de contribuição.

## Como contribuir

Consulte [CONTRIBUTING.md](CONTRIBUTING.md). As contribuições devem ser objetivas, reproduzíveis e documentadas, sem incluir código proprietário, credenciais ou dados pessoais reais.
