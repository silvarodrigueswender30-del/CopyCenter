# REPORT — SESSION-013.1 — Footer Motion

## Status: CONCLUÍDA ✅

---

## Diagnóstico da referência original
- O Footer original utiliza **Webflow IX2** (Javascript scroll interaction) e não possui animação via CSS puro.
- **Elemento target do motion:** `.footer_element` com `data-w-id="b6def29d-75e6-ec68-bf55-d4183e570274"`.
- **Propriedades animadas na referência:** 
  Foi encontrada a *actionList* `"a-4" ("Slide from bottom x02")` engatilhada pelo evento `"SCROLL_INTO_VIEW" ("e-402")`. O comportamento extraído consiste em:
  - Inicialmente: `y: 40px`, `opacity: 0`
  - Animação no scroll (com delay de 100ms): `y: 0px`, `opacity: 1`
  - `duration`: 500ms
  - `easing`: "inOutSine"
  - O evento tem `playInReverse: false`, significando que a animação toca uma vez ao entrar na tela e não reverte quando rola para cima.

## O que foi implementado
- Auditoria do bundle Webflow IX2 para validar a existência de movimento e mapear os valores exatos de translate/opacity, tempo e easing.
- Recriação da Timeline do Footer em GSAP, acionada com ScrollTrigger configurado no gatilho de "top 85%" (típico comportamento nativo de Scroll Into View do Webflow).
- Integração da lógica em `App.jsx`.

## Arquivos criados
- `SITE-COPYCENTER/src/scripts/footerMotion.js`
- `_sessions/session-013_1_footer-motion/REPORT.md`

## Arquivos modificados
- `SITE-COPYCENTER/src/App.jsx` (importação e chamada do `initFooterMotion(document)`).

## Seletores animados
- `.footer [data-w-id="b6def29d-75e6-ec68-bf55-d4183e570274"]` (via GSAP).

## Estratégia final adotada
- Utilizado `gsap.fromTo()` para forçar a visibilidade 0 e translação 40px, deslizando para a posição final (y: 0) com fade in (autoAlpha: 1).
- **Trigger utilizado:** `.footer` em `start: "top 85%"`.
- **toggleActions utilizado:** `"play none none none"` (respeitando o `playInReverse: !1` do IX2).
- **Tratamento de prefers-reduced-motion:** Adicionado verificação que reseta e mantém `autoAlpha: 1, y: 0` se as configurações do sistema exigirem redução de movimentos.

## Confirmações
- ✅ **Motion autoral inventada:** Não houve. Os valores GSAP espelham 1:1 o config extraído do Webflow IX2.
- ✅ **`footer.html`:** Intacto, não alterado.
- ✅ **`webflow-base.css`:** Intacto, não alterado.
- ✅ **Footer:** Continua fora do `main`.
- ✅ **CTA:** Continua sendo a última seção do `main`.
- ✅ **Seções anteriores:** Preservadas e intactas.

## Resultado do build
```
> vite build
✓ 49 modules transformed.
dist/assets/index-CS9BF0OO.css  153.69 kB │ gzip: 23.26 kB
dist/assets/index-DyvDsm4y.js   341.35 kB │ gzip: 114.99 kB
✓ built in 4.14s
```
**Build: PASSOU ✅**

## URL local usada para validação
`http://localhost:5174/` (ou 5173 dependendo da aba ativa)

## O que ficou fora de escopo
- Backend funcional de newsletter e integração com API/validação Turnstile.
- Outras páginas do site. Apenas a home principal foi replicada estruturalmente nas Sessions 001 a 013.1.

## Próxima sessão recomendada
- **Revisão e Clean Up Geral** / **QA Audit**, visto que a página principal e o rodapé foram concluídos de ponta a ponta com paridade absoluta no movimento e na estrutura HTML/CSS originais.
