# Infraestrutura, configuração e entrega

- [ ] Desenvolvimento, homologação e produção possuem configurações e credenciais separadas.
- [ ] Variáveis obrigatórias são validadas no início da aplicação.
- [ ] Segredos são fornecidos por mecanismo apropriado e não ficam em código, imagem ou log.
- [ ] Containers e processos executam com o menor privilégio necessário.
- [ ] Imagens e artefatos são reproduzíveis e possuem versões controladas.
- [ ] Health/readiness checks e encerramento gracioso estão implementados quando aplicável.
- [ ] TLS e configurações de rede seguem o risco e o ambiente.
- [ ] Recursos de CPU, memória, armazenamento, conexões e réplicas possuem limites adequados.
- [ ] Infraestrutura como código é revisada e não expõe credenciais.
- [ ] Pipeline executa build, testes e verificações de segurança aplicáveis.
- [ ] Branch protegida e checks obrigatórios são configurados quando o projeto usa esse fluxo.
- [ ] Release possui estratégia de rollout e rollback.
- [ ] Migrations são compatíveis com a sequência de deploy.
- [ ] Deploy em produção exige autorização adequada.
- [ ] Artefatos publicados podem ser rastreados à revisão/commit de origem.
- [ ] Arquivos/diretórios de testes, mocks, fixtures exclusivos de teste, configurações de frameworks e relatórios de cobertura permanecem no repositório/CI e são excluídos do artefato final de produção.
- [ ] Após o build e antes do deploy/publicação, o diretório exato do artefato passa em production-audit --path <diretório>; qualquer achado ou varredura incompleta bloqueia o release.
- [ ] Em builds Docker com COPY ., o .dockerignore exclui testes e artefatos de teste; a imagem final também é inspecionada após extração do filesystem.

## Critério de aceite

A entrega é reproduzível, rastreável e recuperável; configurações específicas de ambiente não ficam embutidas no código.
