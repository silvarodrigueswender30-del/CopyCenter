# REPORT — SESSION-003.1 — Hero Motion GSAP

- Status: CONCLUÍDA ✅

## GSAP instalado?
- Sim.
- Versão validada: `gsap@3.15.0`.

## Skills GSAP executadas?
- Parcial.
- Executadas com sucesso:
  - `gsap-scrolltrigger`
  - `gsap-plugins`
- Não executadas por bloqueio do ambiente/limite de uso após tentativa:
  - `gsap-react`
  - `gsap-performance`
- A implementação final não usa ScrollTrigger global nem plugins adicionais.

## Arquivos criados
- `SITE-COPYCENTER/src/scripts/heroMotion.js`
- `_sessions/session-003-1_hero-motion-gsap/REPORT.md`

## Arquivos modificados
- `SITE-COPYCENTER/package.json`
- `SITE-COPYCENTER/package-lock.json`
- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css`
- `_sessions/_status.md`

## Seletores animados
- `.home-hero_content`
- `.hero-moving_element.moving-element-01`
- `.hero-moving_element.moving-element-02`
- `.hero-moving_element.moving-element-03`

## Descrição das animações aplicadas
- `.home-hero_content`:
  - Entrada de `autoAlpha: 0`, `filter: "blur(5px)"`, `yPercent: 14`.
  - Finaliza em `autoAlpha: 1`, `filter: "blur(0px)"`, `yPercent: 0`.
  - Duração: `1.1`.
  - Easing: `power3.out`.
- Cards flutuantes:
  - Usam apenas `gsap.to()`, preservando posicionamento base do Webflow.
  - Movimentos leves em `x` e `y`, com `repeat: -1`, `yoyo: true`, `ease: "sine.inOut"`.
  - Durações/delays diferentes para evitar movimento sincronizado.
- `prefers-reduced-motion: reduce`:
  - Remove o motion contínuo.
  - Garante Hero visível sem animação.

## Overrides removidos/mantidos em custom.css
- Removido o override sempre ativo de `.home-hero_content` com `opacity/filter/transform` forçados.
- Mantido fallback seguro em:
  - `html:not(.motion-ready) .home-hero_content`
- Decisão:
  - Se JS falhar, a Hero fica visível.
  - Quando GSAP inicializa, `.motion-ready` libera o controle da animação.

## Comando de build executado
- `npm run build`

## Resultado do build
- Build concluído com sucesso.
- Avisos herdados continuam presentes para dois SVGs ausentes no pacote local da paridade:
  - `/assets/68d6557003752417218d566e_form-select-chevron.svg`
  - `/assets/68dcf548c30e0482727ef17a_service-content-icon.svg`

## Validação local
- Comando solicitado:
  - `npm run dev -- --port 5173`
- Resultado:
  - Porta `5173` estava ocupada.
  - Vite subiu automaticamente em `http://127.0.0.1:5174/`.
- Validação HTTP:
  - `http://127.0.0.1:5174/` retornou `200`.
  - `http://127.0.0.1:5174/header-hero.html` retornou `200`.
- Marcadores validados no fragmento:
  - `section_hero`
  - `home-hero_content`
  - `moving-element-01`
  - `moving-element-02`
  - `moving-element-03`
  - `Breathe easy`
  - `Get a quote`
  - `Our Service`

## Ajuste fino pós-validação visual
- Motivo: usuário observou movimento lento demais nos cards flutuantes.
- Arquivo alterado: `SITE-COPYCENTER/src/scripts/heroMotion.js`.
- Novos parâmetros de motion:
  - `.hero-moving_element.moving-element-01`: `x: "+=5"`, `y: "-=14"`, `duration: 2.6`, `delay: 0`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
  - `.hero-moving_element.moving-element-02`: `x: "-=6"`, `y: "+=11"`, `duration: 3.1`, `delay: 0.15`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
  - `.hero-moving_element.moving-element-03`: `x: "+=6"`, `y: "-=10"`, `duration: 2.8`, `delay: 0.3`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
- Resultado do build: `npm run build` concluído com sucesso; permanecem apenas os avisos herdados de SVGs ausentes da paridade.
- URL local usada para validação: `http://127.0.0.1:5174/` retornou `200` após a porta `5173` estar ocupada.
- Observação: ajuste não altera conteúdo, identidade, layout ou estrutura.

## Correção de zona segura da Hero Motion
- Motivo da correção: análise do Antigravity indicou risco de os cards flutuantes invadirem a zona de leitura do H1; a legibilidade do título passou a ser a prioridade absoluta.
- Arquivos alterados:
  - `SITE-COPYCENTER/src/scripts/heroMotion.js`
  - `SITE-COPYCENTER/src/styles/custom.css`
  - `_sessions/session-003-1_hero-motion-gsap/REPORT.md`
- Novos parâmetros de motion:
  - `.hero-moving_element.moving-element-01`: `x: 0`, `y: "-=5"`, `duration: 4.2`, `delay: 0`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
  - `.hero-moving_element.moving-element-02`: `x: -1`, `y: "+=6"`, `duration: 4.6`, `delay: 0.2`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
  - `.hero-moving_element.moving-element-03`: `x: 1`, `y: "-=5"`, `duration: 4.4`, `delay: 0.4`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
- Ajustes de z-index:
  - `.home-hero_content`: `position: relative` e `z-index: 10`.
  - `.hero-moving_element`: `z-index: 3` e `pointer-events: none`.
  - Não foi necessário usar `!important` nos ajustes de z-index.
- Ajustes responsivos adicionados:
  - Até `991px`: `transform-origin: center` nos cards flutuantes.
  - Até `767px`: `scale: 0.82` nos cards flutuantes.
  - Até `479px`: `scale: 0.72` nos cards flutuantes.
  - Não foram alteradas posições base com `top` ou `left`.
- Resultado do build: `npm run build` concluído com sucesso; permanecem apenas os avisos herdados de SVGs ausentes da paridade.
- URL local usada para validação: `http://127.0.0.1:5174/` retornou `200` após a porta `5173` estar ocupada.
- Observação: a alteração prioriza legibilidade do título e mantém motion premium/sutil.

## Microcorreção final — Floating Cards Parity
- Motivo da correção: finalizar a paridade dos cards flutuantes da Hero, removendo qualquer movimento lateral e limpando CSS morto abaixo de `991px`, já que o `webflow-base.css` oculta `.hero-moving_element` nesse breakpoint.
- Arquivos alterados:
  - `SITE-COPYCENTER/src/scripts/heroMotion.js`
  - `SITE-COPYCENTER/src/styles/custom.css`
  - `_sessions/session-003-1_hero-motion-gsap/REPORT.md`
- Confirmação de `x: 0` nos 3 cards:
  - `.hero-moving_element.moving-element-01`: `x: 0`.
  - `.hero-moving_element.moving-element-02`: `x: 0`.
  - `.hero-moving_element.moving-element-03`: `x: 0`.
- Confirmação dos valores `y`/`duration`/`delay`/`ease`:
  - `.hero-moving_element.moving-element-01`: `y: "-=5"`, `duration: 4.2`, `delay: 0`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
  - `.hero-moving_element.moving-element-02`: `y: "+=5"`, `duration: 4.6`, `delay: 0.2`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
  - `.hero-moving_element.moving-element-03`: `y: "-=5"`, `duration: 4.4`, `delay: 0.4`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
- Confirmação de que media queries mortas foram removidas:
  - Removido `@media screen and (max-width: 991px)` com `transform-origin: center`.
  - Removido `@media screen and (max-width: 767px)` com `scale: 0.82`.
  - Removido `@media screen and (max-width: 479px)` com `scale: 0.72`.
- Confirmação de que z-index defensivo foi mantido:
  - `.home-hero_content`: `position: relative` e `z-index: 10`.
  - `.hero-moving_element`: `z-index: 3` e `pointer-events: none`.
- Resultado do build: `npm run build` concluído com sucesso; permanecem apenas os avisos herdados de SVGs ausentes da paridade.
- URL local usada para validação: `http://127.0.0.1:5174/` retornou `200` após a porta `5173` estar ocupada.
- Observação: Hero aprovada para seguir para Session 004 — Serviços.

## Ajuste de direção visual — Motion mais vivo
- Motivo: usuário preferiu a primeira versão da animação, com movimento mais perceptível e sensação visual mais próxima da paridade.
- Arquivo alterado:
  - `SITE-COPYCENTER/src/scripts/heroMotion.js`
  - `_sessions/session-003-1_hero-motion-gsap/REPORT.md`
- Novos parâmetros aplicados:
  - `.hero-moving_element.moving-element-01`: `x: 4`, `y: -12`, `duration: 3.2`, `delay: 0`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
  - `.hero-moving_element.moving-element-02`: `x: -5`, `y: 9`, `duration: 3.8`, `delay: 0.15`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
  - `.hero-moving_element.moving-element-03`: `x: 5`, `y: -9`, `duration: 3.5`, `delay: 0.3`, `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
- Proteção de z-index mantida:
  - `.home-hero_content`: `position: relative` e `z-index: 10`.
  - `.hero-moving_element`: `z-index: 3` e `pointer-events: none`.
- Resultado do build: `npm run build` concluído com sucesso; permanecem apenas os avisos herdados de SVGs ausentes da paridade.
- URL local usada para validação: `http://127.0.0.1:5174/` retornou `200` após a porta `5173` estar ocupada.
- Observação: movimento prioriza sensação visual mais próxima da paridade, mantendo H1 acima dos cards.

## Problemas encontrados
- `gsap-react` e `gsap-performance` não puderam ser instaladas por bloqueio de limite do ambiente após tentativa.
- Validação automatizada com Playwright pelo Node REPL foi bloqueada por permissão local (`EPERM` em pasta do Codex).
- Porta `5173` estava ocupada; validação local foi feita em `5174`.
- Avisos de SVG ausente continuam herdados da Session 002.

## Soluções aplicadas
- Implementação feita sem depender de `@gsap/react`, usando `useEffect` com cleanup manual rigoroso.
- `initHeroMotion(root = document)` retorna cleanup e usa `gsap.context()`.
- `App.jsx` chama a animação apenas depois da injeção de `header-hero.html`.
- Fallback visual foi mantido em CSS sem impedir o GSAP.
- Nenhum wrapper, texto, imagem, classe Webflow ou `data-w-id` foi alterado.

## O que ficou fora de escopo
- Adaptação para CopyCenter.
- Troca de textos.
- Troca de imagens.
- Troca de cores.
- Seção de Serviços.
- Seções abaixo da Hero.
- Recriação completa das animações IX2.
- ScrollTrigger global.
- Deploy.
- SEO.
- Refatoração estrutural do App ou do HTML Webflow.

## Próxima sessão recomendada
- Validação do orquestrador sobre a Session 003.1.
- Depois, Session 004 — Serviços, somente se aprovada.
