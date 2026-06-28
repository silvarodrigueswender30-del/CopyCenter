# NEXT_SECTION_SPEC — SESSION 009

## 1. Nome exato da seção no markup
`<section class="section_info">`

## 2. Posição exata após `.section_video`
Imediatamente após a tag de fechamento de `.section_video`, dentro de `<main class="main-wrapper">`.

## 3. Classes principais da seção
- `.section_info`
- `.section-padding`, `.padding-160x160`
- `.container-large`
- `.section_component`
- `.home-info_title`
- `.heading-custom-h1`, `.text-highlighted`
- `.home-info_element`
- `.home-info_card`, `.home-info_icon`
- `.home-info_image-wrap`, `.home-info_image`
- `.heading-custom-h5`

## 4. Hierarquia de wrappers
```html
<section class="section_info">
    <div class="section-padding padding-160x160">
        <div class="container-large">
            <div class="section_component">
                <div class="margin-bottom margin-60">
                    <div class="text-align-center">
                        <div class="home-info_title">...</div>
                    </div>
                </div>
                <div class="home-info_element">
                    <div class="home-info_card">...</div>
                    <div class="home-info_image-wrap">...</div>
                    <div class="home-info_card">...</div>
                    <div class="home-info_card">...</div>
                    <div class="home-info_card">...</div>
                </div>
            </div>
        </div>
    </div>
</section>
```

## 5. Textos originais
- Título principal: `Our Pro Team Takes Care of Everything` (com `of Everything` em `.text-highlighted`)
- Título card 1: `Satisfaction Guaranteed`
- Texto card 1: `We take pride in delivering top-quality cleaning services with care, precision, and consistency. If you're not completely satisfied, we'll make it right — because your comfort and trust matter most to us.`
- Título card 2: `Affordable Pricing`
- Texto card 2: `That’s why we provide fair, cost-effective plans designed to fit every budget, with no extra charges. Our affordable pricing makes professional cleaning simple, reliable, and family-friendly`
- Título card 3: `Eco-Friendly Solutions`
- Texto card 3: `That’s why we use non-toxic, biodegradable products and sustainable practices in every clean. Our eco-friendly approach ensures a healthier environment for your family`
- Título card 4: `Trusted Professionals`
- Texto card 4: `Each member of our team is carefully selected, fully trained, and committed to excellence. With dependable service and genuine care, our trusted professionals create a safe and spotless home for your family`

## 6. Imagens/assets usados
- Imagem central: `/assets/68ee1aa1ad89a89f23f31445_home-info-image.avif`
- Ícones SVG inline (4 diferentes) dentro de cada `.home-info_icon`.

## 7. Botões/CTAs
- Não foram encontrados CTAs/botões na seção.

## 8. Atributos data-w-id encontrados
- Em `.home-info_title`: `data-w-id="d6fcd87c-7a06-2358-18a6-0a32a1a30e73"`
- Em `.home-info_image-wrap`: `data-w-id="859a6e60-ed16-70ea-cf3b-c16aaab46897"`

## 9. Estados visuais iniciais IX2
- `.home-info_title`: `style="-webkit-transform:translate3d(0, 14%, 0) ... filter:blur(5px);opacity:0"`
- `.home-info_image-wrap`: `style="-webkit-transform:translate3d(0, 14%, 0) ... filter:blur(5px);opacity:0"`
- (Os cards aparentam não possuir classes ou inline styles de ocultação neste trecho isolado do HTML).

## 10. Animações/interações identificadas
- **Fade e deslocamento de Título/Imagem**: O título da seção e a imagem central devem aparecer (animando `opacity`, `transform` e `filter`) conforme entram no viewport.

## 11. Dependências de Webflow JS
- A lógica de aparição depende exclusivamente do engine IX2 do Webflow.js. Sem ele, a imagem e o título ficarão ocultos.

## 12. Riscos técnicos
- Elementos ocultos permanentemente: Os inline styles de `opacity: 0` impedirão que o título e a imagem central sejam exibidos, a menos que sejam neutralizados no `custom.css` temporariamente.
- Layout quebrado sem GSAP: A estrutura de grid (aparentemente `.home-info_element` usa CSS Grid) não deve ser afetada, mas é bom validar visualmente.

## 13. Recomendações objetivas para implementação
- **Extrair Fragmento**: Extrair `<section class="section_info">` e salvá-lo em `public/info.html`.
- **Injeção**: Integrá-lo em `App.jsx` logo após `video.html`.
- **Fallback CSS**: Adicionar no `custom.css` as regras específicas para neutralizar `opacity`, `transform` e `filter` em `.home-info_title` e `.home-info_image-wrap`.

## 14. Como integrar abaixo de `video.html`
- Em `App.jsx`, adicionar o fetch para `/info.html` no array de `Promise.all`.
- Incluir `infoMarkup` (ou nomenclatura semelhante) no callback e anexá-lo na interpolação do layout logo após `videoMarkup`.

## 15. Arquivos que podem ser alterados
- `SITE-COPYCENTER/public/info.html` (criar)
- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css` (para fallback de IX2 da `.section_info`)
- `_sessions/_status.md`
- `_sessions/session-009_next-section/REPORT.md` (criar)

## 16. Arquivos que não podem ser alterados
- Todas as seções anteriores (`header`, `about`, `video`, etc).
- `webflow-base.css`
- Textos, assets, svgs originais.

## 17. Checklist de validação visual
- [ ] O componente aparece logo após a seção Video.
- [ ] O título "Our Pro Team..." está visível e com fonte/estilo corretos.
- [ ] O layout exibe 4 cards textuais com SVGs, mais 1 imagem (avif) arranjados possivelmente em formato grid/masonry.
- [ ] Todo texto bate perfeitamente com a referência.
- [ ] As demais seções não sofreram alteração (nem quebras).

## 18. Veredito: implementar estático primeiro ou motion junto
- **Estático primeiro**. Isolar a montagem do HTML em `info.html` e usar `custom.css` para anular as transformações e transparências geradas pelo IX2 inline, entregando um layout perfeito em estático. Uma implementação de motion (GSAP) ficará para sub-sessão posterior (`009.1`).
