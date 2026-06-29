# COPY LIMITS BY SECTION

| Seção | Elemento Textual | Texto Original (Albadoe) | Chars Original | Limite Seguro (Recomendado) | Quebra Linha? | Risco de Quebra | Observação Técnica |
|---|---|---|---|---|---|---|---|
| **Nav** | Link Único | "Services" | 8 | 15 | Não | Alto | Flexbox estourará no tablet. |
| **Hero** | H1 Title | "Breathe easy in a home that's fresh clean and truly yours" | 58 | 80 | Sim | Médio | Evitar mais de 3 linhas no mobile. |
| **Hero** | Button | "Get a quote" | 11 | 20 | Não | Baixo | Texto deve caber no contorno do botão. |
| **Marquee** | Ticker Text | "SOME OF OUR INCREDIBLE PARTNERS" | 31 | 50 | Não | Baixo | Loop infinito em CSS resolve textos longos. |
| **Animated** | Reveal Text | "We craft scalable digital solutions for bold brands looking to grow." | 68 | 120 | Sim | Alto | ScrollTrigger timing atrelado ao height. Não fazer parágrafos longos. |
| **Services** | Accordion Title | "Branding" | 8 | 25 | Não | Médio | Precisa de concisão para grid. |
| **Services** | Accordion Desc | "We build strong brands..." | 82 | 150 | Sim | Alto | Textos longos cobrem a imagem que segue o mouse. |
| **Process** | Step Title | "Discover" | 8 | 20 | Não | Médio | Estética minimalista. |
| **Process** | Step Desc | "We uncover insights..." | 115 | 180 | Sim | Alto | Altura dita o sticky-box esquerdo. |
| **About** | Counters | "15+" / "50+" | 3 - 5 | 8 | Não | Alto | GSAP counter parseia números curtos. |
| **Info** | Card Title | "Innovative Solutions" | 20 | 30 | Não | Médio | Títulos em grid. |
| **Testimonial**| Quote | "Our experience was phenomenal..." | 130 | 250 | Sim | Médio | Slider lida bem com flex, mas desalinha se a diferença for brutal. |
| **CTA** | Mega Text | "Let's work together" | 19 | 40 | Sim | Alto | Tamanho de fonte enorme. |
| **Footer** | Info Text | "Albadoe." | 8 | 30 | Não | Baixo | Nome da empresa e informações essenciais. |
