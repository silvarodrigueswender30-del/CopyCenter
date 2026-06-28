# SESSION-005 — Responsivo

Objetivo:
Ajustar somente problemas responsivos reais do trecho atual do site, preservando paridade Webflow, estrutura, classes, textos, imagens, motion e breakpoints originais.

Escopo permitido para o Codex:
- Ler specs globais.
- Ler reports das sessões 003, 003.1, 004, 004.1 e 004.2.
- Ler fragments atuais.
- Ler CSS base Webflow.
- Ler custom.css.
- Aplicar correções mínimas e documentadas no custom.css.
- Ajustar JS apenas se houver bug responsivo crítico causado por motion.
- Preservar Header, Hero, Logo, Content e Services.
- Garantir build.
- Criar REPORT.md.
- Atualizar _status.md.

Fora de escopo:
- Não adaptar para CopyCenter.
- Não trocar textos.
- Não trocar imagens.
- Não trocar cores.
- Não alterar webflow-base.css.
- Não reestruturar HTML.
- Não remover wrappers.
- Não renomear classes.
- Não alterar conteúdo.
- Não refatorar App.jsx sem necessidade.
- Não mexer em deploy.
- Não mexer em SEO.
- Não criar novas seções.
- Não iniciar Session 006.

Regras técnicas:
- Corrigir apenas problemas comprovados.
- Priorizar CSS já existente do Webflow.
- Usar custom.css apenas para overrides mínimos.
- Não usar !important salvo se necessário e documentado.
- Não alterar breakpoints Webflow sem justificativa.
- Não criar media queries redundantes se o webflow-base.css já resolve.
- Não tocar em motion aprovada salvo bug real.
- Preservar prefers-reduced-motion.
- Garantir que não exista overflow horizontal.
- Garantir que o build passe.

Critério de conclusão:
A Session 005 só será concluída se:
- Desktop continuar intacto.
- Tablet estiver funcional.
- Mobile landscape estiver funcional.
- Mobile portrait estiver funcional.
- Não houver overflow horizontal.
- Header/Hero/Logos/Content/Services continuarem aparecendo.
- Motion não quebrar.
- Build passar.
- REPORT.md documentar alterações e validações.
