# EXECUTION_RULES — CopyCenter Rebranding

Estas regras governam as sessões futuras de execução do rebranding (Content Swap e Asset Swap). Elas garantem que a fundação sólida construída e estabilizada de `webflow-base.css` e motions GSAP nunca seja violada durante a troca de marca.

## 1. Comando de Abertura Obrigatório
Todo comando/prompt de execução de rebranding deve começar impreterivelmente com:
> "não alterar estrutura HTML, IDs, classes Webflow, atributos data-*; apenas substituir conteúdo textual/assets autorizados da CopyCenter."

## 2. Regras Estritas de Não-Modificação
* **NÃO alterar estrutura:** A ordem das divs, spans, sections e navs deve ser religiosamente mantida.
* **NÃO alterar motions:** Os arquivos em `src/scripts/*Motion.js` já estão calculados para as classes e tags originais. Não tocá-los.
* **NÃO alterar Webflow CSS:** O `webflow-base.css` foi auditado e funciona perfeitamente em mobile e desktop. Ele é a espinha dorsal do projeto.
* **NÃO alterar App.jsx:** Exceto se estritamente necessário para importar e mapear um novo caminho de imagem/asset.

## 3. Regras de Substituição de Texto (Copy)
* Trocar textos sempre visando a volumetria indicada no `CONTENT_SWAP_MAP.md`.
* Se o texto for muito maior do que o espaço, deve-se propor uma versão resumida. Não tentar forçar um `!important` ou um `.custom-class` para espremer texto grande.

## 4. Regras de Substituição de Imagens (Assets)
* Trocar imagens apenas quando houver o *asset* em formato otimizado e dimensões similares aprovadas pelo usuário.
* Ao trocar logos, preste extrema atenção no *aspect-ratio* das SVGs inseridas em linha ou como *img src*. O Webflow costuma travar alturas ou larguras nos estilos. Ajustar apenas a `viewBox` do SVG ou a largura se o layout quebrar.

## 5. Metodologia de Execução por Lotes
Não tente fazer o Swap de 13 seções em uma única iteração.
Execute em blocos:
1. Nav, Hero, Marquee, Footer (Blocos de navegação e topo/fim).
2. Services, Process, About (Blocos pesados do meio).
3. Info, Testimonials, Blog, CTA (Blocos finais iterativos).
4. Paleta de Cores (CSS Tokens) - Somente se houver uma definição oficial para substituir os hexadecimais da Albadoe, usando `--_color-variables` via `custom.css`.
