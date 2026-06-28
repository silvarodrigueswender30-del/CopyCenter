# RESPONSIVE AUDIT SPEC - SESSION 005

## 1. Diagnóstico geral
O código CSS original (`webflow-base.css`) já possui regras avançadas para todos os breakpoints (`max-width: 991px`, `767px` e `479px`). A paridade de marcação garante que o layout flua naturalmente na maior parte dos casos. O foco da auditoria e correção deve estar em bugs gerados pela ausência do Webflow JS nativo ou conflitos com as soluções customizadas recém-implementadas (GSAP, marquee CSS).

## 2. Análise Desktop 1280px+
- Deve comportar-se exatamente como a referência original.
- **Risco**: Margens muito amplas ou desalinhamentos em monitores ultrawide se os containers `.container-large` não possuírem um `max-width` e `margin: 0 auto` funcionais.
- A princípio, nenhuma correção exigida.

## 3. Análise Tablet 768–991px
- As media queries de `991px` no Webflow mudam comportamentos chave: os cards flutuantes da Hero recebem `display: none` e o menu da Navbar passa a ser escondido atrás do hamburger.
- **Ponto de auditoria**: Confirmar se o `.hero-moving_element` realmente desaparece. Confirmar se o menu hamburger (classe `.menu-button` ou similar) aparece e se o click tem funcionalidade amarrada no React ou Webflow JS local.

## 4. Análise Mobile Landscape 480–767px
- Breakpoint de transição crítica. Grids de Serviços costumam quebrar para 1 ou 2 colunas.
- **Ponto de auditoria**: `.collection-list` da section_service deve estar adaptando as colunas corretamente.
- Texto animado de `.section_content` pode ser muito grande, confirmar se o `font-size` reage adequadamente via clamp/vw ou breakpoints.

## 5. Análise Mobile Portrait até 479px
- Breakpoint mais estreito.
- **Ponto de auditoria**: Overflow horizontal. Paddings excessivos nas laterais (`.padding-0x160`, `.padding-200x200`) podem vazar a tela se não controlados.

## 6. Header/Navbar
- **Desktop**: Funcional. Menu por extenso.
- **Tablet/Mobile**: Menu hamburger (`.w-nav-button`) se torna visível. 
- **Dependências Webflow**: A abertura e fechamento do menu no Webflow exige `webflow.js`. Sem ele, clicar no botão não fará o nav-menu (`.w-nav-menu`) aparecer, exigindo que Codex valide se a navegação mobile está operante.

## 7. Hero
- **H1 e CTAs**: Devem empilhar e diminuir fonte via CSS original.
- **Vídeo/background**: `.home-hero_video` e background fallback garantem preenchimento total.
- **Cards flutuantes**: Ocultados abaixo de 991px (`display: none` original). Não tentar mostrá-los.
- **Play/pause**: Deve se manter dentro do wrapper.
- **Motion**: A animação GSAP original roda sobre um DOM adaptado; certificar que as alturas e offsets não causam bugs.

## 8. Section Logo
- **Marquee e Logos**: O `custom.css` já define a animação `@keyframes copycenter-logo-marquee`.
- **Largura e Overflow**: Validar se o marquee não causa barra de rolagem horizontal (garantir `overflow: hidden` na raiz `.section_logo` ou `.logo_list`). O hover `animation-play-state: paused` no mobile é irrelevante, mas não quebra o design.

## 9. Section Content
- **Texto animado**: A quebra via `SplitType` gera divs adicionais. No mobile, se as palavras quebrarem muito justas (hyphens), o SplitType pode causar pequenos saltos visuais. 
- **Legibilidade mobile**: O GSAP não deve impedir o scroll. `ScrollTrigger.refresh()` atua bem nos resizes, o comportamento base deve estar ok.

## 10. Section Services
- **Header**: Elementos podem encavalar se as fontes forem enormes.
- **Grid/lista**: `.collection-list` passa a `1fr`.
- **Cards/Imagens**: `width: 100%` necessário.
- **Scroll motion**: A lógica GSAP do `.service-collection_item` usa o viewport; funciona indiferente da resolução.
- **Hover touch**: Em dispositivos móveis (touch), o hover (`transform: scale(1.045)`) das imagens adicionado no `custom.css` pode ficar "preso" após o toque. Recomenda-se adicionar a query `@media (hover: hover)` para a regra de scale, se necessário.

## 11. Riscos técnicos
1. NavBar paralisada: O Webflow esconde o `.w-nav-menu` abaixo de `991px`. Sem JS para controlar o `.w--open`, os links ficam inacessíveis no mobile.
2. Padding forçado de sections Webflow estourando largura viewport (causando overflowX).

## 12. Problemas reais (A serem validados pelo Codex)
1. **Menu Mobile Quebrado:** Se não há Webflow JS operando o nav-menu.
2. **Overflow X:** Comum em `.section_content` se a fonte exceder o viewport.
3. **Hover Sticky em Touch:** Efeito hover em card de serviço preso no mobile.

## 13. O que NÃO precisa mexer
- Os valores da media query no arquivo `webflow-base.css`.
- As classes do DOM nativo.
- As posições dos backgrounds ou grid specs se o Webflow CSS já resolver.

## 14. Correções recomendadas para o Codex
- Inspecionar a página local nas larguras citadas. Se não houver vazamentos (`overflow-x`) e a legibilidade estiver normal, **nenhum código de espaçamento precisará ser injetado**.
- Se o menu hamburger mobile não estiver funcionando, **implementar uma rotina leve em `App.jsx` ou script dedicado** para dar toggle na classe correspondente (`w--open`), simulando a função nativa do Webflow.
- Proteger as lógicas de hover em `.image-animation_trigger` dentro de um `@media (hover: hover) and (pointer: fine)` no `custom.css`.

## 15. Arquivos que Codex pode alterar
- `SITE-COPYCENTER/src/styles/custom.css`
- `SITE-COPYCENTER/src/App.jsx` (ou criar script para menu mobile)

## 16. Arquivos que Codex não pode alterar
- `webflow-base.css`
- Textos e Imagens nos HTMLs brutos.
- Motion configs de GSAP em desktop (salvo bloqueio explícito via matchMedia).

## 17. Checklist de validação visual
- [ ] Desktop sem barra de rolagem horizontal excedente.
- [ ] Em 800px: `.hero-moving_element` sumiu.
- [ ] Em 800px: Hamburger menu está visível e clicável (abrindo dropdown de links).
- [ ] Em 400px: Grid de Serviços está em 1 coluna.
- [ ] Nenhuma palavra do texto SplitType vaza o container no mobile.
- [ ] Hover do serviço não trava na tela mobile.

## 18. Comandos de build/dev
- Executar `npm run dev` para validar os breakpoints no navegador.
- Executar `npm run build` ao final.

## 19. Veredito
O Codex tem permissão para auditar o layout local inspecionando os tamanhos estabelecidos. Ajustes só devem ocorrer em `custom.css` ou na manipulação de classes do Navbar (JS) caso o Mobile Menu não responda aos toques. Nenhuma reconstrução de CSS deve ser tentada fora do estritamente vital.
