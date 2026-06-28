# ANIMAÇÕES DA PARIDADE

## Webflow Interactions (IX2)
- **Quantidade de triggers data-w-id:** 35 elementos encontrados na index.
- **Outros triggers:** `data-animation="default"`.

## Dependências de GSAP e Animações Externas
- `gsap.min.js` e `ScrollTrigger.min.js` importados no `<head>`.
- `split-type` importado no `<head>`.
- 14 menções a scripts de GSAP identificados na HTML principal.
- Provavelmente há uso intensivo de `ScrollTrigger` e animações de hover nos botões.

## Recomendação de Recriação
- **GSAP:** Toda a lógica identificada em `<script>` e `data-w-id` deve ser recriada utilizando a biblioteca GSAP em modo React/Next.js (com hooks ou mount adequado) caso seja migrado para um framework, ou mantendo JS puro seguindo o `GLOBAL_RULES.md`.
- **Botões:** Há interações CSS e scripts dedicados para botão (`<!-- Button hover -->`). Devem ser preservados os triggers.
- **Easing e Duration:** Identificados por `data-duration="400"` e `data-easing="ease"` na nav e outros elementos configurados pelo Webflow. Recomenda-se transpor para `power2.out` e tempos similares.
