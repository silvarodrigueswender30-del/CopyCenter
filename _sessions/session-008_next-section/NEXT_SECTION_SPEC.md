# NEXT_SECTION_SPEC — SESSION 008

## 1. Nome exato da seção no markup
`<section class="section_video">`

## 2. Posição exata após `.section_about`
Imediatamente após a tag de fechamento de `.section_about`, dentro da tag principal (`<main class="main-wrapper">`) do site.

## 3. Classes principais da seção
- `.section_video`
- `.section-padding`
- `.info-video_wrap`
- `.info_video.w-background-video.w-background-video-atom`
- `.play-pause_button`
- `.container-large`
- `.info-video_title`
- `.heading-custom-h1`

## 4. Hierarquia de wrappers
```html
<section class="section_video">
    <div class="section-padding">
        <div class="info-video_wrap">
            <div class="info_video w-background-video w-background-video-atom">
                <video>...</video>
                <noscript>...</noscript>
                <div>
                    <button class="play-pause_button">...</button>
                </div>
                <div class="container-large">
                    <div class="info-video_title">
                        <h2 class="heading-custom-h1">...</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

## 5. Textos originais
- Título sobre o vídeo: `Speedy Dependable Home Cleaning Solutions`

## 6. Imagens/assets usados
- Poster do vídeo: `/assets/68da25236418f92f197bc265_info-video-poster-00001.jpg`
- Vídeo MP4: `/assets/68da25236418f92f197bc265_info-video-transcode.mp4`
- Vídeo WebM: `/assets/68da25236418f92f197bc265_info-video-transcode.webm`
- Ícone Pause: `/assets/628299f8aa233b83918e24fd_Pause.svg`
- Ícone Play: `/assets/628298b20ae0236682d4b87f_Play-24.svg`

## 7. Botões/CTAs
- Botão de Play/Pause do vídeo (`button.play-pause_button`).

## 8. Atributos data-w-id encontrados
- Em `.info-video_wrap`: `data-w-id="7cc6e01d-ef09-4916-fcc0-d63c8a8b2619"`
- Em `.info-video_title`: `data-w-id="a5f3ff7f-62b7-9e1c-45a3-40a2e09f2f4c"`
- (Há também atributos utilitários do Webflow para o vídeo, como `data-poster-url`, `data-video-urls`, `data-autoplay`, `data-loop` e `data-w-bg-video-control`).

## 9. Estados visuais iniciais IX2
- `.info-video_wrap`: Apresenta estilos inline IX2 de `transform: translate3d(0, 40px, 0)` e `opacity: 0`.
- `.info-video_title`: Apresenta estilos inline IX2 de `transform: translate3d(0, 14%, 0)`, `filter: blur(5px)` e `opacity: 0`.

## 10. Animações/interações identificadas
- **Entrada via Scroll**: O wrapper do vídeo (`.info-video_wrap`) e o título interno (`.info-video_title`) sofrem animação de entrada com opacidade e deslocamento vertical, removendo também o desfoque inicial (blur) do título.
- **Background Video nativo**: O vídeo deveria tocar automaticamente em background, silenciado e em loop. O botão de play/pause manipula essa reprodução através do JS do Webflow, interagindo com o vídeo.

## 11. Dependências de Webflow JS
- A lógica de Play/Pause é inteiramente delegada ao script nativo de interação Webflow (que vincula o botão à tag video).
- A própria animação de scroll inicial depende de IX2.

## 12. Riscos técnicos
- Como o script original do Webflow.js não está mais ativo, o vídeo background pode tocar automaticamente (já que ele contém `autoplay` no `<video>`), mas o botão de controle de play/pause visual não fará nada.
- Os estados visuais IX2 inline (`opacity: 0`) esconderão completamente a seção, necessitando ser anulados em `custom.css` temporariamente.

## 13. Recomendações objetivas para implementação
- **Criação**: Extrair fielmente o HTML da `<section class="section_video">` diretamente do `reference-body.html` e salvá-lo no arquivo local `public/video.html`.
- **Anulação CSS (Fallback)**: Adicionar regras condicionadas (e.g., `html:not(.motion-ready)`) no `custom.css` garantindo que os elementos `.info-video_wrap` e `.info-video_title` possuam `opacity: 1 !important`, `transform: none !important`, e `filter: none !important`.
- **Manter DOM sem lógica de vídeo provisória**: Não é necessário recriar o código do botão Play/Pause via React ou JavaScript no momento. A prioridade é a extração e visualização estática (o HTML5 fará o autoplay naturalmente).

## 14. Como integrar abaixo de `about.html`
- Em `SITE-COPYCENTER/src/App.jsx`, inserir `fetch("/video.html")` logo abaixo do promise do `about.html`.
- Adicionar o respectivo resultado do markup no `.then` e acoplá-lo à substituição do DOM: `<main>... ${processMarkup}\n${aboutMarkup}\n${videoMarkup}\n  </main>`.

## 15. Arquivos que podem ser alterados
- `SITE-COPYCENTER/public/video.html` (criar arquivo)
- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css` (para fallback de IX2)
- `_sessions/_status.md`
- `_sessions/session-008_next-section/REPORT.md` (criar)

## 16. Arquivos que não podem ser alterados
- Arquivos de seções anteriores (e.g., `about.html`, `process.html`).
- `webflow-base.css`
- Textos, imagens e scripts de motion já consolidados (GSAP).

## 17. Checklist de validação visual
- [ ] A seção `.section_video` renderiza no DOM logo após a About.
- [ ] O componente de vídeo é exposto perfeitamente (a imagem/vídeo deve ocupar o contêiner de forma natural e arredondada).
- [ ] O título "Speedy Dependable Home Cleaning Solutions" está legível, centralizado e visível (sem blur ou transparência).
- [ ] O botão do play/pause aparece na posição correta.
- [ ] O espaçamento superior/inferior obedece à `.section-padding`.
- [ ] Nenhum erro na build ou nas seções prévias (Hero, Logos, Processo, etc).

## 18. Veredito
**Implementar estático primeiro**. Para a Session 008, o executor deverá garantir a injeção da `<section class="section_video">` no DOM com o fallback estático funcionando em `custom.css`. GSAP ou recriação da lógica de play/pause de vídeo poderão compor uma sub-sessão `008.1`.
