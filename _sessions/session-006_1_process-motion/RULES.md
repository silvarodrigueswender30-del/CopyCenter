# SESSION-006.1 — Process Motion GSAP

Objetivo:
Recriar em desktop, com GSAP ScrollTrigger, o comportamento scroll-driven da seção Processo do Webflow, preservando estrutura, textos, imagens, classes, responsivo e fallback tablet/mobile.

Escopo permitido para o Codex:
- Ler specs globais.
- Ler Session 006.
- Ler process.html.
- Ler custom.css.
- Ler webflow-base.css.
- Criar script dedicado:
  - SITE-COPYCENTER/src/scripts/processMotion.js
- Integrar o script no App.jsx.
- Ajustar custom.css apenas para reativar o regime desktop scroll-driven e remover/neutralizar overrides estáticos da Session 006 quando JS estiver ativo.
- Animar somente elementos dentro de .section_process.
- Preservar tablet/mobile nativo em ≤991px.
- Preservar todas as seções anteriores.
- Garantir build.
- Criar REPORT.md.
- Atualizar _status.md.

Fora de escopo:
- Não adaptar para CopyCenter.
- Não trocar textos.
- Não trocar imagens.
- Não trocar cores.
- Não alterar process.html, salvo se absolutamente indispensável e reportado como bloqueio.
- Não alterar webflow-base.css.
- Não alterar Header/Hero/Logo/Content/Services.
- Não alterar scripts já aprovados.
- Não mexer em responsivo tablet/mobile.
- Não iniciar próximas seções.
- Não mexer em SEO/deploy.

Regras técnicas:
- Usar GSAP ScrollTrigger.
- Escopar tudo em .section_process.
- Ativar motion apenas em desktop: min-width 992px.
- Em ≤991px, não criar ScrollTrigger para Processo.
- Respeitar prefers-reduced-motion.
- Fazer cleanup com ctx.revert().
- Não duplicar triggers.
- Não usar markers.
- Não quebrar layout estático caso JS falhe.
- Não remover estrutura Webflow.
- Não animar fora da seção Processo.
- Manter build passando.

Critério de conclusão:
A Session 006.1 só será concluída se:
- Desktop tiver comportamento scroll-driven funcional.
- Step 1, 2 e 3 alternarem durante o scroll.
- Imagens alternarem coerentemente.
- Tags indicarem step ativo.
- Tablet/mobile permanecerem intactos.
- Seções anteriores permanecerem intactas.
- Build passar.
- REPORT.md documentar tudo.
