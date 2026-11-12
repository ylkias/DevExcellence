# Testing checklist

## Estratégia e cobertura funcional

- [ ] Acceptance criteria are expressed as observable outcomes.
- [ ] Test strategy matches risk and architecture.
- [ ] Unit tests cover business rules and edge cases.
- [ ] Integration tests cover persistence and service boundaries.
- [ ] Contract tests cover important API/integration agreements.
- [ ] E2E tests cover critical user journeys.
- [ ] Negative tests cover invalid input and denied access.
- [ ] Regression tests reproduce fixed defects.
- [ ] Test data is deterministic and contains no real sensitive data.
- [ ] Tests clean up resources and do not depend on execution order.
- [ ] Coverage is interpreted alongside test quality, not as a guarantee.

## Auditoria de testes produzidos por IA

- [ ] Trate arquivos de teste gerados por IA como código não confiável até revisão e execução.
- [ ] Confirme que cada caso testa um comportamento/critério de aceite observável.
- [ ] Rejeite testes vazios, sem assertions, com assertions tautológicas ou que apenas verificam que uma função foi chamada.
- [ ] Avalie se mocks substituem toda a lógica que deveria ser testada; mantenha testes unitários isolados quando apropriado, mas complemente com integração/contrato.
- [ ] Identifique testes ignorados, pendentes, TODOs e snapshots usados como única evidência.
- [ ] Revise cenários negativos, limites, valores nulos/vazios, permissões negadas, concorrência e falhas externas conforme aplicável.
- [ ] Confirme que o teste falha quando o comportamento esperado é deliberadamente quebrado.
- [ ] Para código crítico, use mutation testing quando possível e avalie mutantes sobreviventes.
- [ ] Registre comando, versão do runtime/framework, resultado real, duração, cobertura e limitações.
- [ ] Não considere um teste aprovado apenas porque foi gerado, compilou ou passou uma vez.
- [ ] Não tente classificar autoria humana/IA como fato baseado somente no conteúdo do arquivo; avalie qualidade e efetividade.

## Execução e evidência

- [ ] TDD is used where practical for behavior changes.
- [ ] BDD/ATDD scenarios clarify complex behavior and acceptance.
- [ ] Commands, results, skipped tests, and limitations are recorded.
- [ ] CI executes required suites and fails on configured regressions.
