# REPORT — SESSION-006.2 — Process Viewport Fit / Sticky Calibration

## Status: CONCLUÍDA ✅

---

## Diagnóstico aplicado

**Causa raiz identificada:**
O card `.process_info` com `height: 70vh` + `top: 15vh` (sticky) foi calibrado para monitores com ≥1080px de altura, onde `70vh = 756px`. Em laptops comuns (768px–900px de altura), o mesmo card resulta em 538px–630px, mas consome ~344px em espaçamentos fixos internos (paddings do título, margins do divisor, tags-block com `height: 110px` fixo, `padding-bottom: 60px` no content-item), deixando menos de 200px para o parágrafo — causando sobreposição e amontoamento de texto.

**Fatores agravantes:**
- `top: 15vh` em 768px = 115px de recuo, reduzindo ainda mais o espaço disponível.
- `height: 110px` fixo no `.process-info_tags-block` consome espaço independente do conteúdo.
- `padding-bottom: 60px` no `.process-info_content-item` desperdiça 60px que seriam do texto.

---

## Arquivos modificados
- `SITE-COPYCENTER/src/styles/custom.css`

## Arquivos preservados
- `SITE-COPYCENTER/public/process.html` ✅ — não alterado
- `SITE-COPYCENTER/public/reference-body.html` ✅ — não alterado
- `SITE-COPYCENTER/src/styles/webflow-base.css` ✅ — não alterado
- `SITE-COPYCENTER/src/scripts/processMotion.js` ✅ — não alterado
- `SITE-COPYCENTER/src/App.jsx` ✅ — não alterado
- Todos os scripts aprovados anteriores ✅ — não alterados

---

## Seletores ajustados

| Seletor | Antes | Depois |
|---|---|---|
| `html.process-motion-ready .section_process .process_info` | `position: sticky; top: 15vh` | `top: clamp(48px, 8vh, 100px); height: clamp(480px, 72vh, 700px)` |
| `html.process-motion-ready .section_process .process-image_list` | `position: sticky; top: 15vh` | `top: clamp(48px, 8vh, 100px); height: clamp(480px, 72vh, 700px)` |
| `html.process-motion-ready .section_process .process-info_content-item:not(.static)` | (sem regra) | `overflow: hidden` |

---

## Regras CSS adicionadas

### 1. Bloco base `@media (min-width: 992px)` — recalibrações com `clamp()`
```css
html.process-motion-ready .section_process .process_info,
html.process-motion-ready .section_process .process-image_list {
  position: sticky;
  top: clamp(48px, 8vh, 100px);
  height: clamp(480px, 72vh, 700px);
}

html.process-motion-ready .section_process .process-info_content-item:not(.static) {
  overflow: hidden;
}
```

### 2. Bloco `@media (min-width: 992px) and (max-height: 800px)` — laptops 768px–800px
- `height: 72vh; top: 6vh` nos painéis
- `padding-bottom` do content-item → `--element-spacing--24px`
- `margin-top/bottom` do divider → `12px / 20px`
- `padding-top/bottom` do título → `16px / 12px`
- `.process-info_tags-block` → `height: auto; min-height: 90px; gap: 16px`

### 3. Bloco `@media (min-width: 992px) and (max-height: 700px)` — viewport extremo
- `height: 80vh; top: 4vh` nos painéis
- `padding-bottom` do content-item → `--element-spacing--16px`
- `margin-top/bottom` do divider → `8px / 12px`
- `padding-top/bottom` do título → `12px / 8px`
- `.process-info_tags-block` → `height: auto; min-height: 80px; gap: 12px`

---

## Viewports alvo
- Desktop padrão `≥992px` sem restrição de altura → `clamp()` base
- Laptop `≥992px` e `≤800px` de altura → bloco max-height 800px
- Laptop compacto / zoom `≥992px` e `≤700px` de altura → bloco max-height 700px

---

## Confirmações

| Item | Status |
|---|---|
| `processMotion.js` não foi alterado | ✅ Confirmado |
| `process.html` não foi alterado | ✅ Confirmado |
| `webflow-base.css` não foi alterado | ✅ Confirmado |
| Tablet/mobile preservados | ✅ Todos os seletores escopados em `html.process-motion-ready` e em `@media (min-width: 992px)` — não afetam ≤991px |
| `.process-tab_content` não afetado | ✅ Nenhum seletor toca nessa classe |
| `.process-info_content-item.static` não afetado | ✅ Seletor usa `:not(.static)` |
| Motion scroll-driven preservado | ✅ Nenhuma alteração em JS ou no mecanismo ScrollTrigger |
| Tipografia (font-size) não alterada | ✅ Nenhum font-size modificado |
| `!important` não utilizado | ✅ Não foi necessário |
| `overflow-y: auto` não utilizado | ✅ Usado apenas `overflow: hidden` |

---

## Resultado do build
```
> vite build
✓ 43 modules transformed.
dist/assets/index-DulWZtSi.css  152.26 kB │ gzip: 23.09 kB
dist/assets/index-Cw3xyitn.js   331.68 kB │ gzip: 113.61 kB
✓ built in 3.04s
```
**Build: PASSOU ✅**

---

## URL local para validação
```
npm run dev -- --port 5173
```
Acessar: `http://localhost:5173/`

---

## Problemas encontrados
- `top: 15vh` original excessivo para laptops com viewport < 900px de altura.
- `height: 70vh` sem `clamp()` causava card muito pequeno em displays de baixa altura.
- `height: 110px` fixo no `.process-info_tags-block` desperdiçava espaço em viewports baixos.
- `padding-bottom: 60px` no `.process-info_content-item` comprimia o parágrafo desnecessariamente.

## Soluções aplicadas
- `clamp(48px, 8vh, 100px)` no sticky top → garante valor mínimo de 48px e máximo de 100px.
- `clamp(480px, 72vh, 700px)` na altura → garante 480px mínimo mesmo em viewports muito baixos.
- Dois breakpoints `max-height` progressivamente mais agressivos para reduzir paddings internos.
- `overflow: hidden` como clip de proteção para evitar vazamento de conteúdo.

---

## O que ficou fora de escopo
- Tipografia dos parágrafos (font-size não alterado — suficiente com ajustes de spacing).
- Ajustes mobile/tablet (estavam funcionando corretamente).
- ScrollTrigger e configurações de motion JS.
- Seções anteriores (Hero, Logo, Content, Services).

---

## Próxima sessão recomendada
**Session 007** — próxima seção de paridade do site de referência após Processo (verificar `reference-body.html` para identificar a seção seguinte: `.section_about` ou equivalente).
