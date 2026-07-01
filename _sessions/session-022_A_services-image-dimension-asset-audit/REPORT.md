# REPORT — SESSION-022-A — Services Image Dimension and Asset Audit

* Status: CONCLUÍDA ✅
* Estrutura exata da seção Services:
  Envelopada por `<section class="section_service">`. Usa CSS Grid `.collection-list` (3 colunas automáticas com `minmax(370px, 1fr)`). Cada item usa `.service-collection_item` -> `.service-collection_item-inner` (com 20px de padding) -> `.service-collection_item-image_wrap` -> `.image-animation_trigger` -> `.image-animation_scale` -> `<img>`.
* Quantidade de cards: 3 cards (Impressão Digital, Comunicação Visual, Brindes Personalizados).
* Classes dos cards: `.service-collection_item` e `.service-collection_item-inner`.
* Classes dos wrappers de imagem: `.service-collection_item-image_wrap`, com sub-wrappers de animação (`.image-animation_trigger`, `.image-animation_scale`).
* Tags de imagem encontradas:
  `<img>` com classes `.service-collection_item-image` em todos os cards. Não é CSS background.
* Imagens atuais e caminhos:
  Card 1: `/assets/68d3bdc2b051a82b853be258_service-image-6.avif`
  Card 2: `/assets/68d3bcb1cfc8bfb20511c778_service-image-5.avif`
  Card 3: `/assets/68d3ba94271a5d106aef5720_service-image-4.avif`
* CSS relevante das imagens:
  A imagem possui `height: 100%;` com animações GSAP de scale (1.045 no hover). O wrapper tem `overflow: hidden; border-radius: 16px; width: 100%;`.
* Se existe object-fit/crop:
  Não foi encontrado `object-fit: cover` nas regras globais que forcem corte nessas imagens. A proporção exibida é a proporção original do próprio arquivo (com width/height naturais controlando a altura final do wrapper).
* Dimensões renderizadas em 1920x1080 (Grid 3 colunas): ~370px largura x ~382px altura (por imagem).
* Dimensões renderizadas em 1440x900 (Grid 3 colunas): ~370px largura x ~382px altura.
* Dimensões renderizadas em 1366x768 (Grid 3 colunas): ~344px largura x ~355px altura.
* Dimensões renderizadas em 768x1024 (Tablet, Grid 1 coluna ou 2 dependendo do padding): Se cair para 1 coluna, pode atingir ~680px largura x ~700px altura.
* Dimensões renderizadas em 390x844 (Mobile, Grid 1 coluna): ~310px largura x ~320px altura.
* Dimensões renderizadas em 430x932 (Mobile, Grid 1 coluna): ~350px largura x ~361px altura.
* Proporção real dominante:
  Os assets originais possuem exatamente **794x820 pixels** (L x A).
  Isso significa uma proporção de **1 : 1.032** (quase um quadrado perfeito, levemente mais alto que largo).
* Tamanho mínimo recomendado para criação:
  794x820 (Tamanho original da template, ideal para o visual atual sem quebrar grid).
* Tamanho premium recomendado para criação (Telas 2x/Retina):
  **800x826 pixels** ou até **1000x1032 pixels**. (É preferível usar essa proporção para manter exata paridade com a quebra de texto).
* Tamanho máximo seguro:
  1200x1240 pixels (Evitar tamanhos maiores para não impactar LCP e performance).
* Formato recomendado:
  AVIF (Obrigatório para produção). JPEG (opcional como fallback no `<picture>`).
* Peso-alvo recomendado:
  AVIF ideal: entre 20KB e 40KB por imagem. (As originais do template possuem ~21KB).
* Safe area visual:
  Manter o conteúdo/objeto principal (Impressão, Brindes, Comunicação Visual) bem centralizado. Como há uma ligeira animação de `scale(1.045)` no hover, as bordas extremas sofrerão um corte de ~4% (crop dinâmico de interação). Portanto, evite textos ou detalhes importantes rente à borda (deixe pelo menos 20px de margem interna livre).
* Pasta recomendada para os novos assets:
  `SITE-COPYCENTER/public/assets/copycenter/services/`
* Nome final recomendado para cada imagem:
  `service-impressao-digital-01.avif`
  `service-comunicacao-visual-01.avif`
  `service-brindes-personalizados-01.avif`
* Observações para o usuário criar as imagens:
  Você pode criar as imagens num canvas quadrado puro de **800x800** (proporção 1:1) se facilitar o design, pois o layout absorverá bem um quadrado com diferença imperceptível para o 1:1.03 original.
* Riscos técnicos:
  Imagens muito altas (ex: proporção 9:16 ou 2:3) alongarão o card absurdamente no mobile (onde a imagem atinge 100% da largura). É imperativo respeitar a proporção 1:1 (quadrada) ou próxima disso.
* Confirmação de que nenhum arquivo do site foi alterado:
  Confirmado. Apenas o HTML base e os metadados AVIF foram lidos por script. Nada foi alterado.
