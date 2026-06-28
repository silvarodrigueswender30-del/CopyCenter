# SESSION-002 — Setup Base

Objetivo:
Preparar a base técnica inicial do site CopyCenter a partir da referência Webflow, sem adaptar textos, sem alterar identidade visual e sem implementar animações complexas.

Escopo permitido para o Codex:
- Ler os specs gerados na Session 001.
- Validar a estrutura do projeto final em SITE-COPYCENTER.
- Preservar a pasta .agents.
- Criar estrutura mínima de projeto caso ela ainda não exista.
- Copiar ou referenciar assets essenciais da pasta Paridade para o projeto final.
- Copiar o CSS principal exportado do Webflow para uma camada base do projeto final.
- Criar arquivo JS inicial apenas para bootstrap, sem recriar as 35 animações IX2 ainda.
- Criar uma primeira versão estática baseada no index original, mantendo classes e wrappers críticos.
- Garantir que a base rode localmente.
- Criar REPORT.md da Session 002.
- Atualizar _sessions/_status.md.

Fora de escopo:
- Não adaptar para CopyCenter ainda.
- Não trocar textos.
- Não trocar imagens.
- Não alterar paleta.
- Não refatorar classes Webflow.
- Não remover wrappers vazios.
- Não recriar animações GSAP complexas.
- Não mexer em deploy.
- Não otimizar SEO ainda.
- Não renomear classes sem necessidade.

Regras técnicas:
- Preservar classes Webflow.
- Preservar estrutura de wrappers.
- CSS Webflow deve ser mantido como base.
- CSS customizado, se necessário, deve ficar separado e carregado depois do CSS Webflow.
- Nenhuma animação IX2 deve ser parcialmente refeita nesta sessão.
- Se houver Webflow JS, ele pode ser referenciado apenas para manter comportamento básico, mas não deve ser tratado como solução final de animações.
- Caso o projeto já exista, não sobrescrever arquivos sem backup ou sem registrar no REPORT.md.
- Caso não exista package.json, criar setup mínimo preferencialmente com Vite + React.
- Caso já exista package.json com outro framework, respeitar o framework existente.

Entregáveis obrigatórios da Session 002:
- Projeto final com base inicial rodando.
- CSS Webflow base integrado.
- Assets principais acessíveis.
- Estrutura inicial limpa.
- _sessions/session-002_setup-base/REPORT.md
- _sessions/_status.md atualizado.

Critério de conclusão:
A Session 002 só será concluída quando:
- O projeto rodar localmente.
- A primeira renderização estática carregar sem erro crítico.
- O CSS principal da paridade estiver aplicado.
- O REPORT.md listar arquivos criados/modificados.
- O status for atualizado.
