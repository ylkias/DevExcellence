# DevExcellence CLI 0.4.0

CLI complementar à skill. Requer Node.js 20+ e não possui dependências de runtime.

## Executar a partir do repositório

```bash
node cli/bin/devexcellence.js help
node cli/bin/devexcellence.js check
node cli/bin/devexcellence.js init
node cli/bin/devexcellence.js score
```

Após clonar, os comandos podem ser encapsulados por script do projeto. O pacote ainda não está publicado no npm; não instale por `npx` como se fosse um pacote público.

## Comandos

### context-plan

Seleciona apenas os checklists aplicáveis aos arquivos alterados (staged, unstaged e novos no Git), mantendo QUALITY, SECURITY e TESTING como base. Use múltiplos `--file caminho` para informar escopo manual ou `--all` para incluir todos os módulos. A estimativa de tokens é heurística (bytes/4), não representa a contagem real do provedor.

```bash
node cli/bin/devexcellence.js context-plan
node cli/bin/devexcellence.js context-plan --file src/api/orders.ts --file src/services/orders.ts --json
node cli/bin/devexcellence.js context-plan --all
```

### check

Faz verificações locais e heurísticas: detecção de stack, lockfile, README, licença, estrutura de testes, auditoria estática dos arquivos de teste, CI, proteção de arquivos `.env`, arquivos de ambiente rastreados pelo Git e padrões comuns de possíveis segredos.

Opções: `--json`, `--output arquivo`, `--fail-on critical|high|medium|low|never`, `--run`, `--no-secrets`, `--no-test-audit`.

A auditoria de testes procura casos sem assertions, assertions fracas/tautológicas, testes ignorados, mocks excessivos e ausência de cenários negativos/limites reconhecíveis. Ela não consegue comprovar a autoria por IA nem a efetividade real dos testes. A varredura de segredos não é SAST/DAST, pentest ou auditoria completa de dependências. Valores que pareçam segredos não são incluídos no resultado. A varredura é heurística e limitada a arquivos de texto com tamanho controlado.

A auditoria estática dos arquivos de teste é executada por padrão; use `--fail-on high` para bloquear a partir da severidade alta ou `--no-test-audit` para desativá-la. Consulte [Auditoria de testes](../docs/TEST-AUDIT.md).

Comandos externos só podem ser executados com `--run` e configuração explícita em `.devexcellence/config.json`, usando arrays `argv`; shell não é utilizado. Exemplo: [devexcellence.config.json](../examples/devexcellence.config.json). Revise comandos e permissões antes de habilitá-los.

### init e score

`init` cria `.devexcellence/assessment.json` com os pesos padrão e controles em estado `not_assessed`. Preencha as evidências e status antes de executar `score`.

Estados: `pass` (100%), `partial` (50%), `fail` (0%), `not_applicable` (excluído com justificativa) e `not_assessed` (reduz a cobertura). Achado crítico aberto bloqueia o gate; achado alto aberto exige revisão; cobertura abaixo do limite mantém o resultado provisório.


### production-audit / release-audit

Inspeciona o diretório real que será publicado. O comando é obrigatório depois do build e antes de publicar/deployar:

```bash
node cli/bin/devexcellence.js production-audit --path ./dist
```

Copie examples/.dockerignore.production para o nome de ignore reconhecido pelo Docker (.dockerignore ou arquivo específico do Dockerfile) e ajuste os padrões ao seu projeto. Use o caminho do artefato efetivamente implantado (por exemplo, dist, build, .next/standalone ou diretório de pacote extraído). Qualquer arquivo/diretório de teste reconhecido ou varredura incompleta bloqueia o release (exit code 1). Caminho ausente/inválido retorna 2. O relatório deve ser salvo fora do diretório auditado.

A auditoria detecta diretórios de teste, arquivos .test.* /.spec.*, padrões comuns de Python/Go/JVM/.NET/Ruby, configurações de frameworks, mocks, fixtures de teste, snapshots e relatórios de cobertura. Ela não inspeciona diretamente imagens Docker ou arquivos bundle para descobrir código de teste embutido; extraia o filesystem da imagem/pacote para um diretório isolado e audite-o.

## Códigos de saída

- `0`: sem bloqueio pelo limiar configurado; não significa certificação.
- `1`: gate bloqueado/falha conforme limiar.
- `2`: uso, entrada ou configuração inválida.

## Privacidade e operação

O CLI não possui integração de rede e não envia código ou relatórios. Comandos opcionais são executados localmente no diretório do projeto. O arquivo `.devexcellence/assessment.json` e relatórios/cache locais devem permanecer fora do versionamento conforme `.gitignore`.

## Testes e limites

Execute `cd cli && npm test`. O CI cobre Node.js 20 e 22. O CLI não substitui a análise contextual da skill nem scanners especializados; a evidência, o escopo e as limitações devem permanecer explícitos.
