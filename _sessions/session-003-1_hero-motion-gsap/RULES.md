# SESSION-003.1 — Hero Motion GSAP

Objetivo:
Recriar com GSAP apenas as animações essenciais da Hero Section do site de referência, preservando estrutura, classes, textos, imagens e identidade visual original da paridade.

Escopo permitido para o Codex:
- Ler specs globais.
- Ler Header/Hero já implementado.
- Instalar/configurar GSAP se necessário.
- Usar GSAP com escopo seguro.
- Recriar entrada da `.home-hero_content`.
- Recriar animação dos 3 `.hero-moving_element`.
- Substituir o override estático de `opacity/filter/transform` por animação controlada via GSAP, se seguro.
- Manter fallback visual caso JS falhe.
- Preservar `data-w-id`.
- Preservar classes Webflow.
- Preservar wrappers.
- Atualizar REPORT.md.
- Atualizar _status.md.

Fora de escopo:
- Não adaptar para CopyCenter.
- Não trocar textos.
- Não trocar imagens.
- Não trocar cores.
- Não mexer na seção de serviços.
- Não mexer em seções abaixo da Hero.
- Não recriar todas as animações do site.
- Não implementar ScrollTrigger global.
- Não refatorar layout.
- Não remover wrappers.
- Não mexer em deploy.
- Não otimizar SEO.

Regras técnicas:
- Usar GSAP somente para Hero.
- Não usar markers em produção.
- Não depender do Webflow IX2.
- Preservar atributos `data-w-id`.
- Se usar React, manter cleanup correto.
- Se usar timers/RAF, limpar no unmount.
- Se usar animação infinita/flutuante, garantir performance.
- Não animar propriedades que causem layout shift pesado.
- Preferir `transform` e `opacity`.
- Respeitar `prefers-reduced-motion`.
- Documentar qualquer override removido ou mantido em custom.css.

Entregáveis:
- Animação de entrada da Hero funcionando.
- Cards flutuantes com movimento visual semelhante ao original.
- Build passando.
- Página local abrindo.
- REPORT.md da Session 003.1.
- _status.md atualizado.

Critério de conclusão:
A Session 003.1 só será concluída quando:
- Header continuar funcionando.
- Hero continuar visível.
- Os 3 cards flutuantes tiverem movimento.
- A entrada da Hero não ficar invisível.
- Build passar.
- REPORT.md registrar arquivos criados/modificados.
- As limitações ficarem documentadas.
