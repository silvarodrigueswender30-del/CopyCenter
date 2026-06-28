# CONTENT_SWAP_MAP — CopyCenter

Este documento mapeia as substituições de conteúdo estritamente textuais (Copy) recomendadas, respeitando a volumetria original para não quebrar os layouts do Webflow.

## 1. Header/Nav
* **Texto atual Albadoe:** About, Services, Pricing, Blog, "Book a call" (botão)
* **Função:** Navegação principal e CTA secundária.
* **Proposta CopyCenter:** Sobre Nós, Serviços, Produtos, Contato, "Fazer Orçamento" (botão)
* **Limite visual:** Manter textos curtos de 1 a 2 palavras para evitar quebra do flexbox da navbar.

## 2. Hero
* **Texto atual Albadoe:** "An independent creative agency crafting digital experiences that matter." / "We exist to solve complex problems..."
* **Função:** Promessa de valor principal, h1 hero.
* **Proposta CopyCenter:** "A maior central de soluções gráficas para transformar as suas ideias em impacto visual." / "Da cópia rápida aos grandes formatos impressos. Tecnologia, agilidade e excelência gráfica para o seu negócio."
* **Limite visual:** O título original possui ~60 caracteres. A proposta CopyCenter tem ~80 caracteres, mas como usa layout flexível responsivo, fluirá bem. Subtítulo com volumetria semelhante (em torno de 2-3 linhas).

## 3. Logo Marquee
* **Texto atual Albadoe:** "SOME OF OUR INCREDIBLE PARTNERS" / Logos de parceiros no ticker.
* **Função:** Prova social / Credibilidade institucional.
* **Proposta CopyCenter:** "EMPRESAS QUE CONFIAM EM NOSSAS IMPRESSÕES" / (Substituir SVGs pelos logos de clientes/parceiros da CopyCenter).
* **Limite visual:** Frase curta, em ALL CAPS.

## 4. Animated Content (Scroll Text)
* **Texto atual Albadoe:** "We craft scalable digital solutions for bold brands looking to grow."
* **Função:** Manifesto da marca exibido via reveal on scroll.
* **Proposta CopyCenter:** "Imprimimos a essência da sua marca com qualidade, rapidez e a mais alta tecnologia gráfica."
* **Limite visual:** O texto original tem 66 caracteres. A proposta CopyCenter tem 88 caracteres. O GSAP vai lidar com a volumetria naturalmente, não exceder 120 caracteres para garantir o tempo de scroll ideal.

## 5. Services
* **Texto atual Albadoe:** "What we do", "Branding", "UI/UX Design", "Development", "Marketing"
* **Função:** Grid sanfona de listagem de serviços principais.
* **Proposta CopyCenter:** "Nossos Serviços", "Comunicação Visual", "Impressão Off-Set", "Impressão Digital", "Brindes Personalizados"
* **Justificativa:** Reflete o escopo de serviços listado no site antigo.
* **Limite visual:** Manter títulos curtos (1 a 3 palavras) devido à dinâmica do accordion e flex-grow no CSS.

## 6. Process
* **Texto atual Albadoe:** "Our process", "01 Discover", "02 Design", "03 Develop" (com textos descritivos sob cada).
* **Função:** Explicar metodologia.
* **Proposta CopyCenter:** "Nosso Processo", "01 Orçamento Rápid", "02 Pré-impressão & Arte", "03 Produção & Entrega" (ex: "Avaliamos seu projeto e entregamos um orçamento ágil com as melhores opções técnicas.").
* **Limite visual:** Títulos limitados a até 30 caracteres. Parágrafos curtos para caberem bem ao lado das imagens em sticky layout no desktop.

## 7. About
* **Texto atual Albadoe:** "About Us", "We are a team of passionate designers...", estatísticas como "15+ Years", "50+ Awards".
* **Função:** Números de credibilidade e resumo histórico.
* **Proposta CopyCenter:** "Sobre a CopyCenter", "Somos referência em Uberlândia em qualidade gráfica e comunicação visual...", estatísticas: "10+ Anos", "5000+ Clientes", "24h Agilidade".
* **Limite visual:** O número das estatísticas deve ser curto e passível de numeração (para manter o counter em GSAP).

## 8. Video
* **Texto atual Albadoe:** "Watch our showreel", "Play"
* **Função:** Chamada para engajamento em vídeo institucional.
* **Proposta CopyCenter:** "Conheça nossa estrutura", "Play"
* **Limite visual:** Texto muito curto, mantido em ALL CAPS.

## 9. Info
* **Texto atual Albadoe:** "Why choose us?", "Innovative Solutions", "Expert Team", etc.
* **Função:** Diferenciais competitivos em formato de grid.
* **Proposta CopyCenter:** "Por que a CopyCenter?", "Equipamentos de Ponta", "Atendimento Ágil", "Entrega Local Rápida", "Qualidade Garantida".
* **Limite visual:** Textos objetivos e concisos. As caixas de texto flutuantes dependem de textos não muito longos para não engolir o padding.

## 10. Testimonials
* **Texto atual Albadoe:** "What our clients say", citações de clientes fictícios/reais.
* **Função:** Endosso social no slider de depoimentos.
* **Proposta CopyCenter:** "O que nossos clientes dizem", usar depoimentos reais do Google Meu Negócio da gráfica ou exemplos genéricos temporários ("Impressão impecável, entregaram antes do prazo!").
* **Limite visual:** Citações curtas, não ultrapassar 150 caracteres por cartão para manter o layout do slider consistente.

## 11. Blog
* **Texto atual Albadoe:** "Latest Insights", "Articles", "Read More".
* **Função:** Seção de CMS (notícias ou portfólio).
* **Proposta CopyCenter:** "Nosso Portfólio" ou "Novidades", substituição das categorias por "Impressão", "Comunicação", "Brindes".
* **Limite visual:** Manter a estrutura de cartões do blog original inalterada.

## 12. CTA
* **Texto atual Albadoe:** "Let's work together", "Start a project"
* **Função:** Mega-chamada com explosão visual.
* **Proposta CopyCenter:** "Vamos imprimir sua próxima grande ideia?", "Faça um Orçamento"
* **Limite visual:** Letras muito grandes (heading-custom-mega). O texto "Let's work together" (20 caracteres) é curto. A proposta CopyCenter tem 41 caracteres; avaliar se a fonte precisa diminuir levemente para o mobile ou usar um texto mais curto como "Imprima suas Ideias".

## 13. Footer
* **Texto atual Albadoe:** "Albadoe.", "Subscribe to our newsletter", links de navegação, infos sociais.
* **Função:** Rodapé, captura de e-mails, contato final.
* **Proposta CopyCenter:** "CopyCenter", "Receba Nossas Ofertas", endereço real em Uberlândia, contatos (WhatsApp, Telefone, Email).
* **Limite visual:** Estrutura flex. Cuidar para não estourar linhas de endereço ou links muito longos.
