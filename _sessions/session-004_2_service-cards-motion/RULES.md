# SESSION-004.2 — Service Cards Scroll Motion

Objetivo:
Recriar com GSAP ScrollTrigger apenas a animação de entrada/reversão dos cards da seção Serviços, preservando estrutura, textos, imagens, classes Webflow e hover já existente.

Escopo permitido para o Codex:
- Ler specs globais.
- Ler services.html.
- Ler serviceMotion.js atual.
- Usar GSAP ScrollTrigger apenas na seção Serviços.
- Animar os cards `.service-collection_item`.
- Preservar hover zoom das imagens.
- Preservar entrada do header de Serviços já implementada.
- Preservar Header/Hero/Hero Motion.
- Preservar `.section_logo` e `.section_content`.
- Atualizar REPORT.md.
- Atualizar _status.md.

Fora de escopo:
- Não adaptar para CopyCenter.
- Não trocar textos.
- Não trocar imagens.
- Não trocar cores.
- Não mexer em Header/Hero.
- Não mexer em Hero Motion.
- Não mexer em logo marquee.
- Não mexer em texto animado.
- Não mexer em responsivo amplo.
- Não alterar webflow-base.css.
- Não remover wrappers.
- Não renomear classes.
- Não mexer em deploy ou SEO.

Regras técnicas:
- Usar ScrollTrigger apenas escopado em `.section_service`.
- Não usar markers.
- A animação deve funcionar ao descer e ao subir.
- Preferir `toggleActions` com `reverse`.
- Usar stagger suave.
- Usar `opacity`, `y` e `filter`/blur se compatível.
- Não quebrar hover scale das imagens.
- Respeitar prefers-reduced-motion.
- Fazer cleanup correto (ctx.revert()).
- Não duplicar triggers.
- Documentar tudo no REPORT.md.

Entregáveis:
- Cards de Serviços surgem no scroll.
- Cards revertem ao subir.
- Header de Serviços continua animando.
- Hover dos cards continua funcionando.
- Build passa.
- REPORT.md criado.
- _status.md atualizado.

Critério de conclusão:
A Session 004.2 só será concluída se:
- Header/Hero continuarem intactos.
- Seções logo/content continuarem intactas.
- Serviços aparecer corretamente.
- Cards animarem ao entrar no viewport.
- Cards reverterem ao sair/voltar.
- Build passar.
- REPORT.md documentar arquivos alterados.
