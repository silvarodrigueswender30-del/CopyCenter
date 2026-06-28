# REPORT — SESSION-006 — Processo

- Status: COM PROBLEMAS ⚠️

## O que foi implementado

- Extraída a seção completa `.section_process.background-grey` de `SITE-COPYCENTER/public/reference-body.html`.
- Criado o fragmento `SITE-COPYCENTER/public/process.html`.
- Integrado `process.html` imediatamente após `services.html` no fluxo atual do `App.jsx`.
- Aplicados overrides mínimos em `custom.css` para tornar a seção estática, visível e legível sem recriar o scroll-driven IX2.

## Arquivos criados

- `SITE-COPYCENTER/public/process.html`
- `_sessions/session-006_processo/REPORT.md`

## Arquivos modificados

- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css`
- `_sessions/_status.md`

## Nome exato da seção

- `<section class="section_process background-grey">`

## Classes principais preservadas

- `.section_process`
- `.background-grey`
- `.section-padding.padding-160x160`
- `.container-large`
- `.section_component`
- `.process_component`
- `.process_element`
- `.process_info`
- `.process-info_wrapper`
- `.process-image_list`
- `.process-image_item.item-1`
- `.process-image_item.item-2`
- `.process-image_item.item-3`
- `.process-info_content`
- `.process-info_content-item.content-item-1`
- `.process-info_content-item.content-item-2`
- `.process-info_content-item.content-item-3`
- `.process-tab_content`
- `.process-tab_content-item`

## Textos preservados

- `From booking to shine our effortless process`
- `Book the service`
- `Whether it's for your home, office, or a special event, we make it easy to get exactly what you need. Customize your cleaning service to match your space and preferences, and schedule it at a time that works best for you — all designed to make the process smooth,`
- `1. Book The Service`
- `Handle The Cleaning`
- `Our expert cleaning team arrives on time, fully equipped with professional tools and eco-friendly products. We follow a detailed cleaning checklist to ensure every corner is thoroughly cleaned. From dusting and sanitizing to organizing, we handle everything efficiently — leaving your space refreshed and hygienic.`
- `2. Handle The Cleaning`
- `Spotless Results`
- `After completing the cleaning, we double-check every detail to ensure perfection. Your home or workspace will look immaculate, smell fresh, and feel inviting. Our goal is not just cleanliness but comfort — giving you a spotless environment you can truly enjoy and feel proud of every day.`
- `3. Spotless Results`
- CTA: `Contact us`
- CTA href: `/contact`

## Assets usados

- `/assets/68e5814718367e281107b039_process-image-1.avif`
- `/assets/68e0b576e3f6a51fc2cf2ac3_about-mission-image.avif`
- `/assets/68e58146beb7391e015c4f73_process-image-2.avif`

Observação de asset:

- O arquivo físico `SITE-COPYCENTER/public/assets/68e5814718367e281107b039_process-image-1.avif` não existe localmente.
- O mesmo arquivo sem sufixo também não foi encontrado em `Paridade`.
- O fallback original do `srcset`, `68e5814718367e281107b039_process-image-1-p-800.avif`, existe em `public/assets` e permanece referenciado no HTML extraído.
- Nenhuma imagem foi alterada ou substituída nesta sessão.

## data-w-id preservados

- `.process_component`: `583b3dc0-6420-f731-fd70-29b8e453b57c`
- `h2.heading-custom-h1`: `2a4069c1-392a-cc79-a938-868d0a8b5660`

## Overrides aplicados em custom.css

- Visibilidade dos elementos com estado inicial IX2:
  - `.section_process .process_component`
  - `.section_process h2.heading-custom-h1`
- Remoção do vazio desktop:
  - `.section_process .process_component { height: auto; }`
- Estratégia desktop estática em `min-width: 992px`:
  - `.process_element` fica estático.
  - `.process_info` e `.process-image_list` ficam com `height: auto`.
  - `.process-info_content` e `.process-image_list` passam a empilhar conteúdo em coluna.
  - `.process-info_content-item` e `.process-image_item` ficam `position: static`.
  - `.process-image_item` recebe `aspect-ratio: 3 / 2`.

## Estratégia desktop estática aplicada

- O desktop original depende de `.process_component` com `height: 400vh` e transições Webflow IX2.
- Como a Session 006 não autoriza recriar scroll-driven motion, a seção foi estabilizada para exibir os 3 steps e imagens de forma legível.
- A estrutura Webflow foi preservada; nenhum wrapper foi removido e nenhuma classe foi renomeada.

## Confirmação de tablet/mobile preservado

- `.process-tab_content` não foi alterado.
- Os overrides de empilhamento desktop foram escopados em `@media screen and (min-width: 992px)`.
- O comportamento tablet/mobile definido pelo `webflow-base.css` permanece preservado.

## Confirmação de seções anteriores preservadas

- `header-hero.html` não foi alterado.
- `logo-marquee.html` não foi alterado.
- `animated-content.html` não foi alterado.
- `services.html` não foi alterado.
- `heroMotion.js`, `scrollTextMotion.js`, `serviceMotion.js` e `mobileNav.js` não foram alterados.
- A ordem DOM validada no `App.jsx` é:
  1. `header-hero.html`
  2. `logo-marquee.html`
  3. `animated-content.html`
  4. `services.html`
  5. `process.html`

## Resultado do build

- Comando executado: `npm run build`
- Resultado: sucesso.
- Avisos observados:
  - `/assets/68d6557003752417218d566e_form-select-chevron.svg` não resolvido em build time.
  - `/assets/68dcf548c30e0482727ef17a_service-content-icon.svg` não resolvido em build time.
- Observação: avisos herdados das sessões anteriores, sem relação com Processo.

## URL local usada para validação

- Comando executado: `npm run dev -- --port 5173`
- Porta `5173` estava ocupada.
- Vite subiu automaticamente em:
  - `http://127.0.0.1:5174/`
- URLs validadas com HTTP 200:
  - `http://127.0.0.1:5174/`
  - `http://127.0.0.1:5174/header-hero.html`
  - `http://127.0.0.1:5174/logo-marquee.html`
  - `http://127.0.0.1:5174/animated-content.html`
  - `http://127.0.0.1:5174/services.html`
  - `http://127.0.0.1:5174/process.html`

## Problemas encontrados

- O asset sem sufixo `/assets/68e5814718367e281107b039_process-image-1.avif` não existe como arquivo físico local.
- O fallback `-p-800.avif` existe e foi preservado no `srcset`.
- O layout desktop original depende de IX2 scroll-driven, que ficou fora de escopo.

## Soluções aplicadas

- O HTML original foi preservado sem trocar paths de imagem.
- O layout desktop recebeu fallback estático documentado para evitar `400vh`, sobreposição ilegível e conteúdo invisível.
- Tablet/mobile foram preservados pelo CSS original.

## O que ficou fora de escopo

- Adaptação para CopyCenter.
- Troca de textos.
- Troca de imagens.
- Troca de cores.
- Alterações em Header, Hero, Logo, Content ou Services.
- Alterações em `webflow-base.css`.
- Implementação de GSAP novo.
- Recriação do scroll-driven IX2 da seção Processo.
- Seções abaixo de Processo.
- SEO.
- Deploy.
- Alma CopyCenter.

## Próxima sessão recomendada

- Session 006.1 — Process Motion GSAP, para recriar o comportamento scroll-driven desktop da seção Processo.
