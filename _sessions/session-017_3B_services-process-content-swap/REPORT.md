# REPORT — SESSION-017.3B — Content Swap Services + Process

* Status: CONCLUÍDA ✅ 
* O que foi alterado: Os textos em inglês do template original foram substituídos pela copy definitiva da CopyCenter para as seções "Services" e "Process", mantendo rigorosamente a estrutura HTML e classes.
* Arquivos modificados: 
  - `SITE-COPYCENTER/public/services.html`
  - `SITE-COPYCENTER/public/process.html`
* Textos substituídos em Services:
  - Título da seção principal e do CTA da seção em desktop/mobile.
  - Títulos ("Impressão Digital", "Comunicação Visual", "Brindes Personalizados"), Tags numéricas (01, 02, 03) e Parágrafos descritivos correspondentes nos 3 cards.
* Textos substituídos em Process desktop:
  - Título geral ("Seu orçamento gráfico em 3 passos").
  - Nos 3 cards sticky da estrutura `.process-info_wrapper`: Títulos das etapas, Textos descritivos e Labels (01, 02, 03).
  - CTA geral da seção no painel esquerdo atualizado para "Começar orçamento".
* Textos substituídos em Process mobile/tablet:
  - Nos 3 cards estáticos da estrutura `.process-tab_content` (duplicada): Títulos, Textos e Labels sincronizados 100% com o desktop.
  - CTAs individuais atualizados para refletir a etapa de cada card ("Começar orçamento", "Enviar arquivo", "Falar no WhatsApp").
* Confirmação de que não foram criados botões internos nos cards Services: ✅ Confirmado.
* Confirmação de que não foi criado subtítulo no Process: ✅ Confirmado.
* Confirmação de que desktop e mobile do Process foram atualizados: ✅ Confirmado (Textos perfeitamente replicados na estrutura `.static`).
* Confirmação de que somente services.html e process.html foram alterados: ✅ Confirmado.
* Confirmação de que nenhum href foi alterado: ✅ Confirmado.
* Confirmação de que nenhuma imagem/logo/asset foi alterado: ✅ Confirmado.
* Confirmação de que nenhum CSS/script/App.jsx foi alterado: ✅ Confirmado.
* Confirmação de que IDs/classes/data-* foram preservados: ✅ Confirmado.
* Resultado do build: ✅ Passou (4.59s).
* URL local usada: `http://localhost:5174/`
* Status desktop: As 3 seções do Process renderizam corretamente com parallax fixo, exibindo a copy em PT-BR.
* Status mobile/responsivo: O componente oculto do Process substitui o fixed com cards independentes e botões exclusivos, todos devidamente com copy PT-BR. Cards do Services encolhem corretamente.
* Problemas encontrados: O layout de mobile em `process.html` era totalmente duplicado e a copy original do template continha textos literalmente iguais copiados e colados nos steps 2 e 3 sem querer pelos criadores.
* Soluções aplicadas: A copy correta da CopyCenter foi aplicada de forma individualizada para cada step da versão mobile estática, corrigindo a repetição desleixada do template original.
* Pendências restantes: Prosseguir com o Content Swap para About, Info, Video, Testimonials e Blog.
* Próxima sessão recomendada: **Session 017.4 — Content Swap About + Video + Info**
