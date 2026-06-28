# SETUP PLAN - SESSION 002

## Stack Detectada no SITE-COPYCENTER
Nenhuma estrutura de front-end encontrada. O diretório contém apenas a pasta `.agents`. Não há `package.json`, `src`, ou `public`. 

## Comando Local Recomendado
`npx create-vite@latest . --template react` (ou vanilla, caso a arquitetura definida prefira JS puro, porém React é recomendado pelas diretrizes do Webflow via GSAP). Executar de dentro de `C:\Users\Teste\Downloads\CopyCenter\SITE-COPYCENTER`.

## Arquivos que o Codex DEVE Criar
- Arquivos de configuração gerados pelo Vite (`package.json`, `vite.config.js`).
- Estrutura `src` com `main.jsx` e `App.jsx` (ou index HTML se vanilla).
- Arquivos de estilo para importar o CSS do Webflow (ex: `src/webflow-base.css`).
- Estrutura `public` para armazenar os assets que vieram da paridade.
- `_sessions/session-002_setup-base/REPORT.md`.

## Arquivos que o Codex PODE Modificar
- `_sessions/_status.md` para alterar o status da sessão.
- Arquivos gerados pelo scaffold do Vite (ex: limpar o boilerplace de `App.jsx`, `App.css`).

## Arquivos que o Codex NÃO PODE Modificar
- `C:\Users\Teste\Downloads\CopyCenter\Paridade` e seus subdiretórios (somente leitura).
- Arquivos dentro de `_sessions/_rules/`.
- A pasta oculta `.agents` em `SITE-COPYCENTER`.

## Caminhos da Paridade
- **HTML Original:** `C:\Users\Teste\Downloads\CopyCenter\Paridade\albadoe.webflow.io\index.html`
- **CSS Original:** `C:\Users\Teste\Downloads\CopyCenter\Paridade\cdn.prod.website-files.com\68c7fc532c18bd4c19f842d0\css\albadoe.webflow.shared.ddbf4f6eb.css`
- **Assets Originais:** `C:\Users\Teste\Downloads\CopyCenter\Paridade\cdn.prod.website-files.com\68c7fc532c18bd4c19f842d0\`

## Riscos Técnicos da Session 002
- O CSS possui caminhos relativos para imagens e fontes. O Codex deve corrigir esses paths (`url(...)`) após a cópia para a pasta `public/assets` ou equivalente.
- O HTML original (350KB) pode quebrar as ferramentas se inserido de uma vez em um componente React. Recomendado extrair pedaços menores (Header, Hero, etc) com `dangerouslySetInnerHTML` ou conversão cuidadosa para JSX, mas mantendo estrito controle sobre classes (`class` -> `className`).
- As tags originais de vídeo e imagens devem carregar localmente sem depender do CDN original.
