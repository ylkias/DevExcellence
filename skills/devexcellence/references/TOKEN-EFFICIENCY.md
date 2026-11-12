# Eficiência de contexto e consumo de tokens

## Objetivo

Reduzir leitura redundante, contexto irrelevante, saídas longas e chamadas desnecessárias sem reduzir segurança, correção, rastreabilidade ou qualidade dos testes. A regra padrão é **incremental por evidência**: carregar apenas o contexto necessário para a tarefa atual e ampliar a análise quando surgirem sinais concretos de risco.

## Modos de operação

| Modo | Quando usar | Escopo |
|---|---|---|
| **Incremental** (padrão) | Correção, melhoria localizada ou pequena funcionalidade | Diff, arquivos relacionados, testes próximos e checklists selecionados |
| **Padrão ampliado** | Mudança que cruza módulos, autenticação, dados, integrações ou contratos | Incremental + arquitetura e módulos dos domínios atingidos |
| **Auditoria ampla** | Solicitada pelo responsável, novo sistema, release crítico ou evidência de risco sistêmico | Inventário completo e checklists aplicáveis; não é o padrão de toda tarefa |

Não transforme uma correção pequena em auditoria de todo o repositório. Também não reduza uma auditoria solicitada a uma leitura superficial.

## Protocolo de contexto

1. **Instruções primeiro:** leia as instruções do agente e do projeto. Em sessões contínuas, não releia arquivos estáveis sem motivo; confira se foram alterados.
2. **Escopo pelo Git:** use `git status --short`, `git diff --stat` e `git diff -- <arquivos>` para identificar o que mudou. Inclua arquivos novos não rastreados.
3. **Dependências diretas:** leia o arquivo alterado, os contratos/imports que determinam seu comportamento e os testes relacionados. Não percorra diretórios inteiros por padrão.
4. **Checklists sob demanda:** carregue os módulos sugeridos por `context-plan` ou por `references/MODULE-SELECTION.md`. Não abra todos os checklists automaticamente.
5. **Leitura progressiva:** comece por nomes, estrutura, assinaturas e trechos relevantes. Leia o arquivo completo somente quando a lógica ou o risco exigir.
6. **Ampliar com evidência:** amplie o escopo se o diff revelar dependência transversal, autenticação/autorização, dados sensíveis, migrations, concorrência, integração externa, fluxo de produção ou falha sistêmica.
7. **Reutilizar evidências:** não execute novamente uma verificação cujo escopo, versão, configuração e entradas não mudaram. Registre a evidência e invalide-a quando qualquer condição relevante mudar.

## Ferramentas locais antes de raciocínio repetitivo

- Prefira `rg`, busca de símbolos, `git grep`, listagens filtradas e testes direcionados a despejar arquivos ou diretórios completos.
- Use lint, typecheck, testes, scanners e scripts determinísticos para obter fatos. Peça ao modelo para interpretar falhas e decidir correções, não para reimplementar verificações que a ferramenta já executa.
- Limite saídas: resuma o resultado, mostre somente falhas e contexto próximo. Não cole logs completos quando poucas linhas explicam o problema.
- Após editar, examine `git diff` e execute a verificação mais estreita pertinente; no gate final, rode a matriz de validação exigida pelo risco.
- Não peça ao modelo que repita código, arquivos, logs, planos ou requisitos já presentes no contexto.

## Reuso de contexto em tarefas longas

Quando uma tarefa atravessar várias etapas ou sessões, mantenha um resumo operacional curto em `.devexcellence/WORKING-STATE.md`, se isso ajudar. Registre apenas:

- objetivo e critérios de aceite;
- arquitetura/decisões já confirmadas e arquivos relevantes;
- alterações concluídas e pendências;
- comandos e verificações executadas, resultado e validade;
- riscos, hipóteses e decisões que ainda precisam de confirmação.

Atualize o resumo incrementalmente. Não copie conversas inteiras, código-fonte, logs ou segredos. Não trate uma nota antiga como verdade sem verificar se os arquivos/versões continuam iguais. O arquivo é opcional e deve ficar fora de commits, salvo decisão explícita do projeto.

## Delegação e modelos

- Use um único agente por padrão. Delegue somente tarefas realmente paralelizáveis e independentes, ou quando houver benefício claro de especialização.
- Evite que dois agentes leiam o mesmo repositório inteiro ou produzam relatórios sobrepostos.
- Quando a plataforma oferecer escolha de modelo, reserve modelos de maior capacidade para arquitetura complexa, segurança crítica, incidentes ambíguos e revisão final de alto risco. Use modelos menores para classificação, extração, formatação e tarefas mecânicas, após validar sua adequação.
- Não faça chamadas de modelo para operações determinísticas simples que podem ser executadas localmente.
- Cache de prompt/contexto só deve ser considerado quando o provedor oferecer suporte e houver prefixos repetidos; sua disponibilidade, elegibilidade e cobrança variam por provedor.

## Medição

- Registre tokens de entrada/saída e custo a partir de métricas oficiais de uso do provedor, quando disponíveis.
- Compare tarefas equivalentes pelo mesmo escopo e modelo. Acompanhe tokens por tarefa, chamadas de modelo, retrabalho e tempo de execução.
- O CLI oferece apenas uma **estimativa aproximada do tamanho dos checklists** baseada em bytes/4. Isso não representa a contagem real de tokens do modelo.
- Não prometa percentual de economia sem medir uma linha de base e comparar execuções equivalentes.

## Comandos

Execute na raiz do repositório DevExcellence:

```bash
# Planeja o contexto a partir de arquivos staged/unstaged e novos no Git
node cli/bin/devexcellence.js context-plan

# Informa explicitamente os arquivos da tarefa
node cli/bin/devexcellence.js context-plan --file src/api/orders.ts --file src/services/orders.ts --json

# Auditoria ampla: todos os checklists
node cli/bin/devexcellence.js context-plan --all
```

O plano é heurístico e deve ser revisado pelo agente. A lista selecionada é uma orientação para leitura, não uma autorização para ignorar risco percebido por outros sinais.

## Limites que não podem ser sacrificados

- Não omita validação de autorização, isolamento multi-tenant, integridade de dados ou tratamento de falhas apenas para gastar menos tokens.
- Não substitua testes de regressão pertinentes por uma resposta curta.
- Não marque verificações como aprovadas sem executá-las.
- Não reutilize resultados com escopo, versão, configuração ou entradas diferentes.
- Em caso de incerteza relevante, amplie o contexto ou peça esclarecimento em vez de adivinhar.
