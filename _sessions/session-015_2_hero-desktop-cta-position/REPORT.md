# REPORT — SESSION-015.2 — Hero Desktop CTA Position Calibration

* Status: CONCLUÍDA ✅
* Diagnóstico visual: O botão da Hero no desktop não tinha um espaçamento inferior ideal, ficando "colado" visualmente no fundo/margem do vídeo principal, devido à ausência de `padding-bottom` extra ou `margin-bottom` na `div` que envolvia os botões em telas maiores.
* Seletor exato dos botões da Hero: `.button-group.home-header`
* Causa da divergência: A classe principal da estrutura `.home-hero_element` define `justify-content: flex-end`, e a classe de conteúdo `.home-hero_content` só ganhava `padding-bottom` fixo abaixo de 991px via `webflow-base.css`. No desktop, os botões ancoravam até o limite estrutural que estava ligeiramente mais baixo do que na referência final do Albadoe.
* Correção aplicada: Foi adicionada uma regra em `custom.css` injetando `margin-bottom: clamp(32px, 4vw, 64px);` no seletor exato dos botões da hero `.section_hero .button-group.home-header`, garantindo que os botões empurrem o restante do conteúdo `.home-hero_content` levemente para cima.
* Arquivos modificados:
  * `SITE-COPYCENTER/src/styles/custom.css`
* Breakpoints testados:
  * Desktop (1440px / 1280px / 1024px)
* Confirmação de que a correção é desktop-only: ✅ Confirmado (aplicado dentro de `@media screen and (min-width: 992px)`).
* Confirmação de que mobile/tablet não foram alterados: ✅ Confirmado. Abaixo de 992px as regras nativas continuam idênticas.
* Confirmação de que `header-hero.html` não foi alterado: ✅ Confirmado.
* Confirmação de que `webflow-base.css` não foi alterado: ✅ Confirmado.
* Confirmação de que scripts não foram alterados: ✅ Confirmado.
* Confirmação de que nenhuma adaptação CopyCenter foi iniciada: ✅ Confirmado. Apenas o gap estético da base foi equilibrado.
* Resultado do build: ✅ PASSOU sem quebras CSS.
* URL local usada: `http://localhost:5174/`
* Antes/depois descrito:
  * ANTES: Os botões CTA no Hero desktop tocavam o fim do eixo visual inferior.
  * DEPOIS: Os botões CTA no Hero desktop ganharam um respiro vertical orgânico, recuperando a paridade de design luxuoso da referência.
* Pendências restantes: Nenhuma.
* Próxima sessão recomendada: Retomar a **Session 017 — Content Swap Fase 1** para iniciar o Rebranding da CopyCenter.
