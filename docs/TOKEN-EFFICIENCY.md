# Redução de consumo de tokens

A DevExcellence agora adota uma estratégia de **contexto incremental**. Em vez de carregar todos os checklists em qualquer tarefa, o agente deve partir do diff, dos arquivos relacionados e dos riscos identificados, ampliando a leitura apenas quando necessário.

- Guia completo: [protocolo de eficiência de contexto](../skills/devexcellence/references/TOKEN-EFFICIENCY.md).
- Seleção manual dos módulos: [MODULE-SELECTION.md](MODULE-SELECTION.md).
- Planejamento automático: `node cli/bin/devexcellence.js context-plan`.

A estimativa apresentada pelo CLI é aproximada e não equivale ao uso real de tokens. Para medir consumo efetivo, use as métricas oficiais do provedor de LLM.
