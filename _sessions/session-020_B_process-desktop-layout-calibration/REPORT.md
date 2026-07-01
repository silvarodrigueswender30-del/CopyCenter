# REPORT — SESSION-020-B — Process Desktop Layout Calibration

* Status: CONCLUÍDA ✅

---

## Problema corrigido

Os 4 problemas visuais desktop identificados na Session 020-A foram endereçados:

1. ✅ `padding-top: 160px` → reduzido para `clamp(80px, 7vh, 110px)` — o título aparece mais próximo do topo da seção ao entrar no viewport.
2. ✅ `top` sticky dos cards reduzido de `clamp(48px, 8vh, 100px)` para `clamp(40px, 4vh, 56px)` — cards ficam mais próximos do topo visível da janela.
3. ✅ `height` dos cards reduzida de `clamp(480px, 72vh, 700px)` para `clamp(460px, 64vh, 640px)` — em 1080px de viewport, o card sai de 700px para ~690px, ficando totalmente dentro da janela visível sem corte inferior.
4. ✅ Copy dos 3 cards desktop enriquecida — o espaço vazio interno foi reduzido sem alterar estrutura.
5. ✅ `margin-bottom` do heading reduzido de `60px` para `clamp(32px, 4vh, 48px)` — o gap entre título e cards foi comprimido, melhorando a composição visual.

---

## Arquivos modificados

| Arquivo | Tipo de mudança |
|---------|----------------|
| `SITE-COPYCENTER/src/styles/custom.css` | Adicionado bloco CSS desktop-only `@media (min-width:992px)` |
| `SITE-COPYCENTER/public/process.html` | Parágrafos dos 3 cards desktop (`.process-info_content-item`) enriquecidos |

---

## CSS desktop-only aplicado

```css
/* Session 020-B: Process desktop calibration — padding, sticky top, card height.
   Restricted to min-width:992px only. Mobile/tablet (≤991px) NOT affected.
   processMotion.js NOT altered. */
@media screen and (min-width: 992px) {
  .section_process .section-padding.padding-160x160 {
    padding-top: clamp(80px, 7vh, 110px);
  }

  html.process-motion-ready .section_process .process_info,
  html.process-motion-ready .section_process .process-image_list {
    top: clamp(40px, 4vh, 56px);
    height: clamp(460px, 64vh, 640px);
  }

  .section_process .margin-bottom.margin-60 {
    margin-bottom: clamp(32px, 4vh, 48px);
  }
}
```

**Nota importante:** O seletor `.section_process .margin-bottom.margin-60` é escopo-amplo dentro da seção Process — ele afeta exclusivamente o wrapper do heading na seção Process, pois é o único `.margin-bottom.margin-60` dentro de `.section_process`.

---

## Copy desktop alterada

| Card | Texto anterior | Texto enriquecido |
|------|---------------|-------------------|
| 01 | "Conte pelo WhatsApp o que precisa: material, quantidade, medida, prazo desejado e se o arquivo já está pronto." | Idem + "Assim conseguimos orientar o melhor formato de produção e evitar retrabalho antes da impressão." |
| 02 | "Nossa equipe orienta formato, impressão, papel e acabamento para reduzir erros antes da produção." | Idem + "Conferimos as informações principais para que o material saia com mais segurança, clareza e acabamento adequado." |
| 03 | "Depois da aprovação, seguimos com impressão, acabamento e combinamos o próximo passo com você." | Idem + "O objetivo é entregar um material gráfico bem finalizado, pronto para apresentação, divulgação ou uso no dia a dia." |

---

## Confirmação de que mobile/tablet não foi alterado

✅ Confirmado. Os textos dentro de `.process-tab_content-item` (linhas 104–202 do process.html) **não foram alterados**. Verificado via `Select-String` após a edição: parágrafos mobile permanecem com o texto curto original.

## Confirmação de que `.process-tab_content` não foi alterado

✅ Confirmado. Nenhuma linha dentro de `.process-tab_content` foi tocada.

## Confirmação de que `processMotion.js` não foi alterado

✅ Confirmado. O script não foi aberto para escrita em nenhum momento desta sessão.

## Confirmação de que `App.jsx` não foi alterado

✅ Confirmado.

## Confirmação de que nenhum href/imagem/asset foi alterado

✅ Confirmado.

## Confirmação de que IDs/classes/data-* foram preservados

✅ Confirmado. Apenas texto interno de `<p>` foi alterado. Nenhuma tag, ID, classe ou atributo foi criado ou modificado.

---

## Resultado do build

```
✓ 49 modules transformed.
dist/index.html                   1.18 kB │ gzip:   0.63 kB
dist/assets/index-BzAp3RqF.css  154.18 kB │ gzip:  23.35 kB
dist/assets/index-D23yAvJc.js   341.75 kB │ gzip: 115.13 kB
✓ built in 8.06s
```

Build: ✅ SUCESSO

---

## URL local usada

`http://localhost:5175/`

---

## Status desktop 1920×1080

✅ Esperado melhorado: `padding-top` reduzido de 160px para ~110px (7vh de 1080px), `top` do sticky de ~86px para ~43px, `height` do card de 700px para ~691px (64vh de 1080px). O conjunto card+imagem entra mais completo na viewport.

## Status desktop 1440×900

✅ Esperado melhorado: `height` do card = `clamp(460px, 64vh, 640px)` = ~576px. `top` = ~36px. Soma = ~612px < 900px disponível. Sem corte.

## Status desktop 1366×768

✅ O bloco `@media (min-width: 992px) and (max-height: 800px)` da Session 006.2 já sobrescreve `height: 72vh; top: 6vh` para viewports `≤800px de altura`. Isso tem precedência sobre o bloco 020-B para essa resolução, mantendo o comportamento já calibrado para laptops pequenos.

## Status mobile/tablet

✅ Não alterado. A media query `max-width: 991px` existente esconde `.process-info_wrapper` e exibe `.process-tab_content`, isolando completamente a versão mobile do CSS adicionado.

---

## Problemas encontrados

* O seletor `.section_process .margin-bottom.margin-60` é amplo, mas dentro da estrutura atual do `process.html` existe apenas **um** `.margin-bottom.margin-60` dentro de `.section_process` (o wrapper do heading). Risco é baixo, mas documentado.
* A regra `@media (min-width: 992px) and (max-height: 800px)` da Session 006.2 **sobrescreve** `height` e `top` para monitores com altura ≤800px (laptops). Isso é correto e intencional, pois a Session 006.2 já tratou esse breakpoint.

## Soluções aplicadas

* CSS isolado em `@media screen and (min-width: 992px)` com `padding-top`, `top`, `height` e `margin-bottom` ajustados via `clamp()`.
* Parágrafos desktop enriquecidos com segunda frase coerente com a identidade da CopyCenter.

---

## Pendências restantes

* Imagens dos 3 cards Process ainda são do template (não são imagens de limpeza identificadas, mas precisam de revisão visual pelo usuário).
* Botões dos cards ainda apontam para `/contact` em vez do WhatsApp — aguardando Session 019-B.
* Ajuste fino do `processMotion.js` (`start: "top 12%"` → `"top 6%"`) permanece disponível como Nível 3 de melhoria, caso o usuário julgue necessário após validação visual desta sessão.

## Se ainda recomenda ajuste futuro em `processMotion.js`

**Recomendação:** Avaliar após validação visual desta sessão. Com o `padding-top` reduzido, o wrapper `.process-info_wrapper` entra no viewport mais cedo, e o `start: "top 12%"` pode já ser suficiente. Se o usuário ainda perceber que o card "começa a animar tarde", propor Session 020-C com alteração mínima do `start` para `"top 6%"`.
