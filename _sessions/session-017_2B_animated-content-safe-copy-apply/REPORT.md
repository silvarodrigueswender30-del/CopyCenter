# REPORT — SESSION-017.2B — Animated Content Safe Copy Apply

* Status: CONCLUÍDA ✅
* Causa corrigida: A tradução automática (Google Tradutor) destruía as tags `<div class="char">` do SplitType porque estava interpretando cada caractere como uma palavra inglesa (por causa do `lang="en"` original da página).
* O que foi alterado: A copy correta da CopyCenter foi aplicada ao componente Animated Content, e os atributos anti-tradução (`translate="no"` e `class="notranslate"`) foram adicionados no `h2` principal.
* HTML final aplicado no h2.reveal-type:
  ```html
  <h2 class="reveal-type notranslate" translate="no"><span class="text-highlighted">Do arquivo ao acabamento,</span> a CopyCenter ajuda sua ideia a virar material gráfico pronto para circular em Uberlândia.</h2>
  ```
* Confirmação de que translate="no" foi aplicado: ✅ Confirmado.
* Confirmação de que notranslate foi aplicado: ✅ Confirmado.
* Confirmação de que span.text-highlighted foi preservado: ✅ Confirmado.
* Confirmação de que scrollTextMotion.js não foi alterado: ✅ Confirmado.
* Confirmação de que CSS não foi alterado: ✅ Confirmado.
* Confirmação de que somente animated-content.html foi alterado: ✅ Confirmado.
* Resultado do build: ✅ Passou (3.10s).
* URL local usada: `http://localhost:5174/`
* Status com tradução automática: Estável. O tradutor do Chrome ignora completamente a tag, preservando as palavras e os `.char` intactos, eliminando de vez o bug do "umrqueuvo".
* Status desktop: Animação GSAP/ScrollTrigger perfeita, com revelação caractere a caractere preservada.
* Status mobile: Responsividade mantida, quebras de linha fluindo sem estourar o layout.
* Pendências restantes: Alteração global da propriedade `lang` no componente principal, assim que a sessão de SEO Head for autorizada.
* Próxima sessão recomendada: **Session 017.3 — Content Swap Services & Process**
