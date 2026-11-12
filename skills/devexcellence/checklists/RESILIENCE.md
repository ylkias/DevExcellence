# Resiliência e tratamento de falhas

- [ ] Timeouts explícitos existem para chamadas de rede, banco, filas e processos externos.
- [ ] Retries são limitados, usam backoff e jitter e só são aplicados quando a operação permite repetição segura.
- [ ] Operações não idempotentes não são repetidas sem proteção contra duplicidade.
- [ ] Circuit breaker, bulkhead ou isolamento equivalente é usado quando reduz propagação de falhas.
- [ ] Cancelamento e timeout interrompem trabalho desnecessário e liberam recursos.
- [ ] Filas possuem limites, backpressure, política de retry e dead-letter queue quando aplicável.
- [ ] Erros transitórios são diferenciados de erros permanentes.
- [ ] Serviços degradam de forma controlada quando uma dependência fica indisponível.
- [ ] Processos longos são retomáveis ou possuem estratégia explícita de recuperação.
- [ ] Falhas parciais não deixam transações, registros ou estados inconsistentes.
- [ ] Health checks distinguem processo vivo de serviço pronto para receber tráfego.
- [ ] Logs e métricas permitem identificar a causa sem expor segredos.
- [ ] Testes simulam indisponibilidade, latência, timeout, resposta inválida e recuperação de dependências.

## Critério de aceite

Falhas previsíveis são isoladas, limitadas e observáveis; a aplicação não entra em loop infinito nem propaga indisponibilidade sem controle.
