# REPORT — SESSION-004.2 — Service Cards Scroll Motion

- Status: CONCLUÍDA ✅

## O que foi implementado

- Adicionada animação de entrada/reversão nos cards da seção Serviços usando GSAP ScrollTrigger.
- A animação foi integrada ao `gsap.context()` já existente em `serviceMotion.js`.
- O motion já aprovado do header de Serviços foi preservado.
- O comportamento de `prefers-reduced-motion` foi estendido para manter cards visíveis sem animação.

## Arquivos criados

- `_sessions/session-004_2_service-cards-motion/REPORT.md`

## Arquivos modificados

- `SITE-COPYCENTER/src/scripts/serviceMotion.js`
- `_sessions/_status.md`

## Seletores animados

- `.section_service .service-collection_item`

## Seletores preservados

- `.image-animation_trigger`
- `.image-animation_scale`
- `.service-collection_item-image`

Esses seletores não receberam transform/opacity via GSAP para preservar o hover/zoom das imagens.

## ScrollTrigger utilizado

- `trigger: ".section_service .collection-list"`
- `start: "top 80%"`
- `markers: false`
- `invalidateOnRefresh: true`

## toggleActions utilizado

- `toggleActions: "play none none reverse"`

## Stagger/duration/ease

- `duration: 0.9`
- `ease: "power3.out"`
- `stagger: 0.15`

## Estado inicial dos cards

- `autoAlpha: 0`
- `y: 40`
- `filter: "blur(4px)"`

## Estado final dos cards

- `autoAlpha: 1`
- `y: 0`
- `filter: "blur(0px)"`

## Tratamento de prefers-reduced-motion

- Em `prefers-reduced-motion: reduce`, header e cards ficam visíveis imediatamente.
- Cards recebem:
  - `autoAlpha: 1`
  - `y: 0`
  - `filter: "blur(0px)"`
  - `clearProps: "visibility"`

## Confirmação de hover preservado

- O GSAP anima apenas `.service-collection_item`.
- Nenhum seletor de hover/zoom de imagem foi animado diretamente.
- `custom.css` não foi alterado nesta sessão.

## Confirmação de Header/Hero preservados

- `header-hero.html` não foi alterado.
- `heroMotion.js` não foi alterado.
- `App.jsx` foi apenas lido; não foi modificado.
- Header, Hero e Hero Motion permanecem intactos.

## Confirmação de logo/content preservados

- `logo-marquee.html` não foi alterado.
- `animated-content.html` não foi alterado.
- `scrollTextMotion.js` não foi alterado.
- Validação HTTP local confirmou resposta 200 para:
  - `http://127.0.0.1:5174/logo-marquee.html`
  - `http://127.0.0.1:5174/animated-content.html`

## Resultado do build

- Comando executado: `npm run build`
- Resultado: sucesso.
- Avisos observados:
  - `/assets/68d6557003752417218d566e_form-select-chevron.svg` não resolvido em build time.
  - `/assets/68dcf548c30e0482727ef17a_service-content-icon.svg` não resolvido em build time.
- Observação: os avisos já existiam como referências herdadas do CSS/export Webflow e permanecem para resolução em runtime.

## URL local usada para validação

- Comando executado: `npm run dev -- --port 5173`
- Porta 5173 estava ocupada.
- Vite subiu automaticamente em: `http://127.0.0.1:5174/`
- URLs validadas com HTTP 200:
  - `http://127.0.0.1:5174/`
  - `http://127.0.0.1:5174/services.html`
  - `http://127.0.0.1:5174/logo-marquee.html`
  - `http://127.0.0.1:5174/animated-content.html`

## Problemas encontrados

- A porta 5173 estava ocupada durante a validação local.
- O build manteve os mesmos avisos de assets herdados do Webflow.

## Soluções aplicadas

- Validação local realizada na porta 5174.
- Animação dos cards escopada em `.section_service`.
- Cleanup preservado com `ctx.revert()`.
- ScrollTrigger dos cards criado dentro do mesmo contexto do header de Serviços para evitar duplicação e vazamento.

## O que ficou fora de escopo

- Nenhuma alteração em Header.
- Nenhuma alteração em Hero.
- Nenhuma alteração em Hero Motion.
- Nenhuma alteração em `header-hero.html`.
- Nenhuma alteração em `services.html`.
- Nenhuma alteração em `custom.css`.
- Nenhuma alteração em `webflow-base.css`.
- Nenhuma alteração em textos, imagens ou cores.
- Nenhuma adaptação para CopyCenter.
- Nenhum ajuste responsivo amplo.
- Nenhum deploy ou SEO.

## Próxima sessão recomendada

- Orquestrador validar a Session 004.2.
- Após aprovação, seguir para Session 005 — Responsivo.
