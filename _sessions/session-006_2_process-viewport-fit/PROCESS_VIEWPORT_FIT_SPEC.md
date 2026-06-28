# PROCESS VIEWPORT FIT SPEC — SESSION 006.2

## 1. Diagnóstico visual do problema
O card `.process_info` tem `height: 70vh` e `padding: 30px`. Internamente ele contém, empilhados verticalmente:
1. `.process-info_content` (flex: 1, position: relative) → contém o `.process-info_content-item` ativo
2. `.process-info_tags-block` (height: 110px fixo, flex-col, position: relative)

O `.process-info_content-item` ativo preenche 100% do `.process-info_content` com:
- `.process-info_content-title` → `padding-top: 30px`, `padding-bottom: 24px`
- `.process-info_content-divider` → `margin-top: 20px`, `margin-bottom: 40px`
- `.process-info_content-para_wrap` → texto longo (paragrafos de 3–4 linhas)
- `padding-bottom: 60px` no próprio item

**Soma dos espaços verticais fixos dentro do card**:
- `padding` do `.process_info`: `30px` top + `30px` bottom = `60px`
- `padding-top` do título: `30px`
- `padding-bottom` do título: `24px`
- `margin-top` do divider: `20px`
- `margin-bottom` do divider: `40px`
- `padding-bottom` do content-item: `60px`
- `height` do tags-block: `110px`

**Total de espaço vertical fixo consumido**: ~344px de elementos não-textuais.

Em viewports comuns de laptops (768px–900px de altura), `70vh` resulta em:
- 768px × 0.70 = **538px**
- 900px × 0.70 = **630px**

Com 344px de elementos fixos, restam entre **194px e 286px** para o parágrafo. Parágrafos de 3–4 linhas com `font-size: 16px` e `line-height: 150%` precisam de ~110–150px. Em viewports baixos ou com o browser em zoom 100% (que reduz o viewport efetivo), o texto transborda para fora do card ou fica comprimido.

**Causa raiz**: `70vh` foi calibrado para os monitores de desktop usados na referência Webflow (~1080px de altura), onde `70vh = 756px`. Em laptops com 768px–900px de altura, o card é pequeno demais para conter todos os elementos internos com seus espaçamentos originais.

O `top: 15vh` do sticky também agrava: em viewport de 768px, `15vh = 115px`, deixando apenas `768 - 115 = 653px` abaixo do sticky, e com `70vh` de altura do card = 538px. O card caberá, mas o título da seção (acima do `.process-info_wrapper`) também precisa de espaço — criando compressão visual.

## 2. Causa provável — análise por fator

| Fator | Valor atual | Impacto |
|---|---|---|
| `sticky top` | `15vh` | Em 768px viewport = 115px de recuo do topo — muito alto |
| `height: 70vh` do card | fixo em `70vh` | Em <900px de altura resulta em card pequeno |
| `padding-bottom: 60px` no content-item | fixo | Consome 60px que seriam do texto |
| `padding: 30px` no `.process_info` | fixo | Consume 60px (top+bottom) |
| `margin-bottom: 40px` do divider | fixo | Consume 40px |
| `height: 110px` do tags-block | fixo | Consume 110px imutáveis |
| `padding-top/bottom` do title | `30+24px` | Consome 54px |
| **Total fixo consumido** | **~344px** | Resta pouco para o texto em vh baixo |
| Tipografia do parágrafo | Tamanho padrão do site | OK para alto viewport, comprime em baixo viewport |

## 3. Diferença entre comportamento local e referência
Na referência Webflow (`albadoe.webflow.io`), o site foi provavelmente desenvolvido com monitor de `1920×1080px`. Com essa altura:
- `70vh = 756px` → confortável para todos os elementos internos
- `15vh = 162px` de `sticky top` → ainda deixa espaço

Localmente, em laptop com `1366×768px` ou browser em zoom padrão que comprime a viewport, o mesmo card fica com `70vh = 538px`, causando overflow ou sobreposição interna.

O problema existe subtilmente na referência em viewports baixos, mas é muito mais pronunciado localmente porque:
1. O `sticky top: 15vh` foi adicionado via `custom.css` (não existia na referência original que usava IX2 pin nativo).
2. A referência Webflow usa o mecanismo de pin do IX2 com cálculos automáticos de posição.

## 4. O que pode ser corrigido sem quebrar paridade
**Permitido no `custom.css`** (escopo `@media screen and (min-width: 992px)` no bloco `.process-motion-ready`):
1. Reduzir o `sticky top` de `15vh` para um valor menor ou usando `clamp()`.
2. Substituir `height: 70vh` nos painéis por um valor `clamp()` que funcione bem em viewports baixos e altos.
3. Reduzir o `margin-bottom` do divider para viewports de baixa altura.
4. Adicionar `overflow-y: auto` no `.process-info_content-item` como fallback de segurança.
5. Adicionar `padding-bottom` reduzido no `.process-info_content-item` para viewports baixos.

**Não é necessário**:
- Alterar HTML.
- Alterar `webflow-base.css`.
- Alterar `processMotion.js` (o JS não controla tamanhos de layout).
- Alterar tipografia de parágrafo (o texto já cabe, o problema é o espaçamento ao redor).

## 5. Seletores exatos envolvidos

| Seletor | Problema | Ajuste necessário |
|---|---|---|
| `.process-motion-ready .section_process .process_info` | `height: 70vh` pequeno em laptop | → `clamp(480px, 70vh, 680px)` ou equivalente |
| `.process-motion-ready .section_process .process-image_list` | `height: 70vh` idem | → mesmo valor que `.process_info` |
| `.process-motion-ready .section_process .process_info` | `sticky top: 15vh` alto | → `top: clamp(60px, 8vh, 120px)` |
| `.process-motion-ready .section_process .process-image_list` | idem | → mesmo `top` que `.process_info` |
| `.section_process .process-info_content-item` | `padding-bottom: 60px` consome muito | → reduzir em viewport baixo |
| `.section_process .process-info_content-divider` | `margin-bottom: 40px` consome muito | → reduzir em viewport baixo |
| `.section_process .process-info_content-title` | `padding-top: 30px` fixo | → reduzir em viewport baixo |
| `.section_process .process-info_tags-block` | `height: 110px` fixo | → `min-height: 80px; height: auto` em viewport baixo |

## 6. Recomendações de CSS desktop (base `min-width: 992px`)

Dentro do bloco `html.process-motion-ready @media (min-width: 992px)` existente no `custom.css`:

```css
/* Recalibrar dimensões dos painéis sticky */
html.process-motion-ready .section_process .process_info,
html.process-motion-ready .section_process .process-image_list {
  height: clamp(480px, 70vh, 700px);
  top: clamp(48px, 8vh, 100px);
}
```

Esta regra faz:
- Mínimo: 480px de altura (garante espaço mínimo para o conteúdo)
- Ideal: 70vh (comportamento original)
- Máximo: 700px (evita cards enormes em monitores ultrawide)
- `top`: de `48px` (muito pequeno viewport) a `100px` (viewport grande), passando por `8vh` como ideal

## 7. Recomendações para viewports baixos

```css
/* Viewport baixo: laptops com ~768px de altura */
@media screen and (min-width: 992px) and (max-height: 800px) {
  html.process-motion-ready .section_process .process_info,
  html.process-motion-ready .section_process .process-image_list {
    height: 72vh;
    top: 6vh;
  }

  .section_process .process-info_content-item {
    padding-bottom: var(--_size-variables---element-spacing--24px);
  }

  .section_process .process-info_content-divider {
    margin-top: var(--_size-variables---element-spacing--12px);
    margin-bottom: var(--_size-variables---element-spacing--20px);
  }

  .section_process .process-info_content-title {
    padding-top: var(--_size-variables---element-spacing--16px);
    padding-bottom: var(--_size-variables---element-spacing--12px);
  }
}

/* Viewport muito baixo: laptop 720px ou browser em zoom */
@media screen and (min-width: 992px) and (max-height: 700px) {
  html.process-motion-ready .section_process .process_info,
  html.process-motion-ready .section_process .process-image_list {
    height: 80vh;
    top: 4vh;
  }

  .section_process .process-info_content-item {
    padding-bottom: var(--_size-variables---element-spacing--16px);
  }

  .section_process .process-info_content-divider {
    margin-top: var(--_size-variables---element-spacing--8px);
    margin-bottom: var(--_size-variables---element-spacing--12px);
  }

  .section_process .process-info_content-title {
    padding-top: var(--_size-variables---element-spacing--12px);
    padding-bottom: var(--_size-variables---element-spacing--8px);
  }

  .section_process .process-info_tags-block {
    height: auto;
    min-height: 80px;
  }
}
```

## 8. `top: 15vh` → valor correto

O `top: 15vh` atual é demasiado alto. Em 768px → `115px`. Em 1080px → `162px`.

**Recomendação**: `top: clamp(48px, 8vh, 100px)`.

- Em 600px viewport: `48px` (mínimo)
- Em 768px: `8vh = 61px`
- Em 900px: `8vh = 72px`
- Em 1080px: `8vh = 86px` (cap antes do 100px máximo)

Isso dá ao card mais espaço vertical sem deixá-lo colado ao topo (o que quebraria o efeito visual).

**Alternativa mais conservadora**: `top: 8vh` (sem clamp). Simples e suficiente na maioria dos casos.

## 9. `height: 70vh` → valor correto

O `height: 70vh` é adequado em monitores grandes. Em laptops, pode ser aumentado levemente:

**Recomendação base**: `height: clamp(480px, 72vh, 700px)`.

Para viewports baixos (`max-height: 800px`), `72vh` é ligeiramente maior que os `70vh` originais, compensando a perda de altura absoluta. O cap de `700px` evita crescimento excessivo em monitores 4K.

**Alternativa simples** (sem clamp): `height: min(72vh, 680px)`.

## 10. Overflow no card

**Recomendação**: Adicionar `overflow: hidden` ao `.process-info_content-item` como proteção defensiva:

```css
@media screen and (min-width: 992px) {
  .section_process .process-info_content-item:not(.static) {
    overflow: hidden;
  }
}
```

Isso evita que conteúdo transborde para fora do card em viewports muito baixos, sem remover o conteúdo do fluxo. O texto ficará clipado mas não vai vazar para cima do `.process-info_tags-block`.

**Não usar** `overflow-y: auto` — criaria uma barra de scroll interna, o que é antiestético.

## 11. Tipografia interna

**Não é necessário alterar tipografia** (`font-size`, `line-height`). O parágrafo já usa tamanho padronizado do site. O problema é de espaçamento ao redor do texto, não do texto em si. Reduzir `font-size` comprometeria a legibilidade e a paridade — evitar.

**Exceção**: se mesmo após reduzir paddings/margins o texto ainda transbordar em viewports de `max-height: 700px`, pode-se aplicar `font-size: 0.9em` apenas no parágrafo e apenas nesse breakpoint extremo, como último recurso.

## 12. CTA/Tags — redução de gap, padding ou fonte

O `.process-info_tags-block` tem `height: 110px` fixo e contém:
1. `.process-info_tags-wrapper` (`.process-info_tags-list` com 3 tags)
2. Um botão `.button`

Em viewport baixo, `110px` pode ser excessivo para apenas esses dois elementos.

**Recomendação para `max-height: 800px`**:
```css
.section_process .process-info_tags-block {
  height: auto;
  min-height: 90px;
  gap: var(--_size-variables---element-spacing--16px);
}
```

Isso remove a altura fixa e deixa o bloco se ajustar ao conteúdo, usando `min-height` como garantia mínima.

**Não alterar** `font-size` das tags — o `14px` atual já é compacto e reduzir mais prejudicaria a legibilidade.

## 13. `processMotion.js` precisa de alteração?

**Não.** O `processMotion.js` controla apenas a lógica de animação (autoAlpha, scale, opacity). As dimensões de layout (altura, top, padding) são domínio do CSS. O script não precisa ser alterado para esta correção.

**Único ponto de atenção no JS**: Se as dimensões dos painéis mudarem (altura do card ficar diferente), o `ScrollTrigger` pode precisar de um `refresh()` para recalcular os pontos de trigger. O script já chama `ScrollTrigger.refresh()` via `scheduleRefresh()` nos eventos `load` e `fonts.ready` — isso deve ser suficiente.

## 14. Arquivos que Codex pode alterar
- `SITE-COPYCENTER/src/styles/custom.css` — único arquivo a alterar
- `_sessions/_status.md`
- `_sessions/session-006_2_process-viewport-fit/REPORT.md` (criar)

## 15. Arquivos que Codex não pode alterar
- `SITE-COPYCENTER/public/process.html`
- `SITE-COPYCENTER/public/reference-body.html`
- `SITE-COPYCENTER/src/styles/webflow-base.css`
- `SITE-COPYCENTER/src/scripts/processMotion.js`
- `SITE-COPYCENTER/src/scripts/heroMotion.js`
- `SITE-COPYCENTER/src/scripts/serviceMotion.js`
- `SITE-COPYCENTER/src/scripts/scrollTextMotion.js`
- `SITE-COPYCENTER/src/App.jsx`
- Qualquer HTML de seções anteriores

## 16. Checklist de validação visual
- [ ] **Desktop 1280×800**: Card `.process_info` está completamente visível sem scroll vertical dentro do card.
- [ ] **Desktop 1280×800**: Título H3, ícone/divisor, parágrafo, tags e CTA estão todos visíveis sem sobreposição.
- [ ] **Desktop 1280×800**: O parágrafo não está cortado pelo `.process-info_tags-block`.
- [ ] **Desktop 1440×900**: Layout confortável, sem textos amontoados.
- [ ] **Desktop 1920×1080**: Layout próximo da referência original — nenhuma regressão.
- [ ] **Viewport baixo 1280×720 (browser padrão)**: Card ajustado, conteúdo legível.
- [ ] **Motion**: A troca entre steps continua funcionando (scrub, cross-fade de cards e imagens).
- [ ] **Tablet (≤991px)**: Layout `.process-tab_content` (sticky cards) completamente intacto.
- [ ] **Mobile (≤767px)**: Sem alteração.
- [ ] **Build**: `npm run build` passa sem erros.

## 17. Veredito: correção CSS apenas

**Correção CSS apenas** é suficiente. Não é necessário alterar `processMotion.js`.

As mudanças recomendadas no `custom.css` são:

1. **No bloco `html.process-motion-ready @media (min-width: 992px)` existente**:
   - Mudar `top: 15vh` → `top: clamp(48px, 8vh, 100px)` nos painéis sticky.
   - Mudar `height: 70vh` → `height: clamp(480px, 72vh, 700px)` nos painéis.

2. **Novo bloco `@media (min-width: 992px) and (max-height: 800px)`**:
   - Reduzir `padding-bottom` do `.process-info_content-item`.
   - Reduzir `margin-bottom` do `.process-info_content-divider`.
   - Reduzir `padding-top/bottom` do `.process-info_content-title`.
   - Mudar `height: 110px` do `.process-info_tags-block` → `height: auto; min-height: 90px`.

3. **Novo bloco `@media (min-width: 992px) and (max-height: 700px)`** para casos extremos (zoom 100% em laptop compacto):
   - Aumentar `height` para `80vh` (mais do viewport = menos margens desperdíçadas).
   - Reduzir ainda mais os paddings internos.

4. **Proteção de overflow**: `overflow: hidden` no `.process-info_content-item:not(.static)` em desktop.
