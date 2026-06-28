# SERVICES SPEC - SESSION 004

## 1. Nome exato da seção
- No markup HTML: `<section class="section_service">`
- Conhecida logicamente como Home Service (indicado pelas classes filhas como `.home-service`).

## 2. Classes principais da seção
- `.section_service`, `.section-padding`, `.padding-0x160`
- `.section_component`, `.section_header`, `.section_header-title`, `.home-service`, `.section_header-button`
- `.w-dyn-list`, `.collection-list`, `.w-dyn-items`, `.service-collection_item`, `.w-dyn-item`
- `.service-collection_item-inner`, `.service-collection_item-tag`, `.service-collection_item-image_wrap`, `.image-animation_trigger`, `.image-animation_scale`, `.service-collection_item-image`
- `.service-collection_item-content`, `.service-collection_item-title`, `.heading-custom-h4`

## 3. Hierarquia de wrappers
1. `<section class="section_service">`
2. `.section-padding.padding-0x160`
3. `.container-large`
4. `.section_component`
   - Bloco Header (`.margin-bottom.margin-60` > `.section_header`) contendo o título e botão desktop.
   - Lista Dinâmica (`.w-dyn-list` > `.collection-list`) contendo os cards de serviços.
   - Botão Mobile (`.button-show_mobile`).

## 4. Textos originais
- Título principal: `Range of professional <span class="text-highlighted">cleaning solutions</span>`
- Botão desktop: `View all Service`
- Botão mobile: `View all Service`
- Serviços:
  1. Tag: `Commercial` | Título: `Commercial cleaning` | Descrição: `Reliable cleaning tailored for offices, shops, and businesses.`
  2. Tag: `Window` | Título: `Window cleaning` | Descrição: `Streak-free windows delivering crystal-clear outdoor views.`
  3. Tag: `Eco-friendly` | Título: `Eco-friendly cleaning` | Descrição: `Safe, green cleaning with eco-conscious products and methods.`

## 5. Cards/itens de serviço
- São renderizados como uma lista (`.collection-list`), onde cada filho direto é um `.service-collection_item`.
- Cada item contém: Tag superior, link contendo imagem com trigger de animação (`.image-animation_trigger`), e bloco de texto descritivo.

## 6. Imagens/assets usados
- Imagem 1: `/assets/68d3bdc2b051a82b853be258_service-image-6.avif` (e srcset fallback)
- Imagem 2: `/assets/68d3bcb1cfc8bfb20511c778_service-image-5.avif` (e srcset fallback)
- Imagem 3: `/assets/68d3ba94271a5d106aef5720_service-image-4.avif`

## 7. Atributos data-w-id encontrados
- No cabeçalho da seção (`.section_header`): `data-w-id="290906c4-085e-7dae-1a15-2acb98951675"`

## 8. Estados visuais iniciais
- O bloco `.section_header` apresenta inline styles de Webflow IX2 definindo seu estado pré-animação: `opacity:0`, `filter:blur(5px)`, e `transform:translate3d(0, 14%, 0)`.

## 9. Animações identificadas
- A animação do cabeçalho da seção é análoga à entrada da Hero: ele fade-in, desliza para cima e remove o blur quando acionada (possivelmente por ScrollTrigger no Webflow).
- Interação de Hover nos cards de serviço: Classes `.image-animation_trigger` e `.image-animation_scale` indicam um efeito scale up da imagem interna no hover do link, que é lidado primariamente pelo CSS base do Webflow.

## 10. Riscos técnicos
- **Visibilidade:** O elemento `.section_header` ficará invisível por padrão devido ao `opacity: 0` inline, caso não apliquemos o override de segurança.
- Os cards são dinâmicos (Webflow CMS `.w-dyn-list`). É crucial manter a estrutura DOM, incluindo div wrappers de layout dinâmico para preservar a exibição em grid.

## 11. Recomendações objetivas para o Codex
- Adicionar um override no `custom.css` para garantir que `.section_header` dentro da seção de serviço fique visível temporariamente, ou aproveitar a lógica defensiva existente se ela for estendida (ex: `html:not(.motion-ready) .section_header`).
- Como a instrução proíbe implementação de GSAP nesta sessão, apenas preserve a classe e o `data-w-id`.

## 12. Como integrar abaixo da Hero sem quebrar Header/Hero
- Insira o bloco de markup extraído da `.section_service` (presente em `reference-body.html`) no seu layout principal, imediatamente após o fechamento de `<header class="section_hero">`. Ambos devem conviver como irmãos (siblings) dentro de `<main class="main-wrapper">`.

## 13. O que não pode ser alterado
- Estrutura de classes do grid CMS (`.w-dyn-list`, etc).
- Header e Hero existentes (nem marcação, nem CSS, nem JS).
- Textos (por enquanto devem permanecer os placeholders originais).
