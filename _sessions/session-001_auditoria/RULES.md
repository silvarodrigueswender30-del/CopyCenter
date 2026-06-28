# SESSION-001 — Auditoria Completa

**Data:** 2026-06-26
**Projeto:** CopyCenter
**Site original de paridade:** https://albadoe.webflow.io/
**Pasta local da paridade:** C:\Users\Teste\Downloads\CopyCenter\Paridade
**Agente leitor:** Antigravity
**Agente escritor:** Nenhum nesta sessão
**Status:** EM EXECUÇÃO

---

## Objetivo desta sessão

Executar uma auditoria completa do site de referência usado para a paridade absoluta, extraindo apenas specs densos e úteis para implementação posterior.

O objetivo NÃO é codar.

O objetivo é gerar documentação técnica curta, organizada e precisa para que o Codex consiga implementar seção por seção sem receber o HTML/CSS bruto completo.

---

## Arquivos em escopo

- C:\Users\Teste\Downloads\CopyCenter\Paridade
- HTML exportado do Webflow
- CSS exportado do Webflow
- JS exportado do Webflow
- Assets/imagens/fontes do site de referência

---

## Fora de escopo desta sessão

- Não criar componentes finais.
- Não adaptar ainda para CopyCenter.
- Não alterar identidade visual.
- Não refatorar código.
- Não substituir imagens.
- Não criar textos finais.
- Não mexer em deploy.

---

## Entregáveis obrigatórios

Criar ou atualizar os seguintes arquivos:

- _sessions/_rules/tokens.md
- _sessions/_rules/structure.md
- _sessions/_rules/animations.md
- _sessions/_rules/assets.md
- _sessions/session-001_auditoria/REPORT.md

---

## O que mapear em tokens.md

- Cores exatas
- Gradientes
- Tipografia
- Tamanhos de H1, H2, H3, body, labels e botões
- Line-height
- Letter-spacing
- Pesos de fonte
- Border-radius
- Sombras
- Container max-width
- Padding lateral
- Padding vertical de seções
- Grid gaps
- Breakpoints reais usados no CSS

---

## O que mapear em structure.md

- Ordem exata das seções
- Nome funcional de cada seção
- Hierarquia dos principais wrappers
- Componentes repetidos
- Cards
- Botões
- Formulários
- Header/nav
- Footer
- Elementos sticky, absolute, fixed ou sobrepostos
- Dependências entre seções

---

## O que mapear em animations.md

- Animações de entrada
- Animações no scroll
- Hover states
- Transições CSS
- Easing
- Duration
- Delay
- Stagger
- Triggers
- Elementos animados
- Se a animação vem de Webflow IX2, CSS ou JS customizado
- Como deve ser recriada em GSAP

---

## O que mapear em assets.md

- Imagens usadas por seção
- Logos
- Ícones
- Backgrounds
- Vídeos, se existirem
- Fontes locais ou externas
- Arquivos críticos que não podem ser removidos
- Caminho local de cada asset dentro da pasta Paridade

---

## Regras específicas

- Não entregar HTML bruto completo.
- Não entregar CSS bruto completo.
- Não sugerir refatoração nesta sessão.
- Não adaptar para CopyCenter ainda.
- Não aproximar valores visuais.
- Copiar valores exatos encontrados no CSS original.
- Caso algo não seja encontrado, marcar como "NÃO CONFIRMADO".
- Separar desktop, tablet, mobile landscape e mobile portrait.
- Gerar specs curtos, técnicos e acionáveis.

---

## Critério de conclusão

A sessão só será considerada concluída quando os arquivos abaixo existirem e estiverem preenchidos:

- tokens.md
- structure.md
- animations.md
- assets.md
- REPORT.md
