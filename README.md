# DevExcellence

**Uma skill universal de engenharia de software, independente de LLM, para entregar software melhor, mais seguro e confiável.**

A DevExcellence ajuda desenvolvedores e agentes de IA a compreender uma base de código, planejar alterações, implementar soluções completas, validar qualidade, reduzir riscos de segurança e apresentar evidências dos resultados. Foi projetada para funcionar com diferentes provedores de LLM, editores, linguagens, frameworks e ambientes de desenvolvimento.

> Status: desenvolvimento inicial. A skill orienta o trabalho de engenharia; ferramentas determinísticas e verificações de CI fornecem evidências reproduzíveis. Nenhum teste ou scanner deve ser declarado como aprovado sem ter sido realmente executado.

## Propósito principal

O produto principal é a **skill**: um conjunto portátil de instruções e fluxos de engenharia que pode ser instalado em agentes de IA compatíveis. O CLI é complementar: executa verificações determinísticas e ajuda a aplicar regras nos fluxos locais e de CI/CD.

A DevExcellence deve continuar simples de adotar e útil tanto para desenvolvedores individuais quanto para equipes. Não deve se transformar em um framework excessivamente complexo, que adicione etapas desnecessárias, aumente o consumo de tokens ou crie dependência de tecnologias específicas.

## O que ela ajuda a fazer

- Compreender um projeto existente antes de realizar alterações.
- Validar requisitos, critérios de aceitação e arquitetura antes da geração de código.
- Identificar lógicas incompletas, código morto, atalhos inseguros, duplicações e código obsoleto.
- Revisar autenticação, autorização, sessões, funções, permissões e trilhas de auditoria.
- Identificar riscos em rotas e APIs, endpoints públicos indevidos, ausência de validação, paginação e limites de requisições.
- Revisar modelagem de banco de dados, relacionamentos, índices, queries parametrizadas, transações, ciclo de vida das conexões e migrations.
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

- `SKILL.md`: instruções centrais da skill, independentes de provedor.
- `checklists/`: listas de verificação de qualidade, segurança, APIs, banco de dados, testes e performance.
- `docs/`: documentação de instalação, arquitetura, modos de operação, metodologias, multiagentes, relatórios e escalabilidade.
- `templates/`: modelos de relatório de auditoria, plano de implementação e registro de achados.
- `examples/`: exemplos de achados e prompts reutilizáveis.
- `cli/`: escopo planejado do CLI determinístico.
- `CHANGELOG.md`, `CONTRIBUTING.md` e `SECURITY.md`: histórico, diretrizes de contribuição e política de segurança.

## Instalação rápida

Instale diretamente do GitHub usando o Skills CLI:

```bash
npx skills add https://github.com/ylkias/DevExcellence --skill devexcellence
```

O repositório contém o `SKILL.md` na raiz, com o identificador `devexcellence`. O instalador permite selecionar um agente de IA compatível e o escopo da instalação. Consulte [docs/INSTALLATION.md](docs/INSTALLATION.md) para orientações sobre autenticação em repositórios privados, instalação global e alternativas manuais.

## Escopo e limitações atuais

- A skill pode orientar projetos em diferentes stacks, mas as verificações reais dependem das ferramentas instaladas e das permissões concedidas.
- O CLI está planejado como uma camada determinística independente e ainda não foi implementado.
- A execução multiagente é opcional; um único agente deve conseguir executar todo o fluxo.
- Uma meta de 5.000 usuários simultâneos precisa ser definida como uma carga mensurável e comprovada por testes de carga. Ela não é garantida apenas por uma revisão de arquitetura.
- O repositório permanece privado durante o desenvolvimento inicial. Antes de torná-lo público, escolha uma licença open source explícita e revise os termos de contribuição.

## Como contribuir

Consulte [CONTRIBUTING.md](CONTRIBUTING.md). As contribuições devem ser objetivas, reproduzíveis e documentadas, sem incluir código proprietário, credenciais ou dados pessoais reais.
