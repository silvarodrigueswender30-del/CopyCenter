# PAGE STRUCTURE DIAGNOSTIC

## 1. Header/Nav (`header-hero.html`)
* **Função Estratégica:** Navegação principal e CTA fixa.
* **Função Comercial:** Conversão rápida (orçamento).
* **Função SEO:** Links âncora/internos.
* **Textos atuais:** About, Services, Pricing, Blog, Contact us.
* **Caracteres:** ~5-10 por link.
* **Volume:** Muito restrito. Layout flex pode quebrar no tablet/mobile se exceder palavras longas.
* **Recomendação:** Sobre, Serviços, Produtos, Contatos, "Orçamento".

## 2. Hero (`header-hero.html`)
* **Função Estratégica:** Primeiro impacto visual.
* **Função Comercial:** Promessa de valor e proposta única de vendas.
* **Função SEO:** Título principal `H1`, forte peso semântico.
* **Textos atuais:** "Breathe easy in a home that's fresh clean and truly yours"
* **Caracteres:** Título ~60-80. Botões curtos ("Get a quote").
* **Volume:** Pode aumentar um pouco o H1 (até umas 12 palavras curtas) sem quebrar.
* **Recomendação:** H1 direto: "A gráfica em Uberlândia que imprime as suas melhores ideias."

## 3. Logo Marquee (`logo-marquee.html`)
* **Função Estratégica:** Prova Social.
* **Função Comercial:** Passar autoridade.
* **Textos atuais:** "SOME OF OUR INCREDIBLE PARTNERS"
* **Caracteres:** ~35.
* **Volume:** Curto. Letras maiúsculas.
* **Recomendação:** "EMPRESAS DE UBERLÂNDIA QUE CONFIAM NA COPYCENTER"

## 4. Animated Content (`animated-content.html`)
* **Função Estratégica:** Manifesto da marca.
* **Função SEO:** Parágrafo textual importante com palavras-chave de contexto.
* **Textos atuais:** "We craft scalable digital solutions for bold brands looking to grow."
* **Caracteres:** ~70.
* **Volume:** Texto que vai se revelando (GSAP `SplitText`). Não pode ser gigante, no máximo 100-130 caracteres. Se for muito longo, a animação atinge o fim do trigger antes do texto.
* **Recomendação:** Focado em qualidade e agilidade técnica na região.

## 5. Services (`services.html`)
* **Função Estratégica:** Apresentar portfólio.
* **Função SEO:** Inclusão de H2s com palavras-chave de serviços gráficos ("Comunicação visual", "Impressão Digital").
* **Textos atuais:** "What we do", "01. Branding", "02. UI/UX Design"...
* **Caracteres:** Títulos de 1-3 palavras. Resumo de 1-2 linhas.
* **Volume:** Estrito. O accordion não suporta blocos textuais massivos.
* **Recomendação:** Manter o padrão de "01. Comunicação Visual", "02. Impressão Digital", "03. Brindes Personalizados".

## 6. Process (`process.html`)
* **Função Estratégica:** Remover atrito de compra.
* **Textos atuais:** "01. Discover", "02. Design"...
* **Caracteres:** Títulos curtos. Parágrafo do step de ~150 chars.
* **Volume:** A altura da coluna direita dita o scroll do sticky. Textos gigantes quebrarão o scroll.
* **Recomendação:** "Orçamento", "Pré-impressão", "Entrega Rápida".

## 7. About (`about.html`)
* **Função Estratégica:** Credibilidade e métricas.
* **Textos atuais:** "We are a team of passionate designers...", "15+ Years", "50+ Awards".
* **Volume:** Restrito nos números (precisa caber no layout em grid).
* **Recomendação:** Focar em anos de mercado, número de clientes e taxa de satisfação.

## 8. Video (`video.html`)
* **Função Estratégica:** Mostrar a estrutura interna.
* **Textos atuais:** "Watch our showreel".
* **Volume:** Super restrito.
* **Recomendação:** "Nossa Estrutura".

## 9. Info (`info.html`)
* **Função Estratégica:** Diferenciais da gráfica.
* **Textos atuais:** "Why choose us?", "Innovative Solutions".
* **Volume:** Grid simétrico. Textos precisam ser concisos.
* **Recomendação:** Focar em "Atendimento local", "Equipamentos de Ponta", "Prazos Cumpridos".

## 10. Testimonials (`testimonial.html`)
* **Função Estratégica:** Aprovação de terceiros.
* **Volume:** Depoimentos do tamanho de um tweet para não quebrar os cards.
* **Recomendação:** Usar reviews reais do GMN.

## 11. Blog (`blog.html`)
* **Função SEO:** Link para conteúdos ou sub-páginas de categorias.
* **Volume:** Títulos de artigos ou cases curtos.

## 12. CTA (`cta.html`)
* **Função Comercial:** Fechar venda.
* **Textos atuais:** "Let's work together".
* **Volume:** Fonte muito grande (mega-heading). Tem que ser frase muito curta (4-5 palavras máx) para não estourar mobile/tablet.

## 13. Footer (`footer.html`)
* **Função SEO:** Endereço NAP (Name, Address, Phone) para SEO Local.
* **Volume:** Restrito aos grids.
* **Recomendação:** Adicionar endereço real, contatos, CNPJ.
