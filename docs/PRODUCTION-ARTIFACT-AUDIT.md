# Gate de arquivos de teste no artefato de produção

## Regra

Os arquivos de teste permanecem no repositório e devem ser executados na CI. Eles não podem integrar o artefato final publicado nem o filesystem implantado em produção. Não remova testes do source control para cumprir essa regra.

## Fluxo obrigatório

1. Execute build/package normalmente.
2. Identifique a pasta exata, pacote extraído ou filesystem que será publicado.
3. Execute a auditoria após o build e antes do deploy:

```bash
node cli/bin/devexcellence.js production-audit --path ./dist --json
```

O comando também aceita o alias `release-audit`. Use o diretório real gerado pelo projeto; exemplos incluem `dist`, `build`, `.next/standalone` ou uma pasta temporária com o conteúdo extraído do pacote final.

- Exit code `0`: nenhum arquivo/diretório exclusivo de teste reconhecido e varredura completa.
- Exit code `1`: artefato contaminado ou varredura incompleta. Bloqueie a publicação.
- Exit code `2`: caminho inválido ou falha de execução. Bloqueie a publicação.

O relatório deve ser salvo fora do diretório auditado. Não audite a raiz do repositório: os testes versionados nessa raiz fazem parte da validação de desenvolvimento, não do pacote de produção.

## O que é identificado

A auditoria verifica caminhos e nomes conhecidos, incluindo:
- Diretórios `test`, `tests`, `__tests__`, `__mocks__`, `__fixtures__`, `__snapshots__`.
- Relatórios/dados de cobertura, resultados Playwright/Allure e resultados JUnit.
- Arquivos JavaScript/TypeScript `.test.*` e `.spec.*`.
- Convenções comuns de Python, Go, Java/Kotlin, C# e Ruby.
- Configurações de Jest, Vitest, Playwright, Cypress, Karma, WebdriverIO, Mocha, Pytest e PHPUnit.
- Fixtures/dados que estejam em diretórios explícitos de teste.

A varredura é fail-closed: atingir o limite de arquivos ou não conseguir ler uma parte do artefato bloqueia o release. O limite padrão é 50.000 arquivos; use `--max-files` apenas quando o tamanho do artefato justificar.

## Docker

Quando o Dockerfile copia o contexto inteiro com `COPY . .` ou equivalente, `check` procura regras no `.dockerignore` (ou no arquivo específico do Dockerfile). Sem exclusões de diretórios e arquivos de teste, gera achado de revisão alta.

Use [example .dockerignore](../examples/.dockerignore.production) como base e adapte à estrutura do projeto. O .dockerignore impede que arquivos entrem no contexto, mas não prova o conteúdo da imagem final.

Para auditar uma imagem já criada, extraia o filesystem em pasta isolada e execute a auditoria nela. Exemplo conceitual:

```bash
container_id=$(docker create minha-aplicacao:release)
mkdir -p ./tmp/image-root
docker export "$container_id" | tar -xf - -C ./tmp/image-root
docker rm "$container_id"
node cli/bin/devexcellence.js production-audit --path ./tmp/image-root
```

A pasta extraída contém o filesystem do container exportado; volumes não fazem parte do export. Confirme que a imagem/tag analisada é exatamente a que será publicada.

## Exemplo de etapa de deploy no CI

```yaml
- name: Build production artifact
  run: yarn build

- name: Block test files in production artifact
  run: node tools/devexcellence/cli/bin/devexcellence.js production-audit --path ./dist --json

- name: Deploy
  if: success()
  run: ./deploy.sh
```

Ajuste o caminho da ferramenta e o diretório para a realidade do projeto. O deploy só pode depender da etapa de auditoria se ela estiver no mesmo job/stage obrigatório e seu exit code não for ignorado.

## Exemplo GitLab CI/CD

```yaml
build:
  stage: build
  script:
    - yarn install --frozen-lockfile
    - yarn build
  artifacts:
    paths:
      - dist/

production-artifact-audit:
  stage: test
  needs:
    - job: build
      artifacts: true
  script:
    - node tools/devexcellence/cli/bin/devexcellence.js production-audit --path ./dist --json

deploy-production:
  stage: deploy
  needs:
    - job: production-artifact-audit
    - job: build
      artifacts: true
  script:
    - ./deploy.sh
```

A etapa de deploy depende explicitamente do job de auditoria. O runner deve ter o CLI disponível no caminho configurado.

## Limitações

A ferramenta inspeciona nomes e caminhos. Não detecta necessariamente código de teste que foi incorporado em bundles compilados/minificados, renomeado ou embutido em arquivos sem nomes identificáveis. Também não acessa diretamente registries, imagens remotas ou pacotes publicados. Para maior garantia, audite o filesystem final da imagem/pacote e mantenha revisão de build, Dockerfile e regras de empacotamento.
