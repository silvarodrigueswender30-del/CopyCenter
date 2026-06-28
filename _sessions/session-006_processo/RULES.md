# SESSION-006 — Processo

Objetivo:
Implementar a próxima seção de Processo / Steps / Workflow do site de referência logo abaixo da seção Serviços, preservando paridade estrutural, visual, classes Webflow, wrappers, textos, imagens, estados e comportamento base.

Escopo permitido para o Codex:
- Ler specs globais.
- Ler reports das sessões anteriores.
- Ler reference-body.html.
- Identificar o nome exato da seção de processo no markup.
- Extrair somente a seção de Processo.
- Criar fragmento separado, se fizer sentido:
  - SITE-COPYCENTER/public/process.html
- Integrar a seção imediatamente após Services.
- Preservar classes Webflow.
- Preservar wrappers críticos.
- Preservar data-w-id.
- Preservar textos originais.
- Preservar imagens originais.
- Preservar links originais.
- Usar custom.css apenas para correções mínimas e documentadas.
- Implementar motion apenas se for necessário e autorizado pelo spec.
- Garantir que Header, Hero, Logos, Content e Services continuem intactos.
- Garantir build.
- Criar REPORT.md.
- Atualizar _status.md.

Fora de escopo:
- Não adaptar para CopyCenter.
- Não trocar textos.
- Não trocar imagens.
- Não trocar cores.
- Não alterar Header.
- Não alterar Hero.
- Não alterar Hero Motion.
- Não alterar Logos/Content/Services.
- Não alterar responsivo aprovado.
- Não mexer em webflow-base.css.
- Não remover wrappers.
- Não renomear classes.
- Não implementar seções abaixo do Processo.
- Não iniciar Alma CopyCenter.
- Não mexer em deploy/SEO.

Regras técnicas:
- Preservar estrutura Webflow.
- Não remover divs vazias.
- Não normalizar espaçamentos.
- Não converter unidades.
- Não alterar breakpoints.
- Se houver inline style de IX2 invisível, documentar e recomendar solução mínima.
- Se houver tabs/steps/interação, identificar dependência do Webflow JS.
- Não alterar seções já aprovadas.
- Build deve passar.

Critério de conclusão:
A Session 006 só será concluída se:
- A seção Processo aparecer abaixo de Serviços.
- Header/Hero/Logo/Content/Services continuarem funcionando.
- Layout da seção Processo estiver visualmente próximo da referência.
- Textos, imagens e classes originais forem preservados.
- Build passar.
- REPORT.md documentar arquivos alterados, riscos e fora de escopo.
