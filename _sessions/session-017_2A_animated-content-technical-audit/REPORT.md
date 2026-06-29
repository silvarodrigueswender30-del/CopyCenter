# REPORT — SESSION-017.2A — Animated Content Technical Audit

* Status: CONCLUÍDA ✅
* Causa provável da corrupção textual: **Google Tradutor automático + SplitType**. Como o site original (`index.html`) ainda possui `lang="en"`, navegadores como o Chrome sugerem a tradução automática para usuários no Brasil. O SplitType (`scrollTextMotion.js`) divide a palavra "arquivo" em letras individuais: `<div>a</div> <div>r</div> <div>q</div> <div>u</div> <div>i</div> <div>v</div> <div>o</div>`. O motor de tradução lê a letra isolada "a" como o artigo em inglês ("a car") e a traduz para "um". Lê a letra isolada "i" como o pronome "I" ("I am") e a traduz para "eu". A junção final fica: `um + r + q + u + eu + v + o = "umrqueuvo"`. 
* Estrutura exata encontrada no HTML: 
  ```html
  <h2 class="reveal-type"><span class="text-highlighted">At Albadoe,</span> We Believe A Clean Home Goes Beyond Appearances It&#x27;s About How It Makes You Feel</h2>
  ```
* Script/motion envolvido: `scrollTextMotion.js` (GSAP ScrollTrigger).
* Como o SplitText/SplitType atua na seção: Instancia `new SplitType(text, { types: "words, chars" })`. O texto é quebrado em nós `div.word` e `div.char`. O GSAP então anima a opacidade e a posição Y de cada `.char` de forma sequencial (stagger).
* Elementos sensíveis: A tag `<span class="text-highlighted">` que precisa envolver as primeiras palavras exatas sem espaços flutuando fora da lógica do SplitType. A divisão por `chars` é altamente sensível a tradutores de página e ferramentas de acessibilidade que não processam DOM mutante.
* O que NÃO fazer na substituição de copy: Não tentar quebrar o texto com `<br>` manuais que o SplitType não espere, nem omitir a tag span, nem assumir que a copy da sessão anterior estava estruturalmente errada.
* Forma segura de aplicar copy: Substituir o conteúdo preservando a estrutura exata de tags. Para evitar a corrupção visual, o elemento precisa ser blindado contra tradução adicionando `translate="no"` (ou a classe `notranslate`).
* Sugestão de texto final com marcação de highlight:
  ```html
  <h2 class="reveal-type" translate="no"><span class="text-highlighted">Do arquivo ao acabamento,</span> a CopyCenter ajuda sua ideia a virar material gráfico pronto para circular em Uberlândia.</h2>
  ```
* Se a copy aprovada cabe na seção: Sim, a volumetria está adequada ao espaço visual e não quebrará o ScrollTrigger, desde que tradutores não injetem palavras com larguras não calculadas.
* Riscos técnicos: O erro retornará para qualquer usuário com o Google Tradutor ativado caso a blindagem não seja feita. O GSAP vai animar palavras erradas e o layout poderá vazar os limites.
* Plano recomendado para Session 017.2B:
  1. Executar o Content Swap novamente no `animated-content.html`.
  2. Adicionar o atributo `translate="no"` e/ou a classe `notranslate` na tag `h2.reveal-type`.
  3. (Futuro/Global): Alterar `lang="en"` para `lang="pt-BR"` no `index.html` para resolver de forma definitiva em todo o site.
* Confirmação de que nenhum arquivo do site foi alterado: ✅ Confirmado. Nenhuma modificação foi feita.
