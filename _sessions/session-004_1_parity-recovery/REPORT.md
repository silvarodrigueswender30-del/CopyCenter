# REPORT — SESSION-004.1 — Parity Recovery Implementation

- Status: CONCLUÍDA ✅
- Sessão executada: 004.1 — Parity Recovery Implementation
- Objetivo: recuperar a paridade estrutural perdida entre Hero e Serviços, reintegrando as seções de logos e texto animado do site de referência.

## Arquivos criados

- `SITE-COPYCENTER/public/logo-marquee.html`
- `SITE-COPYCENTER/public/animated-content.html`
- `SITE-COPYCENTER/src/scripts/scrollTextMotion.js`
- `SITE-COPYCENTER/src/scripts/serviceMotion.js`
- `_sessions/session-004_1_parity-recovery/REPORT.md`

## Arquivos modificados

- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css`
- `SITE-COPYCENTER/package.json`
- `SITE-COPYCENTER/package-lock.json`
- `_sessions/_status.md`

## Seções recuperadas

- `.section_logo`
- `.section_content`

## Ordem DOM validada

- `<header class="section_hero">`
- `<section class="section_logo">`
- `<section class="section_content">`
- `<section class="section_service">`

Validação local por composição dos fragments:

- `.section_hero`: índice 10412
- `.section_logo`: índice 25005
- `.section_content`: índice 226702
- `.section_service`: índice 227268
- Resultado: ordem correta e uma instância de cada seção.

## Classes Webflow preservadas

- Header e Hero foram preservados via `header-hero.html`.
- Serviços foram preservados via `services.html`.
- A seção de logos foi extraída da referência com classes Webflow originais.
- A seção de texto animado foi extraída da referência com classes Webflow originais.
- Nenhuma classe Webflow foi renomeada.
- Nenhum wrapper crítico foi removido.

## `data-w-id` preservados

- `.section_logo`: `80a35acb-8401-b632-974f-ebd5cd300fcf`
- `.section_service`: `290906c4-085e-7dae-1a15-2acb98951675`
- Header/Hero permanecem controlados pelo fragmento já aprovado.

## Dependências

- Dependência instalada: `split-type@^0.3.4`
- Dependência existente preservada: `gsap@^3.15.0`

## Scripts criados

- `scrollTextMotion.js`
  - Usa `SplitType` para dividir `.reveal-type`.
  - Usa `gsap.fromTo()` com `ScrollTrigger` para revelar caracteres durante o scroll.
  - Aguarda `document.fonts.ready` antes do split.
  - Preserva `prefers-reduced-motion`.
  - Inclui cleanup com `ctx.revert()` e `split.revert()`.

- `serviceMotion.js`
  - Substitui o override estático da `.section_service .section_header`.
  - Recria entrada com `opacity`, `blur` e deslocamento vertical via GSAP.
  - Usa `ScrollTrigger` com `toggleActions`.
  - Preserva `prefers-reduced-motion`.
  - Inclui cleanup com `ctx.revert()`.

## Marquee de logos

- O HTML da seção `.section_logo` foi extraído da referência.
- A lista duplicada de logos SVG foi preservada.
- O movimento contínuo foi recriado em CSS com `@keyframes copycenter-logo-marquee`.
- A animação pausa no hover da `.section_logo`.
- A solução funciona como fallback de paridade, já que o runtime IX2/Webflow completo não está em uso nesta etapa.

## Texto animado

- A seção `.section_content` foi reintegrada entre logos e Serviços.
- O texto original foi preservado:
  - `At Albadoe, We Believe A Clean Home Goes Beyond Appearances It&#x27;s About How It Makes You Feel`
- A animação foi implementada com `SplitType` + `GSAP ScrollTrigger`, mantendo a intenção visual de revelação progressiva no scroll.

## Serviços

- O override ofensivo foi removido:
  - `.section_service .section_header { opacity: 1 !important; filter: none !important; transform: none !important; }`
- A entrada do header de Serviços agora é controlada por `serviceMotion.js`.
- O hover zoom dos cards foi preservado em CSS customizado, escopado às classes originais:
  - `.image-animation_scale`
  - `.service-collection_item-image`
  - `.image-animation_trigger`

## Header/Hero

- `header-hero.html` não foi alterado.
- Estrutura e conteúdo de Header/Hero não foram editados.
- A integração ocorreu apenas pela composição em `App.jsx`.

## Build

- Comando executado: `npm run build`
- Resultado: sucesso.
- Avisos observados:
  - `/assets/68d6557003752417218d566e_form-select-chevron.svg` não resolvido em build time.
  - `/assets/68dcf548c30e0482727ef17a_service-content-icon.svg` não resolvido em build time.
- Observação: os avisos são referências herdadas do CSS/export Webflow e permanecem para resolução em runtime.

## Validação local

- Comando executado: `npm run dev -- --port 5173`
- Porta 5173 estava ocupada.
- Vite subiu automaticamente em: `http://127.0.0.1:5174/`
- URLs validadas com HTTP 200:
  - `http://127.0.0.1:5174/`
  - `http://127.0.0.1:5174/logo-marquee.html`
  - `http://127.0.0.1:5174/animated-content.html`
  - `http://127.0.0.1:5174/services.html`

## Problemas encontrados

- A porta 5173 já estava ocupada durante a validação local.
- O export Webflow mantém referências de assets que o Vite não resolve em build time.
- As animações IX2 completas do Webflow não fazem parte da stack local, exigindo fallback controlado para marquee, texto e entrada de Serviços.

## Soluções aplicadas

- Uso automático da porta 5174 para validação local.
- Marquee contínuo recriado em CSS customizado separado.
- Texto animado recriado com `SplitType` + `GSAP ScrollTrigger`.
- Entrada de Serviços recriada com `GSAP ScrollTrigger`.
- Override estático de Serviços removido e substituído por motion real.

## Fora de escopo mantido

- Nenhuma adaptação para CopyCenter.
- Nenhuma troca de texto.
- Nenhuma troca de imagem.
- Nenhuma troca de cor.
- Nenhuma alteração em `webflow-base.css`.
- Nenhuma alteração em `header-hero.html`.
- Nenhuma alteração estrutural interna nos Serviços.
- Nenhuma implementação de SEO ou deploy.
- Nenhum ajuste responsivo amplo.

## Próxima sessão recomendada

- Orquestrador validar a recuperação de paridade da Session 004.1.
- Após aprovação, seguir para a Session 005 — Responsivo.
