# NEXT SECTION SPEC — SESSION 007

## 1. Nome exato da seção no markup
```html
<section class="section_about">
```

## 2. Posição exata após `.section_process.background-grey`
Fica imediatamente abaixo de `.section_process`, dentro do container `<main class="main-wrapper">`.

## 3. Classes principais da seção
- `.section_about`
- `.section-padding.padding-160x160`
- `.container-large`
- `.section_component`
- `.home-about_element`
- `.home-about_image-wrap`
- `.home-about_image`
- `.home-about_info`
- `.home-about_card`
- `.about-info_title`
- `.counting-animation`
- `.couting_column`
- `.couting_column.align-top`
- `.couting_column.align-bottom`
- `.counting-plus_icon`
- `.about-info_para`
- `.about-para_wrap`

## 4. Hierarquia de wrappers
```
section.section_about
  div.section-padding.padding-160x160
    div.container-large
      div.section_component
        div.margin-bottom.margin-60
          h2                       (Shaping tomorrow)
          div.heading-custom-h2    (with every clean)
        div.margin-bottom.margin-40
          div.home-about_element
            div.home-about_image-wrap
              img.home-about_image
            div.home-about_info
              div.home-about_card  (Residences Serviced card)
              div.home-about_card  (Our Clients card)
        div.about-para_wrap
          p.heading-custom-h3      (Discover how our commitment...)
```

## 5. Textos originais

### Header
- H2: `Shaping tomorrow`
- Subtitle: `<div class="heading-custom-h2 text-highlighted">with every clean</div>`

### Card 1: Residences Serviced
- Label: `Residences Serviced`
- Prefix/Suffix/Numbers in column structure:
  - Column 1: `$`
  - Column 2 (Numbers list descending 9 to 0): `5\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0`
  - Column 3: `m`
  - Column 4: `+`
  - Result: `$5m+` (with number rolling animation)
- Description: `Residences and offices serviced annually`

### Card 2: Our Clients
- Label: `Our Clients`
- Numbers in columns:
  - Column 1 (align-top): `5\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0`
  - Column 2 (align-bottom): `9\n8\n7\n6\n5\n4\n3\n2\n1\n0\n0`
  - Column 3 (align-top): `0\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0`
  - Column 4: `+`
  - Result: `590+` (with number rolling animation)
- Description: `Highly trained Satisfied clients across sectors`

### Bottom Description
- Paragraph: `Discover how our commitment to quality, reliability, and eco-friendly practices transforms spaces into cleaner, healthier environments. We bring peace of mind to our clients, ensuring every space shines.`

## 6. Imagens/assets usados
- Imagem: `/assets/68da07289ff2f38bb39ccaa8_home-about-image.avif` (com fallbacks no srcset).

## 7. Botões/CTAs
Nenhum nesta seção.

## 8. Atributos data-w-id encontrados
- `.margin-bottom.margin-60` (Header): `data-w-id="3fbc6211-5d59-8273-6527-dab14be988d3"`
- `.home-about_element`: `data-w-id="bc870e79-b09a-48b2-7a4c-aafba91356f1"`
- `.about-para_wrap`: `data-w-id="4c8eb0b1-68ee-317c-69a9-609ba57212d3"`

## 9. Estados visuais iniciais IX2 (inline styles a neutralizar)
Os seguintes elementos têm `opacity: 0` e `filter: blur(5px)` na marcação original:
- `.margin-bottom.margin-60` (Header)
- `.home-about_element`
- `.about-para_wrap`

Recomenda-se o override defensivo no `custom.css` condicionado a `html:not(.motion-ready)` para que a seção fique visível no estado estático.

## 10. Animações/interações identificadas
- **Entrada da seção (Scroll Reveal)**: Título, elemento central e parágrafo final sobem com um efeito de fade-in + blur-out.
- **Roll/Counting animation**: Os números empilhados nas colunas (`.couting_column`) sobem verticalmente (usando transform translate Y) simulando um hodômetro/contador que rola quando o usuário chega na seção.

## 11. Dependências de Webflow JS
- A animação do contador de números (`.counting-animation`) e a revelação do scroll dependem do `webflow.js` ou de scripts específicos de animação. Sem eles, os números aparecerão todos empilhados verticalmente sem animação ou truncados.

## 12. Riscos técnicos
- **Números empilhados verticalmente**: Devido ao HTML possuir vários `<div>` com números dentro de cada coluna para fins de animação do Webflow, se o CSS não estiver configurado perfeitamente ou se houver falta do script de animação, os números podem quebrar de linha ou aparecer como uma lista gigante. É necessário garantir que os contêineres tenham `overflow: hidden` e a altura correta conforme definido no CSS base.

## 13. Recomendações objetivas para o Codex
- Criar `SITE-COPYCENTER/public/about.html` com o HTML exato extraído de `reference-body.html`.
- Adicionar o override estático no `custom.css` para neutralizar os inline styles invisíveis da seção `.section_about` quando o JS não estiver pronto:
  ```css
  html:not(.motion-ready) .section_about .margin-bottom.margin-60,
  html:not(.motion-ready) .section_about .home-about_element,
  html:not(.motion-ready) .section_about .about-para_wrap {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
  ```
- Para os números do contador, certificar-se de que o CSS original limita a visualização a apenas um número por coluna no modo estático antes de implementar a animação de rolagem real.

## 14. Como integrar abaixo de `process.html`
- No `App.jsx`, adicionar o fetch de `/about.html` no `Promise.all` e fazer a concatenação no HTML injetado imediatamente após `${processMarkup}`.

## 15. Arquivos que Codex pode alterar
- `SITE-COPYCENTER/public/about.html` (criar)
- `SITE-COPYCENTER/src/App.jsx`
- `SITE-COPYCENTER/src/styles/custom.css`
- `_sessions/_status.md`

## 16. Arquivos que Codex não pode alterar
- HTMLs de seções anteriores.
- Scripts de motion já implementados.
- `webflow-base.css`

## 17. Checklist de validação visual
- [ ] A seção `.section_about` aparece abaixo da seção Processo.
- [ ] O título "Shaping tomorrow with every clean" está perfeitamente legível.
- [ ] A imagem `/assets/68da07289ff2f38bb39ccaa8_home-about-image.avif` carrega perfeitamente.
- [ ] Os contadores mostram `$5m+` e `590+` de forma limpa e não empilhados incorretamente.
- [ ] O parágrafo inferior está visível e centralizado.
- [ ] Nenhuma regressão nas seções superiores.
- [ ] Build passa sem problemas.

## 18. Veredito
**Implementar estático primeiro.** A seção deve ser integrada de forma 100% estática para garantir paridade visual e estrutural perfeita antes de introduzir scripts de animação ou o motion do contador numérico.
