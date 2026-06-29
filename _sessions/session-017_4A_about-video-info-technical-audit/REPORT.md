# REPORT — SESSION-017.4A — About + Video + Info Technical Copy Audit

* Status: CONCLUÍDA ✅
* About: estrutura encontrada: Uma seção principal com título subdividido (`h2` + `div` destacado), dois cards horizontais com contadores, e um parágrafo grande no final. **Não há botão/CTA na estrutura original**.
* About: textos atuais mapeados: "Shaping tomorrow", "with every clean", "Residences Serviced", "Our Clients", além das cifras e legendas dos cards e do parágrafo final longo.
* About: contadores encontrados: `$ 5 m +` e `5 0 0 +`.
* About: como aboutCountingMotion.js atua: O script depende intrinsecamente do número de filhos (`<div>`) nas colunas (`.couting_column`) e de suas classes CSS de alinhamento (`align-top`, `align-bottom`). Ele rola a coluna calculando a altura da fonte (`rowHeight * (totalRows - 1)`). Mudar os valores exige alterar permanentemente os fragments HTML para criar dígitos extras com alinhamento correto.
* About: elementos duplicados/ocultos: Colunas de contadores têm múltiplos dígitos (0 a 9) ocultos via `overflow: hidden`.
* About: classes sensíveis: `.counting-animation`, `.couting_column`, `.align-top`, `.align-bottom`.
* About: copy curada cabe ou não: Título e Parágrafo **cabem**. CTA "Conhecer a CopyCenter" **não cabe** pois não há tag de botão no DOM. Valores dos contadores ("1978", "1 lugar", "3 etapas") **não cabem** sem quebrar a regra de não alterar HTML, pois exigem adicionar/remover nós e colunas.
* About: forma segura de aplicar copy: Aplicar a copy no Título e no Parágrafo. Manter temporariamente os números do template intactos nos contadores e apenas mudar o texto de label abaixo deles para manter a métrica coerente ou uma "Opção segura" abstraída. Ignorar o CTA curado.
* About: forma proibida de aplicar copy: Tentar inserir tag `<a>` para o CTA. Tentar apagar as `.couting_column` para injetar texto estático. Tentar trocar dígitos HTML sem redesenhar o grid flex.
* Video: estrutura encontrada: Fundo em vídeo (`.info_video`) com botão central nativo de Webflow Video Play/Pause (`.play-pause_button`). Embaixo, apenas 1 título `h2.heading-custom-h1`. **Não há parágrafo nem CTA/link**.
* Video: textos atuais mapeados: "Speedy Dependable Home Cleaning Solutions".
* Video: player/CTA encontrados: Há um player (play/pause control) funcional. **Não há botão de ação/CTA real apontando para portfólio.**
* Video: classes sensíveis: `.w-background-video`, `.play-pause_button`.
* Video: copy curada cabe ou não: Título **cabe**. Parágrafo e CTA ("Ver portfólio") **não cabem** por inexistência de tag no DOM.
* Video: forma segura de aplicar copy: Substituir apenas o Título ("Por dentro da CopyCenter"). Ignorar parágrafo e ignorar o botão de CTA.
* Video: forma proibida de aplicar copy: Tentar injetar `<p>` ou tag `<a>` dentro do container da seção para forçar a copy do briefing.
* Info: estrutura encontrada: Título principal `h2.heading-custom-h1`. Um grid contendo **4** cards (`.home-info_card`) intercalados por 1 imagem (`.home-info_image-wrap`). Cada card tem um ícone SVG, um Título H3 e um Parágrafo.
* Info: textos atuais mapeados: "Our Pro Team Takes Care of Everything", e os 4 cards ("Satisfaction Guaranteed", "Affordable Pricing", "Eco-Friendly Solutions", "Trusted Professionals").
* Info: quantidade real de cards: O briefing curado pede 3 cards. O HTML real tem **4 cards**.
* Info: elementos duplicados/ocultos: Não há elementos ocultos de responsividade. O grid de 4 cards é unificado para desktop/mobile.
* Info: classes sensíveis: `.home-info_card`.
* Info: motion envolvida: `infoMotion.js` anima título, imagem e varre dinamicamente todos os `.home-info_card` criando stagger com base na quantidade real (não está hardcoded para 4).
* Info: copy curada cabe ou não: Título, ícones, H3 e parágrafos cabem perfeitamente. Contudo, há a sobra de 1 card HTML contra 3 de copy curada.
* Info: forma segura de aplicar copy: Mapear os cards 1, 2 e 3 da copy curada nos cards HTML 1, 2 e 3. Inventar uma variação segura e coerente com a marca para preencher o Card 4 (ex: "Agilidade e prazo - Atenção à sua demanda para garantir que os materiais sejam produzidos dentro do tempo combinado").
* Info: forma proibida de aplicar copy: Remover a tag `<div class="home-info_card">` do Card 4, pois isso quebraria a instrução de "não remover tags".

Riscos técnicos:
1. Em About, alterar os números no grid GSAP resultará em colapso da animação se os fragmentos de dígito HTML não casarem perfeitamente.
2. Nas 3 seções, o Content Swap curado idealizou elementos que não existem no template (CTA About, Parágrafo Video, CTA Video). Criá-los fere regras primárias do estágio atual.

Plano seguro para Session 017.4B:
- Executar Content Swap trocando textos sem quebrar tags.
- Descartar CTAs inexistentes em About e Video.
- Descartar Parágrafo do Video.
- Manter contadores GSAP de About inalterados na parte numérica, trocando apenas as legendas dos cards.
- Preencher o 4º card do Info com texto genérico mas focado no ramo da CopyCenter.

Confirmação de que nenhum arquivo do site foi alterado: ✅ Confirmado. Nenhuma modificação feita no workspace além desta pasta de sessão e _status.md.
