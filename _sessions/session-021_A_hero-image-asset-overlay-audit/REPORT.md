# REPORT — SESSION-021-A — Hero Image Asset and Overlay Audit

* Status: CONCLUÍDA ✅
* Estrutura exata encontrada na Hero:
  A seção é envelopada por `<header class="section_hero">`, contendo `<div class="home-hero_element">` (que possui `position: relative` e `overflow: hidden`). Dentro dele, há o conteúdo textual/CTAs (`.home-hero_content`), os chips flutuantes (`.hero-moving_element`) e no final há um componente de vídeo `<div class="home-hero_video w-background-video">`.
* Onde a imagem da Hero é aplicada atualmente:
  Atualmente, a Hero usa um vídeo de background (`.home-hero_video`). A imagem genérica atua apenas como *poster* e *fallback* para o vídeo (via `data-poster-url` e fallback `<img>`).
* Classes sensíveis da Hero:
  `.home-hero_element` (wrapper principal), `.home-hero_content` (textos e CTAs), `.hero-moving_element` (chips flutuantes com animação GSAP), `.home-hero_video` (wrapper do background atual).
* Se existe overlay atual:
  Sim. A classe `.home-hero_video` já possui um `background-image: linear-gradient(#00000059, #00000059);` definido nativamente no `webflow-base.css` (linha 5701), que age como overlay por cima do elemento `<video>` subjacente.
* Se é possível aplicar overlay sem criar HTML:
  Sim. É plenamente possível sem criar novas `<div>`.
* Estratégia recomendada de overlay:
  Como a estrutura atual usa `.home-hero_video` como container do fundo e aplica o overlay via background-image, a forma mais segura e com zero impacto estrutural é manter essa `div` (mesmo trocando seu conteúdo interno de `<video>` para `<img class="hero-image-fill">`) e sobrescrever o `background-image` da classe `.home-hero_video` no `custom.css` com o gradiente composto sugerido. Alternativamente, pode-se usar `.home-hero_element::before` com `position: absolute; inset: 0; pointer-events: none; z-index: 1;`.
* Z-index/pointer-events necessários:
  `pointer-events: none;` é estritamente necessário no overlay para não bloquear cliques na Navbar e botões (CTAs). O `z-index` do overlay deve ficar abaixo de `.home-hero_content` e `.hero-moving_element` (estes podem precisar de `position: relative; z-index: 2` se o overlay usar `z-index: 1`).
* Arquivos hero-01/hero-02 encontrados:
  Sim, localizados com sucesso na pasta `C:\Users\Teste\Downloads\CopyCenter\ARQUIVOS DE IMAGENS\IDEIAS-HERO-IMG`.
* Dimensões e peso dos arquivos:
  `hero-01.jpeg`: ~2.96 MB
  `hero-02.jpeg`: ~2.77 MB
  *(São imagens de altíssima resolução e peso elevado, o que reforça a urgência de conversão para AVIF para evitar gargalos de LCP).*
* Melhor destino organizado dentro do projeto:
  `SITE-COPYCENTER/public/assets/copycenter/hero/`
* Plano seguro de conversão JPG/JPEG para AVIF:
  Utilizar utilitário local (como CLI do Sharp via npx) para ler os JPEGs originais da pasta de Ideias e gerar os arquivos AVIF diretamente na pasta de assets do projeto, sem tocar nos originais.
* Ferramenta de conversão recomendada:
  `npx -y sharp-cli@3.1.0` (seguro, rápido, sem instalação global) ou script Node.js interno usando o pacote `sharp` já existente no ecossistema Vite do projeto.
* Nome final recomendado dos assets:
  `hero-copycenter-01.avif` e `hero-copycenter-02.avif` (e `.jpg` como fallback, se necessário).
* Como aplicar hero-01 sem quebrar estrutura:
  1. Remover as tags `<video>` e `<noscript>` de dentro de `.home-hero_video`.
  2. Inserir uma `<img src="/assets/copycenter/hero/hero-copycenter-01.avif">` limpa e direta dentro de `.home-hero_video`.
  3. Adicionar CSS para que a `<img>` preencha o espaço (`object-fit: cover; width: 100%; height: 100%; position: absolute; z-index: -1`).
  4. O gradiente da classe `.home-hero_video` atuará naturalmente sobre a imagem, apenas atualizando-o no `custom.css`.
* Riscos técnicos:
  Apagar acidentalmente o atributo `data-w-id` dos chips ou o overlay bloquear botões por falta de `pointer-events: none`. Ambos mitigáveis com a estratégia acima.
* Riscos visuais:
  O novo overlay pode escurecer demasiadamente o centro da imagem (onde a ação ocorre). Por isso o degradê radial que suaviza no meio (`rgba(0,0,0,0.12)`) é ideal, garantindo legibilidade nas bordas e clareza no centro.
* O que deve ser feito na Session 021-B:
  - Criar pasta de destino.
  - Converter `hero-01.jpeg` e `hero-02.jpeg` para `.avif` na pasta destino via script.
  - Substituir o conteúdo de `.home-hero_video` no `header-hero.html` pela nova imagem AVIF (com fallback JPG).
  - Atualizar o `background-image` de `.home-hero_video` no `custom.css` com o overlay fornecido.
  - Testar z-index e pointer-events.
* O que NÃO deve ser feito:
  Alterar GSAP, deletar ou alterar as classes do componente, ou modificar atributos dos moving elements.
* Confirmação de que nenhum arquivo do site foi alterado:
  Confirmado. Apenas recursos de leitura foram utilizados. Nenhuma alteração HTML, CSS ou JS foi realizada.
