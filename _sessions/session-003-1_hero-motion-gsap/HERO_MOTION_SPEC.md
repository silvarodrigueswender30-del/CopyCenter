# HERO MOTION SPEC - SESSION 003.1

## 1. Elementos animáveis da Hero
- Bloco principal de conteúdo da Hero (Título, CTAs).
- Três cards flutuantes que ilustram os tipos de serviço.

## 2. Seletores exatos
- Entrada de Conteúdo: `.home-hero_content`
- Cards Flutuantes: 
  - `.hero-moving_element.moving-element-01`
  - `.hero-moving_element.moving-element-02`
  - `.hero-moving_element.moving-element-03`

## 3. Atributos `data-w-id` envolvidos
- `4efd3e31-6575-1293-3013-7c35cc945119` (Bloco principal `.home-hero_content`)
- `090772c1-a265-3928-617c-acebad120f0b` (`moving-element-01`)
- `807be815-70d0-f1ac-5e03-02995c366692` (`moving-element-02`)
- `76c11b09-b14f-1ed4-fff4-d146aece610c` (`moving-element-03`)

## 4. Estado inicial observado (no HTML exportado)
- `.home-hero_content`: Possui style inline contendo `transform: translate3d(0, 14%, 0)`, `filter: blur(5px)`, `opacity: 0`.
- `.hero-moving_element`: Possuem transforms inline baseados em responsividade no `<style>` ou direto na tag (ex: `translate3d(0%, -630%, 0)`, etc).

## 5. Estado final desejado
- `.home-hero_content`: Deve finalizar em `opacity: 1`, `filter: blur(0px)`, e `transform: translate3d(0, 0, 0)`.

## 6. Movimento esperado dos 3 cards flutuantes
- Movimento contínuo, suave, subindo e descendo em uma curta faixa de eixo Y (floating / yoyo).

## 7. Timing sugerido
- **Entrada (`.home-hero_content`):** Duração de 1 a 1.2 segundos (delay opcional de 0.2s para aguardar renderização).
- **Cards Flutuantes:** Ciclo longo de 3 a 5 segundos por repetição para dar sensação de suspensão (stagger entre eles é recomendado).

## 8. Easing sugerido
- **Entrada:** `power2.out` ou `power3.out`.
- **Cards Flutuantes:** `sine.inOut` (ideal para movimentos de looping yoyo).

## 9. Repetição / yoyo
- A entrada ocorre apenas uma vez na montagem (on mount).
- Os cards flutuantes devem ter `repeat: -1` e `yoyo: true`.

## 10. Riscos técnicos
- Se o React renderizar duas vezes (Strict Mode), as animações GSAP podem duplicar ou bugar. Exige uso de `@gsap/react` (`useGSAP`) ou cleanup manual rigoroso (`ctx.revert()`).
- Flutuações baseadas em `translateY` ou `y` via GSAP podem entrar em conflito com as posições originais dos `.hero-moving_element` que já usam transforms para posicionamento relativo. É preferível usar `.to()` em vez de `.fromTo()` e garantir que o CSS resolva o ponto zero.

## 11. Overrides atuais em `custom.css`
- **Condição:** Na Session 003 foi aplicado o seguinte override no `custom.css`:
  ```css
  .home-hero_content {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
  ```
- **Ação:** Este override deve ser adaptado ou removido se o GSAP assumir o controle total, pois o `!important` no CSS anulará o style inline inserido pelo GSAP. Recomenda-se remover o override e configurar as vars nativamente via JS, ou alterar as propriedades no `custom.css` para servir como fallback até que o React monte o componente.

## 12. Recomendação objetiva para o Codex
1. Instale `gsap` (e opcionalmente `@gsap/react`).
2. Remova o `.home-hero_content` do override em `custom.css` para permitir animação; defina no GSAP a transição `.fromTo`.
3. Use um hook dedicado para a Hero que rode apenas no lado do cliente (`useEffect`/`useGSAP`).
4. Animação simples de entrada e animação infinita flutuante para os cards, sem mexer nos demais blocos da página.
