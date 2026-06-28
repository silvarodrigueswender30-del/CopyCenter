# REPORT — SESSION-006.1 — Process Motion GSAP

- Status: CONCLUÍDA ✅

## O que foi implementado

- Criado `SITE-COPYCENTER/src/scripts/processMotion.js`.
- Integrado `initProcessMotion(document)` no ciclo de inicialização do `App.jsx`.
- Recriado o comportamento desktop scroll-driven da seção `.section_process` com GSAP ScrollTrigger.
- Condicionados os overrides estáticos da Session 006 para que o layout estático continue funcionando quando o motion específico de Processo não estiver ativo.
- Preservado o fallback tablet/mobile sem criar ScrollTrigger em `≤991px`.

## Arquivos criados

- `SITE-COPYCENTER/src/scripts/processMotion.js`
- `_sessions/session-006_1_process-motion/REPORT.md`

## Arquivos modificados

- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css`
- `_sessions/_status.md`

## Seletores animados

- `.section_process`
- `.section_process .process_component`
- `.section_process h2.heading-custom-h1`
- `.section_process .process-info_content-item.content-item-1`
- `.section_process .process-info_content-item.content-item-2`
- `.section_process .process-info_content-item.content-item-3`
- `.section_process .process-image_item.item-1`
- `.section_process .process-image_item.item-2`
- `.section_process .process-image_item.item-3`
- `.section_process .process-info_tags-item.tag-1`
- `.section_process .process-info_tags-item.tag-2`
- `.section_process .process-info_tags-item.tag-3`

## Seletores preservados

- `.section_process .process-tab_content`
- `.section_process .process-tab_content-item`
- `.section_process .process-info_content-item.static`
- `.section_process .process-image_item.static`
- Todos os seletores fora de `.section_process`

## ScrollTrigger utilizado

- `trigger: ".section_process"`
- `start: "top top"`
- `end: "+=300%"`
- `scrub: 1.2`
- `pin: false`
- `invalidateOnRefresh: true`
- `markers: false`

## Timeline implementada

- Step 1 inicia visível.
- Step 2 entra em torno de 33% do progresso da timeline.
- Step 3 entra em torno de 66% do progresso da timeline.
- Cards de conteúdo alternam com `autoAlpha`.
- Imagens alternam com `autoAlpha` e `scale`.
- Tags alternam com `opacity`.
- O scroll reverso reverte a timeline naturalmente por `scrub`.

## Tratamento de desktop-only

- O motion usa `gsap.matchMedia()` com `(min-width: 992px)`.
- Em `≤991px`, nenhum ScrollTrigger da seção Processo é criado.
- O layout `.process-tab_content` permanece sob controle do CSS original do Webflow.

## Tratamento de prefers-reduced-motion

- Em `prefers-reduced-motion: reduce`, a seção é mantida visível sem criar a timeline scroll-driven.
- Cards, imagens e tags são definidos como visíveis imediatamente.

## Condicionamento dos overrides estáticos

- Os fallbacks da Session 006 foram condicionados por ausência de `.process-motion-ready`.
- Também foi mantida cobertura para `html:not(.motion-ready)`.
- Motivo: `.motion-ready` já é usada por scripts anteriores, então `.process-motion-ready` evita que o fallback de Processo seja desligado antes do motion da própria seção estar ativo.

## Confirmação de estrutura preservada

- `SITE-COPYCENTER/public/process.html` não foi alterado.
- `SITE-COPYCENTER/public/reference-body.html` não foi alterado.
- `SITE-COPYCENTER/src/styles/webflow-base.css` não foi alterado.
- Não houve alteração de classes Webflow, IDs, atributos `data-*`, textos, imagens ou estrutura HTML.

## Confirmação de seções anteriores preservadas

- Header/Hero não foram alterados.
- Logo marquee não foi alterado.
- Animated content não foi alterado.
- Services não foi alterado.
- `heroMotion.js`, `serviceMotion.js`, `scrollTextMotion.js` e `mobileNav.js` não foram alterados.

## Resultado do build

- Comando executado: `npm run build`
- Resultado final: sucesso.
- Observação: a primeira tentativa foi bloqueada pelo sandbox ao resolver `vite.config.js`; o comando foi reexecutado com permissão elevada e passou.
- Avisos herdados observados:
  - `/assets/68d6557003752417218d566e_form-select-chevron.svg` não resolvido em build time.
  - `/assets/68dcf548c30e0482727ef17a_service-content-icon.svg` não resolvido em build time.

## URL local usada para validação

- Comando executado: `npm run dev -- --port 5173`
- Porta `5173` estava ocupada.
- Vite subiu automaticamente em:
  - `http://127.0.0.1:5174/`
- URLs validadas com HTTP 200:
  - `http://127.0.0.1:5174/`
  - `http://127.0.0.1:5174/process.html`

## Assets

- O asset sem sufixo `/assets/68e5814718367e281107b039_process-image-1.avif` continua ausente, conforme já registrado na Session 006.
- O fallback `/assets/68e5814718367e281107b039_process-image-1-p-800.avif` existe.
- Nenhum asset foi alterado ou substituído nesta sessão.

## Problemas encontrados

- Bloqueio inicial do sandbox no build.
- Porta `5173` ocupada.
- Asset original do step 1 segue ausente como problema herdado da Session 006.

## Soluções aplicadas

- Build reexecutado com permissão elevada.
- Validação local realizada em `http://127.0.0.1:5174/`.
- Motion implementado sem depender de alteração no HTML ou no CSS base.

## O que ficou fora de escopo

- Adaptação para CopyCenter.
- Troca de textos, imagens ou cores.
- Alterações em Header, Hero, Logo, Content ou Services.
- Alterações em `process.html`, `reference-body.html` ou `webflow-base.css`.
- SEO, deploy, snap e markers.
- Qualquer ajuste tablet/mobile além de preservar o comportamento nativo.

## Próxima sessão recomendada

- Validação visual pelo orquestrador da Session 006.1.
- Após aprovação, seguir para a próxima sessão liberada pelo orquestrador.
