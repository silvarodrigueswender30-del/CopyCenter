# REPORT — SESSION-019-A — Global Links and Contact Routing Audit

* Status: CONCLUÍDA ✅
* Arquivos auditados:
  - `header-hero.html`
  - `logo-marquee.html`
  - `animated-content.html`
  - `services.html`
  - `process.html`
  - `about.html`
  - `video.html`
  - `info.html`
  - `testimonial.html`
  - `blog.html`
  - `cta.html`
  - `footer.html`
* Total de links encontrados: ~35 hrefs únicos mapeados no DOM.
* Links por seção (estimativa a partir de hrefs e classes de botão):
  - **Header**: Links de navegação (Início, Serviços, Portfólio, Detalhes, CopyCenter, Novidades, Contato, Orçamento, Privacidade), links dropdown sociais Flowfye/Webflow, e 2 botões CTA (`/contact`, `/service`).
  - **Hero**: Botão CTA primário (`/contact`).
  - **Process**: Múltiplos botões de contato na estrutura (apontando para `/contact`).
  - **Blog/Portfólio**: 1 botão "View all" (`/blogs`), cards internos apontando para links literais de rotas `deep-cleaning...`.
  - **CTA Final**: Botão de CTA primário (`/contact`).
  - **Footer**: Logo (`/`), links de coluna (navegação e utilitários da template original), links de social (Flowfye, Twitter, Linkedin, Facebook), e backlink do Webflow.
* Hrefs herdados de Albadoe/Webflow/Flowfye encontrados:
  - `https://albadoe.webflow.io/blog/what-are-the-common-problems-that-a-handyman-can-fix`
  - `https://albadoe.webflow.io/service/commercial-cleaning`
  - `https://go.flowfye.com/contact`
  - `https://go.flowfye.com/pagifye`
  - `https://webflow.com/templates/html/albadoe-website-template`
  - `https://www.facebook.com/flowfye`
  - `https://www.flowfye.com/`
  - `https://www.flowfye.com/services#pricing`
  - `https://www.flowfye.com/templates`
  - `https://www.instagram.com/flowfye.agency/`
  - `https://www.linkedin.com/company/flowfye/posts/?feedView=all`
  - `https://www.webflow.com/`
  - `https://x.com/flowfyeagency`
  - `mailto:hello@flowfye.com`
  - `mailto:hello@flowfye.com?subject=hello%40flowfye.com`
* Links sociais encontrados: Facebook, Instagram, LinkedIn, Twitter e Mailto apontando para a Flowfye.
* Botões CTA encontrados: Links com classe `button w-inline-block` apontando na maioria para `/contact` ou `/service`.
* Links de imagem encontrados: Cards de portfólio no `blog.html` (`class="card-image_wrapper w-inline-block"`).
* Aria-labels antigos encontrados:
  - `aria-label="Benefits of regular professional cleaning"`
  - `aria-label="Deep cleaning tips for busy homes"`
  - `aria-label="Ultimate room-by-room cleaning checklist guide"`
* Rotas internas antigas encontradas:
  - `/404`
  - `/about`
  - `/blog/benefits-of-regular-professional-cleaning`
  - `/blog/deep-cleaning-tips-for-busy-homes`
  - `/blog/ultimate-room-by-room-cleaning-checklist-guide`
  - `/blogs`
  - `/contact`
  - `/pricing`
  - `/privacy-policy`
  - `/service`
  - `/service/commercial-cleaning`
  - `/service/eco-friendly-cleaning`
  - `/service/window-cleaning`
  - `/utilities/changelog`
  - `/utilities/instruction`
  - `/utilities/license`
  - `/utilities/style-guide`
* Duplicações desktop/mobile encontradas: O menu dropdown do mobile (`header-hero.html`) duplica os links do navmenu desktop.
* Links que devem virar WhatsApp (`https://wa.me/5534988339728?text=...`):
  - Todos os botões primários apontando para `/contact` (Header CTA, Hero CTA, Process CTA, CTA Final).
  - Rotas genéricas `/pricing`.
* Links que devem virar Instagram (`https://www.instagram.com/copycenterudi/`):
  - Link com ícone SVG no footer (`aria-label="social-icon"` e href Flowfye Instagram).
  - Pode-se eliminar/ocultar os outros links sociais do footer se não existirem (Facebook, Twitter, Linkedin).
* Links que devem virar âncora interna:
  - Navegação do topo (e duplicados no rodapé): 
    - "Serviços" -> `#services` (ou rota nula temporária caso ID não exista).
    - "Portfólio" -> `#portfolio`
    - "CopyCenter" -> `#about`
* Links que devem permanecer temporariamente:
  - `/privacy-policy` ou ser removido da interface se não for necessário na landing page.
  - O href do logo (`/`) apontando para home.
* Riscos técnicos: Os botões possuem layers internas de `divs` animadas (ex: `button-text`, `button-hover`, `button-tooltip_wrap`). Apenas o atributo `href` do elemento pai `<a>` deve ser alterado.
* Riscos de SEO/UX: O site estaria lançando links mortos, rotas de "limpeza" e enviando os usuários para canais de contato da template.
* Mapa seguro de substituição para Session 019-B:
  1. Localizar todos `href="/contact"`, `href="/pricing"`, `href="/about"` em botões primários e substituir pelo link de WhatsApp oficial.
  2. Localizar `href="https://www.instagram.com/flowfye.agency/"` e substituir por `https://www.instagram.com/copycenterudi/`.
  3. Limpar links de template Flowfye e Webflow.
  4. Substituir os rotas antigas do Blog nos atributos `href` para `href="#"` (temporariamente) e ajustar os `aria-label` para o conteúdo textual em PT-BR (ex: "Projeto Gráfico X").
  5. Atualizar os dropdowns e `footer_link-item` para anchors ou `#` temporários até que IDs sejam estabelecidos.
* Confirmação de que nenhum arquivo do site foi alterado: ✅ Confirmado. Nenhuma modificação feita, apenas leitura.
