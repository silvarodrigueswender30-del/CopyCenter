# REPORT — SESSION-016.1 — Diagnóstico Estrutural + Brief SEO Local

* Status: CONCLUÍDA ✅
* O que foi analisado: A estrutura completa de layout e limitação volumétrica da home page (13 seções), baseada no código HTML fragmentado original e nos triggers do GSAP, em contrapartida com as necessidades comerciais e de SEO local (Uberlândia) da gráfica CopyCenter.
* Arquivos criados:
  1. `PAGE_STRUCTURE_DIAGNOSTIC.md`
  2. `SEO_LOCAL_STRATEGY.md`
  3. `SECTION_COPY_REQUIREMENTS.md`
  4. `KEYWORD_ENTITY_MAP.md`
  5. `COPY_LIMITS_BY_SECTION.md`
  6. `GPT_COPYWRITER_PROMPT.md`
  7. `REPORT.md`
* Confirmação de que nenhum arquivo do site foi alterado: ✅ Confirmado.
* Confirmação de que nenhum texto foi substituído: ✅ Confirmado.
* Confirmação de que nenhuma imagem/logo/cor foi alterada: ✅ Confirmado.
* Confirmação de que App.jsx, CSS e scripts não foram alterados: ✅ Confirmado.
* Se o site antigo CopyCenter foi acessível: ✅ Sim (dados inferidos de interações anteriores sobre serviços ofertados: gráfica rápida, digital, off-set, brindes, acabamento).
* Principais descobertas sobre estrutura da página: A página tem alta rigidez volumétrica. Seções como Services Accordion, Animated Text e Process Sticky-box não toleram copy de blog ou textos institucionais longos. A UX é pautada por leitura dinâmica ("scannable").
* Principais descobertas sobre SEO local: Há total viabilidade de rankear para "Gráfica em Uberlândia" combinando as keywords no H1 da Hero, atributos ALT das imagens (futuramente) e NAP no Footer, garantindo topical authority através da listagem correta de maquinário/processo nas seções Services e Info.
* Principais riscos de layout para copy: Animated Reveal Text pode causar erro de scroll timing se exceder 120 caracteres. Botões e CTAs com mais de 5 palavras quebrarão flexbox mobile.
* Seções mais sensíveis: `animated-content.html` e `cta.html`.
* Serviços identificados como confirmados: Impressão Digital, Off-Set, Brindes, Plotagem, Acabamentos, Comunicação Visual.
* Serviços identificados como prováveis: Instalação de fachadas em altura.
* Serviços que precisam validação: Entrega 24h, Frota Própria.
* Próxima ação recomendada: O usuário deve abrir uma nova aba do ChatGPT (ou delegar a um sub-agente focado em texto), aplicar o conteúdo do `GPT_COPYWRITER_PROMPT.md` e retornar o resultado JSON/Tabela.
* Como usar o GPT_COPYWRITER_PROMPT.md: Copie o conteúdo do arquivo e cole diretamente no ChatGPT 4 para receber o mapa exato de substituição de textos (*Content Swap Blueprint*). Assim que o resultado for gerado, um executor técnico pode iniciar a substituição dos textos em código com segurança absoluta.
