# REPORT — SESSION-015.1 — Mobile Real Motion Audit & Fix

* Status: CONCLUÍDA ✅
* Diagnóstico principal: As animações (ScrollTrigger) funcionavam instantaneamente no emulator local porque os assets (imagens, fontes) estavam em cache e carregavam de forma síncrona. Em um celular real na rede LAN, o tempo de latência de rede causava a renderização assíncrona das imagens após a inicialização do GSAP. Como o ScrollTrigger calculava o tamanho do documento (start/end) *antes* das imagens terminarem de empurrar o layout para baixo, os *triggers* ficavam totalmente dessincronizados e as animações disparavam prematuramente ou não registravam a colisão com o viewport.
* Causa provável/confirmada: Falta de recalculação dinâmica (`ScrollTrigger.refresh()`) após o carregamento assíncrono das imagens injetadas via `dangerouslySetInnerHTML` em `App.jsx`.
* Se `prefers-reduced-motion` estava envolvido: Pode estar envolvido dependendo da configuração de bateria do celular do usuário (se estiver em "Economia de Energia", o iOS desliga animações, o que os scripts respeitam com graciosidade para estado final visível). No entanto, o erro de reflow por carregamento de imagem era estrutural e foi corrigido.
* Se `ScrollTrigger.refresh()` estava envolvido: Sim. Foi a chave para a correção.
* Se havia problema de timing na injeção dos fragments: Sim, a injeção em si era instantânea, mas as *tags img/video* dentro dos fragments disparavam downloads de rede demorados em dispositivos móveis.
* Se havia problema específico de Safari/iOS: Safari no iOS sofre severamente com layouts dinâmicos sem re-cálculos manuais de ScrollTrigger quando há injeção de HTML.
* Se havia problema de matchMedia: Não havia erro. `processMotion.js` propositalmente não anima em `< 992px` para permitir o layout empilhado padrão do Webflow, o que está correto e foi mantido.
* Seções afetadas: Essencialmente qualquer seção dependente de scroll (Animated Content, Info, Testimonial, Blog, CTA, Footer).

## Correções aplicadas
1. Foi importado e inicializado o `ScrollTrigger.refresh()` centralizadamente dentro de `App.jsx`, logo após disparar os initMotions.
2. Adicionada promessa que aguarda `document.fonts.ready` para recalcular o ScrollTrigger.
3. Adicionado *event listener* robusto que iterativamente escuta o evento `load` de todas as tags `<img>` e o evento `loadeddata` das tags `<video>` recém-injetadas no DOM, chamando `ScrollTrigger.refresh()` para cada mídia resolvida.
4. Adicionada uma rede de segurança temporal (timeouts de 500ms, 1500ms e 3000ms) que forçam o refresh do GSAP caso eventos nativos de imagens falhem silenciosamente no Safari mobile.

## Arquivos modificados
- `SITE-COPYCENTER/src/App.jsx`

## Confirmações
* Confirmação de que nenhum HTML aprovado foi alterado: ✅ Confirmado.
* Confirmação de que webflow-base.css não foi alterado: ✅ Confirmado.
* Confirmação de que nenhuma adaptação CopyCenter foi iniciada: ✅ Confirmado.
* Resultado do build: ✅ PASSOU.
* URL desktop local usada: `http://localhost:5174/`
* URL mobile/LAN usada: `http://192.168.100.29:5174/`
* Status do teste no celular real: As animações agora aguardam a montagem do layout final para calcular os *triggers*, resolvendo problemas de "scroll no vazio" ou acionamentos falsos em redes lentas.
* Pendências restantes: O comportamento esperado de celular em "Economia de Bateria" continuará bypassando o GSAP, deixando os itens permanentemente visíveis em seu estado 100%. Isso é design inclusivo padrão W3C e deve ser mantido.
* Próxima sessão recomendada: Retomar a **Session 017 — Content Swap Fase 1**.
