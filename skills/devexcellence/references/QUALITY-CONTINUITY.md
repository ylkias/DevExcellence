# Padrão contínuo de qualidade

A DevExcellence não deve apenas ajudar a criar a primeira versão de um projeto. Ela deve ajudar a manter a qualidade enquanto o projeto cresce.

## O que significa manter a qualidade?

Cada nova funcionalidade, correção ou melhoria deve respeitar os padrões que o projeto já utiliza. Isso inclui:

- organização da arquitetura e do código;
- nomenclatura, formatação e tratamento de erros;
- componentes visuais e experiência do usuário;
- acessibilidade e responsividade;
- testes e prevenção de regressões;
- segurança, permissões e proteção dos dados;
- documentação, integrações e contratos existentes.

A skill deve entender esse padrão a partir das instruções, configurações, testes e exemplos bem mantidos do próprio projeto. Ela não deve impor uma arquitetura ou estilo diferente sem motivo.

## O padrão continua valendo nas próximas conversas

Quando a pessoa voltar ao projeto em outro chat, a ferramenta deve consultar novamente as instruções e configurações relevantes que estão salvas no repositório. Assim, a continuidade não depende de a IA lembrar de conversas anteriores.

## Cada mudança precisa preservar o que já funciona

A implementação deve ser validada de acordo com o risco:

- mudanças pequenas recebem verificações direcionadas;
- novas funcionalidades recebem testes dos principais fluxos;
- mudanças em autenticação, permissões e dados recebem verificações de acesso e segurança;
- mudanças em banco, integrações e publicação recebem verificações adicionais conforme necessário.

Se uma verificação não puder ser executada, isso deve ser informado. A skill não pode afirmar que tudo está aprovado sem evidência.

## Sem burocracia

Manter qualidade não significa fazer auditoria completa a cada pedido. Significa escolher as verificações certas, preservar o que funciona, corrigir problemas reais e evitar que novas alterações reduzam a qualidade do projeto.
