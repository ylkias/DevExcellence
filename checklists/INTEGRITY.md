# Integridade e consistência dos dados

- [ ] Chaves primárias, estrangeiras, constraints e regras de unicidade representam as invariantes do negócio.
- [ ] Duplicidade é tratada no backend e, quando aplicável, garantida por constraint no banco; não depende apenas de validação visual.
- [ ] Operações que alteram múltiplos registros usam transações com limites claros.
- [ ] Atualizações concorrentes possuem estratégia adequada: optimistic locking, controle de versão, lock ou mecanismo equivalente.
- [ ] Operações sujeitas a repetição usam idempotency key ou desenho idempotente quando apropriado.
- [ ] Retries não duplicam pagamentos, pedidos, notificações ou efeitos externos.
- [ ] Exclusões verificam dependências, integridade referencial, retenção e política de soft delete.
- [ ] Processos assíncronos tratam entrega duplicada, reordenação e falhas parciais.
- [ ] Eventos e integrações críticas possuem estratégia para consistência entre banco e mensageria, quando aplicável.
- [ ] Regras de negócio são protegidas no servidor e no banco, não somente na interface.
- [ ] Testes cobrem duplicidade, concorrência, race conditions, rollback, repetição e falhas parciais.
- [ ] Integridade é revalidada depois de migrations e importações em massa.

## Critério de aceite

Nenhuma operação crítica pode gerar estado impossível, duplicidade indevida ou perda silenciosa de dados sob repetição, concorrência ou falha.
