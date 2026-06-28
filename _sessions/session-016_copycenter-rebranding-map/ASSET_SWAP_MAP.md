# ASSET_SWAP_MAP — CopyCenter

Este documento mapeia todos os arquivos de mídia (SVGs, JPGs, WebP, vídeos) usados no template original Albadoe e o que deverá substitui-los para a CopyCenter.

## 1. Logos & Branding
| Asset Original (Albadoe) | Tipo de Asset CopyCenter | Prioridade | Observação de Proporção |
|---|---|---|---|
| `logo.svg` (Header) | Logo horizontal / vetorizado da CopyCenter (SVG ou PNG s/ fundo) | P0 (Obrigatório) | Manter altura em torno de 30px-40px. |
| `logo-footer.svg` | Logo grande / principal CopyCenter | P0 (Obrigatório) | Substituir mantendo as proporções CSS. |
| `favicon.ico` | Favicon CopyCenter | P2 (Refinamento) | 32x32px. |

## 2. Hero & Media
| Asset Original (Albadoe) | Tipo de Asset CopyCenter | Prioridade | Observação de Proporção |
|---|---|---|---|
| `hero-video.mp4` / `hero-image.jpg` | Vídeo curto institucional (ex: maquinário rodando) ou foto herói de alta resolução. | P0 (Obrigatório) | O espaço é 16:9 widescreen. Não usar imagem vertical. |

## 3. Services Images
| Asset Original (Albadoe) | Tipo de Asset CopyCenter | Prioridade | Observação de Proporção |
|---|---|---|---|
| 4 Imagens abstratas 3D dos serviços | Fotos de portfólio de alta qualidade ou mockups dos serviços (banners, folders, fachadas, brindes). | P0 (Obrigatório) | Precisam ter formato de cartão horizontal ou adaptável a `object-fit: cover`. |

## 4. Process Images
| Asset Original (Albadoe) | Tipo de Asset CopyCenter | Prioridade | Observação de Proporção |
|---|---|---|---|
| 3 Imagens verticais (esferas) | Imagens da produção, pré-impressão e pacote final. | P1 (Importante) | Manter aspecto vertical (ex: 3:4) para caber perfeitamente no sticky box da esquerda. |

## 5. About & Info Images
| Asset Original (Albadoe) | Tipo de Asset CopyCenter | Prioridade | Observação de Proporção |
|---|---|---|---|
| `about-image.jpg` (Vertical fina) | Foto de um funcionário ou da loja/máquina principal. | P1 (Importante) | Formato vertical estreito (proporção de coluna Webflow). |
| `info-image.jpg` (Centro do grid) | Produto de destaque (ex: um material especial impresso). | P1 (Importante) | Proporção retangular adaptável (3:2 mobile, auto desktop). |

## 6. Testimonials
| Asset Original (Albadoe) | Tipo de Asset CopyCenter | Prioridade | Observação de Proporção |
|---|---|---|---|
| Avatares (pessoas genéricas) | Fotos de clientes reais ou logos das empresas clientes se aplicável. (Se não, remover a imagem via CSS display none temporariamente). | P2 (Refinamento) | 1:1 Quadrado (círculo via CSS `border-radius: 50%`). |

## 7. Blog / Portfólio
| Asset Original (Albadoe) | Tipo de Asset CopyCenter | Prioridade | Observação de Proporção |
|---|---|---|---|
| 3 Imagens de posts | Fotos de cases de sucesso (envelopamento de carro, placa luminosa, cadernos personalizados). | P1 (Importante) | Formato horizontal amplo (aprox 16:9). |

## 8. CTA "Explosive" Images
| Asset Original (Albadoe) | Tipo de Asset CopyCenter | Prioridade | Observação de Proporção |
|---|---|---|---|
| 8 imagens avulsas de tamanhos diferentes (scatter effect) | 8 miniaturas de diferentes serviços e produtos da gráfica. Recortes precisos são bem-vindos. | P1 (Importante) | Múltiplas proporções (retrato e paisagem). Como elas explodem em colagem, imagens sem fundo transparente ou com fundos limpos funcionam melhor. O ideal é recortar exatamente nas dimensões originais usadas pela Albadoe. |

## 9. SVGs Menores e Ícones
| Asset Original (Albadoe) | Tipo de Asset CopyCenter | Prioridade | Observação de Proporção |
|---|---|---|---|
| Social icons, setas, chevron | Manter os originais a menos que haja diretriz de ícone específico da marca. | P2 (Refinamento) | Manter intactos por segurança. |
