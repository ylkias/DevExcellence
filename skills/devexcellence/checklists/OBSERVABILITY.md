# Observabilidade, logs, métricas e rastreabilidade

- [ ] Logs são estruturados e possuem níveis coerentes.
- [ ] Requisições relacionadas podem ser correlacionadas por request/correlation ID.
- [ ] Métricas cobrem latência, tráfego, erros e saturação nos serviços críticos.
- [ ] Traces distribuídos são usados quando a arquitetura e o custo justificam.
- [ ] Health e readiness checks refletem dependências essenciais sem expor detalhes internos.
- [ ] Alertas possuem limiar, severidade, responsável e orientação de resposta.
- [ ] Erros recorrentes e operações lentas podem ser localizados por módulo/endpoint.
- [ ] Eventos de segurança e alterações sensíveis geram trilha de auditoria protegida.
- [ ] Logs não armazenam senhas, tokens, cookies, chaves ou dados pessoais desnecessários.
- [ ] Dados de log têm retenção, acesso e descarte definidos.
- [ ] Relógios e timestamps são consistentes e armazenados com contexto de fuso quando necessário.
- [ ] Métricas e traces não criam cardinalidade excessiva nem custo descontrolado.
- [ ] SLI/SLO e error budget são definidos para serviços que exigem metas de confiabilidade.
- [ ] Procedimentos operacionais permitem investigar incidentes usando evidências.

## Critério de aceite

Falhas e degradações relevantes podem ser detectadas, correlacionadas e investigadas sem depender de acesso informal ao banco ou de logs contendo dados sensíveis.
