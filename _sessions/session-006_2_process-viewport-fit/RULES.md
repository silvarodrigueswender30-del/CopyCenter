# SESSION-006.2 — Process Viewport Fit / Sticky Calibration

Objetivo:
Corrigir somente o encaixe visual desktop da seção Processo após a implementação do motion GSAP, garantindo que card, texto, tags, CTA e imagem caibam no viewport em zoom 100%, sem alterar HTML, textos, imagens, classes Webflow ou comportamento mobile/tablet.

Escopo permitido para o Codex:
- Ler reports das sessões 006 e 006.1.
- Ler process.html.
- Ler processMotion.js.
- Ler custom.css.
- Ler webflow-base.css.
- Ajustar somente custom.css e, se necessário, parâmetros mínimos de processMotion.js.
- Preservar HTML.
- Preservar webflow-base.css.
- Preservar seções anteriores.
- Preservar tablet/mobile.
- Garantir build.
- Criar REPORT.md.
- Atualizar _status.md.

Fora de escopo:
- Não adaptar para CopyCenter.
- Não trocar textos.
- Não trocar imagens.
- Não trocar cores.
- Não alterar process.html.
- Não alterar webflow-base.css.
- Não remover wrappers.
- Não renomear classes.
- Não mexer em Header/Hero/Logo/Content/Services.
- Não mexer em mobile/tablet se estão ok.
- Não refazer a timeline do zero.
- Não usar solução global agressiva.

Regras técnicas:
- Corrigir apenas problema visual comprovado.
- Priorizar ajustes de altura, sticky top, escala interna, overflow e layout desktop.
- Usar media query desktop: min-width 992px.
- Considerar também altura do viewport, por exemplo max-height: 760px, 700px, se necessário.
- Não usar zoom CSS global.
- Não usar transform scale global na seção inteira.
- Não usar body overflow-x hidden como solução principal.
- Não quebrar ScrollTrigger.
- Não quebrar scrub/reverse.
- Não quebrar tablet/mobile.
- Build deve passar.

Critério de conclusão:
A Session 006.2 só será concluída se:
- Em desktop 100%, o card de processo couber visualmente melhor no viewport.
- O texto não ficar amontoado.
- Tags e CTA não sobrepuserem o parágrafo.
- Imagem principal aparecer de forma legível.
- A seção continuar com motion scroll-driven.
- Mobile/tablet continuarem intactos.
- Build passar.
