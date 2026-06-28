# REPORT — SESSION-006.5 — Revert Process True Pin Stage

* Status: CONCLUÍDA ✅

## Motivo da reversão

- A tentativa de `pin: true` da Session 006.4 foi visualmente reprovada.
- O título/texto da seção Processo passou a subir e sumir de forma artificial, gerando um comportamento que não corresponde à referência.
- A correção restaura o comportamento funcional anterior da Session 006.3, mantendo os ajustes de viewport/sticky da Session 006.2.

## Arquivos modificados

- `SITE-COPYCENTER/src/scripts/processMotion.js`
- `SITE-COPYCENTER/src/styles/custom.css`
- `_sessions/session-006_5_revert-process-pin/REPORT.md`
- `_sessions/_status.md`

## Arquivos preservados

- `SITE-COPYCENTER/public/process.html`
- `SITE-COPYCENTER/public/reference-body.html`
- `SITE-COPYCENTER/src/styles/webflow-base.css`
- Header/Hero/Logo/Content/Services
- Textos, imagens, cores, classes Webflow e atributos `data-*`
- Tablet/mobile

## Alterações revertidas em processMotion.js

- Removida a lógica de pin target da Session 006.4:
  - `processElement`
  - `pinTarget`
- Removido `pin: true`.
- Removido `pinSpacing: true`.
- Removido `anticipatePin: 1`.
- Restaurada a timeline principal para a estratégia da Session 006.3:
  - `trigger: processWrapper || section`
  - `start: "top 12%"`
  - `end: "+=260%"`
  - `scrub: 1.2`
  - `pin: false`
  - `invalidateOnRefresh: true`
  - `markers: false`

## Alterações revertidas em custom.css

- Removido apenas o bloco da Session 006.4 que neutralizava sticky interno:
  - `position: relative`
  - `top: auto`
- Seletores removidos do bloco 006.4:
  - `html.process-motion-ready .section_process .process_info`
  - `html.process-motion-ready .section_process .process-image_list`

## Confirmação de que Session 006.2 foi preservada

- Mantido `top: clamp(48px, 8vh, 100px)`.
- Mantido `height: clamp(480px, 72vh, 700px)`.
- Mantido o bloco `@media screen and (min-width: 992px) and (max-height: 800px)`.
- Mantido o bloco `@media screen and (min-width: 992px) and (max-height: 700px)`.
- Mantido `overflow: hidden` em `.process-info_content-item:not(.static)`.

## Confirmação de que HTML não foi alterado

- `SITE-COPYCENTER/public/process.html` não foi alterado.
- Nenhuma estrutura HTML, ID, classe Webflow ou atributo `data-*` foi alterado.

## Confirmação de que webflow-base.css não foi alterado

- `SITE-COPYCENTER/src/styles/webflow-base.css` não foi alterado.

## Confirmação de tablet/mobile preservado

- A lógica continua escopada em `gsap.matchMedia()` com `(min-width: 992px)`.
- Em `≤991px`, nenhum ScrollTrigger da seção Processo é criado.
- `.process-tab_content` e itens `.static` permanecem intocados.

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

- Seguir para a próxima seção da paridade após Processo, conforme liberação do orquestrador.
