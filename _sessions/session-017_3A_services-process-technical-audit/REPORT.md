# REPORT — SESSION-017.3A — Services + Process Technical Copy Audit

* Status: CONCLUÍDA ✅
* Services: estrutura encontrada: `section.section_service` contendo `div.section_header` e uma `div.w-dyn-list` contendo os cards dentro de `div.service-collection_item`.
* Services: textos atuais mapeados: Título no header, botão "View all Service" (duplicado para desktop e mobile). Cada um dos 3 cards contém: Tag, Título, Parágrafo (sem botão).
* Services: quantidade real de cards: 3 cards.
* Services: elementos duplicados/ocultos: O botão de CTA da seção é duplicado (`.hide-on-mobile` no header e `.button-show_mobile` no final da seção).
* Services: classes sensíveis: `.service-collection_item`, `.section_header`.
* Services: motion envolvida: `serviceMotion.js` aplica fade-in/y-transform no header e nos cards em sequência (stagger). Não usa SplitType.
* Services: copy curada cabe ou não: Sim, os limites textuais cabem. **PORÉM, há um mismatch**: a copy curada prevê um CTA/Botão por card ("Cotar impressão", etc.), mas a estrutura HTML não possui botões dentro do card, apenas links na imagem e no título.
* Services: forma segura de aplicar copy: Substituir Título, Tag e Parágrafo. Ignorar o texto do CTA para os cards (não inserir botões). Atualizar o botão da seção.
* Services: forma proibida de aplicar copy: Criar tags `<a class="button">` manualmente dentro do `service-collection_item`.

* Process: estrutura encontrada: `section.section_process` que possui duas versões completas e distintas no HTML. Uma versão desktop com scroll hijacking/sticky (`.process-info_wrapper`) e uma versão mobile empilhada (`.process-tab_content`).
* Process: textos atuais mapeados: Título da seção, Título do passo, Parágrafo do passo, Label da Tag, e botão "Contact us".
* Process: versões desktop/mobile encontradas: Sim. Cada um dos 3 passos existe em **duplicidade total** no HTML (uma tag em `.process-info_content-item` para desktop, outra em `.static` para mobile).
* Process: elementos duplicados/ocultos: Textos são duplicados entre desktop e mobile. Os botões também diferem: o desktop tem 1 botão geral, o mobile tem 3 botões (um por passo).
* Process: classes sensíveis: `.content-item-1`, `.content-item-2`, `.content-item-3`, e `.static`.
* Process: motion envolvida: `processMotion.js` usa GSAP ScrollTrigger para pinar a seção (400vh) no desktop e alternar a opacidade dos itens conforme o scroll. Mobile é estático.
* Process: copy curada cabe ou não: Os textos cabem, mas **há dois mismatches**: 
  1. A copy prevê um Subtítulo para a seção, mas não existe tag `<p>` sob o título principal no HTML original.
  2. A copy prevê 3 botões distintos, o que funciona para o mobile, mas o desktop possui apenas 1 botão geral no fim da lista de tags.
* Process: forma segura de aplicar copy: Aplicar os textos de título e parágrafo em ambos os locais (desktop e mobile). Ignorar a aplicação do Subtítulo (não criar tag nova). No desktop, usar a copy do CTA principal (ex: "Começar orçamento"). No mobile, pode-se usar as 3 copys distintas nos botões `.static`.
* Process: forma proibida de aplicar copy: Adicionar tags `<p>` para o subtítulo. Deixar de atualizar os cards em `.static`, o que faria o mobile ficar com texto em inglês.

* Riscos técnicos: A principal armadilha é a duplicidade no Process. Esquecer de atualizar a classe `.static` quebraria a paridade no mobile. Tentar forçar as copys de botões e subtítulos onde não há HTML quebra a regra principal de não alterar a estrutura.
* Plano seguro para Session 017.3B: Realizar o Content Swap mantendo a rigidez estrutural. No Services, ignorar os CTAs internos dos cards. No Process, atualizar os textos duplamente e ignorar o subtítulo.
* Confirmação de que nenhum arquivo do site foi alterado: ✅ Confirmado. Nenhuma modificação foi feita nos arquivos do projeto.
