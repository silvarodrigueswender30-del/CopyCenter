# REPORT — SESSION-003 — Header + Hero

- Status: CONCLUÍDA ✅

## Stack detectada
- Vite + React, herdado da Session 002.
- CSS Webflow base mantido em `SITE-COPYCENTER/src/styles/webflow-base.css`.
- CSS inline Webflow mantido em `SITE-COPYCENTER/src/styles/webflow-inline.css`.

## Escopo implementado
- Header/Navbar da referência.
- Hero Section da referência.
- Fragmento dedicado de renderização estática:
  - `SITE-COPYCENTER/public/header-hero.html`
- O app agora carrega apenas Header + Hero, não as seções abaixo.

## Arquivos criados
- `SITE-COPYCENTER/public/header-hero.html`
- `_sessions/session-003_header-hero/REPORT.md`

## Arquivos modificados
- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css`
- `_sessions/_status.md`

## Estrutura preservada
- `.page-wrapper`
- `.navbar`
- `.navbar_container`
- `.navbar_logo`
- `.navbar_content`
- `.navbar_menu`
- `.navbar_dropdown`
- `.navbar-button_wrapper`
- `.navbar_button`
- `.navbar_toggler-button`
- `<main class="main-wrapper">`
- `<header class="section_hero">`
- `.section-padding.home-header`
- `.home-hero_element`
- `.home-hero_content`
- `.hero-moving_element`
- `.home-hero_video`

## Textos preservados
- Header:
  - `Home`
  - `About`
  - `Service`
  - `Others`
  - `Contact us`
- Hero:
  - `Breathe easy in a home that’s fresh clean and truly yours`
  - `Get a quote`
  - `Our Service`
  - `Office Cleaning`
  - `Restroom Cleaning`
  - `Bathroom Cleaning`

## Assets preservados
- `/assets/68cb9db7d45d9a0f750230d6_logo-icon.svg`
- `/assets/68f26ef2ae96390b3d18611b_home-background-video-poster-00001.jpg`
- `/assets/68f26ef2ae96390b3d18611b_home-background-video-transcode.mp4`
- `/assets/628299f8aa233b83918e24fd_Pause.svg`
- `/assets/628298b20ae0236682d4b87f_Play-24.svg`

## Atributos `data-w-id` preservados
- `4efd3e31-6575-1293-3013-7c35cc945119`
- `090772c1-a265-3928-617c-acebad120f0b`
- `807be815-70d0-f1ac-5e03-02995c366692`
- `76c11b09-b14f-1ed4-fff4-d146aece610c`

## CSS customizado aplicado
- Arquivo: `SITE-COPYCENTER/src/styles/custom.css`
- Override mínimo aplicado para tornar o conteúdo da Hero visível sem IX2/GSAP:
  - `.home-hero_content { opacity: 1 !important; filter: none !important; transform: none !important; }`

## Comando usado para rodar localmente
- `npm run dev -- --port 5173`
- URL validada:
  - `http://127.0.0.1:5173/`

## Comando de build/teste executado
- `npm run build`
- Validação HTTP local:
  - `http://127.0.0.1:5173/` retornou `200`
  - `http://127.0.0.1:5173/header-hero.html` retornou `200`
- Marcadores verificados no fragmento servido:
  - `section_hero`
  - `navbar_button`
  - `home-hero_content`
  - textos obrigatórios do Header/Hero

## Validação local confirmada pelo usuário
- URL validada: `http://127.0.0.1:5173/`
- Status visual: Header + Hero renderizados corretamente.
- Pendência: elementos flutuantes da Hero ainda sem movimento.
- Decisão: pendência será tratada em uma sessão específica de GSAP/hero motion antes da adaptação CopyCenter.
- Não alterar código.
- Não implementar GSAP agora.
- Não avançar para Session 004.

## Problemas encontrados
- O build manteve os avisos herdados da Session 002 para dois SVGs referenciados no CSS base que não existem no pacote local da paridade:
  - `/assets/68d6557003752417218d566e_form-select-chevron.svg`
  - `/assets/68dcf548c30e0482727ef17a_service-content-icon.svg`
- O servidor Vite/build exigiu permissão escalada, como na Session 002, por bloqueio do sandbox ao resolver `vite.config.js`.

## Soluções aplicadas
- Criado fragmento estático restrito ao Header + Hero a partir de `reference-body.html`.
- `App.jsx` atualizado para carregar `header-hero.html`.
- Mantidos textos, links, imagens, classes Webflow, wrappers e `data-w-id`.
- Aplicado somente o override mínimo obrigatório para a Hero ficar visível.

## O que ficou fora de escopo
- Adaptação para CopyCenter.
- Troca de textos.
- Troca de imagens.
- Troca de cores.
- Implementação de seções abaixo do Hero.
- Recriação completa de animações IX2.
- Instalação ou implementação de GSAP.
- Deploy.
- SEO.
- Refatoração de classes Webflow.
- Alteração de breakpoints, espaçamentos ou unidades.

## Próxima sessão recomendada
- Session 004 — Serviços, somente após validação do orquestrador.
