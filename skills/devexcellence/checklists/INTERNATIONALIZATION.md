# Internacionalização e localização

- [ ] Idiomas e localidades suportados estão definidos.
- [ ] Textos são externalizados para tradução; não existem frases de interface espalhadas sem estratégia.
- [ ] Formatação de data, hora, número, moeda e endereço respeita a localidade.
- [ ] Timestamps são armazenados de forma não ambígua, preferencialmente em UTC, preservando o fuso aplicável ao contexto de negócio.
- [ ] Conversões consideram horário de verão e mudanças de regras de fuso quando aplicável.
- [ ] Moedas são representadas com precisão decimal apropriada e código ISO 4217 quando necessário.
- [ ] Telefone, documento, código postal e endereço consideram país e plano de numeração.
- [ ] Ordenação, comparação e busca consideram Unicode, acentos e regras de locale.
- [ ] Comprimento de texto não assume que caracteres Unicode ocupam sempre um byte ou uma unidade visual.
- [ ] Layout comporta textos traduzidos mais longos e idiomas RTL quando suportados.
- [ ] Pluralização, gênero gramatical e formatos culturais são tratados por bibliotecas adequadas.
- [ ] Importação/exportação define encoding e formato de data/número.
- [ ] Testes cobrem localidades e fusos suportados.

## Critério de aceite

A aplicação apresenta e interpreta dados corretamente em todas as localidades que declara suportar, sem ambiguidade de datas, moedas ou identificadores.
