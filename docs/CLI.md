# DevExcellence CLI

## Papel na arquitetura

A skill continua sendo o produto principal e pode ser usada sem CLI. O CLI 0.3.0 é uma camada local e determinística para coletar verificações reproduzíveis e calcular um score a partir de evidências estruturadas.

## Requisitos

- Node.js 20 ou superior.
- Nenhuma dependência de runtime adicional.
- Acesso local somente ao diretório de projeto indicado.

## Fluxo de uso

```bash
node cli/bin/devexcellence.js check
node cli/bin/devexcellence.js init
# preencher .devexcellence/assessment.json com evidências reais
node cli/bin/devexcellence.js score
```

`check` examina a estrutura básica do projeto, padrões heurísticos de segredos e qualidade estática dos arquivos de teste. `init` cria um modelo de avaliação; `score` calcula pontuação, cobertura e gate. Os controles do modelo começam como não avaliados intencionalmente.

## Quality Score

Pesos padrão: segurança 20; integridade 15; qualidade de código 15; testes 15; APIs 10; performance 10; resiliência 5; privacidade 5; operação/recuperação 5.

- Pass = 100%; partial = 50%; fail = 0%.
- Not applicable não entra no denominador e requer justificativa.
- Not assessed reduz cobertura e não é aprovação.
- Crítico aberto = BLOCKED.
- Alto aberto = REVIEW_REQUIRED.
- Cobertura abaixo do mínimo = PROVISIONAL.

O score usa somente controles avaliados e é renormalizado pelo peso avaliado. A ferramenta não audita a veracidade das evidências. O score não é certificação de segurança, qualidade ou conformidade.

## Auditoria dos arquivos de teste

A auditoria é executada por padrão e identifica casos sem assertions, assertions possivelmente fracas/tautológicas, testes ignorados, validações concentradas em mocks e ausência de cenários negativos/borda reconhecíveis. Use `--no-test-audit` para desativar ou `--fail-on high` para aplicar um limiar mais rigoroso. Detalhes e códigos dos achados: [TEST-AUDIT.md](TEST-AUDIT.md). A detecção é heurística e não identifica com confiabilidade a autoria IA/humana, não executa os testes, não mede cobertura e não realiza mutation testing.


## Gate obrigatório de produção

Depois de gerar o artefato, antes de publicar ou fazer deploy, audite exatamente o diretório que será implantado:

```bash
node cli/bin/devexcellence.js production-audit --path ./dist --json
```

O comando falha com exit code 1 quando encontra caminhos de teste ou não consegue concluir a varredura. Caminho ausente/inválido retorna 2. Não execute sobre a raiz do repositório: os testes devem permanecer no source control e na CI, mas não no artefato final. O relatório não deve ser salvo dentro do diretório auditado.

Quando um Dockerfile usar COPY ., mantenha regras de exclusão no .dockerignore (há um exemplo em examples/.dockerignore.production). Esse controle de contexto é preventivo; a auditoria do filesystem final é a verificação definitiva. Para uma imagem Docker, extraia o filesystem em diretório isolado antes de auditar.

## Segurança

Por padrão, não há rede, upload ou execução dos testes do projeto. A execução opcional de comandos só ocorre com `--run` e uma lista explícita de `argv` em `.devexcellence/config.json`; o processo usa `shell: false` e timeout limitado. Revise os comandos, seu impacto e as permissões antes de executá-los.

A detecção de segredos usa padrões locais, é sujeita a falsos positivos/negativos e nunca deve ser tratada como scanner especializado. Valores encontrados são omitidos dos relatórios.

## CI

O workflow em `.github/workflows/ci.yml` executa validação de sintaxe, testes unitários, verificação de integridade do pacote instalável e smoke test em Node.js 20/22.

## Limitações da versão 0.3.0

Não executa SAST/DAST, pentest, scanner completo de dependências, análise de container, teste de carga, ML ou orquestração de agentes. Não altera código do projeto. O CLI é opcional e não substitui avaliação técnica humana nem a skill.
