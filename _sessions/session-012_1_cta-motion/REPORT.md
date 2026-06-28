# REPORT — SESSION-012.1 — CTA Motion

## Status: CONCLUÍDA ✅

---

## O que foi implementado
Recriação da animação de entrada (scroll-driven) da seção CTA (`.section_cta`) usando GSAP ScrollTrigger. Estratégia cuidadosamente separada entre elementos textuais e blocos de imagem para garantir que o layout absoluto das 8 imagens não fosse interferido.

---

## Arquivos criados
- `SITE-COPYCENTER/src/scripts/ctaMotion.js`
- `_sessions/session-012_1_cta-motion/REPORT.md`

## Arquivos modificados
- `SITE-COPYCENTER/src/App.jsx` — import de `initCtaMotion` e adição ao array de cleanups após `initBlogMotion`.

---

## Seletores animados
1. `.section_cta .cta_content` — container do conteúdo central
2. `.section_cta .heading-custom-h1`, `.section_cta .cta_para`, `.section_cta .button-container` — elementos de texto em stagger
3. `.section_cta .cta-image_block` — blocos das 8 imagens (somente `autoAlpha` + `filter`)
4. `.section_cta .cta-image_wrap` — filhos relativos das imagens (`scale` + `y` seguros)

---

## Estratégia de animação

### Conteúdo central
`cta_content` entra com `autoAlpha: 0 → 1`, `y: 36 → 0`, `filter: blur(5px) → blur(0px)` — duração 0.9s.

### Texto interno (stagger)
Heading, parágrafo e botão entram em sequência com `autoAlpha`, `y: 24 → 0`, `filter: blur(4px) → blur(0px)` — duração 0.75s, `stagger: 0.10`.

### Imagens — blocos (sem transform posicional)
Os `.cta-image_block` usam `position: absolute` com `top/left/right/bottom` via CSS — **sem** `transform` para posicionamento. Por isso, animados **apenas** com `autoAlpha` + `filter: blur` para preservar 100% do layout original. `x`, `y`, `scale` não foram tocados nos `.cta-image_block`.

### Imagens — wraps (scale + y seguros)
Os `.cta-image_wrap` usam `position: relative` (filhos dos blocos absolutos). Animados com `scale: 0.94 → 1` e `y: 18 → 0`, o que é completamente seguro — não interfere no posicionamento do pai absoluto.

### Stagger das imagens
`stagger: { each: 0.08, from: "center" }` — as imagens surgem do centro para as bordas, criando um efeito de abertura radial elegante.

---

## Trigger utilizado
- Elemento: `.section_cta`
- Start: `"top 72%"`

## toggleActions utilizado
- `"play none none reverse"` — sem flicker detectado; o reverse é suave pois usa apenas fade/blur.

## Tratamento de prefers-reduced-motion
Verificado via `window.matchMedia("(prefers-reduced-motion: reduce)").matches`. Quando ativo: todos os elementos são definidos diretamente no estado final (`autoAlpha: 1`, `filter: blur(0px)`, `scale: 1`, `y/yPercent: 0`) e `ScrollTrigger.refresh()` é chamado.

## Estratégia usada para preservar o layout absoluto das 8 imagens
- Inspecionado `webflow-base.css` (linhas 3890–3924): confirmado que `.cta-image_block` usa `position: absolute` sem `transform`.
- GSAP **não** animou `x`, `y`, `scale`, `rotate` diretamente nos `.cta-image_block`.
- Apenas `autoAlpha` e `filter: blur` foram aplicados nos blocos.
- O `scale` e `y` foram aplicados somente nos `.cta-image_wrap` (filhos de `position: relative`), que não interferem no posicionamento absoluto do pai.

---

## Confirmações

| Item | Status |
|---|---|
| `cta.html` não foi alterado | ✅ |
| `webflow-base.css` não foi alterado | ✅ |
| Sticky nativo de `.cta_sticky` não foi alterado | ✅ |
| Seções anteriores preservadas | ✅ |
| Scripts aprovados não alterados | ✅ |

---

## Ajustes em custom.css
- **Nenhum**. A seção CTA não possui estados IX2 invisíveis. Não foi necessário nenhum fallback adicional.

---

## Resultado do build
```
> vite build
✓ 48 modules transformed.
dist/assets/index-CS9BF0OO.css  153.69 kB │ gzip: 23.26 kB
dist/assets/index-BztgtWOB.js   340.82 kB │ gzip: 114.68 kB
✓ built in 3.99s
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
- Risco identificado: animar `y` diretamente em `.cta-image_block` poderia sobrescrever o posicionamento absoluto do Webflow.

## Soluções aplicadas
- Inspeção prévia de `webflow-base.css` confirmou ausência de `transform` no posicionamento dos blocos. Animação separada em duas camadas: blocos (apenas fade/blur) + wraps internos (scale + y seguros).

---

## O que ficou fora de escopo
- Footer (próxima etapa do projeto).
- Motion de labels individuais das imagens (animam juntas com o bloco pai).

---

## Próxima sessão recomendada
**Session 013** — Auditor identifica e especifica o Footer. Pela análise do `reference-body.html` (linha 1393+), a próxima estrutura é `<footer class="footer">` contendo logo, formulário de newsletter, links de navegação, ícones sociais, links de serviço e copyright.
