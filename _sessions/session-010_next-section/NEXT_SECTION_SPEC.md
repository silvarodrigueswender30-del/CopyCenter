# NEXT_SECTION_SPEC — SESSION 010

## 1. Nome exato da seção no markup
`<section data-w-id="13802332-4340-3755-b4fc-617e8f004a4a" class="section_testimonial background-grey">`

## 2. Posição exata após `.section_info`
Imediatamente após a tag de fechamento de `.section_info`, dentro de `<main class="main-wrapper">`.

## 3. Classes principais da seção
- `.section_testimonial`, `.background-grey`
- `.section-padding`, `.padding-160x160`
- `.container-large`
- `.max-width-544px`
- `.text-highlighted`
- `.home-testimonial_list`
- `.home-testimonial_item`, `.item-1`, `.item-2`, `.item-3`
- `.home-testimonial_content`
- `.home-testimonial_icon`
- `.heading-custom-h5`, `.text-align-center`
- `.home-testimonial_author`
- `.home-testimonial_image-wrap`, `.home-testimonial_image`

## 4. Hierarquia de wrappers
```html
<section data-w-id="13802332-4340-3755-b4fc-617e8f004a4a" class="section_testimonial background-grey">
    <div class="section-padding padding-160x160">
        <div class="container-large">
            <div class="margin-bottom margin-60">
                <div class="text-align-center">
                    <div class="max-width-544px">
                        <h2 data-w-id="bb346652-eb0d-7223-c0b8-57a0eba11791" style="..."><span class="text-highlighted">Over 200+</span> Reviews From Our Clients</h2>
                    </div>
                </div>
            </div>
            <div class="home-testimonial_list">
                <div class="home-testimonial_item item-1">...</div>
                <div class="home-testimonial_item item-2">...</div>
                <div class="home-testimonial_item item-3">...</div>
            </div>
        </div>
    </div>
</section>
```

## 5. Textos originais
- **Título**: `<span class="text-highlighted">Over 200+</span> Reviews From Our Clients`
- **Depoimento 1**:
  - Texto: `“They made my home shine like new! Professional, friendly, and always on time — highly recommend their cleaning service.”`
  - Autor: `Courtney Henry`
- **Depoimento 2**:
  - Texto: `“Outstanding experience! The team is reliable, detailed, and uses eco-friendly products. My office has never looked cleaner.”`
  - Autor: `David Martinez`
- **Depoimento 3**:
  - Texto: `“Fast, efficient, and affordable. They handled everything perfectly and exceeded my expectations. I’ll definitely book again!”`
  - Autor: `Eleanor Pena`

## 6. Imagens/assets usados
- Ícones SVG de aspas duplas (dentro de `.home-testimonial_icon`) para cada depoimento.
- `/assets/68e4d3d75ccf7957880da479_home-testimonial-image-1.avif`
- `/assets/68e4d3d7bf5c464cee823ed3_home-testimonial-image-2.avif`
- `/assets/68e4d3d7c5324e7cefa6868b_home-testimonial-image-3.avif`

## 7. Botões/CTAs
- Não existem botões ou CTAs nesta seção.

## 8. Atributos data-w-id encontrados
- Na seção: `data-w-id="13802332-4340-3755-b4fc-617e8f004a4a"`
- No H2: `data-w-id="bb346652-eb0d-7223-c0b8-57a0eba11791"`

## 9. Estados visuais iniciais IX2
- O `h2` possui estilo de ocultação: `style="... opacity:0; filter:blur(5px); transform:..."`
- Os items (`.home-testimonial_item`) aparentemente não possuem inline styles IX2 neste fragmento estático, indicando que se houvesse fade neles, seria via classe genérica ou estão estáticos no momento.

## 10. Animações/interações identificadas
- O título (`h2`) possui animação IX2 de fade-in + blur-out, ativada por rolagem (scroll).
- Não há slider/carrossel (`w-slider`). Trata-se de um layout de grid ou flex estático com 3 cards.

## 11. Dependências de Webflow JS
- A lógica de aparição do título depende exclusivamente do engine IX2 do Webflow.js. Sem ele, o título ficará oculto.

## 12. Riscos técnicos
- O `h2` ficará invisível permanentemente devido ao `opacity: 0` inline, necessitando de neutralização no `custom.css`.
- O layout de grid/flex dos testimonials pode ser peculiar (notou-se `id="w-node-..."` neles). No entanto, como não é um slider, o layout deve se resolver nativamente via CSS existente, desde que a estrutura DOM seja estritamente preservada.

## 13. Recomendações objetivas para implementação
- **Extrair Fragmento**: Extrair `<section data-w-id="..." class="section_testimonial background-grey">` e salvá-lo em `public/testimonial.html`.
- **Injeção**: Integrá-lo em `App.jsx` logo após `info.html`.
- **Fallback CSS**: Adicionar no `custom.css` as regras específicas para neutralizar `opacity`, `transform` e `filter` no `h2` (`.section_testimonial h2`).

## 14. Como integrar abaixo de `info.html`
- Em `App.jsx`, adicionar o fetch para `/testimonial.html` no array de `Promise.all`.
- Incluir a markup no callback e anexá-lo na interpolação do layout logo após `infoMarkup`.

## 15. Arquivos que podem ser alterados
- `SITE-COPYCENTER/public/testimonial.html` (criar)
- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css`
- `_sessions/_status.md`
- `_sessions/session-010_next-section/REPORT.md` (criar)

## 16. Arquivos que não podem ser alterados
- Todas as seções anteriores (`header`, `about`, `video`, `info`, etc).
- `webflow-base.css`
- Textos, assets, svgs originais.

## 17. Checklist de validação visual
- [ ] O componente Testimonial aparece imediatamente após a seção Info.
- [ ] O título "Over 200+ Reviews..." está visível.
- [ ] Os 3 cards de depoimento aparecem organizados sem quebra de layout.
- [ ] Textos e imagens dos autores batem perfeitamente.
- [ ] O ícone de aspas (SVG) carrega em cada card.
- [ ] Nenhuma quebra visual nas seções anteriores.

## 18. Veredito: implementar estático primeiro ou motion junto
- **Estático primeiro**. Isolar a extração, usar fallback CSS para o `h2` e garantir que o layout dos 3 cards renderiza corretamente na tela (sem risco de quebra, já que não é um carrossel ativo). Uma implementação GSAP para o título/cards ficará para uma sub-sessão posterior (`010.1`), seguindo o fluxo de trabalho metódico aprovado.
