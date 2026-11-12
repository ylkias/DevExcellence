# Protocolo opcional de orquestração multiagente

A DevExcellence define um protocolo neutro de coordenação que pode ser aplicado por um host LLM/agent compatível. Este repositório ainda **não contém um runtime executável de agentes**, scheduler, barramento de mensagens ou integração nativa com provedores. Um único agente deve conseguir executar o fluxo completo.

## Papéis

- **Coordenador:** delimita escopo, plano, delegação, consolidação, revisão final e relatório.
- **Arquitetura:** requisitos, limites, dependências, compatibilidade e desenho.
- **Qualidade de código:** lógica incompleta, duplicação, complexidade e manutenibilidade.
- **Segurança:** ameaças, segredos, autenticação, autorização e riscos OWASP.
- **API:** rotas, contratos, validação, paginação, rate limit e exposição.
- **Banco de dados:** schema, relacionamentos, transações, integridade, índices e ciclo de conexões.
- **Testes:** TDD/BDD/ATDD, regressão, auditoria de arquivos gerados por IA, assertions, mocks, casos negativos/borda e mutation testing.
- **Performance:** perfilamento, concorrência, cache, gargalos e desenho de carga.
- **Frontend/acessibilidade:** responsividade, fluxos, semântica e acessibilidade.
- **Privacidade:** minimização, retenção, exposição e controles de dados pessoais.
- **Resiliência/observabilidade:** falhas parciais, timeout, retries, logs, métricas, traces e SLO.
- **Supply chain/entrega:** dependências, lockfiles, SBOM, CI/CD, rollout e rollback.
- **Backup/recuperação/i18n:** RPO/RTO, restauração, timezone, moeda, Unicode e formatos.

## Contrato

Use [AGENT-TASK.md](../templates/AGENT-TASK.md) para delegar e [AGENT-RESULT.md](../templates/AGENT-RESULT.md) para consolidar resultados. Cada tarefa define ID, papel, contexto, escopo, arquivos permitidos, critérios de aceite, riscos, permissões e limite de recursos.

Cada resultado deve trazer:
- escopo executado e não executado;
- verificações realmente executadas e evidência reproduzível;
- achados com ID, severidade, confiança, localização, impacto e recomendação;
- alterações realizadas;
- hipóteses, limitações e próxima ação.

## Regras de coordenação

1. Delegar somente trabalhos separáveis e suficientemente grandes.
2. Priorizar revisões paralelas somente leitura.
3. Definir propriedade dos arquivos antes de permitir edição concorrente.
4. Consolidar achados duplicados e resolver conflitos por evidência.
5. Não executar scanners caros, testes destrutivos ou alterações remotas em paralelo sem coordenação.
6. O coordenador valida o diff final e mantém responsabilidade pelo relatório.
7. Não repassar segredos, dados pessoais ou arquivos sensíveis sem necessidade e autorização.

## Eficiência de tokens

- Enviar contexto mínimo necessário e referências de arquivos/linhas.
- Reutilizar resultados existentes enquanto o estado do código não mudar.
- Evitar delegar duas vezes a mesma verificação.
- Retornar achados estruturados, não longas narrativas.
- Solicitar ao especialista que liste explicitamente o que não verificou.

## Limitação

A execução real depende dos recursos do agente hospedeiro, das permissões e do número de agentes disponíveis. A documentação descreve um protocolo, não promete execução autônoma multiagente em qualquer LLM ou editor.
