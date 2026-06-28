# REGRAS GLOBAIS — PARIDADE WEBFLOW
> Leia este arquivo no início de TODA sessão, sem exceção.
> Estas regras têm prioridade sobre qualquer outra instrução.

---

## 1. DEFINIÇÃO DE PARIDADE ABSOLUTA

O resultado final deve ser **visualmente e funcionalmente indistinguível** do original em:
- Layout e espaçamentos (desktop, tablet, mobile)
- Tipografia (família, peso, tamanho, line-height, letter-spacing)
- Cores exatas — nunca aproxime, copie o valor do CSS original
- Animações (timing, easing, trigger points)
- Comportamento de scroll
- Estados hover / focus / active
- Responsividade em todos os breakpoints do Webflow

---

## 2. REGRAS DE HTML

### ✅ FAÇA
- Preserve a estrutura de divs e classes do Webflow exatamente
- Mantenha atributos `data-*` relevantes para scripts
- Preserve a ordem dos elementos no DOM

### ❌ NÃO FAÇA
- Não renomeie classes sem necessidade
- Não reorganize hierarquia para "ficar mais limpa"
- Não remova divs "vazias" — existem para layout/animação
- Não converta IDs para classes sem mapear todos os usos

---

## 3. REGRAS DE CSS

### ✅ FAÇA
- Copie o CSS do Webflow como base, não reescreva do zero
- CSS customizado em arquivo separado, após o Webflow CSS
- Use as mesmas unidades do original (rem, px, vw)
- Preserve todos os breakpoints com valores exatos

### ❌ NÃO FAÇA
- Não normalize espaçamentos para múltiplos de 4
- Não remova `!important` do CSS Webflow sem testar
- Não assuma breakpoints — leia os @media do CSS original
- Não troque `px` por `rem` sem calcular equivalência exata

---

## 4. REGRAS DE GSAP

```js
// Import correto
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

// ScrollTrigger SEMPRE na timeline, nunca em tween filho
const tl = gsap.timeline({
  scrollTrigger: { trigger: ".section", start: "top center" }
});

// SplitText com cleanup obrigatório
const split = SplitText.create(".heading", { type: "words, chars" });
// → split.revert() no unmount

// React: sempre useGSAP() com scope
import { useGSAP } from "@gsap/react";
useGSAP(() => { /* animações */ }, { scope: containerRef });

// Após mudanças de layout
ScrollTrigger.refresh();

// NUNCA deixe markers: true em produção
```

---

## 5. BREAKPOINTS WEBFLOW

| Nome | Largura |
|------|---------|
| Desktop | 1280px+ |
| Tablet | 768px – 991px |
| Mobile Landscape | 480px – 767px |
| Mobile Portrait | até 479px |

---

## 6. ARMADILHAS COMUNS

| Problema | Causa | Solução |
|----------|-------|---------|
| Layout quebrado | Divs wrapper removidas | Preserve toda estrutura de containers |
| ScrollTrigger não dispara | Falta `refresh()` após layout | `ScrollTrigger.refresh()` |
| Texto quebra no resize | SplitText sem revert+resplit | `ResizeObserver` com re-split |
| Fontes com peso errado | Pesos diferentes no link | Copie o `<link>` exato do original |
| Cores levemente diferentes | Aproximação de hex | Copie valores exatos do CSS |
| IX2 não funciona | Depende do runtime Webflow | Reescreva 100% em GSAP |

---

## 7. FLUXO DE TRABALHO

```
Antigravity → lê arquivos → gera spec (tokens.md, animations.md)
      ↓
    Você → revisa spec → aprova
      ↓
    Codex → recebe spec da sessão → escreve código
      ↓
    Você → testa → aprova ou reporta bug
      ↓
    Codex → corrige → atualiza REPORT.md
```

---

## 8. PROMPT DE INÍCIO DE SESSÃO

Cole este prompt no início de cada sessão (Antigravity ou Codex):

```
Antes de executar qualquer tarefa:
1. Leia _sessions/_rules/GLOBAL_RULES.md
2. Leia _sessions/_rules/tokens.md (se existir)
3. Leia _sessions/_rules/animations.md (se existir)
4. Leia _sessions/_status.md
5. Leia _sessions/session-[N]_[nome]/RULES.md desta sessão
6. Execute APENAS o que está em escopo desta sessão
7. Ao finalizar, escreva o REPORT.md desta sessão
8. Atualize o status em _sessions/_status.md
```
