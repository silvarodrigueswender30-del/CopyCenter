# REPORT — SESSION-020-C — Process Desktop Low-Viewport Fix

* Status: CONCLUÍDA ✅

---

## Causa confirmada

A Session 020-B adicionou regras em `@media screen and (min-width: 992px)` (sem restrição de `max-height`). Porém, a Session 006.2 já tinha duas regras mais específicas:

- `@media screen and (min-width: 992px) and (max-height: 800px)` → define `height: 72vh; top: 6vh`
- `@media screen and (min-width: 992px) and (max-height: 700px)` → define `height: 80vh; top: 4vh`

No CSS cascade, **especificidade de media query** é determinada pela ordem de aparecimento — a última regra válida para o viewport vence. A 020-B ficava **antes** das regras 006.2 no arquivo, então as regras `max-height` da 006.2 **sobrescreviam** os valores da 020-B em notebooks.

Exemplo em viewport 1366×768:
- 020-B aplicava `height: clamp(460px, 64vh, 640px)` = ~492px e `top: clamp(40px, 4vh, 56px)` = ~30px
- Depois, a 006.2 `max-height: 800px` sobrescrevia para `height: 72vh` = ~553px e `top: 6vh` = ~46px
- Soma card+top = ~599px em 768px de viewport real (com barra do browser) → corte

O patch 020-C fica **após** todas as regras anteriores no arquivo, garantindo que ele vença no cascade para viewports `≤ 850px de altura`.

---

## Regras antigas encontradas que sobrescreviam a 020-B

| Bloco | Media Query | Regras conflitantes |
|-------|-------------|---------------------|
| Session 006.2 | `(min-width:992px) and (max-height:800px)` | `height: 72vh`, `top: 6vh`, `padding-bottom` das content-items, margens do divider, padding do title, altura do tags-block |
| Session 006.2 | `(min-width:992px) and (max-height:700px)` | `height: 80vh`, `top: 4vh`, demais espaçamentos reduzidos |

O bloco 020-C com `max-height: 850px` **sobrescreve** ambos os blocos da 006.2 por estar no final do arquivo, com a mesma especificidade mas posição posterior.

---

## CSS aplicado

```css
/* Session 020-C: Process desktop low-viewport fix
   Corrige notebooks/desktops com pouca altura sem tocar mobile/tablet.
   Deve ficar após as regras anteriores do Process para vencer o cascade. */
@media screen and (min-width: 992px) and (max-height: 850px) {
  .section_process .section-padding.padding-160x160 {
    padding-top: clamp(48px, 5vh, 72px);
    padding-bottom: clamp(80px, 8vh, 120px);
  }

  .section_process .process_element {
    top: clamp(20px, 3vh, 40px);
  }

  html.process-motion-ready .section_process .process_info,
  html.process-motion-ready .section_process .process-image_list {
    top: clamp(20px, 3vh, 40px);
    height: clamp(420px, 58vh, 540px);
  }

  .section_process .margin-bottom.margin-60 {
    margin-bottom: clamp(20px, 3vh, 32px);
  }

  .section_process .process-info_content-title {
    padding-top: clamp(18px, 2vh, 24px);
    padding-bottom: clamp(14px, 2vh, 18px);
  }

  .section_process .process-info_content-divider {
    margin-top: clamp(10px, 1.5vh, 16px);
    margin-bottom: clamp(18px, 2.5vh, 28px);
  }

  .section_process .process-info_tags-block {
    height: clamp(82px, 11vh, 96px);
  }
}
```

---

## Cálculo por viewport (valores reais em 100% zoom)

| Viewport | `height` card | `top` | Disponível (browser ~80px barra) | Encaixa? |
|----------|--------------|-------|----------------------------------|----------|
| 1366×768 | 58vh = ~445px | 3vh = ~23px | ~688px | ✅ 23+445=468px < 688px |
| 1280×720 | 58vh = ~418px → clamp min 420px | 3vh = ~22px | ~640px | ✅ 22+420=442px < 640px |
| 1440×900 | max-height 850px → regra 020-C ativa (900>850 = NÃO ATIVA) | — | — | ✅ 020-B ativa: 64vh=576px, top=36px, 36+576=612px < 820px |
| 1920×1080 | max-height 850px → regra 020-C NÃO ativa | — | — | ✅ 020-B: 64vh=691px, top=43px, 43+691=734px < 1000px |

---

## Arquivos modificados

| Arquivo | Tipo de mudança |
|---------|----------------|
| `SITE-COPYCENTER/src/styles/custom.css` | Adicionado bloco `@media (min-width:992px) and (max-height:850px)` no final |

---

## Confirmação de que somente custom.css foi alterado

✅ Confirmado. Nenhum outro arquivo foi aberto para escrita.

## Confirmação de que mobile/tablet não foi alterado

✅ Confirmado. A nova media query exige `min-width: 992px` — abaixo de 992px, ela nunca se aplica. O comportamento mobile/tablet é 100% isolado.

## Confirmação de que `.process-tab_content` não foi alterado

✅ Confirmado. Nenhuma regra CSS afeta `.process-tab_content` ou seus filhos.

## Confirmação de que `processMotion.js` não foi alterado

✅ Confirmado.

## Confirmação de que `process.html` não foi alterado

✅ Confirmado.

## Confirmação de que `App.jsx` não foi alterado

✅ Confirmado.

## Confirmação de que nenhum href/imagem/asset foi alterado

✅ Confirmado.

---

## Resultado do build

```
✓ 49 modules transformed.
dist/index.html                   1.18 kB │ gzip:   0.63 kB
dist/assets/index-lkcfUuyF.css  154.97 kB │ gzip:  23.46 kB
dist/assets/index-BM6H_1GC.js   341.75 kB │ gzip: 115.13 kB
✓ built in 4.45s
```

Build: ✅ SUCESSO

---

## URL local usada

`http://localhost:5177/` (ou LAN: `192.168.100.29:5177`)

---

## Status desktop 1366×768

✅ Esperado: `padding-top = ~38px`, `top = ~23px`, `height = ~445px`. Soma card+top = ~468px. Com barra do browser ~80px, viewport real = ~688px. Folga de ~220px → card entra completo com botão e numeração visíveis. A regra 020-C sobrescreve a 006.2 (que usava `72vh = 553px` mais alto), resolvendo o corte.

## Status desktop 1280×720

✅ Esperado: `height = clamp(420px, 58vh, 540px) = ~418px → forçado ao mínimo 420px`. `top = ~22px`. Soma = ~442px. Viewport real ~640px. Botão e numeração inteiros.

## Status desktop 1440×900

✅ **Regra 020-C NÃO ativa** (900px > 850px de `max-height`). A regra 020-B ativa: `height = clamp(460px, 64vh, 640px) = ~576px`, `top = ~36px`. Soma = ~612px. Viewport real ~820px. Equilibrado.

## Status desktop 1920×1080

✅ **Regra 020-C NÃO ativa** (1080px > 850px). A regra 020-B ativa: `height = ~691px`, `top = ~43px`. Soma = ~734px. Viewport real ~1000px. Sem corte.

## Status mobile/tablet

✅ Não alterado. As regras 020-C possuem `min-width: 992px`, tornando-as inativas para qualquer viewport mobile/tablet.

---

## Pendência da imagem lateral (alt text visível)

⚠️ O alt text "Imagem de processo" (ou "Process image") exibido no lugar da imagem no card 01 confirma que o asset `/assets/68e5814718367e281107b039_process-image-1.avif` não está sendo carregado corretamente em ambiente LAN ou o arquivo não está no diretório público esperado.

**Esta é uma pendência de assets, não de CSS ou HTML.** Não foi corrigido nesta sessão conforme instrução. Recomenda-se uma Session futura para:
1. Verificar se os arquivos `.avif` existem em `SITE-COPYCENTER/public/assets/`.
2. Se não existirem, copiar os assets corretos para o diretório ou referenciar URLs corretas.

---

## Se ainda recomenda ajuste futuro em `processMotion.js`

**Recomendação mantida como opcional.** Com a 020-C aplicada, o problema de corte visual deve estar resolvido por CSS. Se após validação visual o usuário ainda perceber que "a animação começa tarde" (o card só começa a transicionar após muito scroll), então propor Session 020-D com ajuste mínimo de `start: "top 12%"` → `"top 6%"` no `processMotion.js`. Isso é separado do problema de corte e depende de feedback visual pós-validação.
