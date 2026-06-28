# NEXT_SECTION_SPEC — SESSION 012

## 1. Nome exato da seção no markup
`<section class="section_cta">`

## 2. Posição exata após `.section_blog`
Imediatamente após a tag de fechamento da `.section_blog`.
**Nota importante**: A `.section_cta` é a ÚLTIMA seção dentro de `<main class="main-wrapper">`. Logo após ela, a tag `<main>` é fechada e inicia-se `<footer class="footer">`.

## 3. Classes principais da seção
- `.section_cta`
- `.section-padding`, `.padding-0x160`
- `.container-large`
- `.cta_component`, `.cta_sticky`
- `.cta_content`, `.content-align-center`
- `.heading-custom-h1`, `.text-highlighted`
- `.cta_para`
- `.button-container`, `.button`, `.w-inline-block`, `.button-text`, `.button-hover`
- `.cta-image_block`, `.is-image1` até `.is-image8`
- `.cta-image_wrap`, `.cta_image`
- `.cta-image-label`, modifiers (`.is-top-left`, `.is-top-right`, `.is-top-middle`)

## 4. Hierarquia de wrappers
```html
<section class="section_cta">
    <div class="section-padding padding-0x160">
        <div class="container-large">
            <div class="cta_component">
                <div class="cta_sticky">
                    <div class="cta_content">
                        <div class="content-align-center">
                            <!-- Title, Paragraph, Button -->
                        </div>
                    </div>
                    <!-- 8 Image Blocks -->
                    <div class="cta-image_block is-image1">...</div>
                    <div class="cta-image_block is-image2">...</div>
                    <!-- ... -->
                    <div class="cta-image_block is-image8">...</div>
                </div>
            </div>
        </div>
    </div>
</section>
```

## 5. Textos originais
- **Título**: `Your clean happy <span class="text-highlighted">space is just</span> one click away`
- **Parágrafo**: `Let Albadoe transform your home or office into a spotless sanctuary. Book your service in just a few clicks — fast, easy`
- **Botão CTA**: `Get a quote`
- **Labels das Imagens**:
  - `Bathroom Cleaning`
  - `House Cleaning` (aparece duas vezes no bloco 2)
  - `General repairs`
  - `Siding corner`
  - `Flower planting`
  - `Roof repair`
  - `Electrical repairs`
  - `Garden design`

## 6. Imagens/assets usados
- `/assets/68d7abf52fbed4b3e6446c4d_cta-image-1.avif`
- `/assets/68d7abf5330ca04c6031880c_cta-image-2.avif`
- `/assets/68d7abf2f5fa5f83c9d46062_cta-image-3.avif`
- `/assets/68d7abf1090cb5cda1b58642_cta-image-4.avif`
- `/assets/68d7abf539b28e08760c76d6_cta-image-5.avif`
- `/assets/68d7abf5cf25cbedd457b695_cta-image-6.avif`
- `/assets/68d7abf5ba6e8704466a1d4d_cta-image-7.avif`
- `/assets/68d7abf05d06b9315b37840d_cta-image-8.avif`

## 7. Botões/CTAs
- Botão "Get a quote" com as classes padrão do projeto e atributos `data-button="wrap"` / `data-button="clip"`.

## 8. Links/hrefs originais
- Botão CTA: `href="/contact"`

## 9. Atributos data-w-id encontrados
- **Nenhum** atributo `data-w-id` foi encontrado na estrutura HTML desta seção no snapshot exportado.

## 10. ids `w-node-*` encontrados
- **Nenhum** id `w-node-*` encontrado nesta seção.

## 11. Estados visuais iniciais IX2
- Como não há `data-w-id` inline contendo `opacity: 0`, `filter` ou `transform`, a seção aparenta ser puramente baseada em CSS (possivelmente CSS Grid/Flexbox e CSS Sticky/Absolute positioning para a colagem de imagens ao redor do texto).

## 12. Animações/interações identificadas
- A classe `.cta_sticky` sugere fortemente um comportamento de `position: sticky` nativo do CSS (ou um layout flutuante com as imagens ao redor do texto central).
- Pode haver animações atreladas às classes globais ou transitions no `webflow-base.css`, mas no nível do markup HTML, não há IX2 de invisibilidade.

## 13. Dependências de Webflow JS
- Aparentemente não depende do motor de IX2 do Webflow JS para visibilidade inicial, diferente das seções anteriores.

## 14. Riscos técnicos
- As 8 imagens com classes `.is-image1` até `.is-image8` provavelmente dependem de posicionamento absoluto (`position: absolute`) ao redor do `.content-align-center`. Se o container não tiver a altura/largura corretas, o layout pode quebrar severamente.
- É estritamente necessário garantir que a folha de estilos `webflow-base.css` seja o único motor de renderização neste primeiro momento para evitar que as imagens se sobreponham umas às outras num amontoado sem sentido.

## 15. Recomendações objetivas para implementação
- **Implementação Estática Inicial**: Extrair `<section class="section_cta">` exatamente como está e salvá-la em `public/cta.html`.
- Injetá-la via `App.jsx`.
- Por não ter `opacity: 0` inline, não deve ser necessário aplicar correções no `custom.css` nesta etapa, a menos que o layout nativo quebre na conversão para React.

## 16. Como integrar abaixo de `blog.html`
- Em `App.jsx`, adicionar o fetch para `/cta.html`.
- No `setHtml`, renderizar `${ctaMarkup}` logo após `${blogMarkup}` e imediatamente antes de fechar a tag `</main>`.

## 17. Arquivos que podem ser alterados
- `SITE-COPYCENTER/public/cta.html` (criar)
- `SITE-COPYCENTER/src/App.jsx`
- `_sessions/_status.md`
- `_sessions/session-012_next-section/REPORT.md` (criar)

## 18. Arquivos que não podem ser alterados
- Todas as seções anteriores (`header`, `process`, `info`, `testimonial`, `blog`, etc).
- `webflow-base.css`.
- Textos, imagens, links originais.
- Não usar GSAP.

## 19. Checklist de validação visual
- [ ] A seção CTA aparece como a última parte do `<main>`, abaixo da seção Blog.
- [ ] O título "Your clean happy space is just one click away" aparece centralizado e perfeitamente formatado.
- [ ] As 8 imagens de serviços extras (`.is-image1` a `.is-image8`) aparecem flutuando/posicionadas ao redor do bloco de texto central (colagem).
- [ ] O comportamento `sticky` (se aplicável via CSS nativo) funciona.
- [ ] O layout das imagens não se empilha de forma bagunçada; cada imagem ocupa seu espaço designado pelo CSS original.
- [ ] Nenhuma quebra visual nas seções anteriores.

## 20. Veredito: implementar estático primeiro ou motion junto
- **Estático primeiro**. Isolar a extração e focar na complexidade do layout posicionado (`.is-image*`). Isso garante que a colagem flutuante de imagens (que é complexa por si só) fique perfeita antes de pensar em qualquer motion GSAP.
