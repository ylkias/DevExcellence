# Desenvolver conversando com IA

## O que é Vibe Coding?

Vibe Coding é uma forma de desenvolver software conversando com uma ferramenta de inteligência artificial.

Em vez de começar escrevendo uma especificação técnica, você explica o que deseja criar. A IA ajuda a transformar essa ideia em código. Você experimenta o resultado, dá novas orientações e melhora o projeto aos poucos.

Por exemplo, você pode começar com:

> Quero um sistema para cadastrar clientes e acompanhar os pagamentos.

Depois de ver a primeira versão, pode pedir:

> Inclua uma busca por nome e deixe a tela mais fácil de usar no celular.

Você participa dando direção e avaliando o resultado. A ferramenta de IA ajuda com a implementação.

## Qual é o papel da DevExcellence?

A DevExcellence é uma **skill**, ou seja, um conjunto de instruções que a ferramenta de programação com IA pode carregar.

Ela orienta a IA a:

- entender o pedido antes de alterar o código;
- conhecer somente as partes do projeto necessárias para a tarefa;
- aproveitar as tecnologias e o visual que o projeto já utiliza;
- construir funcionalidades que realmente funcionem, não apenas telas de demonstração;
- executar os testes disponíveis e corrigir os problemas que encontrar;
- explicar o que fez e informar o que não conseguiu verificar.

A DevExcellence não é uma inteligência artificial independente. Ela complementa a ferramenta de IA que você já usa.

Além de ajudar a implementar funcionalidades, ela procura manter o padrão de qualidade do projeto ao longo do tempo. Isso significa respeitar a arquitetura, o visual, as convenções, os testes, a segurança e a documentação já adotados.

## Como é o processo?

1. **Você explica:** descreva a ideia ou o problema com suas palavras.
2. **A IA entende:** analisa os arquivos e identifica onde trabalhar.
3. **A IA desenvolve:** faz uma primeira parte funcional, respeitando o projeto.
4. **Você experimenta:** avalia o resultado e diz o que gostaria de mudar.
5. **A IA ajusta:** melhora a implementação e verifica o que estiver ao alcance das ferramentas.
6. **Você continua:** novas ideias podem ser adicionadas em etapas, mantendo o mesmo padrão de qualidade.

Não é necessário conhecer os nomes dos arquivos, checklists ou comandos internos da DevExcellence para começar.

## Exemplos de pedidos

- "Crie uma tela inicial para meu sistema."
- "Adicione um cadastro de produtos com nome, preço e estoque."
- "O relatório está lento. Investigue e melhore."
- "Adapte as telas para celular."
- "Explique como faço para executar este projeto."
- "Revise esta alteração antes de eu publicar."

Quanto mais importante for uma decisão — por exemplo, apagar dados, alterar permissões ou publicar em produção — mais cuidadosa deve ser a confirmação antes de agir.

## Como a qualidade é mantida

A cada nova alteração, a DevExcellence considera o padrão que o projeto já utiliza. Ela evita introduzir estilos diferentes, duplicação, atalhos inseguros ou mudanças que quebrem funcionalidades existentes. Também orienta a ferramenta de IA a executar os testes e verificações adequados à mudança.

Quando você voltar em outra conversa, a skill deve consultar as instruções e configurações relevantes que estão salvas no próprio projeto. Assim, a continuidade não depende de a IA lembrar do histórico do chat.

A validação é proporcional: uma mudança pequena recebe testes direcionados; alterações em autenticação, permissões, dados, integrações ou publicação exigem verificações mais cuidadosas. A ferramenta deve informar o que conseguiu validar e o que ficou pendente.

Veja o [padrão contínuo de qualidade](QUALITY-STANDARD.md).

## Cuidados importantes

A DevExcellence incentiva boas práticas durante o desenvolvimento, mas não substitui testes profissionais, revisão de segurança ou avaliação antes de colocar um sistema em produção.

Os resultados dependem da ferramenta de IA, dos acessos concedidos e dos recursos disponíveis no ambiente. Se a ferramenta não conseguir executar um teste ou abrir uma aplicação, ela deve informar essa limitação em vez de afirmar que tudo funcionou.

## A ideia principal

**Você se concentra no que quer construir. A ferramenta de IA ajuda a desenvolver. A DevExcellence orienta essa colaboração para que o trabalho seja mais organizado, útil e fácil de evoluir.**
