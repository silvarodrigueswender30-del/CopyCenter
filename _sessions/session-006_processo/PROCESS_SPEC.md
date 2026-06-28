# PROCESS SPEC — SESSION 006

## 1. Nome exato da seção no markup
```html
<section class="section_process background-grey">
```
A classe `background-grey` é um modificador visual importante — ela aplica o fundo cinza que diferencia visualmente esta seção das adjacentes. Deve ser mantida.

## 2. Classes principais da seção
- `.section_process` — raiz da seção
- `.background-grey` — modificador de fundo (token de cor)
- `.section-padding.padding-160x160` — espaçamento da seção
- `.container-large` — container central
- `.section_component` — wrapper de componentes
- `.process_component` — wrapper de todo o layout scroll-sticky (desktop)
- `.process_element` — wrapper interior do lado esquerdo (conteúdo informacional)
- `.process_info` — card branco com a informação de cada step
- `.process-info_wrapper` — flex row unindo `.process_info` + `.process-image_list`
- `.process-image_list` — painel de imagens sobrepostas (sticky)
- `.process-image_item.item-1/2/3` — imagens absolutamente posicionadas com z-index por camada
- `.process-info_content` — wrapper relativo dos cards de step
- `.process-info_content-item.content-item-1/2/3` — cards de step absolutamente posicionados
- `.process-info_content-item.static` — versão usada no layout tablet/mobile
- `.process-info_content-title` — título de cada step
- `.process-info_content-divider` — linha decorativa com ícone SVG central
- `.process-info_content-line` — linha horizontal fina (`1px`)
- `.process-info_content-icon` — container `24px` com SVG de ferramenta
- `.process-info_content-para_wrap` + `.process-info_content-para` — parágrafo descritivo
- `.process-info_tags-block` — bloco inferior com lista de tags + CTA
- `.process-info_tags-wrapper` — wrapper overflow hidden das tags
- `.process-info_tags-list` — flex row com as 3 tags
- `.process-info_tags-item.tag-1/2/3` — tags individuais de cada step (opacidade 0.5 por padrão)
- `.process-tab_content` — container do layout tablet/mobile (`display:none` em desktop, `display:flex` em `≤991px`)
- `.process-tab_content-item` — card individual no layout tablet (`position:sticky`, `grid 1fr 1fr`)
- `.process_image` — imagem de processo (height: 100%)
- `.max-width-833px` — container limitador do título H2

## 3. Hierarquia de wrappers
```
section.section_process.background-grey
  div.section-padding.padding-160x160
    div.container-large
      div.section_component
        [LAYOUT DESKTOP — visível somente em ≥992px]
        div.process_component               ← wrapper scroll; height: 400vh; flex-col
          div.process_element
            div.margin-bottom.margin-60
              div.text-align-center
                div.max-width-833px
                  h2.heading-custom-h1      ← título principal com data-w-id
            div.process-info_wrapper        ← flex row
              div.process_info              ← width: 45%; height: 70vh
                div.process-info_content   ← relativo, flex:1
                  div.process-info_content-item.content-item-1  ← position:absolute z:3
                  div.process-info_content-item.content-item-2  ← position:absolute z:2
                  div.process-info_content-item.content-item-3  ← position:absolute z:1
                div.process-info_tags-block
                  div.process-info_tags-wrapper
                    div.process-info_tags-list
                      div.process-info_tags-item.tag-1
                      div.process-info_tags-item.tag-2
                      div.process-info_tags-item.tag-3
                  a.button.w-inline-block   ← CTA "Contact us"
              div.process-image_list        ← flex:1; height:70vh; position:relative
                div.process-image_item.item-1  ← z:0
                div.process-image_item.item-2  ← z:2
                div.process-image_item.item-3  ← z:3

        [LAYOUT TABLET/MOBILE — display:none em desktop, display:flex em ≤991px]
        div.process-tab_content             ← flex-col; gap 60px
          div.process-tab_content-item      ← sticky; grid 1fr 1fr
            div.process-info_content-item.static  ← step 1
            div.process-image_item.static   ← imagem 1
          div.process-tab_content-item      ← step 2
            div.process-info_content-item.static
            div.process-image_item.static   ← imagem 2
          div.process-tab_content-item      ← step 3
            ...
            div.process-image_item.static   ← imagem 3
```

## 4. Textos originais da seção

### Título principal (H2)
```
From booking to shine our effortless process
```
com `<span class="text-highlighted">effortless process</span>`

### Step 1 — Book the service
- **Título H3**: `Book <span class="text-highlighted">the service </span>`
- **Parágrafo**: "Whether it's for your home, office, or a special event, we make it easy to get exactly what you need. Customize your cleaning service to match your space and preferences, and schedule it at a time that works best for you — all designed to make the process smooth,"
- **Tag**: `1. Book The Service`

### Step 2 — Handle The Cleaning
- **Título H3**: `Handle <span class="text-highlighted">The Cleaning</span>`
- **Parágrafo**: "Our expert cleaning team arrives on time, fully equipped with professional tools and eco-friendly products. We follow a detailed cleaning checklist to ensure every corner is thoroughly cleaned. From dusting and sanitizing to organizing, we handle everything efficiently — leaving your space refreshed and hygienic."
- **Tag**: `2. Handle The Cleaning`

### Step 3 — Spotless Results
- **Título H3**: `Spotless <span class="text-highlighted">Results</span>`
- **Parágrafo**: "After completing the cleaning, we double-check every detail to ensure perfection. Your home or workspace will look immaculate, smell fresh, and feel inviting. Our goal is not just cleanliness but comfort — giving you a spotless environment you can truly enjoy and feel proud of every day."
- **Tag**: `3. Spotless Results`

### CTA
- Texto: `Contact us`
- href: `/contact`
- classes: `button w-inline-block`, com `data-button="wrap"`

## 5. Estrutura dos steps/cards/processo
A seção tem **dois layouts paralelos dentro do mesmo `<section>`**:

### Layout Desktop (`process-info_wrapper` — visível em `≥992px`)
- Implementa um padrão de **scroll-linked tabs**: o `.process_component` tem `height: 400vh`, criando espaço de rolagem enquanto o conteúdo fica fixo (sticky). Os 3 cards de conteúdo (`.process-info_content-item`) ficam empilhados via `position: absolute` com z-index escalonado. As imagens também ficam absolutas dentro do `.process-image_list`. O Webflow IX2 é responsável por revelar/ocultar cada step conforme o usuário rola a página.
- **Sem Webflow JS este efeito não funcionará em desktop.** O conteúdo precisa de um override para ser visível.

### Layout Tablet/Mobile (`process-tab_content` — visível em `≤991px`)
- Utiliza `position: sticky` em cada `.process-tab_content-item`.
- Cada item contém conteúdo e imagem em grid `1fr 1fr`.
- Em `≤767px`, o grid colapsa para 1 coluna.
- Este layout NÃO depende de Webflow IX2 — funciona via CSS puro.

## 6. Imagens/assets usados
| Arquivo | Step | Classes |
|---|---|---|
| `/assets/68e5814718367e281107b039_process-image-1.avif` | Step 1 — Book | `.process-image_item.item-1` (desktop) e `.process-image_item.static` (tablet) |
| `/assets/68e0b576e3f6a51fc2cf2ac3_about-mission-image.avif` | Step 2 — Handle | `.process-image_item.item-2` (desktop) e `.process-image_item.static` (tablet) |
| `/assets/68e58146beb7391e015c4f73_process-image-2.avif` | Step 3 — Results | `.process-image_item.item-3` (desktop) e `.process-image_item.static` (tablet) |

Todas as imagens usam `loading="lazy"` e têm srcset com fallbacks p-500 e p-800. Os assets devem existir em `/public/assets/`.

## 7. Botões/CTAs dentro da seção
- **1 CTA** repetido nos 3 steps: `Contact us` → `/contact`
- Usa o padrão de botão Webflow: `data-button="wrap"`, com `.button-text` e `.button-hover` (clip animation)
- O CTA existe tanto no layout desktop (dentro de `.process-info_tags-block`) quanto no tablet (ao final de cada `.process-tab_content-item`)

## 8. Atributos data-w-id encontrados
| Elemento | data-w-id | Uso |
|---|---|---|
| `.process_component` | `583b3dc0-6420-f731-fd70-29b8e453b57c` | Animação de entrada (translate + opacity) |
| `h2.heading-custom-h1` | `2a4069c1-392a-cc79-a938-868d0a8b5660` | Animação de entrada (translate + blur + opacity) |

## 9. Estados visuais iniciais (inline styles IX2)
Dois elementos têm inline styles que os deixam invisíveis por padrão:

**`.process_component`**:
```css
transform: translate3d(0, 40px, 0);
opacity: 0;
```

**`h2.heading-custom-h1`** (título principal):
```css
transform: translate3d(0, 14%, 0);
filter: blur(5px);
opacity: 0;
```

**Ação necessária no `custom.css`**: Aplicar override defensivo análogo ao já utilizado em `.section_header`:
```css
html:not(.motion-ready) .section_process .process_component,
html:not(.motion-ready) .section_process h2.heading-custom-h1 {
  opacity: 1 !important;
  filter: none !important;
  transform: none !important;
}
```

## 10. Animações/interações identificadas
1. **Entrada do `.process_component`**: `translate3d(0, 40px, 0)` → `translate3d(0, 0, 0)` com fade-in. Padrão análogo à seção de Serviços. Pode ser implementado em GSAP por uma sessão dedicada futura.
2. **Entrada do `h2`**: `translate3d(0, 14%, 0)` + `blur(5px)` → estilo padrão. Mesma lógica do `.section_header` de Serviços.
3. **Scroll-linked steps (desktop)**: Webflow IX2 controla a transição entre os 3 cards e imagens conforme o scroll. **Sem Webflow JS, este efeito é inoperante em desktop.** Uma micro sessão de GSAP ScrollTrigger poderá implementá-lo futuramente.
4. **Tags de step**: As tags (`.process-info_tags-item`) têm `opacity: 0.5` por padrão. No Webflow, a tag ativa fica com `opacity: 1`. Sem IX2, todas as tags ficam em `0.5`. No responsive de `≤991px`, o CSS base já corrige para `opacity: 1`.

## 11. Se existe tabs, slider, accordion ou progress state
Sim — a seção `.section_process` implementa um **step-by-step scroll-driven** no desktop. É análogo a um tab system, mas controlado por scroll position em vez de clique. O layout tablet/mobile usa sticky cards que alcançam um efeito similar sem JS.

**Estratégia para Session 006**:
- Em desktop: implementar estático primeiro (todos os 3 content-items visíveis com override CSS), garantindo que o layout não quebre. A animação scroll-driven pode ser implementada em Session 006.1 com GSAP ScrollTrigger.
- Em tablet/mobile: funciona nativamente com CSS sticky — sem risco.

## 12. Riscos técnicos
1. **Layout desktop "colapsado"**: O `.process_component` com `height: 400vh` e os itens de conteúdo absolutamente posicionados farão com que, sem Webflow JS, apenas o card de z-index mais alto (`.content-item-1`) fique visível. Os cards 2 e 3 ficam escondidos atrás. **Mitigação**: override temporário em `custom.css` para tornar todos visíveis (ex.: `display:block; position:static` nos content-items) até que a animação scroll-linked seja implementada.
2. **Altura fixa `400vh`**: A `height: 400vh` do `.process_component` no desktop cria espaço de scroll intencionalmente. Sem o Webflow JS controlando a posição sticky, isso pode resultar em um grande espaço vazio. **Mitigação**: override `height: auto` em `.process_component` até que o GSAP ScrollTrigger seja implementado.
3. **Imagens absolutas sobrepostas**: As imagens `.process-image_item.item-1/2/3` são absolutas. Sem o contêiner pai ter `height: 70vh` e a lógica IX2, elas podem não aparecer. O `.process-image_list` tem `height: 70vh` definido no CSS base, então deve funcionar para o item-3 (z-index mais alto).

## 13. Recomendações objetivas para o Codex

### Fase 1 — Estático (Session 006)
1. Extrair o HTML completo de `.section_process` do `reference-body.html` para `SITE-COPYCENTER/public/process.html`.
2. Integrar via `App.jsx` (fetch de `process.html` após `services.html`).
3. Aplicar no `custom.css` os overrides defensivos de visibilidade (opacity/filter/transform) nos dois elementos com inline styles IX2.
4. Para o layout desktop: adicionar override que deixa o primeiro content-item visível e o `.process_component` com altura automática, eliminando o espaço vazio de `400vh`.
5. Não tentar replicar a animação scroll-driven ainda — entregar a seção visível e legível.
6. Garantir que o layout tablet/mobile (`.process-tab_content`) funcione nativamente via CSS — ele já é `display:flex` em `≤991px`.

### Fase 2 — Motion (Session 006.1, futura)
1. Implementar com GSAP ScrollTrigger a lógica de transição entre os 3 steps no desktop.
2. Animar entrada do `.process_component` e do `h2`.
3. Controlar `opacity` e `transform` das tags `.process-info_tags-item` conforme step ativo.

## 14. Como integrar abaixo de Services sem quebrar seções anteriores
Em `App.jsx`, adicionar o fetch de `process.html` no `Promise.all` existente, e injetar o HTML resultante imediatamente após o fechamento do `</section>` de Serviços — antes do `</main>`. O padrão já utilizado para `services.html` deve ser replicado.

## 15. Arquivos que Codex pode alterar
- `SITE-COPYCENTER/public/process.html` (criar)
- `SITE-COPYCENTER/src/App.jsx` (adicionar fetch de process.html)
- `SITE-COPYCENTER/src/styles/custom.css` (overrides defensivos documentados)
- `_sessions/_status.md`
- `_sessions/session-006_processo/REPORT.md` (criar)

## 16. Arquivos que Codex não pode alterar
- `SITE-COPYCENTER/src/styles/webflow-base.css`
- `SITE-COPYCENTER/public/reference-body.html`
- `SITE-COPYCENTER/public/header-hero.html`
- `SITE-COPYCENTER/public/logo-marquee.html`
- `SITE-COPYCENTER/public/animated-content.html`
- `SITE-COPYCENTER/public/services.html`
- `SITE-COPYCENTER/src/scripts/heroMotion.js`
- `SITE-COPYCENTER/src/scripts/serviceMotion.js`
- `SITE-COPYCENTER/src/scripts/scrollTextMotion.js`

## 17. Checklist de validação visual
- [ ] A seção aparece abaixo da seção Serviços com fundo cinza (`background-grey`).
- [ ] O título "From booking to shine our **effortless process**" está visível.
- [ ] Os 3 steps (Book, Handle, Results) têm títulos, ícones SVG, linhas divisórias e parágrafos visíveis.
- [ ] As 3 imagens estão sendo carregadas (`/assets/...avif`).
- [ ] O CTA "Contact us" aparece em pelo menos um dos steps.
- [ ] Em `≤991px`, o layout tablet (`process-tab_content`) está visível com cards sticky.
- [ ] Em `≤767px`, cada card tablet está em 1 coluna (imagem abaixo do conteúdo).
- [ ] Não há overflow horizontal.
- [ ] Header/Hero/Logos/Content/Services continuam intactos acima.
- [ ] Build passa sem erros.

## 18. Veredito: estático primeiro, motion depois
**Implementar estático primeiro.** O layout da seção tem dois regimes:

- **Tablet/mobile** (`≤991px`): funciona nativamente via CSS (`display:flex`, `position:sticky`). Nenhum JS necessário.
- **Desktop** (`≥992px`): o layout scroll-driven depende de Webflow IX2. Sem ele, é necessário um override CSS temporário para que o conteúdo fique visível (`height: auto` no `.process_component` + todos os content-items estáticos e visíveis). A animação scroll-linked deve ser deixada para Session 006.1.

**A Session 006 deve entregar a seção visível, legível e estruturalmente fiel em todos os breakpoints. A Session 006.1 tratará da animação scroll-driven no desktop com GSAP ScrollTrigger.**
