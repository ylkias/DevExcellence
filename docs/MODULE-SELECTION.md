# Seleção adaptativa de verificações

A DevExcellence deve aplicar os controles adequados ao contexto. O objetivo é melhorar a entrega sem transformar cada tarefa em uma auditoria extensa e desnecessária.

## 1. Identifique o contexto

Antes de escolher os módulos, identifique:
- Tipo de projeto: biblioteca, API, backend, web, mobile, desktop, worker, dados ou infraestrutura.
- Stack e ferramentas realmente presentes.
- Dados tratados e sua sensibilidade.
- Perfis de usuário, permissões e modelo multi-tenant.
- Exposição à internet e integrações externas.
- Criticidade do serviço e impacto de indisponibilidade.
- Ambiente e processo de entrega.

## 2. Aplique as verificações-base

Em qualquer alteração de software, avaliar qualidade lógica, segurança pertinente, testes, tratamento de falhas, dependências quando aplicável e documentação. O alcance deve ser proporcional ao risco.

## 3. Selecione módulos adicionais

| Contexto identificado | Checklists sugeridos |
|---|---|
| API/backend | API, SECURITY, DATABASE, INTEGRITY, RESILIENCE, OBSERVABILITY |
| Web com interface | FRONTEND-UX, FORMATTING, API, SECURITY, INTERNATIONALIZATION |
| Mobile | FRONTEND-UX, FORMATTING, SECURITY, RESILIENCE, INTERNATIONALIZATION |
| SaaS multiempresa | SECURITY, DATABASE, INTEGRITY, PRIVACY-LGPD, API, OBSERVABILITY |
| Financeiro/transacional | INTEGRITY, DATABASE, SECURITY, RESILIENCE, TESTING |
| Filas, jobs ou mensageria | INTEGRITY, RESILIENCE, OBSERVABILITY, PERFORMANCE |
| Dados pessoais | PRIVACY-LGPD, SECURITY, OBSERVABILITY, BACKUP-RECOVERY |
| Build e distribuição de artefatos | SUPPLY-CHAIN, DELIVERY, SECURITY |
| Alta disponibilidade | RESILIENCE, OBSERVABILITY, BACKUP-RECOVERY, PERFORMANCE |
| Multi-país | INTERNATIONALIZATION, FORMATTING, DATABASE, API |
| Implantação em produção | DELIVERY, SUPPLY-CHAIN, OBSERVABILITY, BACKUP-RECOVERY |

A seleção é orientativa. Justifique módulos adicionais e exclusões relevantes.

## 4. Estados das verificações

Use estados distintos:
- **Aprovado:** verificação aplicável foi executada e passou.
- **Reprovado:** falha foi confirmada.
- **Não verificado:** não há evidência suficiente ou a verificação não foi executada.
- **Bloqueado:** falta permissão, ferramenta, dependência ou ambiente.
- **Não aplicável:** não faz sentido para o projeto, com justificativa.

Não transforme ausência de ferramenta ou evidência em aprovação.

## 5. Quality Score

Use `checklists/QUALITY-SCORE.md` somente quando o escopo e as evidências permitirem comparação responsável. Apresente pontuação por dimensão, cobertura da avaliação, achados por severidade e itens não verificados.

Achados críticos abertos bloqueiam aprovação para release, independentemente do score. Score não é certificação, atestado de segurança nem garantia de qualidade.

## 6. Eficiência

- Prefira análise incremental do diff para mudanças pequenas.
- Execute auditoria ampla em novos projetos, releases relevantes ou quando solicitada.
- Reutilize resultados válidos de ferramentas; confirme versão, configuração e escopo.
- Não invoque especialistas multiagentes em tarefas triviais.
- Não reduza a cobertura de segurança ou correção apenas para economizar tokens.
