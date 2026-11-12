# Quality Score — metodologia de pontuação

## Objetivo

O Quality Score resume evidências de qualidade para facilitar acompanhamento e priorização. Não substitui achados individuais, revisão humana ou critérios de bloqueio de release.

## Dimensões e pesos padrão

Os pesos são ponto de partida e podem ser ajustados por perfil de aplicação, desde que a alteração seja declarada no relatório.

| Dimensão | Peso padrão |
|---|---:|
| Segurança e controle de acesso | 20 |
| Integridade e consistência dos dados | 15 |
| Qualidade de código e arquitetura | 15 |
| Testes e validação | 15 |
| APIs e contratos | 10 |
| Performance e escalabilidade | 10 |
| Resiliência e confiabilidade | 5 |
| Privacidade e proteção de dados | 5 |
| Operação, observabilidade e recuperação | 5 |
| **Total** | **100** |

## Regras de cálculo

1. Cada dimensão recebe nota de 0 a 100 com base somente em verificações aplicáveis e efetivamente avaliadas.
2. O score final é a soma ponderada das dimensões avaliadas, renormalizada pelos pesos aplicáveis.
3. Itens não aplicáveis são excluídos com justificativa; não podem ser marcados como aprovados.
4. Itens não executados ou bloqueados não recebem nota de aprovação. A cobertura de avaliação deve ser mostrada separadamente.
5. A nota deve vir acompanhada da cobertura: peso avaliado dividido pelo peso total aplicável.
6. Se a cobertura for insuficiente para uma conclusão confiável, o resultado é **Provisório**, mesmo que o score numérico seja alto.
7. Achado crítico aberto bloqueia a aprovação para release independentemente do score. Achados altos exigem correção ou aceitação formal de risco por responsável autorizado.
8. Não compare scores de execuções com escopos, perfis ou pesos diferentes sem explicar a diferença.

## Faixas de interpretação

| Score | Interpretação |
|---|---|
| 90–100 | Forte — sem substituir gates críticos |
| 80–89 | Bom — melhorias recomendadas |
| 70–79 | Atenção — correções priorizadas |
| 0–69 | Insuficiente — revisão e correções necessárias |

A faixa é informativa, não uma certificação.

## Relatório obrigatório

Apresente score global, score por dimensão, cobertura da avaliação, quantidade de achados por severidade, itens não verificados, pesos/perfil usados e bloqueios de release.

Nunca elevar a nota por ocultar achados, reduzir escopo silenciosamente ou deixar verificações sem execução.
