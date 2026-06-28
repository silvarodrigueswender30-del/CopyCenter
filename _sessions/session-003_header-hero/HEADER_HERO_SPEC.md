# HEADER & HERO SPEC - SESSION 003

## 1. Classes principais do Header/Navbar
- `.navbar`, `.w-nav`, `.w-variant-*`, `.navbar_container`, `.navbar_logo`, `.navbar_content`, `.navbar_menu`, `.navbar_link`, `.navbar_dropdown`, `.navbar-button_wrapper`, `.navbar_button`, `.navbar_toggler-button`.

## 2. Hierarquia de wrappers do Header/Navbar
1. `.page-wrapper` (início)
2. `.navbar`
3. `.navbar_container`
   - `.navbar_logo`
   - `.navbar_content` > `.navbar_menu` (com links e `.navbar_dropdown`)
   - `.navbar-button_wrapper` (contém `.navbar_button` desktop e `.navbar_toggler-button` mobile)

## 3. Links e botões do Header
- **Nav Links:** `Home (/), About (/about), Service (/service)`.
- **Dropdown:** Título "Others" com listas divididas em `.navbar-dropdown_column`.
- **Botão Navbar:** "Contact us" (link `/contact`) utilizando os wrappers de interação de hover: `data-button="wrap"`, `.button-text`, `data-button="clip"`.

## 4. Classes principais da Hero
- `.section_hero`, `.section-padding`, `.home-header`, `.home-hero_element`, `.home-hero_content`, `.home-hero_title-wrap`, `.heading-display-1`, `.button-group`, `.hero-moving_element`, `.home-hero_video`.

## 5. Hierarquia de wrappers da Hero
1. `<main class="main-wrapper">`
2. `<header class="section_hero">`
3. `.section-padding .home-header`
4. `.home-hero_element`
   - `.home-hero_content` (Alinhamento central, título e botões)
   - `.hero-moving_element` (3 instâncias: Office, Restroom, Bathroom)
   - `.home-hero_video` (Elemento base do background com controles de pause/play)

## 6. Textos originais do Hero
- **Título:** "Breathe easy in a home that’s fresh clean and truly yours"
- **Botões (CTA):** "Get a quote" (link `/contact`), "Our Service" (link `/service`, com classe `.is-secondary`).
- **Moving Elements:** "Office Cleaning", "Restroom Cleaning", "Bathroom Cleaning".

## 7. Imagens/assets usados no Header/Hero
- **Logos:** `/assets/68cb9db7d45d9a0f750230d6_logo-icon.svg`
- **Vídeo (Hero):** 
  - Poster: `/assets/68f26ef2ae96390b3d18611b_home-background-video-poster-00001.jpg`
  - MP4: `/assets/68f26ef2ae96390b3d18611b_home-background-video-transcode.mp4`
- **Ícones de controle do vídeo:** 
  - Pause: `/assets/628299f8aa233b83918e24fd_Pause.svg`
  - Play: `/assets/628298b20ae0236682d4b87f_Play-24.svg`

## 8. Atributos data-w-id encontrados no Header/Hero
- `4efd3e31-6575-1293-3013-7c35cc945119` (Bloco principal de conteúdo do Hero `.home-hero_content`).
- `090772c1-a265-3928-617c-acebad120f0b` (Moving element 1).
- `807be815-70d0-f1ac-5e03-02995c366692` (Moving element 2).
- `76c11b09-b14f-1ed4-fff4-d146aece610c` (Moving element 3).

## 9. Animações identificadas no Header/Hero
- O Header usa propriedades nativas do componente Navbar do Webflow (`data-animation`, `data-easing`, `data-duration="400"`).
- Os botões utilizam seletores de hover baseados em custom JS/CSS (`data-button="wrap"`, `.button-hover`).
- A Hero inicializa com o conteúdo principal oculto e com blur: `style="... filter:blur(5px); opacity:0;"` (Animação de entrada gerida pelo Webflow IX2).
- O vídeo em background é inicializado via Webflow.js (`w-background-video`).

## 10. O que deve ser preservado para futura conversão GSAP
- **Manter rigorosamente todos os atributos `data-w-id` e a estrutura aninhada das divs**. Eles serão os identificadores e *triggers* usados no GSAP. Não devem ser limpos no JSX, exceto para garantir renderização (ex: transpor atributos customizados no React).

## 11. Riscos técnicos específicos do Header/Hero
- **Elemento invisível:** O bloco de texto do Hero inicia com `opacity: 0`. Se o script do IX2 não rodar, a tela ficará vazia.
- **Dropdown Nativo:** A lógica do Webflow para Navbar Dropdowns/Mobile Menu é complexa e proprietária. Se for para React, o menu mobile não abrirá sem adicionar um `useState` de fallback, ou precisará do `webflow.js`.
- **Background Vídeo:** O componente do Webflow exige JS para rodar corretamente com o poster fallback e botão play/pause customizado.

## 12. Recomendações objetivas para o Codex
1. Ao extrair os componentes para JSX (se aplicável), force um override no CSS (`custom.css`) aplicando `opacity: 1 !important` e desabilitando transforms nas classes principais da Hero (`.home-hero_content`), para que fiquem visíveis até que o GSAP seja instalado.
2. Certifique-se de fechar tags img/br não fechadas corretamente e substituir `class` por `className`.
3. Garanta que o caminho `/assets/...` coincida com a pasta `public/assets` recém-criada no projeto.
