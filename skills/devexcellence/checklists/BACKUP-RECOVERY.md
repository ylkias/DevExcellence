# Backup, restauração e recuperação de desastre

- [ ] Dados críticos e dependências necessárias à recuperação estão inventariados.
- [ ] RPO e RTO são definidos pelo negócio para cada sistema crítico.
- [ ] Backups possuem frequência, retenção e responsáveis definidos.
- [ ] Backups são criptografados e o acesso é restrito.
- [ ] Cópias relevantes são mantidas separadas do ambiente principal e protegidas contra alteração/exclusão indevida.
- [ ] Integridade dos backups é verificada.
- [ ] Restauração é testada periodicamente em ambiente isolado.
- [ ] Recuperação inclui banco, arquivos, chaves/configurações necessárias e dependências da aplicação.
- [ ] Procedimentos de recuperação são documentados e atualizados após mudanças arquiteturais.
- [ ] Migrations e compatibilidade entre versões são consideradas no plano de restauração.
- [ ] Restauração não sobrescreve produção sem aprovação explícita e plano validado.
- [ ] Evidências dos testes de restore incluem duração, resultado e limitações.

## Critério de aceite

A organização demonstra, por teste de restauração, que consegue recuperar os serviços dentro dos objetivos de RPO/RTO definidos. Ter um arquivo de backup não comprova recuperabilidade.
