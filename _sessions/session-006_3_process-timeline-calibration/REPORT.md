# REPORT — SESSION-006.3 — Process Timeline Start Calibration

* Status: CONCLUÍDA ✅

## Problema visual corrigido

- A timeline dos cards da seção Processo iniciava cedo demais.
- O trigger anterior começava quando o topo da `.section_process` chegava ao topo do viewport, antes do bloco `.process-info_wrapper` estar visualmente enquadrado.
- A calibração agora espera o wrapper visual card + imagem chegar a uma posição mais confortável no viewport antes de iniciar as trocas principais.

## Arquivos modificados

- `SITE-COPYCENTER/src/scripts/processMotion.js`
- `_sessions/session-006_3_process-timeline-calibration/REPORT.md`
- `_sessions/_status.md`

## Arquivos preservados

- `SITE-COPYCENTER/public/process.html`
- `SITE-COPYCENTER/public/reference-body.html`
- `SITE-COPYCENTER/src/styles/webflow-base.css`
- `SITE-COPYCENTER/src/styles/custom.css`
- Header/Hero/Logo/Content/Services
- `heroMotion.js`
- `serviceMotion.js`
- `scrollTextMotion.js`
- `mobileNav.js`

## Trigger anterior

- `trigger: section`
- `start: "top top"`
- `end: "+=300%"`
- `scrub: 1.2`
- `pin: false`
- `invalidateOnRefresh: true`
- `markers: false`

## Trigger novo

- `const processWrapper = section.querySelector(".process-info_wrapper");`
- `trigger: processWrapper || section`
- Fallback documentado: se `.process-info_wrapper` não existir, o trigger volta para `.section_process`.

## Start/end/scrub utilizados

- `start: "top 12%"`
- `end: "+=260%"`
- `scrub: 1.2`
- `pin: false`
- `invalidateOnRefresh: true`
- `markers: false`
- `snap` não foi utilizado.

## Confirmação de que HTML não foi alterado

- `SITE-COPYCENTER/public/process.html` não foi alterado.
- Nenhuma estrutura HTML, ID, classe Webflow ou atributo `data-*` foi alterado.

## Confirmação de que CSS base não foi alterado

- `SITE-COPYCENTER/src/styles/webflow-base.css` não foi alterado.

## Confirmação de que custom.css não foi alterado

- `SITE-COPYCENTER/src/styles/custom.css` não foi alterado nesta microcorreção.

## Confirmação de que tablet/mobile foram preservados

- A lógica `gsap.matchMedia()` com `(min-width: 992px)` foi preservada.
- Em `≤991px`, nenhum ScrollTrigger da seção Processo é criado.
- `.process-tab_content` e variantes `.static` permanecem intocadas.

## Confirmação de que scroll reverso continua funcionando

- A timeline scrubada foi preservada.
- A reversão Step 3 → Step 2 → Step 1 continua funcionando naturalmente pelo `scrub: 1.2`.

## Resultado do build

- Comando executado: `npm run build`
- Primeira tentativa: bloqueada pelo sandbox ao resolver `vite.config.js`.
- Segunda tentativa com permissão elevada: sucesso.
- Avisos herdados:
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

## Próxima sessão recomendada

- Validação visual pelo orquestrador da Session 006.3.
- Após aprovação, seguir apenas para a próxima sessão liberada pelo orquestrador.
