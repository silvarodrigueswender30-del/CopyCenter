# SERVICE CARDS MOTION SPEC

## 1. Seletores exatos dos cards
O alvo ideal para a animação de entrada de cada card individual é o `.service-collection_item`.

## 2. Seletores de imagem/hover que NÃO podem ser quebrados
As classes associadas ao hover zoom (`.image-animation_trigger`, `.image-animation_scale`, e `.service-collection_item-image`) não devem ser alvo do GSAP para opacidade ou deslocamento, pois qualquer `transform` ou `opacity` nelas pode sobrescrever ou conflitar com a lógica de IX2 já atrelada no Webflow ou seu fallback. Animar apenas o `.service-collection_item`.

## 3. Estado inicial recomendado (GSAP `from`)
- `autoAlpha: 0` (ou `opacity: 0` combinado com `visibility`)
- `y: 40` (ou `yPercent: 10`, o suficiente para um movimento ascendente suave)
- `filter: "blur(4px)"` (caso a performance suporte, alinhando com a linguagem da Hero e do section header)

## 4. Estado final recomendado (GSAP `to`)
- `autoAlpha: 1`
- `y: 0` (ou `yPercent: 0`)
- `filter: "blur(0px)"`
- `clearProps: "visibility,filter,transform"` ao término, para evitar travamentos de rendering (opcional, dependendo do ScrollTrigger config).

## 5. Trigger recomendado
- O wrapper pai da lista: `.collection-list`. Utilizar ele como trigger garante que todos os cards entrem juntos com stagger assim que a grid apontar no viewport, em vez de animarem card a card de forma não unificada.

## 6. Start/end recomendados
- `start: "top 80%"` ou `"top 85%"` do viewport. Isso garante que a animação inicie quando a lista de cards começa a se tornar visível, um pouco após o header da seção.

## 7. toggleActions recomendado
- `toggleActions: "play none none reverse"`
- Isso permite que a animação toque ao entrar (`play`) e reverta ao voltar a rolar para cima (`reverse`).

## 8. Stagger recomendado
- `stagger: 0.15` (ou `0.1` a `0.2`). Isso cria um ritmo de cascata entre os 3 cards, sem atrasar demasiadamente o último.

## 9. Duration/easing recomendados
- `duration: 0.8` a `1.0` segundos.
- `ease: "power3.out"` ou `"sine.out"` (uma desaceleração limpa e orgânica).

## 10. Como respeitar prefers-reduced-motion
Dentro do block existente `if (prefersReducedMotion)`, adicione o seletor dos cards na declaração de `gsap.set()` garantindo que fiquem visíveis imediatamente sem animação:
```javascript
gsap.set(cards, {
  autoAlpha: 1,
  y: 0,
  filter: "blur(0px)",
  clearProps: "all"
});
```

## 11. Riscos técnicos
- **Conflito de Contexto/Limpeza:** Lembre-se de incluir a animação dos cards no mesmo contexto `gsap.context()` que já existe em `serviceMotion.js` para garantir cleanup adequado.
- **Sobrescrita do IX2/CSS Hover:** Aplicar transforms num filho direto pode quebrar `transform-origin` e `scale` do hover interno se não houver isolamento. Por isso o alvo deve ser o wrapper pai superior do card.

## 12. Arquivos que Codex pode alterar
- `SITE-COPYCENTER/src/scripts/serviceMotion.js`

## 13. Arquivos que Codex não pode alterar
- O HTML `services.html` (não alterar markup).
- Os arquivos CSS (`webflow-base.css`, `custom.css`).
- O script `heroMotion.js`.
- O entrypoint principal fora das chamadas já existentes.

## 14. Checklist de validação visual
1. Fazer scroll-down da Hero até a seção de Serviços.
2. O header ("Range of professional...") deve entrar como antes.
3. Logo a seguir, os cards de Commercial, Window, Eco-friendly devem entrar um a um (stagger) de baixo para cima, suavizados.
4. Passar o mouse nas imagens dos cards finalizados; o scale (zoom) de hover original não pode estar quebrado nem piscando.
5. Fazer scroll-up até a Hero novamente.
6. Fazer scroll-down; a animação dos cards deve acontecer novamente.
