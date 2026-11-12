# Dependências e cadeia de suprimentos de software

- [ ] Dependências diretas e transitivas são inventariadas.
- [ ] Lockfile é versionado e consistente com o gerenciador de pacotes.
- [ ] Dependências sem uso, duplicadas, abandonadas ou excessivamente permissivas são avaliadas.
- [ ] Vulnerabilidades conhecidas são verificadas com ferramenta atualizada.
- [ ] Atualizações consideram impacto, compatibilidade, manutenção e risco de breaking changes.
- [ ] Origem e integridade de pacotes, imagens de containers e artefatos são verificadas.
- [ ] Segredos e tokens não são inseridos em manifests, scripts, imagens ou pipelines.
- [ ] Licenças são identificadas e avaliadas conforme a política da organização.
- [ ] SBOM em formato reconhecido (por exemplo, CycloneDX ou SPDX) é considerada para releases relevantes.
- [ ] Artefatos críticos possuem proveniência, assinatura ou mecanismo de verificação quando exigido.
- [ ] Imagens de container usam versões controladas e são analisadas.
- [ ] Pipelines não executam scripts não confiáveis com permissões elevadas.
- [ ] Dependabot, Renovate ou mecanismo equivalente possui revisão e política de atualização.
- [ ] Resultados de scanners são triados; presença de alerta não é automaticamente vulnerabilidade explorável.

## Critério de aceite

A origem, versão, integridade e risco das dependências relevantes são rastreáveis. Exceções possuem justificativa e responsável.
