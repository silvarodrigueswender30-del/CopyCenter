# WEBFLOW PARITY AGENT RULES
# Regras obrigatórias para paridade absoluta de sites Webflow

> **Leia este arquivo inteiro antes de tocar em qualquer arquivo do projeto.**
> Estas regras têm prioridade sobre qualquer outra instrução.

---

## 0. DEFINIÇÃO DE PARIDADE ABSOLUTA

Paridade absoluta significa que o resultado final deve ser **visualmente e funcionalmente indistinguível** do site Webflow original em:
- Layout e espaçamentos (desktop, tablet, mobile)
- Tipografia (família, peso, tamanho, line-height, letter-spacing)
- Cores exatas (use os valores originais, nunca aproxime)
- Animações e interações (timing, easing, trigger points)
- Comportamento de scroll
- Estados hover/focus/active
- Responsividade em todos os breakpoints

---

## 1. FASE DE AUDITORIA — OBRIGATÓRIA ANTES DE CODAR

Antes de criar qualquer arquivo ou componente, execute esta auditoria completa:

### 1.1 Inventário de assets
```
[ ] index.html e todas as páginas internas mapeadas
[ ] CSS principal identificado (webflow.css + custom)
[ ] JS principal identificado (webflow.js + chunks)
[ ] GSAP e plugins listados com versões exatas
[ ] Fontes identificadas (CDN ou local, família, pesos usados)
[ ] Imagens catalogadas (formato, dimensões, uso)
[ ] SVGs catalogados (inline ou img tag)
[ ] Favicon e meta tags copiados
```

### 1.2 Análise de animações
```
[ ] Identificar animações IX2 (Webflow Interactions 2.0) — data-wf-* attrs
[ ] Identificar animações GSAP puras (ScrollTrigger, timelines)
[ ] Identificar animações CSS puras (@keyframes, transitions)
[ ] Mapear cada animação: trigger → ação → timing → easing
[ ] Documentar o que é IX2 (precisará ser reescrito em GSAP)
```

### 1.3 Análise de tipografia
```
[ ] Extrair TODOS os font-size, line-height, letter-spacing do CSS original
[ ] Mapear variações por breakpoint (não assuma, leia o CSS)
[ ] Verificar se usa clamp(), vw units, ou valores fixos
[ ] Identificar font-weight usados (não baixe pesos desnecessários)
```

### 1.4 Análise de cores
```
[ ] Extrair variáveis CSS do :root (--color-*, etc.)
[ ] Listar todas as cores com seus hex/rgb exatos
[ ] Mapear gradientes com angulação e stops exatos
[ ] Identificar cores com opacidade (rgba ou hex com alpha)
```

---

## 2. REGRAS DE ESTRUTURA HTML

### ✅ FAÇA
- Preserve a estrutura de divs e classes do Webflow exatamente como está
- Mantenha os atributos `data-*` relevantes para scripts
- Use as mesmas classes CSS do original como base
- Preserve a ordem dos elementos no DOM

### ❌ NÃO FAÇA
- Não renomeie classes do Webflow sem necessidade
- Não reorganize a hierarquia de elementos para "ficar mais limpa"
- Não remova divs "vazias" — muitas existem para layout/animação
- Não converta IDs para classes ou vice-versa sem mapear todos os usos
- Não use BEM ou outra convenção por cima da estrutura original

---

## 3. REGRAS DE CSS

### ✅ FAÇA
- Copie o CSS do Webflow como base, não reescreva do zero
- Adicione CSS customizado em arquivo separado, após o Webflow CSS
- Use as mesmas unidades do original (rem, px, vw — não converta)
- Preserve todos os breakpoints com seus valores exatos

### ❌ NÃO FAÇA
- Não use Tailwind por cima do CSS Webflow sem strategy clara
- Não "normalize" valores de espaçamento para multiples de 4
- Não remova `!important` do CSS Webflow sem testar
- Não assuma breakpoints — leia os @media queries do CSS original
- Não troque `px` por `rem` sem calcular a equivalência exata

---

## 4. REGRAS DE ANIMAÇÕES GSAP

### 4.1 Instalação correta
```js
// SEMPRE importe assim (nunca via CDN em projetos Next.js)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// SEMPRE registre antes de usar
gsap.registerPlugin(ScrollTrigger, SplitText);
```

### 4.2 ScrollTrigger
```js
// ✅ CORRETO — ScrollTrigger na timeline, não em tweens filhos
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: true,       // use true ou número (suavidade)
    pin: false,        // só true se o original pinar
    markers: false,    // NUNCA deixe true em produção
  }
});

// ❌ ERRADO — ScrollTrigger em tween filho de timeline
const tl = gsap.timeline();
tl.to(".el", { x: 100, scrollTrigger: { ... } }); // bug garantido
```

### 4.3 SplitText
```js
// ✅ CORRETO
gsap.registerPlugin(SplitText);
const split = SplitText.create(".heading", { type: "lines, words, chars" });

gsap.from(split.chars, {
  opacity: 0,
  y: 20,
  stagger: 0.03,
  duration: 0.5,
  ease: "power2.out",
});

// SEMPRE faça cleanup para evitar memory leak
// split.revert() no unmount (React) ou quando o elemento sair do DOM
```

### 4.4 Cleanup obrigatório em React/Next.js
```js
// ✅ OBRIGATÓRIO em componentes React
import { useGSAP } from "@gsap/react";

useGSAP(() => {
  const split = SplitText.create(".heading", { type: "chars" });
  
  gsap.from(split.chars, { opacity: 0, y: 20, stagger: 0.02 });

  return () => split.revert(); // cleanup automático no unmount
}, { scope: containerRef });
```

### 4.5 Após mudanças de DOM/layout
```js
// SEMPRE chame refresh após mudanças que afetam alturas
ScrollTrigger.refresh();

// Em Next.js após navegação:
ScrollTrigger.getAll().forEach(st => st.kill());
```

---

## 5. REGRAS DE CONVERSÃO IX2 → GSAP

Interações IX2 do Webflow são identificadas por atributos como:
- `data-wf-ignore`
- `data-animation-type`
- `data-w-id`
- Classes como `.w-dyn-*`, `.w-condition-*`

### Processo de conversão obrigatório:
```
1. Abra o Webflow Designer do projeto original
2. Inspecione cada Interaction no painel IX2
3. Documente: trigger, duration, easing, delay, propriedades animadas
4. Reescreva como GSAP equivalente
5. Compare visualmente frame a frame
```

### Mapeamento de easings Webflow → GSAP:
```
Ease In       → power1.in / power2.in
Ease Out      → power1.out / power2.out
Ease In Out   → power1.inOut / power2.inOut
Bounce        → bounce.out
Elastic       → elastic.out(1, 0.3)
Custom Bezier → CustomEase.create("nome", "M0,0 C...")
```

---

## 6. REGRAS DE RESPONSIVIDADE

### ✅ FAÇA
- Teste em exatamente os mesmos breakpoints do Webflow:
  - Desktop: 1280px+
  - Tablet: 768px – 991px
  - Mobile Landscape: 480px – 767px
  - Mobile Portrait: até 479px
- Use `gsap.matchMedia()` para animações responsivas

```js
// ✅ CORRETO — animações responsivas
const mm = gsap.matchMedia();

mm.add("(min-width: 992px)", () => {
  // animações desktop
});

mm.add("(max-width: 991px)", () => {
  // animações tablet/mobile (geralmente mais simples)
});
```

### ❌ NÃO FAÇA
- Não disable animações em mobile sem verificar se o original as tem
- Não use breakpoints arbitrários (576, 768, 1024) sem confirmar com o original

---

## 7. ORDEM DE TRABALHO — WORKFLOW OBRIGATÓRIO

```
FASE 1 — AUDITORIA (não pule)
  └── Inventário completo de assets
  └── Mapa de animações
  └── Extração de tokens (cores, tipografia, espaçamentos)

FASE 2 — ESTRUTURA BASE
  └── HTML estático fiel ao original
  └── CSS do Webflow integrado
  └── Fontes carregando corretamente
  └── Imagens e SVGs no lugar

FASE 3 — ANIMAÇÕES
  └── Animações CSS puras primeiro
  └── GSAP sem scroll
  └── ScrollTrigger
  └── SplitText e efeitos de texto

FASE 4 — REVISÃO DE PARIDADE
  └── Comparação visual desktop
  └── Comparação visual tablet
  └── Comparação visual mobile
  └── Teste de performance (nada abaixo de 60fps)

FASE 5 — AJUSTES FINAIS
  └── Pixel pushing de espaçamentos
  └── Refinamento de easing/timing
  └── Cleanup de código
```

---

## 8. ARMADILHAS COMUNS DO WEBFLOW — EVITE

| Problema | Causa | Solução |
|----------|-------|---------|
| Layout quebrado | Divs "wrapper" do Webflow removidas | Preserve toda estrutura de containers |
| Animações não disparam | ScrollTrigger sem `refresh()` após layout | Chame `ScrollTrigger.refresh()` |
| Texto splitado quebra no resize | SplitText sem `revert()` + `re-split` | Use `ResizeObserver` para re-split |
| Fontes com peso errado | Google Fonts carregando pesos diferentes | Copie o `<link>` exato do original |
| Cores levemente diferentes | Aproximação de hex | Copie valores exatos do CSS |
| Scroll behavior diferente | `scroll-behavior: smooth` no CSS | Verifique e replique ou use Lenis |
| IX2 não funciona offline | Depende do runtime do Webflow | Reescreva 100% em GSAP |

---

## 9. CHECKLIST FINAL DE PARIDADE

Antes de declarar paridade completa, confirme:

```
VISUAL
[ ] Fontes idênticas (família, peso, tamanho, espaçamento)
[ ] Cores idênticas (use color picker para comparar)
[ ] Espaçamentos idênticos (margin, padding, gap)
[ ] Imagens no tamanho e posição corretos
[ ] SVGs renderizando igual
[ ] Gradientes idênticos

ANIMAÇÕES
[ ] Todas as animações de entrada presentes
[ ] Timing e easing correspondentes
[ ] ScrollTrigger triggerando nos pontos corretos
[ ] SplitText animando corretamente
[ ] Hover states presentes e corretos
[ ] Sem animações quebradas ou ausentes

RESPONSIVIDADE
[ ] Desktop (1440px) ✓
[ ] Tablet (768px) ✓
[ ] Mobile (375px) ✓
[ ] Sem overflow horizontal em nenhum breakpoint

PERFORMANCE
[ ] Sem layout thrashing nas animações
[ ] will-change aplicado onde necessário
[ ] ScrollTrigger sem markers em produção
[ ] Console sem erros ou warnings
```

---

## 10. DEPENDÊNCIAS E VERSÕES

Sempre use as mesmas versões do projeto original. Se não souber, use:

```json
{
  "gsap": "^3.12.x",
  "@gsap/react": "^2.x"
}
```

```js
// Verifique a versão instalada
import { gsap } from "gsap";
console.log(gsap.version); // confirme contra o original
```

---

*Este arquivo deve estar na raiz do projeto ou em `.codex/WEBFLOW_PARITY.md`*
*Atualize-o conforme encontrar novos padrões no projeto.*
