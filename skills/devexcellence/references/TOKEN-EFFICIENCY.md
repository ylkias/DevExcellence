# Eficiência de contexto e consumo de tokens

## Objetivo

Este protocolo é aplicado automaticamente pelo agente após a instalação da DevExcellence. O usuário não precisa executar `context-plan` nem outro comando da DevExcellence para ativar a economia de contexto.

A regra padrão é **incremental por evidência**: começar pelo pedido, alterações e dependências diretas; carregar checklists e documentação adicionais apenas quando houver relação com o risco.

## Operação automática do agente

1. Leia as instruções do agente e do projeto necessárias à tarefa.
2. Quando houver acesso ao terminal, identifique o estado e o escopo com `git status --short`, `git diff --name-only HEAD` e `git ls-files --others --exclude-standard`.
3. Leia primeiro os arquivos alterados, imports/consumidores diretos, contratos e testes relacionados.
4. Selecione checklists por domínio usando a tabela em `SKILL.md`; consulte `references/MODULE-SELECTION.md` quando houver múltiplos domínios ou perfil incerto.
5. Amplie a investigação somente quando o código, as dependências, os fluxos de dados ou a evidência apontarem risco transversal.
6. Execute verificações direcionadas durante a mudança e uma validação final proporcional ao risco.
7. Resuma resultados e evidências. Não reproduza logs extensos ou o conteúdo integral dos arquivos.

Se o agente não tiver acesso a Git/terminal, ele deve trabalhar com os arquivos e informações disponíveis, informar a limitação e não solicitar ao usuário um comando DevExcellence adicional.

## Modos de análise

| Modo | Uso | Comportamento |
|---|---|---|
| Incremental (padrão) | Correções e mudanças localizadas | Diff, arquivos relacionados, testes próximos e checklists pertinentes |
| Ampliado | Mudança transversal, dados, identidade, integrações ou risco relevante | Incremental + análise dos domínios afetados e consumidores |
| Auditoria ampla | Solicitação explícita, novo sistema, incidente ou release crítico | Inventário e módulos aplicáveis, com escopo e cobertura declarados |

A economia de tokens nunca justifica pular autorização, isolamento multi-tenant, integridade de dados, testes de regressão pertinentes ou gates de produção.

## Ferramentas locais antes de raciocínio repetitivo

- Prefira `rg`, `git grep`, busca de símbolos, diffs e trechos específicos a despejar arquivos/diretórios inteiros.
- Use ferramentas determinísticas para lint, typecheck, testes e scans. Interprete a saída em vez de reconstruir manualmente o trabalho que a ferramenta já fez.
- Limite a saída a falhas, avisos relevantes e contexto próximo.
- Não repita varreduras se entradas, versão, configuração e escopo não mudaram.
- Não use agentes especialistas em tarefas pequenas; delegue apenas tarefas independentes com benefício objetivo.

## Reuso de contexto em tarefas longas

Para tarefas que atravessam sessões, pode ser útil manter um resumo operacional curto em `.devexcellence/WORKING-STATE.md`. Inclua apenas objetivo, critérios de aceite, decisões confirmadas, arquivos relevantes, pendências, verificações executadas e riscos. Atualize-o quando houver mudança. Não copie conversas inteiras, logs, código-fonte ou segredos. Não é requisito de instalação nem de uso.

## Seleção de modelos e cache

Quando o host oferecer escolha de modelos, reserve modelos de maior capacidade para arquitetura complexa, segurança crítica e decisões ambíguas. Use modelos menores para classificação, extração e tarefas mecânicas somente quando a qualidade for suficiente.

Cache de prompt/contexto depende de suporte do provedor e de prefixos repetidos. Não presuma disponibilidade, elegibilidade ou economia; utilize métricas oficiais de uso quando existirem.

## Medição

- Tokens e custo reais devem vir das métricas oficiais do modelo/provedor.
- Compare tarefas equivalentes pelo mesmo escopo e modelo.
- A estimativa do CLI usa bytes/4 apenas para comparar o tamanho dos checklists; não é uma contagem de tokens do modelo.
- Não prometa percentual de redução sem linha de base e comparação observável.

## CLI opcional para mantenedores

O comando `context-plan` é um utilitário de desenvolvimento do próprio repositório DevExcellence. Não faz parte do fluxo de instalação/uso da skill e não deve ser solicitado ao usuário final.

Quando o repositório DevExcellence estiver clonado e um mantenedor desejar inspecionar a seleção manualmente:

```bash
node cli/bin/devexcellence.js context-plan
node cli/bin/devexcellence.js context-plan --file src/api/orders.ts --json
node cli/bin/devexcellence.js context-plan --all
```

## Limites

- A seleção incremental é heurística; caminhos não revelam todos os riscos.
- O protocolo não mede o consumo do provedor nem altera limites de tokens.
- Se houver incerteza relevante, amplie a análise ou peça esclarecimento em vez de adivinhar.
