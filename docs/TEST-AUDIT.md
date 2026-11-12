# Auditoria de qualidade de arquivos de teste

O CLI inclui uma auditoria estática de arquivos de teste, executada por padrão em `devexcellence check`. Seu propósito é identificar testes potencialmente frágeis, vazios ou enganosos — inclusive testes escritos por agentes de IA.

## O que é inspecionado

- Convenções de arquivos de teste JavaScript/TypeScript, Python, Go, Java/Kotlin, C#, PHP e Ruby.
- Casos de teste reconhecidos e quantidade de assertions.
- Casos de teste sem assertions.
- Assertions genéricas/fracas e comparações potencialmente tautológicas.
- Testes ignorados, desabilitados ou pendentes.
- Testes que parecem validar somente chamadas de mocks.
- Ausência de cenários negativos e casos de borda reconhecíveis.
- Marcadores TODO/FIXME/XXX em arquivos de teste.
- Arquivos de teste que não puderam ser lidos ou ultrapassaram o limite configurado.

## Códigos de achados

| ID | Sinal |
|---|---|
| TEST-AI-000 | Nenhum arquivo de teste reconhecido |
| TEST-AI-001 | Arquivo de teste sem casos reconhecidos |
| TEST-AI-002 | Casos sem assertions reconhecidas |
| TEST-AI-003 | Assertions possivelmente fracas |
| TEST-AI-004 | Possível assertion tautológica |
| TEST-AI-005 | Testes ignorados/desabilitados |
| TEST-AI-006 | Validação baseada principalmente em mocks |
| TEST-AI-007 | Cenários negativos não reconhecidos |
| TEST-AI-008 | Casos de borda não reconhecidos |
| TEST-AI-009/010 | Limite de tamanho ou falha de leitura |
| TEST-AI-011 | TODO/FIXME/XXX |
| TEST-AI-012 | Caso e assertion reconhecidos (informativo) |

Os sinais de ausência de cenários negativos/borda são recomendações heurísticas, pois nem todo arquivo de teste precisa cobrir todos os tipos de cenário. A detecção depende dos nomes e padrões de sintaxe suportados.

## Uso

```bash
node cli/bin/devexcellence.js check
node cli/bin/devexcellence.js check --json
node cli/bin/devexcellence.js check --fail-on high
node cli/bin/devexcellence.js check --no-test-audit
```

A auditoria é ativada por padrão. Para tornar achados de severidade alta bloqueantes, use `--fail-on high`. O limiar padrão do CLI é `critical`, evitando bloquear automaticamente um projeto por heurísticas de teste que exigem revisão humana.

## Limitações importantes

A auditoria é estática. Ela não executa os testes, não calcula line/branch coverage, não faz mutation testing e não prova que um teste detecta defeitos. Um teste que compila ou passa pode ser inútil; uma assertion reconhecida também pode validar a coisa errada.

Não há método confiável para inferir autoria humana ou IA somente pelo texto do teste. O foco é avaliar propriedades observáveis de qualidade. Para evidência forte, execute a suite e a cobertura no CI, valide mutações deliberadas e revise se os testes cobrem critérios de aceite, integrações e regressões.
