# REPORT — SESSION-020-A — Process Desktop Layout/Motion Audit

* Status: CONCLUÍDA ✅

---

## Problema visual confirmado

O problema é real e identificável pela combinação de **3 causas simultâneas** (detalhadas abaixo):

1. **Padding-top de 160px na seção + `top: 6vh` no `.process_element` sticky** → o heading fica visualmente empurrado para baixo antes do scroll acontecer.
2. **`.process_info` e `.process-image_list` com `height: clamp(480px, 72vh, 700px)`** → em monitores de 1080px de altura (viewport padrão de desktop sem barra de tarefas), 72vh = ~777px, forçado para `700px` pelo clamp. Em telas menores ou com barra de tarefas o card pode ultrapassar a viewport disponível visível antes que o sticky do GSAP se estabilize.
3. **Copy curta nos 3 cards** → o espaço interno do card (`.process-info_content-item` com `padding-bottom: 60px` fixo) foi projetado para textos mais longos. Com parágrafos curtos de 1–2 linhas, o botão e os números ficam colados no fundo mas há um grande vazio no meio.

---

## Estrutura exata da seção Process

```
<section class="section_process background-grey">
  <div class="section-padding padding-160x160">      ← pt=160px, pb=160px (desktop)
    <div class="container-large">
      <div class="section_component">

        [DESKTOP – visível acima de 992px]
        <div data-w-id="583b3dc0..." class="process_component">
          <div class="process_element">              ← sticky, top:6vh
            <div class="margin-bottom margin-60">   ← heading wrapper, mb=60px
              <h2 class="heading-custom-h1">Seu orçamento gráfico em <span>3 passos</span></h2>
            </div>
            <div class="process-info_wrapper">      ← flex, justify-content:space-between
              <div class="process_info">            ← width:45%, height:clamp(480px,72vh,700px), sticky
                <div class="process-info_content">  ← flex:1, relative
                  <div class="process-info_content-item content-item-1"> ← position:absolute, z:3
                  <div class="process-info_content-item content-item-2"> ← position:absolute, z:2
                  <div class="process-info_content-item content-item-3"> ← position:absolute, z:1
                </div>
                <div class="process-info_tags-block">  ← height:110px, flex-col
                  <div class="process-info_tags-wrapper">
                    <div class="process-info_tags-list"> ← flex, gap:52px
                      tag-1 [01], tag-2 [02], tag-3 [03]
                    </div>
                  </div>
                  <a class="button w-inline-block">Começar orçamento</a>
                </div>
              </div>
              <div class="process-image_list">       ← flex:1, height:clamp(480px,72vh,700px), sticky
                item-1 / item-2 / item-3 (position:absolute, z-index controlado pelo GSAP)
              </div>
            </div>
          </div>
        </div>

        [MOBILE/TABLET – visível abaixo de 991px]
        <div class="process-tab_content">            ← display:none em desktop, display:flex em tablet/mobile
          <div class="process-tab_content-item">…card 01 estático…</div>
          <div class="process-tab_content-item">…card 02 estático…</div>
          <div class="process-tab_content-item">…card 03 estático…</div>
        </div>

      </div>
    </div>
  </div>
</section>
```

---

## Textos atuais encontrados no Process

| Card | Título | Parágrafo | Botão |
|------|--------|-----------|-------|
| 01 | "Envie **sua demanda**" | "Conte pelo WhatsApp o que precisa: material, quantidade, medida, prazo desejado e se o arquivo já está pronto." | "Começar orçamento" |
| 02 | "Validamos **detalhes**" | "Nossa equipe orienta formato, impressão, papel e acabamento para reduzir erros antes da produção." | "Enviar arquivo" |
| 03 | "Material **pronto**" | "Depois da aprovação, seguimos com impressão, acabamento e combinamos o próximo passo com você." | "Falar no WhatsApp" |

**Nenhum resíduo de limpeza encontrado nos textos visíveis.**

---

## Resíduos de limpeza encontrados

* ❌ NENHUM. Os 3 estados foram substituídos com sucesso nas sessões anteriores.

---

## Imagens antigas encontradas

* `item-2` usa `about-mission-image.avif` — **não é imagem de limpeza**, é a imagem da seção About re-aproveitada. É segura visualmente mas pode ser substituída por asset gráfico de CopyCenter no futuro.
* `item-1` e `item-3` usam `process-image-1.avif` e `process-image-2.avif` — precisam ser avaliadas visualmente pelo usuário para confirmar se são neutras ou se mostram temática de limpeza.
* **Nenhuma imagem de pessoa fazendo limpeza foi encontrada nos nomes de assets dos 3 itens de imagem.**

---

## Classes sensíveis (NÃO alterar)

* `.section_process` — seletor raiz do script
* `.process_component` — recebe `height: 400vh` do GSAP via `gsap.set()`
* `.process_element` — sticky, top controlado por CSS
* `.process_info` — sticky via custom.css
* `.process-image_list` — sticky via custom.css
* `.process-info_content-item.content-item-1/2/3` — controlado por GSAP `autoAlpha`
* `.process-image_item.item-1/2/3` — controlado por GSAP `autoAlpha + scale`
* `.process-info_tags-item.tag-1/2/3` — controlado por GSAP `opacity`
* `.process-info_wrapper` — trigger do ScrollTrigger (`trigger: processWrapper || section`)
* `.process-tab_content` — display:none desktop / display:flex mobile (NÃO mexer)
* `data-w-id` nos elementos — usado pelo Webflow IX2 (não ativo aqui) e referenciado internamente

---

## CSS desktop relevante encontrado

| Propriedade | Classe | Valor |
|-------------|--------|-------|
| `padding-top` | `.section-padding.padding-160x160` | `160px` |
| `padding-bottom` | `.section-padding.padding-160x160` | `160px` |
| `height` | `.process_component` | `400vh` (sobrescrito pelo GSAP para `400vh`) |
| `position` | `.process_element` | `sticky` |
| `top` | `.process_element` | `6vh` |
| `height` | `.process_info` | `70vh` (base, sobrescrito por custom.css) |
| `height` (motion-ready) | `.process_info` | `clamp(480px, 72vh, 700px)` |
| `position` (motion-ready) | `.process_info` | `sticky` |
| `top` (motion-ready) | `.process_info` | `clamp(48px, 8vh, 100px)` |
| `height` | `.process-image_list` | `70vh` (base, sobrescrito) |
| `height` (motion-ready) | `.process-image_list` | `clamp(480px, 72vh, 700px)` |
| `padding-bottom` | `.process-info_content-item` | `60px` (via var) |
| `height` | `.process-info_tags-block` | `110px` fixo |
| `margin-bottom` | `.margin-bottom.margin-60` (heading wrapper) | `60px` |
| `padding-top` | `.process-info_content-title` | `30px` |
| `padding-bottom` | `.process-info_content-title` | `24px` |
| `margin-top` | `.process-info_content-divider` | `20px` |
| `margin-bottom` | `.process-info_content-divider` | `40px` |

---

## CSS mobile/tablet que NÃO deve ser alterado

* `@media (max-width: 991px)`: `.process_component { height: auto }` — colapsa o container no tablet
* `@media (max-width: 991px)`: `.process-info_wrapper { display: none }` — esconde a versão desktop
* `@media (max-width: 991px)`: `.process-tab_content { display: flex }` — mostra a versão mobile
* `@media (max-width: 767px)`: redução de variáveis de espaçamento

---

## Como `processMotion.js` atua na seção

1. Seletor de breakpoint: **`(min-width: 992px)` only** via `mm.add()` — abaixo de 992px a motion **não roda**.
2. No breakpoint ativo, define via `gsap.set()`:
   - `.process_component`: `height: 400vh` — cria espaço de scroll para o pin
   - `.process_info` e `.process-image_list`: tornam-se sticky via custom.css
   - items 2 e 3: `autoAlpha: 0` (invisíveis inicialmente)
   - tags 2 e 3: `opacity: 0.5`
3. **ScrollTrigger**:
   - `trigger`: `.process-info_wrapper` (o container flex)
   - `start`: `"top 12%"` — a animação começa quando o topo do wrapper atinge 12% do viewport
   - `end`: `"+=260%"` — a animação termina 260% da altura do viewport depois do start
   - `scrub: 1.2` — smooth scrub
   - `pin: false` — **sem pin nativo do GSAP** (o "pin" é feito por CSS sticky)
4. A timeline alterna entre os 3 estados em labels `step2` e `step3` nas posições 1 e 2 da timeline.
5. `scheduleRefresh()` é chamado via `requestAnimationFrame` + `fonts.ready` + `load` event.

---

## Diagnóstico da causa raiz do problema desktop

**O problema é uma combinação de:**

### Causa 1 — Heading muito baixo ao entrar na seção
O `.process_element` tem `position: sticky; top: 6vh`. Isso faz o heading "flutuar" com o scroll, mas o `padding-top: 160px` da seção cria um espaço branco inicial antes que o sticky estabilize. O heading parece "baixo" porque o scroll precisa percorrer 160px antes de o elemento sticky se fixar na sua posição `top: 6vh`.

**Solução possível (CSS-only, desktop):** Reduzir `padding-top` da seção Process para `clamp(80px, 8vh, 120px)` via custom.css restrito a `@media screen and (min-width: 992px)` + `.section_process`.

### Causa 2 — Card não aparece inteiro ao entrar no viewport
O ScrollTrigger inicia quando o `.process-info_wrapper` atingi `12%` do viewport (`start: "top 12%"`). Com `padding-top: 160px`, o wrapper começa 160px abaixo do topo da seção. Assim, quando o trigger dispara, o card já está parcialmente fora do viewport inferior por causa da soma: `top: 6vh` (sticky element) + `height: clamp(480px, 72vh, 700px)` (card). Em 1080px de viewport, `6vh = 64.8px` + `700px = 764.8px` → ultrapassa os `1080px` disponíveis.

**Solução possível:** Ajustar o `top` do sticky de `clamp(48px, 8vh, 100px)` para `clamp(40px, 5vh, 64px)` e reduzir `height` do card para `clamp(440px, 65vh, 640px)`.

### Causa 3 — Espaço vazio interno do card
`.process-info_content-item` tem `padding-bottom: 60px` e o conteúdo real (título + divisor + parágrafo) ocupa ~40-50% da altura do card. O resto é vazio visual. Isso ocorre porque a copy atual é curta (1 frase por card) e o template foi desenhado para textos mais longos ou com bullet points.

**Solução possível (copy):** Adicionar uma segunda frase ou bullet point por card. Exemplo no Card 01: adicionar "Atendemos pelo WhatsApp ou presencialmente na loja, de segunda a sexta." Isso preenche o espaço sem alterar estrutura.

### Causa 4 — Por que 75% de zoom resolve?
A 75% de zoom, o browser reduz o viewport CSS efetivo. Uma janela de 1920×1080 vira ~1440×810. Com 810px de viewport:
- `6vh = 48.6px` → heading fica mais próximo do topo
- `clamp(480px, 72vh, 700px) = 583px` → card menor, cabe com folga
- `padding-top: 160px` se torna ~120px efetivo (redução via variável responsiva)

Esse comportamento revela que o **card e o heading foram calibrados para viewports em torno de 800–900px de altura**, não para 1080px. A seção precisa de calibração para monitores full HD.

---

## Solução técnica recomendada (para Session 020-B)

**Nível 1 — CSS apenas, sem tocar no script (preferencial):**

Adicionar em `custom.css`, dentro de `@media screen and (min-width: 992px)`:

```css
/* Session 020-B: calibração do Process para viewports ≥1000px de altura */
@media screen and (min-width: 992px) and (min-height: 1000px) {
  .section_process .section-padding.padding-160x160 {
    padding-top: clamp(80px, 7vh, 110px);
  }
  html.process-motion-ready .section_process .process_info,
  html.process-motion-ready .section_process .process-image_list {
    top: clamp(40px, 4vh, 56px);
    height: clamp(460px, 64vh, 640px);
  }
}
```

Isso preserva o comportamento em viewports de 800–900px (onde já funciona bem) e ajusta apenas para monitores 1080p+.

**Nível 2 — Copy mais densa (complementar ao CSS):**

Adicionar uma segunda frase em cada parágrafo de card. Estimativa de caracteres extras necessários: ~80–120 chars por card para preencher a zona vazia. Isso pode ser feito em `process.html` sem alterar estrutura.

**Nível 3 — Ajuste de ScrollTrigger `start` (somente se Nível 1 não resolver):**

Mudar `start: "top 12%"` para `start: "top 6%"` em `processMotion.js`. Isso faz o trigger disparar um pouco antes, quando o wrapper está mais perto do topo, reduzindo a zona morta inicial.

---

## O que deve ser alterado em futura Session 020-B

| Arquivo | Mudança | Tipo |
|---------|---------|------|
| `SITE-COPYCENTER/src/styles/custom.css` | Adicionar bloco `@media (min-width:992px) and (min-height:1000px)` com redução de `padding-top` e `height/top` dos cards | CSS desktop-only |
| `SITE-COPYCENTER/public/process.html` | Adicionar segunda frase nos parágrafos dos 3 cards (e seus duplicados mobile na seção `.process-tab_content`) | Copy |
| *(Opcional)* `processMotion.js` | Ajustar `start: "top 12%"` → `"top 6%"` | Script (último recurso) |

---

## O que NÃO deve ser alterado

* `.process-tab_content` e seus filhos (mobile/tablet)
* IDs, classes, data-w-id
* Imagens (pendência separada)
* Media queries `max-width: 991px` e `max-width: 767px`
* `process_component`, `.process-info_wrapper` (triggers do GSAP)
* Qualquer outro bloco de `custom.css` fora do escopo do Process

---

## Riscos técnicos

* `clamp()` no `height` dos cards pode interagir com `flex:1` do `.process-info_content` — testar que o conteúdo interno não transborda.
* Reduzir `padding-top` da seção enquanto o `.process_element` tem `position: sticky` pode criar um frame inicial onde o heading aparece fora da sticky zone — validar no browser após aplicar.
* `scheduleRefresh()` já é chamado em `fonts.ready` e `load` — não será necessário forçar outro refresh manual.

---

## Riscos de quebrar mobile

* ✅ **Risco zero**, desde que toda correção seja dentro de `@media screen and (min-width: 992px)`.
* Em tablet `@media (max-width: 991px)`, o `.process-info_wrapper { display: none }` e `.process-tab_content { display: flex }` garantem que o layout mobile nunca use os elementos corrigidos.

---

## Plano de patch desktop-only recomendado (Session 020-B)

1. Ler `custom.css` novamente antes de alterar.
2. Adicionar bloco CSS com `@media screen and (min-width: 992px) and (min-height: 1000px)` para calibrar `padding-top`, `top` e `height` do card.
3. Enriquecer os parágrafos dos 3 cards em `process.html` — **tanto na versão desktop (`.process-info_content-item`) quanto na versão mobile (`.process-tab_content-item`)** para manter paridade.
4. Rodar `npm run build` para verificar.
5. Validar no browser em `100% de zoom` em resolução 1920×1080.

---

## Arquivos que provavelmente precisarão ser alterados na 020-B

* `SITE-COPYCENTER/src/styles/custom.css`
* `SITE-COPYCENTER/public/process.html`
* *(Opcional)* `SITE-COPYCENTER/src/scripts/processMotion.js`

---

## Confirmação de que nenhum arquivo do site foi alterado

✅ Confirmado. Esta sessão foi exclusivamente de leitura e análise.
