# REPORT - SESSION-021-B - Apply Hero 01 Static Image with AVIF and Controlled Overlay

* Status: CONCLUIDA ✅
* Assets copiados:
  `SITE-COPYCENTER/public/assets/copycenter/hero/hero-copycenter-01.jpeg`
  `SITE-COPYCENTER/public/assets/copycenter/hero/hero-copycenter-02.jpeg`
* Assets convertidos para AVIF:
  `SITE-COPYCENTER/public/assets/copycenter/hero/hero-copycenter-01.avif`
  `SITE-COPYCENTER/public/assets/copycenter/hero/hero-copycenter-02.avif`
* Tamanho dos JPEGs:
  `hero-copycenter-01.jpeg`: 2,965,738 bytes
  `hero-copycenter-02.jpeg`: 2,770,093 bytes
* Tamanho dos AVIFs:
  `hero-copycenter-01.avif`: 250,684 bytes
  `hero-copycenter-02.avif`: 206,491 bytes
* Ferramenta usada na conversao:
  `ffmpeg` com `libaom-av1`, `-crf 30`, `-still-picture 1`, preservando dimensoes 2752x1536 e sem sobrescrever os JPEGs.
* Arquivos modificados:
  `SITE-COPYCENTER/public/header-hero.html`
  `SITE-COPYCENTER/src/styles/custom.css`
  `_sessions/session-021_B_apply-hero-01-static-image-overlay/REPORT.md`
  `_sessions/_status.md`
* O que foi alterado em `.home-hero_video`:
  O wrapper `.home-hero_video w-background-video w-background-video-atom` foi preservado. Os atributos herdados de video no wrapper foram removidos e o conteudo interno foi substituido por `<picture class="home-hero_picture">` com AVIF e fallback JPEG para `hero-copycenter-01`.
* Confirmacao de que o video herdado foi removido da Hero:
  Confirmado. A Hero ficou com `0` elementos `<video>`, `0` `<noscript>` herdado e `0` fontes `home-background-video-transcode`.
* Confirmacao de que `.home-hero_video` foi preservado:
  Confirmado. A classe `home-hero_video` e as classes Webflow `w-background-video w-background-video-atom` permanecem no wrapper.
* CSS aplicado:
  Adicionado bloco final em `custom.css` para `.section_hero .home-hero_video`, `.home-hero_picture`, `.home-hero_image`, `.home-hero_video::after`, `.home-hero_content` e `.hero-moving_element`.
* Estrategia de overlay aplicada:
  O gradiente base do wrapper foi neutralizado com `background-image: none` para evitar escurecimento duplicado. O overlay controlado foi aplicado em `.home-hero_video::after` com radial + linear gradient, `pointer-events: none` e `z-index: 1`. Conteudo e chips ficam em `position: relative; z-index: 2`.
* Confirmacao de que IDs/classes/data-* relevantes foram preservados:
  Confirmado para a estrutura da Hero fora da midia removida. `.home-hero_element`, `.home-hero_content`, `.hero-moving_element`, chips, navbar, CTAs, links e textos nao foram alterados nesta sessao.
* Confirmacao de que scripts/App.jsx nao foram alterados:
  Confirmado. `SITE-COPYCENTER/src/App.jsx` e scripts GSAP nao foram modificados.
* Confirmacao de que links/copy nao foram alterados:
  Confirmado nesta sessao. O diff do repositório mostra alteracoes antigas no mesmo arquivo, mas a Session 021-B alterou somente a area da midia da Hero e o CSS de overlay.
* Resultado do build:
  `npm run build` passou com sucesso apos rerun com permissao elevada por bloqueio do sandbox. Warnings existentes sobre SVGs nao resolvidos em build time permaneceram como runtime paths.
* URL local usada:
  `http://127.0.0.1:5177/`
* Status desktop 1920x1080:
  OK. `hero-copycenter-01.avif` carregado, sem video, sem tela preta, sem alt text visivel, headline/CTAs/navbar/chips visiveis. Cliques nos CTAs atingem os links, overlay nao bloqueia.
* Status desktop 1440x900:
  OK. `hero-copycenter-01.avif` carregado, sem video, sem alt text visivel, headline/CTAs/navbar/chips visiveis. Cliques nos CTAs atingem os links, overlay nao bloqueia.
* Status desktop 1366x768:
  OK com observacao. `hero-copycenter-01.avif` carregado, headline/navbar/chips visiveis e sem video/alt/tela preta. Os CTAs existem e renderizam na Hero, mas ficam abaixo da area inicial capturada nesse viewport devido a altura/tipografia/layout existente; nao foi alterado porque a sessao proibe mudancas de layout.
* Status mobile 390x844:
  OK com observacao. Imagem carregada, sem video, sem alt text visivel, headline/CTAs/navbar visiveis e clicaveis. Chips nao aparecem porque `.hero-moving_element { display: none; }` ja existe no breakpoint mobile do `webflow-base.css`; regra nao foi alterada.
* Status mobile 430x932:
  OK com observacao. Imagem carregada, sem video, sem alt text visivel, headline/CTAs/navbar visiveis e clicaveis. Chips seguem ocultos pela regra responsiva existente.
* Problemas encontrados:
  O primeiro `npm run build` foi bloqueado pelo sandbox (`Access is denied`) ao carregar o Vite/esbuild; resolvido com permissao elevada. Em 1366x768 os CTAs ficam abaixo da primeira area visivel por comportamento/layout existente. Em mobile os chips permanecem ocultos por CSS Webflow existente.
* Solucoes aplicadas:
  Rerun do build com permissao elevada. Overlay aplicado com pseudo-elemento e `pointer-events: none`. Nenhuma mudanca de GSAP, App.jsx, navbar, copy, links, chips ou wrappers da Hero.
* Pendencias restantes:
  Se o orquestrador exigir CTAs sempre dentro do primeiro viewport em 1366x768, recomenda-se uma sessao separada especifica de calibracao de layout da Hero, pois esta sessao nao podia alterar tipografia, copy, spacing ou posicionamento.
* Proxima sessao recomendada:
  Validacao final pelo orquestrador com os prints da Hero e, se necessario, Session 021-C para calibracao fina de primeira dobra em desktop baixo.
