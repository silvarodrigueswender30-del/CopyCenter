# PROCESS MOTION SPEC — SESSION 006.1

## 1. Diagnóstico do comportamento original (Webflow IX2)
Na referência `albadoe.webflow.io`, a seção `.section_process` em desktop comporta-se como um **scroll-driven multi-step reveal**:
- `.process_component` tem `height: 400vh` — cria espaço de rolagem equivalente a 4 alturas de viewport.
- O **painel esquerdo** (`.process_info`, `width: 45%`, `height: 70vh`) fica visualmente **fixo** (sticky) enquanto o usuário rola.
- Dentro do `.process_info`, os 3 cards `.process-info_content-item` estão absolutamente sobrepostos. O Webflow IX2 revela/oculta cada um deles conforme o progresso do scroll.
- O **painel direito** (`.process-image_list`, `flex: 1`, `height: 70vh`) também fica sticky. As 3 imagens estão absolutamente sobrepostas com z-index escalonado (item-1: z:0, item-2: z:2, item-3: z:3). O IX2 muda a imagem visível conforme o step.
- As **tags** (`.process-info_tags-item.tag-1/2/3`) têm `opacity: 0.5` por padrão. A tag ativa no scroll atual recebe `opacity: 1`.
- O comportamento em scroll é: Step 1 (0%–33%), Step 2 (33%–66%), Step 3 (66%–100% da altura `400vh`).

## 2. Diferença entre estado estático atual e motion desejada
A Session 006 aplicou overrides no `custom.css` para tornar a seção visível sem JS. Esses overrides criam um layout **linear/estático** em desktop:
- `height: auto` em `.process_component` → elimina o espaço de 400vh.
- `position: static; height: auto` em `.process-info_content-item` e `.process-image_item` → quebra o stacking absoluto, listando os 3 steps verticalmente.
- `opacity: 1 !important; filter: none !important; transform: none !important` em `.process_component` e no `h2` → remove os IX2 inline styles invisíveis.

**A Session 006.1 deve reverter esses overrides desktop quando GSAP estiver ativo**, restaurar o layout scroll-driven, e implementar a lógica de transição entre steps via ScrollTrigger.

## 3. Seletores exatos a animar

### Estrutura alvo (todos escopados dentro de `.section_process`)
| Seletor | Role |
|---|---|
| `.section_process .process_component` | Container principal (altura + pin target) |
| `.section_process .process_info` | Painel esquerdo sticky (conteúdo) |
| `.section_process .process-image_list` | Painel direito sticky (imagens) |
| `.section_process .process-info_content-item.content-item-1` | Card step 1 |
| `.section_process .process-info_content-item.content-item-2` | Card step 2 |
| `.section_process .process-info_content-item.content-item-3` | Card step 3 |
| `.section_process .process-image_item.item-1` | Imagem step 1 |
| `.section_process .process-image_item.item-2` | Imagem step 2 |
| `.section_process .process-image_item.item-3` | Imagem step 3 |
| `.section_process .process-info_tags-item.tag-1` | Tag step 1 |
| `.section_process .process-info_tags-item.tag-2` | Tag step 2 |
| `.section_process .process-info_tags-item.tag-3` | Tag step 3 |
| `.section_process h2.heading-custom-h1` | Título principal (entrada) |

## 4. Seletores que NÃO podem ser animados
- `.section_process .process-tab_content` e seus filhos — pertencem ao layout tablet/mobile, não devem ser tocados por GSAP.
- `.section_process .process-info_content-item.static` — variantes tablet/mobile.
- `.section_process .process-image_item.static` — variantes tablet/mobile.
- Qualquer elemento fora de `.section_process`.

## 5. Estratégia de desktop-only
Envolver toda a lógica em uma checagem de viewport **antes de registrar qualquer ScrollTrigger**:

```javascript
const mm = gsap.matchMedia();
mm.add("(min-width: 992px)", () => {
  // toda a lógica scroll-driven aqui
  return () => { /* cleanup */ };
});
```

Isso garante que em `≤991px` nenhum ScrollTrigger do processo seja criado, e o CSS nativo (sticky cards via `.process-tab_content`) funcione sem interferência.

## 6. Estratégia de prefers-reduced-motion
Dentro do bloco `(min-width: 992px)`, adicionar checagem:

```javascript
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) {
  // Apenas tornar tudo visível, sem animação de scroll
  gsap.set(contentItems, { autoAlpha: 1 });
  gsap.set(imageItems, { autoAlpha: 1 });
  gsap.set(tags, { opacity: 1 });
  return;
}
```

## 7. Como lidar com overrides estáticos da Session 006
Os overrides no `custom.css` precisam ser **neutralizados quando JS está ativo** (classe `.js-ready` ou `.motion-ready` no `<html>`). A abordagem correta é **condicionar os overrides estáticos à ausência de JS**:

### Overrides a remover/condicionar no `custom.css`:
```css
/* ANTES (Session 006 — estático irrestrito): */
.section_process .process_component { height: auto; }
.section_process .process_component,
.section_process h2.heading-custom-h1 {
  opacity: 1 !important;
  filter: none !important;
  transform: none !important;
}
@media screen and (min-width: 992px) {
  .section_process .process-info_content-item,
  .section_process .process-image_item { position: static; height: auto; }
  /* etc. */
}

/* DEPOIS (Session 006.1 — estático só sem JS): */
html:not(.motion-ready) .section_process .process_component { height: auto; }
html:not(.motion-ready) .section_process .process_component,
html:not(.motion-ready) .section_process h2.heading-custom-h1 {
  opacity: 1 !important; filter: none !important; transform: none !important;
}
@media screen and (min-width: 992px) {
  html:not(.motion-ready) .section_process .process-info_content-item,
  html:not(.motion-ready) .section_process .process-image_item {
    position: static; height: auto;
  }
  /* etc. */
}
```

Quando `initProcessMotion()` iniciar, ele adiciona `.motion-ready` ao `<html>` (ou verifica se já foi adicionado pelos outros scripts), e o CSS scroll-driven do Webflow base (`height: 400vh`, `position: absolute`, `height: 70vh`) volta a valer.

**Importante**: verificar se `.motion-ready` já é adicionado por outro script (`heroMotion.js`). Se sim, reutilizá-lo — não criar uma segunda classe.

## 8. Estado inicial recomendado para cada elemento

### Content items (desktop, antes de GSAP iniciar)
| Seletor | Estado inicial GSAP |
|---|---|
| `.content-item-1` | `autoAlpha: 1` (visível — step inicial) |
| `.content-item-2` | `autoAlpha: 0` (oculto) |
| `.content-item-3` | `autoAlpha: 0` (oculto) |

### Image items (desktop)
| Seletor | Estado inicial GSAP |
|---|---|
| `.item-1` | `autoAlpha: 1` (visível — step inicial) |
| `.item-2` | `autoAlpha: 0` (oculto) |
| `.item-3` | `autoAlpha: 0` (oculto) |

### Tags
| Seletor | Estado inicial GSAP |
|---|---|
| `.tag-1` | `opacity: 1` (ativa) |
| `.tag-2` | `opacity: 0.5` (inativa) |
| `.tag-3` | `opacity: 0.5` (inativa) |

## 9. Estado ativo recomendado para cada step

### Step 1 (estado de entrada, 0%–33%)
- `.content-item-1`: `autoAlpha: 1`
- `.content-item-2/3`: `autoAlpha: 0`
- `.item-1`: `autoAlpha: 1`
- `.item-2/3`: `autoAlpha: 0`
- `.tag-1`: `opacity: 1`
- `.tag-2/3`: `opacity: 0.5`

### Step 2 (33%–66%)
- `.content-item-2`: `autoAlpha: 1`
- `.content-item-1/3`: `autoAlpha: 0`
- `.item-2`: `autoAlpha: 1`
- `.item-1/3`: `autoAlpha: 0`
- `.tag-2`: `opacity: 1`
- `.tag-1/3`: `opacity: 0.5`

### Step 3 (66%–100%)
- `.content-item-3`: `autoAlpha: 1`
- `.content-item-1/2`: `autoAlpha: 0`
- `.item-3`: `autoAlpha: 1`
- `.item-1/2`: `autoAlpha: 0`
- `.tag-3`: `opacity: 1`
- `.tag-1/2`: `opacity: 0.5`

## 10. Timeline ScrollTrigger recomendada
A abordagem mais próxima do comportamento Webflow é usar **uma única timeline scrubada** dividida em 3 fases iguais:

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: section,          // .section_process
    start: "top top",
    end: "bottom bottom",      // 400vh de scroll
    scrub: 1.2,                // suave, sem snap brusco
    pin: false,                // ver item 11
    invalidateOnRefresh: true,
  }
});

// Fase 0→1 (Step1 já visível por padrão)
// Transição Step1→Step2 em 33% do scroll
tl.to(contentItem1, { autoAlpha: 0, duration: 0.2 }, "step2")
  .to(contentItem2, { autoAlpha: 1, duration: 0.2 }, "step2")
  .to(imageItem1,   { autoAlpha: 0, duration: 0.3 }, "step2")
  .to(imageItem2,   { autoAlpha: 1, duration: 0.3 }, "step2")
  .to(tag1,         { opacity: 0.5, duration: 0.2 }, "step2")
  .to(tag2,         { opacity: 1,   duration: 0.2 }, "step2");

// Transição Step2→Step3 em 66% do scroll
tl.to(contentItem2, { autoAlpha: 0, duration: 0.2 }, "step3")
  .to(contentItem3, { autoAlpha: 1, duration: 0.2 }, "step3")
  .to(imageItem2,   { autoAlpha: 0, duration: 0.3 }, "step3")
  .to(imageItem3,   { autoAlpha: 1, duration: 0.3 }, "step3")
  .to(tag2,         { opacity: 0.5, duration: 0.2 }, "step3")
  .to(tag3,         { opacity: 1,   duration: 0.2 }, "step3");
```

Os labels `"step2"` e `"step3"` posicionam as transições em `1/3` e `2/3` da duração total.

## 11. Pin ou sticky: usar pin CSS ou pin: true

**Recomendação: usar `pin: false` + CSS sticky nativo** em vez de `pin: true` do ScrollTrigger.

Motivo: o Webflow já configura `.process_info` e `.process-image_list` como `position: sticky` via CSS base (implícito pela estrutura de 70vh e `height: 400vh`). O `pin: true` do ScrollTrigger cria um wrapper extra no DOM e pode conflitar com a estrutura flex/grid existente.

**Abordagem recomendada**:
1. Restaurar via GSAP `gsap.set()` as propriedades originais: `height: 400vh` no `.process_component`, `position: absolute` e `height: 70vh` nos content-items/image-items.
2. Adicionar via `custom.css` (condicionado a `.motion-ready`):
   ```css
   .motion-ready .section_process .process_info,
   .motion-ready .section_process .process-image_list {
     position: sticky;
     top: 15vh; /* ajuste conforme viewport */
   }
   ```
3. O ScrollTrigger scruba a timeline usando o scroll natural do `.section_process` com `height: 400vh`.

## 12. Start/end recomendados
```javascript
start: "top top",       // quando o topo de .section_process atinge o topo do viewport
end: "+=300%",          // equivale a 300vh de scroll após o start (3 steps × 100vh)
```
ou, de forma equivalente:
```javascript
start: "top top",
end: "bottom bottom",
```
ambos funcionam se `.process_component` tiver `height: 400vh` restaurado.

## 13. Scrub recomendado
```javascript
scrub: 1.2
```
- `scrub: true` seria instantâneo — parece mecânico.
- `scrub: 1.2` cria um atraso suave de 1.2s entre o scroll e a animação, dando sensação premium de "perseguição".
- Não usar `scrub: false` (não é scrubado) — seria toggleAction, não adequado aqui.

## 14. Snap recomendado ou não recomendado
**Não recomendado nesta implementação inicial.**

Motivo: `snap` no ScrollTrigger força o viewport a "pular" para pontos definidos, o que cria uma sensação artificial e pode frustrar em dispositivos com scroll por inércia (trackpad, touch). O comportamento Webflow original não usa snap visível — a transição entre steps é suave e contínua.

Caso o orquestrador aprove um snap futuro, adicionar:
```javascript
snap: 1/3  // snaps nos pontos 0, 0.33, 0.66, 1
```
Mas apenas em micro sessão dedicada, após validação.

## 15. Como alternar z-index/opacidade
**Usar exclusivamente `autoAlpha`** (combinação de `opacity` + `visibility`) — nunca alterar `z-index` via GSAP diretamente, pois a hierarquia de z-index (`item-1: z:0`, `item-2: z:2`, `item-3: z:3`) já está correta no CSS Webflow base.

A visibilidade de cada card/imagem é controlada apenas por `autoAlpha: 0/1`. Quando `autoAlpha: 0`, o elemento fica com `visibility: hidden` (não interfere em cliques/layout), ao contrário de `opacity: 0` sozinho.

## 16. Como animar cards de conteúdo
Os 3 `.process-info_content-item` ficam absolutamente sobrepostos dentro de `.process-info_content`. A transição entre eles deve ser um **cross-fade suave** (duração curta dentro do scrub):

```javascript
// No gsap.set inicial:
gsap.set([contentItem2, contentItem3], { autoAlpha: 0 });
gsap.set(contentItem1, { autoAlpha: 1 });

// Na timeline, em cada step:
// Step1→Step2: item1 sai (fade out), item2 entra (fade in) simultaneamente
tl.to(contentItem1, { autoAlpha: 0, duration: 0.2 }, ">=0.3")
  .to(contentItem2, { autoAlpha: 1, duration: 0.2 }, "<")
```

## 17. Como animar imagens
As imagens ficam absolutamente sobrepostas dentro de `.process-image_list`. Mesmo princípio do cross-fade dos cards. Porém, as imagens podem receber uma transição adicional de `scale` para dar profundidade premium:

```javascript
// Estado inicial:
gsap.set([imageItem2, imageItem3], { autoAlpha: 0, scale: 1.04 });
gsap.set(imageItem1, { autoAlpha: 1, scale: 1 });

// Transição:
tl.to(imageItem1, { autoAlpha: 0, scale: 1.04, duration: 0.3 }, "step2")
  .to(imageItem2, { autoAlpha: 1, scale: 1,    duration: 0.3 }, "step2<");
```

Isso cria um leve efeito de "zoom out na saída, zoom in na entrada", análogo ao que o Webflow IX2 costuma produzir.

## 18. Como animar tags
As tags (`opacity: 0.5` → `opacity: 1`) indicam o step ativo. Devem mudar **no mesmo momento** que os cards/imagens:

```javascript
// Estado inicial:
gsap.set([tag1], { opacity: 1 });
gsap.set([tag2, tag3], { opacity: 0.5 });

// Transição Step1→Step2:
tl.to(tag1, { opacity: 0.5, duration: 0.15 }, "step2")
  .to(tag2, { opacity: 1,   duration: 0.15 }, "step2<");
```

**Não usar `autoAlpha` nas tags** — elas precisam permanecer visíveis (apenas mudança de opacidade, nunca `visibility: hidden`).

## 19. Como evitar flicker
Flicker ocorre quando:
1. O inline style IX2 (`opacity: 0`) do HTML inicial está presente antes do GSAP setar o estado correto.
2. O CSS override estático (Session 006) força `opacity: 1 !important` mas o GSAP tenta setar `opacity: 0` em content-item-2/3.

**Solução**:
1. No `custom.css`, o override estático de `opacity: 1 !important` deve ser **condicionado a `html:not(.motion-ready)`**. Quando `.motion-ready` estiver presente, o CSS não força mais `opacity: 1`.
2. No `processMotion.js`, **antes** de criar o ScrollTrigger, executar `gsap.set()` com os estados iniciais corretos para todos os elementos. Isso garante que no primeiro frame renderizado, o estado já está correto.
3. Não usar `fromTo` para o controle de step (usar `set` + timeline scrubada).
4. Remover os inline styles IX2 do HTML via GSAP na inicialização: `gsap.set(elements, { clearProps: "transform,filter" })` — necessário pois os inline styles do Webflow sobrescrevem animações GSAP se não forem limpos.

## 20. Como preservar tablet/mobile
A regra é simples: **tudo dentro de `mm.add("(min-width: 992px)", ...)`**. O `gsap.matchMedia()` garante que:
- Em `≥992px`: o GSAP restaura o layout scroll-driven e cria os ScrollTriggers.
- Em `≤991px`: o GSAP não executa nada na seção Processo. O layout tablet/mobile (`.process-tab_content`) usa apenas CSS sticky — não é tocado.

Adicionalmente, os `gsap.set()` iniciais (que restauram `position: absolute` nos content-items) devem estar **dentro** do bloco `(min-width: 992px)`. Nunca executar `gsap.set()` global nos elementos da seção.

## 21. Riscos técnicos
1. **Classe `.motion-ready` vs. sessão anterior**: Verificar em `heroMotion.js` se `.motion-ready` já é adicionado. Se sim, o `processMotion.js` deve usar a mesma classe — não criar `js-process-ready` separada. Se não, criar lógica de adição da classe no próprio script.
2. **`height: 400vh` quebrando layout**: Quando GSAP restaura `height: 400vh` no `.process_component`, o espaço de scroll criado aparece abruptamente. Recomendar restaurar via `gsap.set()` no momento exato da inicialização, não via CSS.
3. **ScrollTrigger.refresh() após processos assíncronos**: Como o HTML é carregado via fetch em App.jsx, o DOM pode não estar completamente layoutado quando o script roda. Garantir que `ScrollTrigger.refresh()` seja chamado após `document.fonts.ready` e após o HTML ser inserido.
4. **Imagens não carregadas**: As imagens de processo usam `loading="lazy"`. Se o ScrollTrigger calcular posições antes das imagens carregarem, os pontos de trigger serão incorretos. Recomendar `ScrollTrigger.refresh()` no evento `load` da janela ou usar `invalidateOnRefresh: true`.
5. **Conflito com `serviceMotion.js`**: Verificar se `ScrollTrigger.refresh()` no serviceMotion pode invalidar o processo. Os dois scripts devem ter seus contexts independentes e não chamar refresh global desnecessariamente.

## 22. Arquivos que Codex pode alterar
- `SITE-COPYCENTER/src/scripts/processMotion.js` (criar)
- `SITE-COPYCENTER/src/App.jsx` (adicionar `import` e `initProcessMotion(document)` no cleanups array)
- `SITE-COPYCENTER/src/styles/custom.css` (condicionar overrides Session 006 com `html:not(.motion-ready)`)
- `_sessions/_status.md`
- `_sessions/session-006_1_process-motion/REPORT.md` (criar)

## 23. Arquivos que Codex não pode alterar
- `SITE-COPYCENTER/public/process.html`
- `SITE-COPYCENTER/public/reference-body.html`
- `SITE-COPYCENTER/src/styles/webflow-base.css`
- `SITE-COPYCENTER/src/scripts/heroMotion.js`
- `SITE-COPYCENTER/src/scripts/serviceMotion.js`
- `SITE-COPYCENTER/src/scripts/scrollTextMotion.js`
- `SITE-COPYCENTER/src/scripts/mobileNav.js`
- Qualquer HTML de seções anteriores.

## 24. Checklist de validação visual
- [ ] **Desktop (≥1280px)**: Rolar até `.section_process` — o conteúdo fica fixo enquanto a página rola.
- [ ] **Desktop**: No início da seção, Step 1 ("Book the service") está visível, Steps 2 e 3 invisíveis.
- [ ] **Desktop**: Ao rolar ~33% da seção, Step 2 ("Handle The Cleaning") aparece suavemente.
- [ ] **Desktop**: Ao rolar ~66% da seção, Step 3 ("Spotless Results") aparece suavemente.
- [ ] **Desktop**: As imagens alternam coerentemente com os steps (Imagem 1 → 2 → 3).
- [ ] **Desktop**: As tags de progresso (`.process-info_tags-item`) mudam de `opacity: 0.5` para `1` no step ativo.
- [ ] **Desktop**: Rolar para cima reverte as transições (scrub reverso).
- [ ] **Desktop**: Não há flicker (flash de conteúdo) ao inicializar.
- [ ] **Tablet (≤991px)**: O layout `.process-tab_content` (cards sticky) está intacto — nenhuma animação GSAP interfere.
- [ ] **Mobile (≤479px)**: Idem tablet — layout CSS nativo funciona.
- [ ] **Seções anteriores**: Hero, Logos, Texto, Serviços continuam sem alteração.
- [ ] **`prefers-reduced-motion`**: Com a preferência ativa, todos os steps e imagens estão visíveis imediatamente.
- [ ] **Build**: `npm run build` passa sem erros.

## 25. Comandos de build/dev
```bash
npm run dev     # abre servidor local para validação visual
npm run build   # verifica se build de produção passa
```

## 26. Veredito

### Pode executar motion agora?
**Sim, com condição**: Os assets de imagem precisam existir em `SITE-COPYCENTER/public/assets/`. Verificar antes de executar:
- `68e5814718367e281107b039_process-image-1.avif`
- `68e0b576e3f6a51fc2cf2ac3_about-mission-image.avif`
- `68e58146beb7391e015c4f73_process-image-2.avif`

### Asset ausente é bloqueante?
**Parcialmente**. Se os assets estiverem ausentes, as imagens não renderizarão, mas a animação de conteúdo (cards e tags) funcionará normalmente. A validação visual das imagens ficará incompleta, mas o ScrollTrigger não quebrará.

### Prioridade de execução
1. Confirmar que assets existem em `/public/assets/`.
2. Condicionar overrides estáticos Session 006 com `html:not(.motion-ready)` no `custom.css`.
3. Criar `processMotion.js` com `gsap.matchMedia()` escopado em `(min-width: 992px)`.
4. Adicionar ao `App.jsx`.
5. Validar visual desktop primeiro, depois confirmar tablet/mobile intactos.
