  function atualiza_cards_por_segmentacao(segmentacao_key) {
          const segmentacao = segmentacoes[segmentacao_key];
          $('.mais-vendido').attr('style', 'display: none !important;');
          console.log('segmentacao', segmentacao);
          console.log('segmentacao_key', segmentacao_key);


          if (!segmentacao) {
              var link_banner = $('[data-link-banner]');
              $('[data-mb-banner]').text('500');
              link_banner.attr('href',link_banner.attr('href').replace('plano=200mb','plano=500'));
              link_banner.attr('data-megas', '500');
              $('[data-preco-banner]').text('109');


              $('body').attr( { "data-mb-modal":"400", "data-preco-modal":"99" } );
              var botao_compre_online = $('.botao-compre-online-2');
              botao_compre_online.attr('href', botao_compre_online.attr('href').replace('plano=500','plano=400'));
              
              // const card_1 = $("[data-card='1']");
          } else if (segmentacao === "REGULAR") {
              var link_banner = $('[data-link-banner]');
              $('[data-mb-banner]').text('500');
              link_banner.attr('href',link_banner.attr('href').replace('plano=200mb','plano=500'));
              link_banner.attr('data-megas', '500');
              $('[data-preco-banner]').text('119');


              $('body').attr( { "data-mb-modal":"400", "data-preco-modal":"109" } );
              var botao_compre_online = $('.botao-compre-online-2');
              botao_compre_online.attr('href', botao_compre_online.attr('href').replace('plano=500','plano=400'));
              
              // const card_1 = $("[data-card='1']");
          } else if (segmentacao === "COMBATE1") {
              //$('.subtextinho-banner').text('ASSINE 200 MEGA E APROVEITE')
              //$('.subtextinho-banner').show()
              //$('[banner-mes]').append('*')
              //$('.div-block-11').append('<span class="txt-link-outras-ofertas" style="font-size: 10px;">*Oferta válida por 12 meses.</span>');
              
              var link_banner = $('[data-link-banner]');
              $('[data-mb-banner]').text('500');
              //$('[data-mb-modal]').text('400');
              link_banner.attr('href',link_banner.attr('href').replace('plano=200mb','plano=500mb'));
              link_banner.attr('data-megas', '400mb');
              $('[data-preco-banner]').text('109');
              // $('#modal-abandono').find('[data-preco-banner]').text('99');

              $('body').attr( { "data-mb-modal":"400", "data-preco-modal":"99" } );
              var botao_compre_online = $('.botao-compre-online-2');
              botao_compre_online.attr('href', botao_compre_online.attr('href').replace('plano=500','plano=400'));
  
              $('#flag-mais-vendido').appendTo('[data-card="500"]')
              const card_200 = $("[data-card='200']");
              // card_200.find('[data-preco]').text('89');
              card_200.remove();
  
              const card_400 = $("[data-card='400']");
              card_400.find('[data-preco]').text('99');
              // card_400.find('.titulo-plano').text('Assine 200 MEGA e leve')
              // card_400.append('<span style="font-size: 10px;" class="text-block-13">*Oferta válida por 12 meses.</span>')

              const card_500 = $("[data-card='500']");
              card_500.find('[data-preco]').text('109');

              // const card_1 = $("[data-card='1']");
  
          } else if (segmentacao === "COMBATE2") {
              //$('.subtextinho-banner').text('ASSINE 200 MEGA E APROVEITE')
              //$('.subtextinho-banner').show()
              //$('[banner-mes]').append('*')
              //$('.div-block-11').append('<span class="txt-link-outras-ofertas" style="font-size: 10px;">*Oferta válida por 12 meses.</span>');

                var link_banner = $('[data-link-banner]');
              $('[data-mb-banner]').text('500');
              $('[data-mb-modal]').text('400');
              link_banner.attr('data-megas', '500mb');
              link_banner.attr('href',link_banner.attr('href').replace('plano=200mb','plano=500mb'));
              $('[data-preco-banner]').text('109');
              // $('#modal-abandono').find('[data-preco-banner]').text('99');

              $('body').attr( { "data-mb-modal":"400", "data-preco-modal":"99" } );
              var botao_compre_online = $('.botao-compre-online-2');
              botao_compre_online.attr('href', botao_compre_online.attr('href').replace('plano=500','plano=400'));

            
              $('#flag-mais-vendido').appendTo('[data-card="500"]')
              const card_200 = $("[data-card='200']");
              card_200.remove();
  
              const card_400 = $("[data-card='400']");
              card_400.find('[data-preco]').text('99');
              // card_400.find('.titulo-plano').text('Assine 200 MEGA e leve')
              // card_400.append('<span style="font-size: 10px;" class="text-block-13">*Oferta válida por 12 meses.</span>')

              const card_500 = $("[data-card='500']");
              card_500.find('[data-preco]').text('109');

              // const card_1 = $("[data-card='1']");
  
          } else if (segmentacao === "COMBATE3") {
              var link_banner = $('[data-link-banner]');
              $('[data-mb-banner]').text('500');
              //$('[data-mb-modal]').text('500');
              link_banner.attr('data-megas', '500mb');
              link_banner.attr('href',link_banner.attr('href').replace('plano=200mb','plano=500mb'));
              $('[data-preco-banner]').text('99');
              // $('#modal-abandono').find('[data-preco-banner]').text('109');

              $('body').attr( { "data-mb-modal":"500", "data-preco-modal":"99" } );
              
              $('#flag-mais-vendido').appendTo('[data-card="500"]')
              const card_200 = $("[data-card='200']");
              card_200.remove();
  
              const card_400 = $("[data-card='400']");
              card_400.remove();
  
              const card_500 = $("[data-card='500']");
              card_500.find('[data-preco]').text('99');

              // card_500.append('<span style="font-size: 10px;" class="text-block-13">*Oferta válida por 12 meses.</span>')
              // card_500.find('.text-block-16').append('*')
              // card_500.find('.titulo-plano').text('Assine 200 MEGA e leve')

              // $('.subtextinho-banner').text('ASSINE 200 MEGA E APROVEITE')
              // $('.subtextinho-banner').show()
              // $('[banner-mes]').append('*')
              // $('.div-block-11').append('<span class="txt-link-outras-ofertas" style="font-size: 10px;">*Oferta válida por 12 meses.</span>');
          } else if (segmentacao === "COMBATE4") {              
              $('#flag-mais-vendido').appendTo('[data-card="500"]')
                  
              const card_400 = $("[data-card='400']");
              card_400.find('[data-preco]').text('99');
              //card_400.remove();
  
              const card_500 = $("[data-card='500']");
              card_500.find('[data-preco]').text('109');

              var link_banner = $('[data-link-banner]');
              $('[data-mb-banner]').text('500');
              link_banner.attr('data-megas', '500mb');
              link_banner.attr('href',link_banner.attr('href').replace('plano=200mb','plano=500mb'));
              $('[data-preco-banner]').text('109')
              
              $('body').attr( { "data-mb-modal":"400", "data-preco-modal":"99" } );
              var botao_compre_online = $('.botao-compre-online-2');
              botao_compre_online.attr('href', botao_compre_online.attr('href').replace('plano=500','plano=400'));
            
          }else if (segmentacao === "PRACASLIDERANCAS1") {
              $('[data-preco-banner]').text('109');
  
              $('#flag-mais-vendido').appendTo('[data-card="200"]')
              const card_200 = $("[data-card='200']");
              card_200.find('[data-preco]').text('109');
  
              const card_400 = $("[data-card='400']");
              card_400.find('[data-preco]').text('129');
  
              const card_500 = $("[data-card='500']");
              card_500.remove();
  
          }
          var conteudo_banner = $('.div-oferta-banner').contents().clone()
          $('.div-oferta').empty();
          $('.div-oferta').append(conteudo_banner)
          Webflow.require('slider').redraw()
      }
