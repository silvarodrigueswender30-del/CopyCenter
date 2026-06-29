# REPORT — SESSION-017.1 — Content Swap Header + Hero

* Status: CONCLUÍDA ✅
* O que foi alterado: Substituição dos textos originais (em inglês) pelos textos da CopyCenter, aprovados na etapa de Copywriting SEO Local, no escopo restrito do NavMenu e da seção Hero.
* Arquivos modificados:
  * `SITE-COPYCENTER/public/header-hero.html`
* Textos substituídos no Header:
  * `Home` → `Início`
  * `About` → `Serviços`
  * `Service` → `Portfólio`
  * `Others` → `CopyCenter`
  * `Service Details` → `Detalhes`
  * `Blog` → `CopyCenter`
  * `Blog Details` → `Novidades`
  * `Contact` → `Contato`
  * `Pricing` → `Orçamento`
  * `Privacy Policy` → `Privacidade`
  * `Contact us` (Botão principal Header) → `Contato`
* Textos substituídos na Hero:
  * H1: `Breathe easy in a home that’s fresh clean and truly yours` → `Gráfica em Uberlândia para imprimir, personalizar e divulgar`
  * Botão Primário: `Get a quote` → `Pedir orçamento pelo WhatsApp`
  * Botão Secundário: `Our Service` → `Ver serviços gráficos`
  * Subheadline e Microcopy não foram inseridos pois não possuíam nó equivalente no HTML original (`header-hero.html`).
* Cards/labels substituídos:
  * `Office Cleaning` → `Impressão Digital`
  * `Restroom Cleaning` → `Comunicação Visual`
  * `Bathroom Cleaning` → `Brindes Personalizados`
* Confirmação de que somente `header-hero.html` foi alterado: ✅ Confirmado.
* Confirmação de que nenhuma imagem foi alterada: ✅ Confirmado.
* Confirmação de que nenhum logo foi alterado: ✅ Confirmado.
* Confirmação de que nenhuma cor foi alterada: ✅ Confirmado.
* Confirmação de que nenhum href foi alterado: ✅ Confirmado.
* Confirmação de que IDs/classes/data-* foram preservados: ✅ Confirmado.
* Confirmação de que `webflow-base.css` não foi alterado: ✅ Confirmado.
* Confirmação de que scripts não foram alterados: ✅ Confirmado.
* Resultado do build: ✅ PASSOU.
* URL local usada: `http://localhost:5174/`
* Status desktop: H1 coube perfeitamente. O tamanho maior não colide com os botões, e a alteração da Session 015.2 (margin-bottom da CTA em desktop) mantém o distanciamento da borda.
* Status mobile/responsivo: O texto H1 quebra de forma orgânica. Textos dos botões adaptam-se perfeitamente, sem transbordar o flex-container.
* Problemas encontrados: Nenhuma subheadline ou microcopy estava no design original; logo, eles foram conscientemente ignorados para evitar a injeção forçada de novos elementos DOM que poderiam quebrar a harmonia do flex/grid.
* Soluções aplicadas: Adoção estrita de text-replacement sem injeção de novas tags HTML.
* Pendências restantes: Substituir logos originais por arquivos reais da CopyCenter (Session futura dedicada a Assets). Alterar hrefs quando as subpáginas reais existirem.
* Próxima sessão recomendada: **Session 017.2 — Content Swap Logo Marquee & Animated Content**.
