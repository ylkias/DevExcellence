# DevExcellence CLI 0.1.0

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

### check

Faz verificações locais e heurísticas: detecção de stack, lockfile, README, licença, estrutura de testes, CI, proteção de arquivos `.env`, arquivos de ambiente rastreados pelo Git e padrões comuns de possíveis segredos.

Opções: `--json`, `--output arquivo`, `--fail-on critical|high|medium|low|never`, `--run`, `--no-secrets`.

A varredura não é SAST/DAST, pentest ou auditoria completa de dependências. Valores que pareçam segredos não são incluídos no resultado. A varredura é heurística e limitada a arquivos de texto com tamanho controlado.

Comandos externos só podem ser executados com `--run` e configuração explícita em `.devexcellence/config.json`, usando arrays `argv`; shell não é utilizado. Exemplo: [devexcellence.config.json](../examples/devexcellence.config.json). Revise comandos e permissões antes de habilitá-los.

### init e score

`init` cria `.devexcellence/assessment.json` com os pesos padrão e controles em estado `not_assessed`. Preencha as evidências e status antes de executar `score`.

Estados: `pass` (100%), `partial` (50%), `fail` (0%), `not_applicable` (excluído com justificativa) e `not_assessed` (reduz a cobertura). Achado crítico aberto bloqueia o gate; achado alto aberto exige revisão; cobertura abaixo do limite mantém o resultado provisório.

## Códigos de saída

- `0`: sem bloqueio pelo limiar configurado; não significa certificação.
- `1`: gate bloqueado/falha conforme limiar.
- `2`: uso, entrada ou configuração inválida.

## Privacidade e operação

O CLI não possui integração de rede e não envia código ou relatórios. Comandos opcionais são executados localmente no diretório do projeto. O arquivo `.devexcellence/assessment.json` e relatórios/cache locais devem permanecer fora do versionamento conforme `.gitignore`.

## Testes e limites

Execute `cd cli && npm test`. O CI cobre Node.js 20 e 22. O CLI não substitui a análise contextual da skill nem scanners especializados; a evidência, o escopo e as limitações devem permanecer explícitos.
