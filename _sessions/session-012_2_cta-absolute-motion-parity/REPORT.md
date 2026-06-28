# REPORT — SESSION-012.2 — CTA Absolute Motion Parity

## Status: CONCLUÍDA ✅

---

## Diagnóstico da referência original
- **O movimento da CTA original usa CSS Sticky + IX2 GSAP scrub (scroll animation).** A seção `.section_cta` original tem `.cta_component` com `height: 200vh` e `.cta_sticky` com `height: 100vh; position: sticky`.
- **Comportamento real:** O conteúdo da CTA (`.cta_content`) entra em opacidade 0. As 8 imagens (`.cta-image_block`) possuem `position: absolute` sem definição de `top`/`left` (o que as centraliza no `.cta_sticky` via Flexbox), e iniciam com escala ampliada (ex: `scale: 1.8` e `scale: 2.5`). 
- Ao scrollar os 200vh, o `.cta_content` faz fade in (`opacity: 0 -> 1`), e as imagens perdem o scale (indo para `scale: 1`) e "explodem/espalham" do centro para suas posições finais na colagem (usando animação de `transform: translate3d(x, y)` em % percentual através do script original). 

## Diferenças e Diagnóstico sobre a 012.1
- **Por que a 012.1 parecia estática:** A versão `012.1` aplicou apenas um _fade_ in nas imagens já em suas posições finais. Como o Webflow IX2 (script original) estava desativado, as imagens continuaram acumuladas (stack) exatamente no centro do flex container (por falta de `top/left/transform` estático), causando **sobreposição indevida sobre o texto central**!
- O código em `ctaMotion.js` (da 012.1) foi uma interpretação autoral que presumiu que o layout das imagens seria mantido pelo CSS, quando na realidade a posição explodida da colagem só existia como estado final da timeline do Webflow IX2.

---

## O que foi corrigido
- Extraída a configuração original do scroll interaction diretamente do bundle `webflow.schunk.1c3da141267b70e1.js`.
- Mapeado os valores precisos de scale inicial e X/Y percentual final de cada uma das 8 imagens na colagem.
- Recriado o script `ctaMotion.js` substituindo a animação autoral por uma **Timeline Scrub (GSAP ScrollTrigger)** absolutamente idêntica à referência:
  - **Trigger:** `.cta_component` (200vh)
  - **Start/End:** `top top` a `bottom bottom` (100vh de scroll real)
  - **Scrub:** `true` (anima ligado à barra de rolagem)

---

## Arquivos modificados
- `SITE-COPYCENTER/src/scripts/ctaMotion.js` — reescrito com paridade de movimento IX2.

## Seletores alterados/animados
- `.cta_content` (fade in: `opacity: 0 -> 1`)
- `.cta-image_block.is-image1` até `.is-image8` (scale progressivo e tradução percentual do centro para as bordas).

---

## Confirmações

| Regra | Status |
|---|---|
| NÃO houve motion autoral inventada | ✅ |
| `cta.html` preservado | ✅ |
| `webflow-base.css` preservado | ✅ |
| Sticky nativo mantido intacto | ✅ |
| Seções anteriores preservadas | ✅ |

---

## Resultado do build
```
> vite build
✓ 48 modules transformed.
dist/assets/index-CS9BF0OO.css  153.69 kB │ gzip: 23.26 kB
dist/assets/index-C3Es1Fhz.js   340.39 kB │ gzip: 114.76 kB
✓ built in 3.43s
```
**Build: PASSOU ✅**

---

## URL local usada para validação
`http://localhost:5174/` (ou 5173 dependendo do script dev ativo)

## Próxima sessão recomendada
**Session 013** — Footer / Próxima seção após CTA. Extração do rodapé a partir da linha 1393 do `reference-body.html`.
