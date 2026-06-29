# REPORT — SESSION-017.5A — Testimonials + Blog + CTA + Footer Technical Copy Audit

* Status: CONCLUÍDA ✅
* Testimonials: estrutura encontrada: Uma seção com 1 título principal (dividido com um `span.text-highlighted`) e uma lista de 3 cards horizontais. Cada card contém um ícone SVG, um quote/texto em tag `<h3>`, o nome do autor em uma div e uma imagem. Não há slider, é um grid.
* Testimonials: textos atuais mapeados: "Over 200+ Reviews From Our Clients", "They made my home shine like new!...", "Courtney Henry", etc.
* Testimonials: quantidade real de cards/depoimentos: 3 depoimentos (item-1, item-2, item-3).
* Testimonials: elementos duplicados/ocultos: Nenhum. O grid é unificado.
* Testimonials: classes sensíveis: `.home-testimonial_list`, `.home-testimonial_item`, `.home-testimonial_content`.
* Testimonials: motion envolvida: `testimonialMotion.js` anima o título e varre `.home-testimonial_item` criando um stagger simples. Segura para edições de texto.
* Testimonials: risco de prova social inventada: Risco alto. Não temos avaliações reais. O template impõe espaço para texto, autor e foto.
* Testimonials: forma segura de aplicar copy: Trocar o título geral para a copy curada. Substituir os quotes por `[INSERIR AVALIAÇÃO REAL AQUI]`. Substituir os nomes por `[NOME DO CLIENTE]`. Manter as fotos originais provisoriamente.
* Testimonials: forma proibida de aplicar copy: Tentar ocultar as imagens por CSS ou inventar textos elogiosos que a CopyCenter não recebeu.
* Blog: estrutura encontrada: Header de seção com título e CTA (Desktop). Um grid listando 3 cards `.collection-blogs_item`. Um CTA mobile. Cada card tem uma imagem-link, uma div de meta-data (ex: "Oct 5, 2025") e um título `<h3>` que também é link. **Não há tag de parágrafo descritivo nos cards**.
* Blog: textos atuais mapeados: "Stay updated with our latest posts", "View all Blog", "Oct 5, 2025", "Deep cleaning tips for busy homes".
* Blog: quantidade real de cards: 3 cards estáticos.
* Blog: classes sensíveis: `.collection_blogs`, `.collection-blogs_list`, `.collection-blogs_item`.
* Blog: motion envolvida: `blogMotion.js` anima a entrada da seção e stagger nos cards. Seguro.
* Blog: pode virar Portfólio/Cases sem alterar estrutura? Visualmente sim, mudando o título e links. Porém, estruturalmente, **não há espaço para o texto descritivo**.
* Blog: forma segura de aplicar copy: Inserir Títulos nos H3 e descartar o texto descritivo. Modificar a data para algo genérico como "Portfólio" ou "Produção". Alterar o CTA geral.
* Blog: forma proibida de aplicar copy: Injetar tags `<p>` dentro dos cards para forçar a entrada do texto curado, o que quebraria a regra de não alterar o HTML.
* CTA: estrutura encontrada: Mega heading, parágrafo longo e botão. Ao redor, há uma colagem (scatter) de 8 blocos de imagem (`.cta-image_block`), cada um contendo uma ou mais legendas (`.cta-image-label > div`).
* CTA: textos atuais mapeados: "Your clean happy space is just one click away", "Let Albadoe transform...", "Get a quote". Legendas: "Bathroom Cleaning", "House Cleaning", etc.
* CTA: labels e imagens encontradas: 8 blocos flutuantes, alguns blocos repetem labels.
* CTA: motion envolvida: `ctaMotion.js` mapeia os blocos por classes `.is-image1` a `.is-image8` e faz um scatter (scrub) no scroll. Extremamente sensível a mudanças de estrutura/classes. Seguro alterar apenas o conteúdo de texto da legenda.
* CTA: copy curada cabe ou não: Cabe perfeitamente (Título, Parágrafo, Botão). O microcopy "Atendimento local..." **não cabe** pois não há slot de texto abaixo do botão.
* CTA: forma segura de aplicar copy: Substituir Título, Parágrafo e Botão. Descartar microcopy. Substituir as 8 legendas em inglês por termos gráficos genéricos e coerentes (ex: "Adesivos", "Banners", "Cartões de Visita").
* CTA: forma proibida de aplicar copy: Criar uma `div` abaixo do botão para forçar o microcopy.
* Footer: estrutura encontrada: Logo, Form de newsletter, Redes Sociais, 2 colunas de links, Copyright.
* Footer: textos atuais mapeados: "Subscribe to the newsletter", "Enter e-mail address", "Main Page", "Template", etc.
* Footer: newsletter/formulário: A estrutura original usa um webflow form (`subscribe_form-block`).
* Footer: NAP/dados locais possíveis: **Não há qualquer slot de texto para Endereço, Telefone ou WhatsApp** no template original.
* Footer: dados que precisam validação: Todo o NAP curado (Endereço, Tel, WhatsApp) não deve ser injetado.
* Footer: forma segura de aplicar copy: Substituir as duas colunas de links pelos "Links Úteis" da copy (Início, Serviços, Portfólio, CopyCenter, Contato, Política de Privacidade). Alterar o título da newsletter para "CopyCenter — soluções gráficas em Uberlândia" (texto institucional), ignorando temporariamente o form, ou manter como pendência.
* Footer: forma proibida de aplicar copy: Criar um bloco novo para exibir dados NAP.
* Riscos técnicos: A seção Blog perderá parte da copy por inexistência de tags; o form do Footer ficará deslocado cenicamente ao receber um texto institucional; a seção CTA possui rótulos estáticos.
* Riscos de SEO/local proof: A ausência de endereço/telefone e a prova social com placeholders impactam momentaneamente o Local SEO, mas é uma contingência segura obrigatória nesta fase.
* Plano seguro para Session 017.5B: Trocar os textos 1 para 1 nas tags existentes. Usar placeholders na Prova Social. Cortar os textos que não cabem no Blog. Criar legendas gráficas no CTA. Cortar NAP do Footer.
* Confirmação de que nenhum arquivo do site foi alterado: ✅ Confirmado. Nenhuma modificação no workspace além desta pasta de sessão e _status.md.
