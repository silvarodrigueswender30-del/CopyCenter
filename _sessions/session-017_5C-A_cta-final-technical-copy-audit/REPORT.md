# REPORT — SESSION-017.5C-A — CTA Final Technical Copy Audit

* **Status:** CONCLUÍDA ✅
* **Estrutura exata encontrada na CTA:** Seção com `cta_component` contendo um conteúdo fixo (`cta_content`) e 8 blocos de imagens flutuantes (classes `.is-image1` a `.is-image8`). Dentro do `cta_content`, há um título (`h2`), um parágrafo (`p`) e um botão (`a.button`). 
* **Título atual mapeado:** `Your clean happy <span class="text-highlighted">space is just</span> one click away`
* **Parágrafo atual mapeado:** `Let Albadoe transform your home or office into a spotless sanctuary. Book your service in just a few clicks — fast, easy`
* **Botão atual mapeado:** `Get a quote` (dentro de `.button-text`). Href atual: `/contact`.
* **Camadas duplicadas do botão:** Existe `.button-text` e uma camada `.button-hover` que atua como máscara (vazia de texto, controlada por CSS/IX2).
* **Labels atuais mapeadas por bloco `.is-image`:**
  - `.is-image1`: Bathroom Cleaning
  - `.is-image2`: House Cleaning (duplicada 2x neste bloco)
  - `.is-image3`: General repairs
  - `.is-image4`: Siding corner
  - `.is-image5`: Flower planting
  - `.is-image6`: Roof repair
  - `.is-image7`: Electrical repairs
  - `.is-image8`: Garden design
* **Quantidade total de labels:** 9 instâncias de labels (o bloco `is-image2` tem duas).
* **Classes sensíveis da CTA:** `.cta_component`, `.cta_content`, `.is-image1` até `.is-image8`.
* **Como `ctaMotion.js` atua na seção:** A animação usa o plugin ScrollTrigger para fazer um *scrub* vinculando o scroll ao `.cta_component`. O texto (`cta_content`) entra em fade in, enquanto as 8 imagens vêm de posições/escalas específicas (scatter) para sua posição original.
* **Se a motion depende da ordem/classes:** Sim, a motion busca expressamente pelas classes `.is-image1` até `.is-image8`. Ela NÃO depende do texto presente nas labels.
* **Se a copy curada cabe no título:** Sim, cabe perfeitamente e é até mais curta. Podemos estruturar como: `Seu material <span class="text-highlighted">começa aqui</span>`.
* **Se o parágrafo curado cabe:** Sim, cabe no slot do parágrafo existente perfeitamente.
* **Se existe ou não slot para microcopy:** **NÃO EXISTE**. Não há tags abaixo do botão para inserir o microcopy ("Atendimento local..."). Portanto, esta string deve ser ignorada na próxima etapa para respeitar a regra de não criar HTML.
* **Termos antigos identificados que precisam sair:** Albadoe, clean, bathroom, house, repairs, siding, flower, roof, electrical, garden.
* **Mapa seguro de substituição para futura Session 017.5C-B:**
  - Título: `Seu material <span class="text-highlighted">começa aqui</span>`
  - Parágrafo: `Fale com a CopyCenter, envie sua demanda e receba orientação para produzir seu material gráfico com o acabamento certo.`
  - Botão: `Pedir orçamento`
  - Imagem 1: `Impressão Digital`
  - Imagem 2 (label 1): `Comunicação Visual`
  - Imagem 2 (label 2): `Acabamentos` (usar um termo diferente para não repetir)
  - Imagem 3: `Brindes`
  - Imagem 4: `Plotagem`
  - Imagem 5: `Adesivos`
  - Imagem 6: `Cartões`
  - Imagem 7: `Banners`
  - Imagem 8: `Personalizados`
* **Forma segura de aplicar copy:** Modificar apenas o interior das tags de texto (h2, p, div da label), preservando estritamente as classes estruturais.
* **Forma proibida de aplicar copy:** Criar novas divs para inserir o microcopy ou remover a classe `.text-highlighted`.
* **Riscos técnicos:** A animação GSAP das imagens é sensível, mas mexer apenas no texto dentro do `div` da label não afeta a GSAP.
* **Confirmação de que nenhum arquivo do site foi alterado:** ✅ Confirmado. Apenas esta auditoria foi gerada.
