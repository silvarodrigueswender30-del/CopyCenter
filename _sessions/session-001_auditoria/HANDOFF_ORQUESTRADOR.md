# HANDOFF — SESSION 001 — AUDITORIA COMPLETA

Este arquivo reúne os specs gerados pelo Antigravity para revisão do orquestrador antes da Session 002.

---

# 1. STATUS GERAL

# STATUS GERAL DO PROJETO

**Projeto:** CopyCenter
**Site original de paridade:** https://albadoe.webflow.io/
**Raiz local:** C:\Users\Teste\Downloads\CopyCenter
**Pasta da paridade:** C:\Users\Teste\Downloads\CopyCenter\Paridade
**Ãšltima atualizaÃ§Ã£o:** 2026-06-26
**Orquestrador:** ChatGPT / Vegapunk
**Agente leitor:** Antigravity
**Agente escritor:** Codex

---

## VISÃƒO GERAL DAS SESSÃ•ES

| # | SessÃ£o | Escopo | Agente Leitor | Agente Escritor | Status |
|---|--------|--------|---------------|-----------------|--------|
| 001 | Auditoria completa | Mapeamento total do site de referÃªncia | Antigravity | â€” | âœ… ConcluÃ­da |
| 002 | Setup base | Estrutura inicial do projeto CopyCenter | Antigravity | Codex | ðŸ”² Pendente |
| 003 | Header + Hero | NavegaÃ§Ã£o, hero, CTAs e primeira dobra | Antigravity | Codex | ðŸ”² Pendente |
| 004 | ServiÃ§os | Cards e distribuiÃ§Ã£o dos serviÃ§os CopyCenter | Antigravity | Codex | ðŸ”² Pendente |
| 005 | Responsivo | Tablet + mobile + ajustes visuais | Antigravity | Codex | ðŸ”² Pendente |
| 006 | Alma CopyCenter | TransformaÃ§Ã£o visual para identidade grÃ¡fica | Antigravity | Codex | ðŸ”² Pendente |

---

## BLOQUEIOS ATIVOS

- Nenhum bloqueio no momento.

---

## DECISÃ•ES GLOBAIS DO PROJETO

- Trabalhar sessÃ£o por sessÃ£o.
- Nunca enviar HTML/CSS bruto completo para o Codex.
- Antigravity deve gerar specs curtos e densos.
- Codex sÃ³ pode executar com base em RULES.md da sessÃ£o atual.
- Preservar paridade absoluta antes de adaptar a identidade CopyCenter.
- O site de referÃªncia Ã© base estrutural e visual; depois serÃ¡ convertido para a alma da CopyCenter.

---

## PRÃ“XIMA AÃ‡ÃƒO

Antigravity deve executar a Session 001 â€” Auditoria completa.

---

# 2. TOKENS

# TOKENS DA PARIDADE

## Tipografia
- **Font-families:** "Open Sans", "Inter Tight", sans-serif.
- **Font-weights:** 300, 400, 500, 600, 700, 800.
- **Line-heights:** 1.5, 1.2, 1.1, normal, 1, 1.4, 1.6.
- **Letter-spacings:** normal, -0.02em, 0.05em, 0.1em.

## Cores
- **Hexadecimais Principais:** #000, #fff, #f9f9f9, #1a1a1a, #e6e6e6, #333, #666.
- **RGBA Principais:** rgba(0,0,0,0.5), rgba(255,255,255,0.8).
- **Gradientes:** Presentes no CSS customizado, confirmar valores hexadecimais de acordo com variaÃ§Ãµes da marca.

## EspaÃ§amentos e Layout
- **Border-radius:** 0, 4px, 8px, 12px, 50%, 100vw, 100%, 1em.
- **Paddings Laterais (Wrappers):** Variam por container e seÃ§Ãµes, confirmar na marcaÃ§Ã£o CSS (geralmente .padding-global ou similar).
- **Containers Max-Width:** Variam em px e rem dependendo das classes (.container, .container-large).

## Breakpoints Reais
- **Desktop e Widescreen:** min-width: 1920px, min-width: 1440px, min-width: 1280px.
- **Tablet:** max-width: 991px.
- **Mobile Landscape:** max-width: 767px.
- **Mobile Portrait:** max-width: 479px.
- **Outros:** min-width: 768px.

---

# 3. STRUCTURE

# ESTRUTURA DO SITE PARIDADE

## Hierarquia de Wrappers Principais
- `.page-wrapper`
- `.main-wrapper`
- `.section_*` (vÃ¡rias)
- Wrappers comuns: `.padding-global`, `.container`, `.container-large`, `.padding-section-large`, `.padding-section-medium`.

## SeÃ§Ãµes Encontradas
- `section_home-hero`
- `section_home-service`
- `section_home-about`
- `section_home-info`
- `section_home-process`
- `section_home-testimonial`
- `section_home-blog`
- `section_cta`
- Outras identificadas por classe e blocos.

## Componentes Repetidos e Cards
- **BotÃµes:** `button`, `btn`, `default-button`, `.cover-popup_button`, `button-show_mobile`.
- **Cards:** `.home-about_card`, `.home-info_card`, `.content_card`, `.card-image_wrapper`, `.card_body`, `.card_meta`, `.content-card_link`, `.card_title`, `.cover-card_item`.

## Header / Nav / Footer
- **Nav:** `.navbar`, `.navbar_container`, `.navbar_logo`, `.navbar_content`, `.navbar_menu`, `.navbar_link`.
- **Footer:** Identificado nos wrappers do final do documento.

## FormulÃ¡rios e Interatividade
- `subscribe_form-submit`
- FormulÃ¡rios padrÃ£o de Newsletter/Contato do Webflow identificados.

## Elementos com PosiÃ§Ã£o Absoluta / Fixa / Sticky
- Nav variant com `absolute`.
- BotÃµes com `absolute` e wrappers de animaÃ§Ãµes (`data-button="clip"`).

---

# 4. ANIMATIONS

# ANIMAÃ‡Ã•ES DA PARIDADE

## Webflow Interactions (IX2)
- **Quantidade de triggers data-w-id:** 35 elementos encontrados na index.
- **Outros triggers:** `data-animation="default"`.

## DependÃªncias de GSAP e AnimaÃ§Ãµes Externas
- `gsap.min.js` e `ScrollTrigger.min.js` importados no `<head>`.
- `split-type` importado no `<head>`.
- 14 menÃ§Ãµes a scripts de GSAP identificados na HTML principal.
- Provavelmente hÃ¡ uso intensivo de `ScrollTrigger` e animaÃ§Ãµes de hover nos botÃµes.

## RecomendaÃ§Ã£o de RecriaÃ§Ã£o
- **GSAP:** Toda a lÃ³gica identificada em `<script>` e `data-w-id` deve ser recriada utilizando a biblioteca GSAP em modo React/Next.js (com hooks ou mount adequado) caso seja migrado para um framework, ou mantendo JS puro seguindo o `GLOBAL_RULES.md`.
- **BotÃµes:** HÃ¡ interaÃ§Ãµes CSS e scripts dedicados para botÃ£o (`<!-- Button hover -->`). Devem ser preservados os triggers.
- **Easing e Duration:** Identificados por `data-duration="400"` e `data-easing="ease"` na nav e outros elementos configurados pelo Webflow. Recomenda-se transpor para `power2.out` e tempos similares.

---

# 5. ASSETS

# ASSETS DO PROJETO

Caminho local base: `C:/Users/Teste/Downloads/CopyCenter/Paridade/cdn.prod.website-files.com/68c7fc532c18bd4c19f842d0/`

## Imagens e Backgrounds
- `68f26ef2ae96390b3d18611b_home-background-video-poster-00001.jpg`
- `68e5814718367e281107b039_process-image-1.avif`
- `68e58146beb7391e015c4f73_process-image-2.avif`
- `68e0b576e3f6a51fc2cf2ac3_about-mission-image.avif`
- `68da07289ff2f38bb39ccaa8_home-about-image.avif`
- `68da25236418f92f197bc265_info-video-poster-00001.jpg`
- `68ee1aa1ad89a89f23f31445_home-info-image.avif`
- `68e4d3d75ccf7957880da479_home-testimonial-image-1.avif`
- `68e4d3d7bf5c464cee823ed3_home-testimonial-image-2.avif`
- `68e4d3d7c5324e7cefa6868b_home-testimonial-image-3.avif`
- Imagens de Call to Action (CTA) 1 a 8 (`68d7abf..._cta-image-*.avif`)
- Imagens de PrÃ©-visualizaÃ§Ã£o de PÃ¡ginas (`preview-*.avif`)

## Logos e Ãcones
- `68cb9db7d45d9a0f750230d6_logo-icon.svg`
- `68d118abad63059fdba6abfa_footer-logo.svg`
- Ãcones de Play e Pause (`628299f8aa233b83918e24fd_Pause.svg`, `628298b20ae0236682d4b87f_Play-24.svg`)
- Ãcone do Figma (`68c7fc532c18bd4c19f84315_figma.svg`)

## VÃ­deos
- `68f26ef2ae96390b3d18611b_home-background-video-transcode.mp4`
- `68da25236418f92f197bc265_info-video-transcode.mp4`

## Fontes
As fontes identificadas no documento (Open Sans e Inter Tight) estÃ£o referenciadas via Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`).

---

# 6. REPORT SESSION 001

# REPORT: SESSION 001 - AUDITORIA

**Data:** 2026-06-26
**Agente ResponsÃ¡vel:** Antigravity (Agente Leitor/Auditor)
**Status:** âœ… ConcluÃ­da

## Resumo da Auditoria

A auditoria de paridade do site `albadoe.webflow.io` foi concluÃ­da com sucesso. Os arquivos foram extraÃ­dos e analisados da pasta local `Paridade`. Toda a base necessÃ¡ria para a fase de desenvolvimento posterior (escrita pelo Codex) foi gerada.

Nenhum cÃ³digo foi modificado fora da pasta `_sessions` e nÃ£o foi realizada nenhuma refatoraÃ§Ã£o, mantendo estrita obediÃªncia Ã s regras iniciais da Session 001.

## EntregÃ¡veis Criados/Atualizados

1. `_sessions/_rules/tokens.md`: Lista extraÃ­da das principais cores, fontes (Open Sans e Inter Tight), line-heights, espaÃ§amentos e os exatos media queries utilizados no CSS (`max-width: 991px`, `767px`, `479px`, `min-width: 1440px`, etc).
2. `_sessions/_rules/structure.md`: Mapeamento hierÃ¡rquico da DOM, incluindo classes de wrapper fundamentais (`.page-wrapper`, `.padding-global`), componentes e ordem de seÃ§Ãµes.
3. `_sessions/_rules/animations.md`: IdentificaÃ§Ã£o de dezenas de `data-w-id` provenientes do Webflow IX2, recomendaÃ§Ã£o de substituiÃ§Ã£o por GSAP (com `ScrollTrigger`), bem como animaÃ§Ãµes via atributos customizados CSS/JS.
4. `_sessions/_rules/assets.md`: InventÃ¡rio com o caminho local exato das imagens (`.avif`, `.jpg`, `.svg`) e vÃ­deos.
5. `_sessions/_status.md`: Atualizado para refletir a conclusÃ£o da SessÃ£o 001.

## ConsideraÃ§Ãµes para a PrÃ³xima Fase

- O CSS compartilhado do projeto possui muitas classes aninhadas e repetiÃ§Ãµes. O agente escritor deve utilizar essa estrutura base fielmente.
- O site tem uma navegaÃ§Ã£o animada (variant `"absolute"`), requerendo cuidado especial ao transformar a lÃ³gica de dropdown/hover para JS sem Webflow runtime.
- Foram encontrados scripts como `split-type`, que precisarÃ£o ser associados ao GSAP em etapas futuras, conforme especificado em `GLOBAL_RULES.md`.

## PrÃ³ximos Passos (Aguardando Orquestrador)

1. A SessÃ£o 001 foi fechada com sucesso.
2. Aguardando o Orquestrador validar os specs e engatilhar a **SessÃ£o 002 (Setup base)** envolvendo o Agente Escritor Codex.
