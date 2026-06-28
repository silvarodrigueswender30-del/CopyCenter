# HERO MOTION CORRECTION SPEC - SESSION 003.1

## 1. Diagnóstico visual da Hero Motion atual
A animação dos cards flutuantes (`.hero-moving_element`) está funcionando via GSAP, porém a trajetória e as posições bases nativas do Webflow fazem com que, em certos tamanhos de tela, os cards se aproximem excessivamente do texto principal (`h1` e botões). Isso gera poluição visual e prejudica a leitura do título.

## 2. Diferenças prováveis entre referência original e versão local
Na referência, o motion é sutil, atuando como um efeito "premium" de suspensão (orbitando) sem jamais agredir a mancha de texto. Na versão local recriada, a junção das propriedades de `translate` base em porcentagem com as atualizações de `x/y` do GSAP sem limitação de área segura fez os elementos balançarem para cima do título. Além disso, a velocidade (duration ~2.6s) para um deslocamento de até 14px passa a sensação de agitação, não de flutuação suave.

## 3. Quais cards estão mais próximos de cobrir o texto
- **moving-element-01 (Top Center - `0%, -630%`)**: Desce em direção à primeira linha do título.
- **moving-element-02 (Left - `-160%, -250%`)**: Pode invadir a margem esquerda do texto, especialmente em telas médias/pequenas.
- **moving-element-03 (Right - `160%, -230%`)**: Pode invadir a margem direita do texto em telas médias/pequenas.

## 4. Área segura do título
- **Onde os cards podem ficar**: Nas bordas externas (top absoluto e cantos laterais) do container do Hero. Eles devem atuar como "satélites".
- **Onde os cards não devem entrar**: O eixo central e o "bounding box" invisível do texto `.home-hero_content` e do `.button-group` devem ficar totalmente livres.

## 5. Recomendação de ajuste por card
- **moving-element-01**: Deve flutuar apenas no eixo Y, mas limitando sua descida para que não encoste no título.
- **moving-element-02**: Empurrar um pouco mais para a esquerda via CSS (ex: `-180%` ou `-200%` dependendo da tela) ou garantir que a animação GSAP não puxe no eixo X positivo.
- **moving-element-03**: Empurrar um pouco mais para a direita via CSS (ex: `180%` ou `200%`).

## 6. Recomendação de amplitude
- **x máximo**: Remover ou reduzir a quase zero (máx `2px`). O movimento lateral em cards fixos desestabiliza a leitura.
- **y máximo**: Restringir a uma flutuação de `4px` a `8px` (`+=6` ou `-=6`).
- **duration**: Aumentar para `3.5s` a `4.5s`. Movimentos mais longos transmitem mais leveza e sensação premium.
- **delay**: Manter o stagger (`0`, `0.2`, `0.4`) para evitar sincronia robótica.
- **ease**: Manter `"sine.inOut"`.

## 7. Recomendação sobre z-index
- O `.home-hero_content` deve ter `z-index: 10` (e `position: relative`) garantido via CSS, enquanto os `.hero-moving_element` devem ficar com `z-index: 1` a `5`. Se ocorrer uma colisão visual acidental (ex: mobile), o texto e os botões permanecerão acima dos cards, clicáveis e legíveis.

## 8. Recomendação sobre responsivo
- **Desktop**: O layout Webflow com porcentagens lida razoavelmente bem, mas as correções de GSAP (apenas vertical, lentas) vão estabilizá-lo.
- **Tablet**: A largura menor fará o `-160%` do card 02 aproximá-lo do centro. Pode-se aplicar em CSS: `@media (max-width: 991px) { .moving-element-02 { transform: translate(-180%, -250%) !important; } }`.
- **Mobile Landscape & Portrait**: Em telas muito estreitas, os 3 cards podem sufocar a Hero. É recomendado diminuir a escala (`scale: 0.75`) via CSS media queries, afastar ainda mais as porcentagens de eixo X, ou até ocultar 1 dos cards se a poluição for crítica.

## 9. Recomendação de prioridade
A **legibilidade do título** é a prioridade suprema. Se um card precisar ter seu movimento drasticamente reduzido (ou mesmo ficar estático no mobile) para salvar a leitura e a experiência do usuário, sacrifique o movimento intenso em favor da clareza da mensagem.

## 10. Recomendação objetiva para o Codex
1. **No `custom.css`**: Aplique um `z-index` maior no texto (`.home-hero_content`) e, se necessário, use media queries para afastar os transforms base dos cards ou reduzir a escala deles no mobile.
2. **No `heroMotion.js`**: Remova as animações de `x` intensas, concentre o GSAP no eixo `y` com amplitudes baixas (ex: `y: "-=6"` ou `y: "+=6"`), e aumente as durações para a casa dos `3.5s` a `4.5s`.
3. Garanta que as animações sejam apenas um "respiro" na Hero.
