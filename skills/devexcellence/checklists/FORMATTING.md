# Máscaras, formatação e normalização de campos

## Objetivo

Garantir que os campos sejam fáceis de preencher, tenham formato coerente com a regra de negócio, sejam validados corretamente e sejam armazenados em formato consistente. Máscara visual, validação e normalização são etapas diferentes.

## Regras gerais

- [ ] Cada campo possui tipo, finalidade, formato aceito e regra de validação documentados.
- [ ] Máscara é definida conforme regra de negócio e localidade/país, sem presumir um único formato para todos os usuários.
- [ ] A interface formata durante a digitação e ao exibir dados já existentes.
- [ ] Colagem, preenchimento automático, teclado mobile, navegação por teclado, leitor de tela, cursor e exclusão de caracteres funcionam corretamente.
- [ ] A validação no backend é obrigatória; a máscara do frontend não é controle de segurança.
- [ ] A API documenta se aceita valores formatados, não formatados ou ambos.
- [ ] Valores incompletos ou inválidos são rejeitados com mensagem clara; não existe truncamento ou descarte silencioso.
- [ ] A aplicação normaliza o valor antes de persistir e mantém uma representação canônica consistente entre serviços.
- [ ] Logs não expõem documentos, telefones ou outros dados pessoais sem necessidade e proteção.
- [ ] Máscaras não são aplicadas indiscriminadamente a senhas, textos livres ou identificadores de formato variável.

## Exemplos de formatos brasileiros

| Campo | Máscara de apresentação | Representação canônica sugerida |
|---|---|---|
| CPF | `000.000.000-00` | String com 11 dígitos |
| CNPJ | `00.000.000/0000-00` | String com 14 dígitos |
| CEP | `00000-000` | String com 8 dígitos |
| Celular | `(00) 00000-0000` | Telefone internacional E.164, quando aplicável |
| Telefone fixo | `(00) 0000-0000` | Telefone internacional E.164, quando aplicável |
| Data | `DD/MM/AAAA` | ISO 8601 ou tipo DATE apropriado |
| Moeda | `R$ 1.234,56` | Decimal exato, sem usar ponto flutuante para valores monetários |

Esses exemplos são específicos do Brasil. A aplicação deve permitir regras de outros países e considerar variações de planos de numeração.

## Validação de domínio

- [ ] CPF e CNPJ passam pela validação de dígitos verificadores; apenas conferir quantidade de dígitos não basta.
- [ ] Telefone considera país, código de área e plano de numeração; formato correto não prova que o número está ativo ou pertence ao usuário.
- [ ] CEP passa pela validação de formato; existência e entregabilidade do endereço exigem consulta própria, quando o produto precisar.
- [ ] Datas são validadas como datas reais do calendário, incluindo anos bissextos e limites de negócio.
- [ ] Valores monetários respeitam moeda, separador decimal, escala e limites; não são convertidos de forma imprecisa.
- [ ] Valores canônicos preservam zeros à esquerda quando aplicável.

## Testes obrigatórios

- [ ] Entrada formatada e não formatada.
- [ ] Entrada parcial e valor incompleto.
- [ ] Valor válido e inválido, incluindo dígitos verificadores incorretos.
- [ ] Limites mínimos e máximos.
- [ ] Colagem de conteúdo com e sem pontuação.
- [ ] Edição no meio do valor, movimentação de cursor e exclusão.
- [ ] Teclado mobile e preenchimento automático.
- [ ] Normalização idempotente: normalizar um valor já normalizado não altera o resultado.
- [ ] Exibição de um valor persistido mantém a máscara correta sem alterar o valor canônico.
- [ ] Localidades e países suportados pelo produto.

## Critério de aceite

Um campo só é considerado concluído quando máscara de apresentação, validação de domínio, validação server-side, normalização, persistência e testes estão coerentes. Máscara visual isolada não é suficiente.
