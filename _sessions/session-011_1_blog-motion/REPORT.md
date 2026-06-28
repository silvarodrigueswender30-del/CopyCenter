# REPORT — SESSION-011.1 — Blog Motion

## Status: CONCLUÍDA ✅

---

## O que foi implementado
Recriação da animação de entrada (scroll-driven) da seção Blog (`.section_blog`) usando GSAP ScrollTrigger. O cabeçalho entra com fade + blur-out + leve subida, e os 3 cards entram com stagger suave. Padrão premium consistente com as demais seções do projeto.

---

## Arquivos criados
- `SITE-COPYCENTER/src/scripts/blogMotion.js`
- `_sessions/session-011_1_blog-motion/REPORT.md`

## Arquivos modificados
- `SITE-COPYCENTER/src/App.jsx` — import de `initBlogMotion` e adição ao array de cleanups.
- `SITE-COPYCENTER/src/styles/custom.css` — fallback atualizado para usar `.blog-motion-ready`.

---

## Seletores animados
- `.section_blog .section_header`
- `.section_blog .collection-blogs_item`

## Estratégia de animação
Utilizado `gsap.context()` com escopo na `.section_blog`, garantindo isolamento e cleanup correto via `ctx.revert()`.

- **Header**: `autoAlpha`, `yPercent: 14`, `filter: blur(5px)` → `autoAlpha: 1`, `yPercent: 0`, `filter: blur(0px)`.
- **Cards**: `autoAlpha`, `y: 38`, `filter: blur(4px)` → `autoAlpha: 1`, `y: 0`, `filter: blur(0px)` com `stagger: 0.14`.

Os inline styles do IX2 são limpos previamente com `gsap.set(..., { clearProps: "..." })` antes das animações, evitando conflitos.

Os wrappers `.image-animation_trigger` e `.image-animation_scale` não foram animados diretamente — GSAP atua apenas nos `.collection-blogs_item`, preservando o comportamento de hover nativo do CSS Webflow.

## Trigger utilizado
- Elemento: `.section_blog`
- Start: `"top 72%"`

## toggleActions utilizado
- `"play none none reverse"` — permite reverse natural no scroll de volta sem flicker agressivo.

## Tratamento de prefers-reduced-motion
Verificado via `window.matchMedia("(prefers-reduced-motion: reduce)").matches`. Quando ativo: GSAP apenas seta estado final visível (`autoAlpha: 1`, `filter: blur(0px)`, `y/yPercent: 0`) e chama `ScrollTrigger.refresh()`.

## Ajustes em custom.css
O fallback estático da Session 011, que usava os seletores genéricos `html:not(.motion-ready)` e `html.motion-ready`, foi atualizado para:
```css
html:not(.blog-motion-ready) .section_blog .section_header,
html:not(.blog-motion-ready) .section_blog .collection-blogs_item {
  opacity: 1 !important;
  filter: none !important;
  transform: none !important;
}
```
Agora o GSAP assume o controle assim que `blog-motion-ready` é adicionado ao `html`, sem interferência do `!important`.

---

## Confirmações

| Item | Status |
|---|---|
| `blog.html` não foi alterado | ✅ |
| `webflow-base.css` não foi alterado | ✅ |
| Seções anteriores preservadas | ✅ |
| Scripts aprovados não foram alterados | ✅ |

---

## Resultado do build
```
> vite build
✓ 47 modules transformed.
dist/assets/index-CS9BF0OO.css  153.69 kB │ gzip: 23.26 kB
dist/assets/index-e-gtIbKO.js   338.69 kB │ gzip: 114.38 kB
✓ built in 2.28s
```
**Build: PASSOU ✅**

---

## URL local usada para validação
```
npm run dev -- --port 5173
```
Acessar: `http://localhost:5173/`

---

## Problemas encontrados
- A regra CSS genérica `html.motion-ready .section_blog .section_header` da Session 011 teria bloqueado a animação GSAP com `!important`.

## Soluções aplicadas
- Fallback migrado para seletor específico `html:not(.blog-motion-ready)`, padrão já consolidado no projeto (mesma estratégia adotada nas sessões de Info e Testimonial).

---

## O que ficou fora de escopo
- Hover customizado nos cards (comportamento nativo do CSS Webflow está intacto).
- Motion de imagem separado (`.image-animation_scale`) — preservado para não quebrar interações nativas.

---

## Próxima sessão recomendada
**Session 012** — Auditor identifica e especifica a próxima seção após Blog. Pela análise prévia do `reference-body.html` (linha 1313), a candidata é `<section class="section_cta">`.
