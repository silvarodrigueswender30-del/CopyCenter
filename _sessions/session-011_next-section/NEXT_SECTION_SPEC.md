# NEXT_SECTION_SPEC — SESSION 011

## 1. Nome exato da seção no markup
`<section class="section_blog">`

## 2. Posição exata após `.section_testimonial`
Imediatamente após a tag de fechamento de `.section_testimonial`, dentro de `<main class="main-wrapper">`.

## 3. Classes principais da seção
- `.section_blog`
- `.section-padding`, `.padding-160x160`
- `.container-large`
- `.section_component`
- `.section_header`, `.section_header-title`, `.section_header-button`
- `.collection_blogs`, `.w-dyn-list`
- `.collection-blogs_list`, `.w-dyn-items`
- `.collection-blogs_item`, `.w-dyn-item`
- `.content_card`, `.card_body`, `.card_meta`, `.card_title`
- `.card-image_wrapper`, `.image-animation_trigger`, `.image-animation_scale`, `.image-default`
- `.button-show_mobile`

## 4. Hierarquia de wrappers
```html
<section class="section_blog">
    <div class="section-padding padding-160x160">
        <div class="container-large">
            <div class="section_component">
                <div class="margin-bottom margin-60">
                    <div data-w-id="00b9aae3-11e7-03bc-2138-5346907726df" class="section_header" style="...">
                        <div class="section_header-title">
                            <h2>Stay updated with our</h2>
                            <div class="heading-custom-h2 text-highlighted">latest posts</div>
                        </div>
                        <div class="section_header-button hide-on-mobile">...</div>
                    </div>
                </div>
                <div class="collection_blogs w-dyn-list">
                    <div role="list" class="collection-blogs_list w-dyn-items">
                        <div role="listitem" class="collection-blogs_item w-dyn-item">...</div>
                        <div role="listitem" class="collection-blogs_item w-dyn-item">...</div>
                        <div role="listitem" class="collection-blogs_item w-dyn-item">...</div>
                    </div>
                </div>
                <div class="button-show_mobile">...</div>
            </div>
        </div>
    </div>
</section>
```

## 5. Textos originais
- **Título**: `Stay updated with our` e `latest posts` (highlighted).
- **Botões (Desktop e Mobile)**: `View all Blog`
- **Post 1**:
  - Data: `Oct 5, 2025`
  - Título: `Deep cleaning tips for busy homes`
- **Post 2**:
  - Data: `Oct 5, 2025`
  - Título: `Benefits of regular professional cleaning`
- **Post 3**:
  - Data: `Oct 5, 2025`
  - Título: `Ultimate room-by-room cleaning checklist guide`

## 6. Imagens/assets usados
- `/assets/68c9078a36b6c6570f418e61_blog-image-6.avif`
- `/assets/68c906de4c1a8f47333a89eb_blog-image-5.avif`
- `/assets/68c905f3de144a394c7ce732_blog-image-4.avif`

## 7. Botões/CTAs
- Há dois botões "View all Blog" na interface. O primeiro (`.hide-on-mobile`) para visualização desktop e o segundo (`.button-show_mobile`) posicionado abaixo da listagem para visualização mobile. Ambos utilizam os atributos `data-button="wrap"` e `data-button="clip"`.

## 8. Links/hrefs originais
- Botões principais: `href="/blogs"`
- Post 1: `href="/blog/deep-cleaning-tips-for-busy-homes"` (no wrapper da imagem e no título)
- Post 2: `href="/blog/benefits-of-regular-professional-cleaning"`
- Post 3: `href="/blog/ultimate-room-by-room-cleaning-checklist-guide"`

## 9. Atributos data-w-id encontrados
- Em `.section_header`: `data-w-id="00b9aae3-11e7-03bc-2138-5346907726df"`

## 10. ids `w-node-*` encontrados
- Um id de grid node no botão de cabeçalho: `id="w-node-_00b9aae3-11e7-03bc-2138-5346907726e5-19f842b8"`

## 11. Estados visuais iniciais IX2
- O cabeçalho (`.section_header`) tem opacidade `0`, blur de `5px` e deslocamento em Y via `transform`. Isso exigirá um fallback estático caso a interação IX2 não seja portada imediatamente.

## 12. Animações/interações identificadas
- Animação de aparição ao scrollar para o `.section_header`.
- Os cards podem conter hover states (`.image-animation_trigger`, `.image-animation_scale`, botões) nativos do CSS exportado (`webflow-base.css`).

## 13. Dependências de Webflow JS
- O componente todo é estruturado sobre o CMS (Collection List) do Webflow (`w-dyn-list`, `w-dyn-items`, `w-dyn-item`). Ele não requer JS nativo do Webflow para exibir o grid em si, mas a animação do `.section_header` e animações IX2 extras exigem.

## 14. Riscos técnicos
- **Listas Dinâmicas**: Como o Webflow gera HTML estático das listas dinâmicas no export, e nós não estamos conectando a um CMS ainda, o maior risco é quebrar o markup que o CSS espera (classes `w-dyn-*`).
- **IX2 Invisibilidade**: O cabeçalho ficará invisível se não usarmos fallback CSS para neutralizar o `style` inline original.

## 15. Recomendações objetivas para implementação
- **Implementação Estática**: Extrair a `<section class="section_blog">` completa exatamente como exportada e colar num fragmento `blog.html`. Não tentar modularizar os itens do blog para React neste momento; preservar o HTML cru garante a paridade perfeita.
- **Fallback IX2**: Neutralizar a opacidade inicial do `.section_header` via `custom.css` com a classe de prontidão global.

## 16. Como integrar abaixo de `testimonial.html`
- Em `App.jsx`, adicionar o fetch para `/blog.html` no array de promises.
- Renderizar o `blogMarkup` logo após `testimonialMarkup`.

## 17. Arquivos que podem ser alterados
- `SITE-COPYCENTER/public/blog.html` (criar)
- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css`
- `_sessions/_status.md`
- `_sessions/session-011_next-section/REPORT.md` (criar)

## 18. Arquivos que não podem ser alterados
- Todas as seções anteriores (`header`, `process`, `info`, `testimonial`, etc).
- `webflow-base.css`.
- Textos, imagens, links.

## 19. Checklist de validação visual
- [ ] A seção aparece abaixo de Testimonials.
- [ ] O grid renderiza perfeitamente os 3 cards do CMS (em desktop).
- [ ] As 3 imagens carregam corretamente com a proporção nativa.
- [ ] Título principal "Stay updated..." carrega e fica visível.
- [ ] Botão "View all Blog" desktop aparece na mesma linha que o título principal (se couber).
- [ ] Links das imagens e textos mantêm a navegação (`href`) intacta.

## 20. Veredito: implementar estático primeiro ou motion junto
- **Estático primeiro**. Isolar a extração, preservar rigidamente o markup do `w-dyn-list` e o IX2 fallback em `custom.css` para confirmar que não haverá regressões na grid visual nativa. Se necessário, o GSAP motion scroll-driven entra em uma sub-sessão `011.1`.
