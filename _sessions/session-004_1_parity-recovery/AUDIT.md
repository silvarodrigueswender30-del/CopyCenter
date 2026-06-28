# SESSION 004.1 — PARITY RECOVERY AUDIT

## 1. Status da auditoria
Concluída. A auditoria identificou lacunas de paridade estrutural e de motion design. Nenhum arquivo foi modificado no decorrer desta análise.

## 2. Lista das seções ausentes entre Hero e Serviços
As seguintes seções da referência original (Webflow) não constam no projeto local:
- `.section_logo` (Carrossel/marquee de logos)
- `.section_content` (Texto animado com scrub no scroll)

## 3. Ordem DOM correta conforme referência
A estrutura hierárquica imutável dentro de `<main class="main-wrapper">` deve ser:
1. `<header class="section_hero">`
2. `<section class="section_logo">`
3. `<section class="section_content">`
4. `<section class="section_service">`

## 4. Mapa da seção de logos/marquee constante
- **Classe principal:** `.section_logo`
- **Wrappers internos:** `.logo_list`, `.logo_item`, `.logo-item_inner`, `.logo_single`, `.logo_image`
- **Classes Webflow:** Devem ser mantidas exatamente como na referência.
- **Atributos `data-*` e `data-w-id`:** A section raiz possui `data-w-id="80a35acb-8401-b632-974f-ebd5cd300fcf"`.
- **Assets usados:** Arquivos vetoriais inseridos via SVGs inline (incorporados como `.w-embed`).
- **Método de animação:** Utiliza o Webflow IX2 (interaction core). A animação contínua (loop/marquee) não é controlada por `@keyframes` no CSS base. Depende do `data-w-id` atrelado e da duplicação dos nós `.logo_item` no HTML para simular um carrossel sem fim.

## 5. Mapa da seção de texto animado no scroll
- **Classe principal:** `.section_content`
- **Wrappers internos:** `.section-padding.padding-200x200`, `.container-large`, `.text-align-center`, `.home-content_wrap`
- **Texto original:** `<h2 class="reveal-type"><span class="text-highlighted">At Albadoe,</span> We Believe A Clean Home Goes Beyond Appearances It's About How It Makes You Feel</h2>`
- **Atributos `data-*` e `data-w-id`:** Nenhum atributo especial ou `data-w-id` nativo na marcação base.
- **Dependências de GSAP e afins:** Na referência original, esta animação conta com scripts isolados importados via CDN:
  - GSAP Core (`gsap.min.js`)
  - ScrollTrigger (`ScrollTrigger.min.js`)
  - SplitType (`split-type`)
- **Ordem de carregamento necessária:** GSAP e ScrollTrigger devem ser importados, o plugin registrado `gsap.registerPlugin(ScrollTrigger)`, e após o layout montar completamente (e fontes prontas via `document.fonts.ready`), rodar `new SplitType('.reveal-type')` seguido da animação `gsap.from()`.

## 6. Diagnóstico da seção de Serviços atual
A seção `section_service` extraída para o `SITE-COPYCENTER/public/services.html` está de fato com paridade estrutural HTML:
- A estrutura base é idêntica à referência original.
- Todos os wrappers originais (inclusive Webflow CMS default como `.w-dyn-list`, `.w-dyn-item`) estão presentes.
- O atributo `data-w-id="290906c4-085e-7dae-1a15-2acb98951675"` do cabeçalho da seção foi preservado.
- As classes e suas hierarquias estão corretas (ex: `.section_header-title.home-service` etc).

## 7. Diagnóstico do hover zoom das imagens
- O efeito de escala (zoom nas imagens) atrelado a `.image-animation_trigger` > `.image-animation_scale` > `.service-collection_item-image` não está resolvido por um seletor `:hover` no `webflow-base.css` puro.
- Trata-se de uma interação Webflow IX2 clássica atrelada diretamente à classe `.image-animation_trigger`. Na migração, sem o `webflow.js` atuando nessas classes, o hover será inexistente, exigindo fallback via CSS puro ou implementação via React/GSAP no futuro.

## 8. Classes obrigatórias a preservar
Todas as classes originais em ambas as seções ausentes e na de serviços, em especial as de trigger lógico e diagramação:
`.section_logo`, `.logo_list`, `.logo_item`, `.section_content`, `.reveal-type`, `.image-animation_trigger`, `.image-animation_scale`.

## 9. Atributos `data-*` e `data-w-id` obrigatórios
- `data-w-id="80a35acb-8401-b632-974f-ebd5cd300fcf"` em `.section_logo`
- `data-w-id="290906c4-085e-7dae-1a15-2acb98951675"` em `.section_header` de serviços.

## 10. Scripts ou dependências necessários
Para viabilizar a paridade completa, será necessário portar a lógica de script contida no final do `reference-body.html`:
- A dependência de `SplitType` (`unpkg.com/split-type`) para lidar com a quebra de nós em letras/palavras.
- As bibliotecas `gsap` e `ScrollTrigger`.
- Uma cópia funcional da rotina da animação `.reveal-type`.

## 11. Assets necessários
- Todos os `SVGs` embutidos do Webflow contidos na `.section_logo`. Nenhum arquivo `.png` ou `.svg` externo é chamado para esse bloco, toda renderização é DOM inline.

## 12. Diferenças entre referência e projeto local
- Omissão completa de blocos vitais (`.section_logo` e `.section_content`) entre o Hero e os Serviços.
- Foi identificado um código ofensivo em `custom.css`:
  ```css
  .section_service .section_header {
      opacity: 1 !important;
      filter: none !important;
      transform: none !important;
  }
  ```
  Este código previne falhas de invisibilidade já que o IX2 não estava ativado, no entanto ele mata irrevogavelmente a intenção real de animação original, impedindo paridade de motion.

## 13. Riscos de quebra se houver rename/refatoração
- Tentar limpar/simplificar `.logo_item` compromete o design de repetição infinita.
- Alterar o nome `.reveal-type` ou manipular indevidamente seus parágrafos filhos fará o SplitType gerar blocos corrompidos, engessando o ScrollTrigger e a revelação do texto.
- Remover os `data-w-id` dificultará ou impossibilitará refazer as animações 1:1 sem reconstruir toda a lógica CSS de transição e delays.

## 14. Plano mínimo de execução para o Codex na próxima etapa
1. Criar os fragmentos estáticos em arquivos HTML isolados (`logo-marquee.html` e `animated-content.html`).
2. Configurar o `App.jsx` para realizar o fetch desses novos arquivos HTML em paralelo ou incluí-los sequencialmente antes da `services.html`.
3. Inserir a rotina de runtime do SplitType + GSAP via arquivo `scripts/` correspondente para a `.section_content`.
4. Remover a anulação de estilos de `.section_service .section_header` do `custom.css` ao reativar as lógicas.

## 15. Confirmação
Fica confirmado que, seguindo estritamente as restrições impostas, **nenhum código de implementação foi escrito** e **nenhum arquivo do projeto foi modificado**. Trata-se de uma averiguação de leitura, constatação de ausência de paridade, e listagem do que o sistema precisa recuperar no escopo da Sessão 004.1.
