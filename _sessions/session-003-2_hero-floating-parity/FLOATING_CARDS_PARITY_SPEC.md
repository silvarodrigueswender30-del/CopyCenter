# FLOATING CARDS PARITY SPEC — SESSION 003.2

## 1. Diagnóstico geral

Na referência original (`albadoe.webflow.io`), os 3 cards flutuantes funcionam como elementos decorativos periféricos que orbitam ao redor do título sem jamais competir com ele. Eles estão posicionados via `translate()` em porcentagens relativas à sua própria dimensão, afastados o suficiente para que mesmo com flutuação o bounding-box deles nunca toque a mancha de texto do H1 ou a zona dos CTAs.

Na versão local, o GSAP aplica offsets relativos (`+=5`, `-=14`, etc.) que se **somam** aos transforms base do CSS (`translate(0%, -630%)`, etc.). O problema central é duplo:

1. **Amplitude excessiva no eixo Y**: Deslocamentos de até 14px com duração curta (2.6s) criam um ritmo de agitação, não de suspensão. Após a correção da Session 003.1, os valores foram reduzidos para ~5–6px com duração ~4.2–4.6s, o que é mais adequado — porém a posição base continua sendo a mesma do Webflow, e pode não estar produzindo o mesmo resultado visual por diferenças de viewport, padding e renderização do `overflow: hidden` no container `.home-hero_element`.

2. **Ausência de clamp de área segura**: O GSAP atual usa `gsap.to()` com offsets relativos sem limitar a trajetória. Se o transform base do CSS não posicionar o card exatamente como na referência (por diferenças de container, font-size do H1, ou viewport), a animação resultante pode invadir a zona do título.

## 2. Arquitetura visual correta da referência

Na referência, os cards formam uma **composição triangular** ao redor do conteúdo central da Hero:

- **Card superior (01 — Office Cleaning)**: Posicionado acima do H1, centralizado horizontalmente. Funciona como **âncora visual de topo** — o olho do usuário o percebe como um badge decorativo que reforça o contexto, sem bloquear a primeira linha do título.

- **Card esquerdo (02 — Restroom Cleaning)**: Posicionado à esquerda, em altura intermediária entre o título e os CTAs. Funciona como **suporte lateral esquerdo** — cria assimetria controlada e guia o olho de volta para o centro.

- **Card direito (03 — Bathroom Cleaning)**: Posicionado à direita, em altura ligeiramente mais baixa que o card 02. Funciona como **suporte lateral direito** — fecha a triangulação, criando um "abraço" visual em torno do conteúdo principal.

**Zonas de respiro**: Existe uma faixa de pelo menos 60–80px entre a borda de qualquer card e a borda do bounding-box do `.home-hero_content`. Os cards nunca tocam o texto.

**Relação com o vídeo**: Os cards estão posicionados sobre o vídeo de background, acima dele no z-index. O vídeo é escurecido pelo gradiente overlay (`linear-gradient(#00000059, #00000059)`), o que garante contraste entre os cards com `backdrop-filter: blur(10px)` e o fundo.

**Relação com o CTA**: Os botões "Get a quote" e "Our Service" estão dentro de `.home-hero_content`. Os cards nunca descem até a altura dos CTAs. A faixa inferior da Hero (abaixo dos CTAs) fica limpa.

## 3. Zona proibida do H1

A **zona proibida** é o retângulo virtual definido pelo bounding-box do `.home-hero_content`, incluindo:

- **Centro óptico do H1**: O título ocupa largura máxima de `1090px` (via `max-width` no `.home-hero_content`) e está centralizado. A mancha de texto é o núcleo intocável.

- **Faixa de leitura**: Toda a extensão horizontal do H1 mais uma margem lateral de segurança de ~40–60px de cada lado.

- **Zona de CTA**: O `.button-group.home-header` está abaixo do título. Nenhum card pode descer até esta altitude. Margem mínima vertical de ~40px acima do topo do `.button-group`.

- **Zonas periféricas permitidas**: Acima do topo do H1 (card 01), à esquerda do bounding-box do `.home-hero_content` com margem (card 02), à direita do bounding-box com margem (card 03). Os cards devem operar **exclusivamente** nestas periferias.

Em termos de CSS box-model: o retângulo de `.home-hero_content` (incluindo padding se houver) é a zona morta. Os cards só podem existir **fora** deste retângulo.

## 4. Diagnóstico por card

### moving-element-01

- **Posição atual (CSS base)**: `transform: translate(0%, -630%)`. Posicionado acima e ao centro. O valor `-630%` relativo à própria altura (~48px de conteúdo + padding) o coloca a ~302px acima do ponto de ancoragem.
- **Problema atual**: A animação GSAP aplica `y: "-=5"` com yoyo, fazendo-o oscilar 5px para cima a partir do ponto base. Isto é aceitável em desktop, mas se o `padding-top` do container ou a altura do H1 variarem, o card pode ficar próximo demais da primeira linha do título.
- **Posição ideal**: Deve permanecer acima do H1 com margem mínima de 60px do topo da primeira linha de texto. Se necessário, aumentar levemente o valor de `-630%` para `-650%` ou `-660%`.
- **Amplitude permitida**: Máxima de 6px no eixo Y.
- **Eixo de movimento recomendado**: Apenas Y (vertical). Nenhum movimento em X — este card é centralizado e qualquer deslocamento lateral quebraria a simetria.

### moving-element-02

- **Posição atual (CSS base)**: `transform: translate(-160%, -250%)`. Posicionado à esquerda e em altura intermediária.
- **Problema atual**: A animação GSAP aplica `x: -1, y: "+=6"`. O eixo X é mínimo (aceitável), mas o `y: "+=6"` pode puxá-lo para baixo em direção à faixa de leitura em viewports menores. Além disso, `-160%` pode não ser suficiente para afastá-lo da margem esquerda do texto em telas de 1280px.
- **Posição ideal**: Manter `-160%` em X para desktop (1440px+). Em telas de 1280px, considerar `-180%`.
- **Amplitude permitida**: X: 0 (nenhum). Y: máximo 6px.
- **Eixo de movimento recomendado**: Apenas Y. Sem deslocamento horizontal.

### moving-element-03

- **Posição atual (CSS base)**: `transform: translate(160%, -230%)`. Posicionado à direita e um pouco mais baixo que o card 02.
- **Problema atual**: Similar ao card 02 mas espelhado. `x: 1, y: "-=5"` é conservador. O risco é que em telas menores (1280px) o `160%` não afaste o suficiente da margem direita do texto.
- **Posição ideal**: Manter `160%` em X para desktop (1440px+). Em telas de 1280px, considerar `180%`.
- **Amplitude permitida**: X: 0 (nenhum). Y: máximo 5px.
- **Eixo de movimento recomendado**: Apenas Y. Sem deslocamento horizontal.

## 5. Correção estrutural recomendada

A correção deve acontecer em **ambos** os domínios, na seguinte ordem:

1. **CSS primeiro (posição base)**: Ajustar as posições de translate dos cards para garantir que, sem nenhuma animação GSAP, os 3 cards já estejam nas posições corretas e fora da zona proibida. Isto dá ao layout a fundação correta.

2. **GSAP depois (movimento)**: Simplificar a animação para usar apenas o eixo Y, com amplitudes baixas, durações longas e sem nenhum offset em X.

**Ordem correta**:
- Primeiro corrigir `custom.css` para as posições base, caso os values do `webflow-base.css` não sejam suficientes.
- Depois ajustar `heroMotion.js` para restringir os parâmetros de animação.
- **NÃO alterar `webflow-base.css`**. Todas as correções de posição devem ir no `custom.css` como overrides documentados.

## 6. Coordenadas sugeridas (Desktop ≥ 1280px)

### moving-element-01
| Propriedade | Valor |
|---|---|
| transform base (CSS) | `translate(0%, -630%)` — manter original |
| scale | `1` |
| z-index | `4` (manter original) |
| opacity | `1` |
| pointer-events | `none` |
| GSAP x | `0` (sem movimento lateral) |
| GSAP y | `"-=5"` |
| duration | `4.2s` |
| delay | `0` |
| ease | `"sine.inOut"` |

### moving-element-02
| Propriedade | Valor |
|---|---|
| transform base (CSS) | `translate(-160%, -250%)` — manter original |
| scale | `1` |
| z-index | `4` (manter original) |
| opacity | `1` |
| pointer-events | `none` |
| GSAP x | `0` (sem movimento lateral) |
| GSAP y | `"+=5"` |
| duration | `4.6s` |
| delay | `0.2s` |
| ease | `"sine.inOut"` |

### moving-element-03
| Propriedade | Valor |
|---|---|
| transform base (CSS) | `translate(160%, -230%)` — manter original |
| scale | `1` |
| z-index | `4` (manter original) |
| opacity | `1` |
| pointer-events | `none` |
| GSAP x | `0` (sem movimento lateral) |
| GSAP y | `"-=5"` |
| duration | `4.4s` |
| delay | `0.4s` |
| ease | `"sine.inOut"` |

## 7. Motion design correto

- **Flutuação premium**: Os cards devem parecer "respirar" — como se estivessem suspensos em ar calmo. O usuário não deve perceber conscientemente o movimento; ele deve senti-lo como "algo vivo" sem conseguir apontar o quê. Isso é o padrão premium.

- **Easing**: `sine.inOut` é o easing correto para movimentos yoyo contínuos. Ele cria aceleração e desaceleração simétricas que imitam oscilação natural. Nunca usar `linear` (parece mecânico) ou `bounce` / `elastic` (parece erro de UI).

- **Stagger**: Os 3 cards devem ter delays diferentes (`0`, `0.2s`, `0.4s`) e durações diferentes (`4.2s`, `4.6s`, `4.4s`). Isso garante que nunca estejam sincronizados, criando um padrão orgânico e não-repetitivo.

- **Ritmo**: A velocidade percebida deve ser lenta o suficiente para que em 2 segundos de observação o usuário mal note que houve deslocamento. Durações abaixo de 3s dão sensação de agitação. Acima de 5s ficam lentas demais e parecem loading.

- **Movimento em triângulo**: Os cards devem mover-se em direções opostas (01 sobe quando 02 desce, 03 sobe com delay) para manter a composição triangular estável. Nunca todos na mesma direção ao mesmo tempo.

- **Não competir com o H1**: O motion design serve ao texto, não compete com ele. Se o usuário olhar para os cards em vez de ler o título, o motion falhou.

- **Não parecer tremor**: Amplitude mínima para não ser confundido com erro de renderização ou vibração de bug.

- **Não parecer loading ou alerta**: Evitar pulsar, piscar ou girar. Apenas flutuação vertical suave.

## 8. Responsivo

### Desktop (≥ 992px)
- Manter 3 cards com os transforms originais do `webflow-base.css`.
- GSAP ativo com parâmetros descritos na seção 6.
- Nenhuma intervenção adicional de `custom.css`.

### Tablet (≤ 991px)
- **Descoberta crítica**: O `webflow-base.css` na linha 6350 define `.hero-moving_element { display: none; }` para `max-width: 991px`.
- **Recomendação**: Respeitar a decisão original do Webflow. Os cards são ocultados no tablet e abaixo. Não forçar visibilidade.
- **Ação no custom.css**: Remover os overrides de `scale` nas media queries de `max-width: 767px` e `max-width: 479px` que existem atualmente, pois o Webflow já oculta os cards com `display: none` a partir de 991px. Os overrides de `scale` nunca serão aplicados e são código morto.

### Mobile Landscape (≤ 767px)
- Cards ocultos pelo CSS base (`display: none` herdado do breakpoint 991px).
- Nenhuma ação necessária.

### Mobile Portrait (≤ 479px)
- Cards ocultos pelo CSS base.
- Nenhuma ação necessária.

**Prioridade: legibilidade**. A decisão do Webflow original de ocultar os cards abaixo de 991px é a correta. Em telas menores, os cards sufocam o título e devem ser removidos.

## 9. Z-index e legibilidade

Hierarquia correta (do mais atrás para o mais à frente):

| Camada | Elemento | z-index |
|---|---|---|
| 1 (fundo) | `.home-hero_video` (vídeo + overlay gradient) | `auto` (posição: absolute, inset: 0) |
| 2 | `.hero-moving_element` (3 cards) | `4` (definido no `webflow-base.css`) |
| 3 | `.home-hero_content` (H1 + CTAs) | `3` (definido no `webflow-base.css`) — **PROBLEMA** |
| 4 | `.play-pause_button` (controle do vídeo) | `3` (definido no `webflow-base.css`) |

**Problema identificado**: Na base do Webflow, `.home-hero_content` tem `z-index: 3` e `.hero-moving_element` tem `z-index: 4`. Isto significa que os cards estão **acima** do texto no stacking context. Se houver sobreposição, os cards cobrem o título.

**Correção já aplicada no `custom.css`**: O custom.css atual inverte esta relação: `.home-hero_content { z-index: 10 }` e `.hero-moving_element { z-index: 3 }`. Isto é correto e deve ser **mantido**.

| Camada | Elemento | z-index corrigido |
|---|---|---|
| 1 (fundo) | `.home-hero_video` | `auto` |
| 2 | `.hero-moving_element` | `3` (custom.css) |
| 3 | `.home-hero_content` | `10` (custom.css) |
| 4 | `.play-pause_button` | `3` (webflow-base) — acima do vídeo, abaixo do texto |

**Nota**: Na referência original, o z-index dos cards é `4` e do conteúdo é `3`. Isso funciona porque na referência os cards **nunca se sobrepõem** ao texto. A inversão via `custom.css` é uma rede de segurança defensiva para o nosso projeto. Manter.

## 10. Checklist para o Codex

### Arquivos a alterar
- [ ] `SITE-COPYCENTER/src/scripts/heroMotion.js`
- [ ] `SITE-COPYCENTER/src/styles/custom.css`

### Seletores a alterar
- `heroMotion.js`: Parâmetros de `gsap.to()` nos 3 `movingCards`.
- `custom.css`: Remover media queries mortas (scale em 767px e 479px).

### Valores a aplicar no `heroMotion.js`
```
movingCards[0]:  x: 0,   y: "-=5",  duration: 4.2,  delay: 0,    ease: "sine.inOut"
movingCards[1]:  x: 0,   y: "+=5",  duration: 4.6,  delay: 0.2,  ease: "sine.inOut"
movingCards[2]:  x: 0,   y: "-=5",  duration: 4.4,  delay: 0.4,  ease: "sine.inOut"
```

### Valores a aplicar no `custom.css`
- Manter: `.home-hero_content { position: relative; z-index: 10; }`.
- Manter: `.hero-moving_element { z-index: 3; pointer-events: none; }`.
- Remover: `@media screen and (max-width: 767px) { .hero-moving_element { scale: 0.82; } }`.
- Remover: `@media screen and (max-width: 479px) { .hero-moving_element { scale: 0.72; } }`.
- Remover: `@media screen and (max-width: 991px) { .hero-moving_element { transform-origin: center; } }`.
- Motivo: O Webflow já aplica `display: none` nos cards abaixo de 991px. Esses overrides são código morto.

### O que NÃO pode tocar
- `webflow-base.css` — nunca alterar.
- Textos, imagens, cores — nunca alterar.
- Header/Navbar — não mexer.
- Seções abaixo da Hero — não mexer.
- `data-w-id` — preservar.
- Classes Webflow — preservar.
- Wrappers — preservar.
- Animação de entrada do `.home-hero_content` (`fromTo`) — já está correta, não mexer.
- Fallback `html:not(.motion-ready)` — manter.

### Como validar visualmente
1. Abrir `http://127.0.0.1:5173/` (ou 5174).
2. Verificar que o H1 está totalmente legível sem nenhum card sobrepondo.
3. Verificar que os 3 cards flutuam suavemente sem agitação.
4. Verificar que os cards não se movem lateralmente.
5. Redimensionar o browser para 991px e confirmar que os cards desaparecem.
6. Abrir o DevTools em responsive e verificar que não há erro JS.
7. Comparar visualmente com `albadoe.webflow.io` em janelas lado a lado na mesma resolução.

### Comandos a rodar
```bash
npm run build        # deve passar sem erros novos
npm run dev          # abrir e validar visualmente
```

## 11. Veredito

A Session 003.1 **pode continuar como base** para a Session 004. Os valores atuais no `heroMotion.js` já foram corrigidos para amplitudes conservadoras (`x: 0` ou `x: ±1`, `y: ±5–6`, duração 4.2–4.6s). O z-index defensivo no `custom.css` está correto.

**Correção recomendada antes da Session 004**: Microcorreção de limpeza — remover as 3 media queries mortas no `custom.css` (scales em 767px, 479px e transform-origin em 991px), pois são código sem efeito visual e adicionam confusão para futuras sessões. Confirmar que `x` nos 3 cards está em `0` (não `1` ou `-1`). Nenhuma outra alteração é obrigatória.

**Liberação da Session 004**: Sim, pode ser liberada após esta microcorreção. A Hero está visualmente funcional, legível e com motion adequado para prosseguir com a seção de Serviços.
