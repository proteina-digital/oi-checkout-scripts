function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }
  
  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  var db;
  
  function _format_db(_db) {
    db_formatted = [];
    _db.estados.forEach(function (estado) {
        var novo_estado = { estado: estado }
        var formatted_cidades = []
        estado.cidades.forEach(function (cidade) {
            formatted_cidades.push({ estado: estado, cidade: cidade })
        })
        novo_estado.cidades = formatted_cidades
        db_formatted.push(novo_estado)
    })
    return db_formatted
  }
  
  // $(window).on('storage', function (e) {
  //     if (e.originalEvent.storageArea === sessionStorage) {
  //         setup_cidades()
  //     }
  // });
  
  function setup_cidades() {
    if (!sessionStorage.getItem('segmentacao')) return
  
    var match = false
    var current_segmentacao = sessionStorage.getItem('segmentacao').replaceAll('_', ' ')
    current_segmentacao = current_segmentacao.split('-')
    nome_cidade = current_segmentacao[0].replaceAll(' De ', ' de ').toLowerCase()
    db.find(function (estado) {
  
        estado.cidades.find(function (est_cidade) {
            if (est_cidade.cidade.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == nome_cidade) {
                nome_cidade = est_cidade.cidade
                match = true
            }
        })
    })
    var cidade = [nome_cidade, current_segmentacao[1]].join(', ');
    $('[data-open-search]').html(cidade);
  }
  
  Webflow.push(function () {
  
    if (!sessionStorage.getItem('DB')) {
        fetch("https://raw.githubusercontent.com/proteina-digital/oi-checkout-scripts/main/estados-cidades.json").then(function (blob) {
            blob.json().then(function (json) {
                db = json
                db = _format_db(db)
                sessionStorage.setItem('DB', JSON.stringify(json))
                setup_cidades()
            })
        })
    } else {
        db = JSON.parse(sessionStorage.getItem('DB'))
        db = _format_db(db)
        setup_cidades()
    }
  
    const capitais = [
        'Salvador, BA',
        'Fortaleza, CE',
        'Brasília, DF',
        'Goiânia, GO',
        'Belo Horizonte, MG',
        'Recife, PE',
        'Curitiba, PR',
        'Rio de Janeiro, RJ',
        'Porto Alegre, RS',
        'São Paulo, SP'
    ]
  
    $("[data-search-cidade]").on("input", function () {
        var value = $(this).val(); var matches = [];
        if (value) {
            value = value.toLowerCase()
            db.find(function (estado) {
                var cidades_match = [];
                estado.cidades.find(function (cidade) { if (cidade.cidade.toLowerCase().includes(value) || cidade.cidade.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value)) { cidades_match.push(cidade) } })
                matches = matches.concat(cidades_match)
  
                if (estado.estado.sigla.toLowerCase().includes(value) || estado.estado.nome.toLowerCase().includes(value)) { matches = matches.concat(estado.cidades) }
            })
        }
        const ul = $('.lista-de-cidades')
  
        ul.empty()
  
        matches.forEach(function (match) {
            ul.append('<li class="cidade-li">' + match.cidade + ', ' + match.estado.sigla + '</li>')
        })
  
        if (value == '') {
            capitais.forEach(function (capital) {
                ul.append('<li class="cidade-li">' + capital + '</li>')
            })
        }
    })
  
    $('[data-open-search]').on("click", function () {
        $('.modal-cidades').css('display', 'flex')
        const ul = $('.lista-de-cidades')
        ul.empty()
        capitais.forEach(function (capital) {
            ul.append('<li class="cidade-li">' + capital + '</li>')
        })
  
        $('.input-cidade').val('')
    })
  
    $('[data-close-search]').on('click', function () {
        $('.modal-cidades').css('display', 'none')
    })
  
    $(document).keyup(function (e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            $('.modal-cidades').css('display', 'none')
        }
    });
  
    $(document).on('click', 'li.cidade-li', function () {
        var cidade_titulo = $(this).text(), cidade = '', estado = '';
  
        if (cidade_titulo) {
            var segmentacao = cidade_titulo.split(', '),
                cidade = segmentacao[0],
                estado = segmentacao[1]
          }
  
        $('[data-close-search]').trigger('click')
        $('[data-open-search]').html(cidade_titulo);
  
        $('.loading-spinner').css('display', 'flex')
        $('.modal-cidades').css('display', 'none')
  
        on_select_city(cidade, estado, 'click no modal');
    });
  })
  
  function on_select_city(cidade, estado, onde) {

        var municipio = cidade.replaceAll(' ', '_').normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
        var segmentacao_key = municipio + "-" + estado;

        sessionStorage.setItem('selected_city', cidade);
        sessionStorage.setItem('selected_state', estado);
        sessionStorage.setItem('segmentacao', segmentacao_key);

        monta_planos_v2(segmentacao_key, onde);
        $('.loading-spinner').css('display', 'none');
  }

  function monta_planos_v2(segmentacao_key, onde) {
      if (!segmentacao_key) return;

        document.querySelectorAll('#flag-mais-vendido').forEach(e => e.remove());
        var current_segmentacao = nova_segmentacao[segmentacao_key].SEGMENTACAO;

        if (typeof current_segmentacao === 'undefined') {
            if(capitais_segmentacoes(segmentacao_key)){
              current_segmentacao = nova_segmentacao[capitais_segmentacoes(segmentacao_key)].SEGMENTACAO;
            }else{
              return;
            }
        }

          if (current_segmentacao == 'COMBATE') current_segmentacao = 'COMBATE1';
        var planos = nova_segmentacao_precos.find(segmentacao_preco => segmentacao_preco.nome.toUpperCase() == current_segmentacao.toUpperCase())
        var card_destaque = null;

        console.log('segmentacao', current_segmentacao);
        console.log('segmentacao_key', segmentacao_key);

        if(!current_segmentacao) {
            // default regular
            planos = nova_segmentacao_precos.find(segmentacao_preco => segmentacao_preco.nome.toUpperCase() == 'REGULAR')
        }

        console.log('monta_planos_v2 rewrite', segmentacao_key, planos, current_segmentacao, onde);

        $('[data-card]').each(function() {
            var card_mega = $(this).attr('data-card');
            var found = planos.produtos.find(element => element.nome == card_mega);
            var wslide = $(this).closest('.w-slide');

            if(!found) {
                $(this).hide();
                if($(window).width() < 768) {
                  wslide.appendTo(".cards-slider");
                  wslide.attr("data-disabled", 'disabled');
                  // $(this).closest('[data-slider-nav]').find('.w-slider-dot:last-child').show();
                }
            } else {
                $(this).show();
                if($(window).width() < 768) {
                  if(wslide.parent().hasClass('cards-slider')) {
                    var $origin = '#' + wslide.attr('data-origin');
                    wslide.appendTo($origin);
                  }
                  wslide.removeAttr('data-disabled') 
                }
            }

        })

        planos.produtos.forEach(function(plano_atual) {

            var card = $("[data-card='" + plano_atual.nome + "']");

            // Na nova página de redesign, não tem a opção de destaque no card, então criei essa exceção
            if (typeof $("body").attr('data-card-sem-destaque') !== 'undefined') {
              plano_atual.mais_vendido = false;
            }

            if (plano_atual.mais_vendido === true) {
                card_destaque = card;
                card.append('<div id="flag-mais-vendido" class="melhor-oferta"><div class="melhor-oferta-txt">MELHOR PLANO</div></div>')
                card.css('background', "#525252");
                card.css('color', '#fff');
                card.find('.image-icon-card-2').css('display', 'block');
                card.find('.image-icon-card').css('display', 'none');
            } else {
                card.remove('#flag-mais-vendido')
                card.css('background', "#fff");
                card.css('color', "#333");
                card.find('.image-icon-card').css('display', 'block');
                card.find('.image-icon-card-2').css('display', 'none');
            }

            if(plano_atual.banner === true) {
                $('.section-banner [data-link-banner]').each(function() {
                    var link_banner = $(this)
                    link_banner.attr('href', replaceUrlParam(link_banner.attr('href'), 'plano', plano_atual.nome+'mb'));
                    link_banner.attr('data-megas', plano_atual.nome+'mb');
                });
                $('.section-banner [data-mb-banner]').text(plano_atual.nome);
                $('.section-banner [data-preco-banner]').text(plano_atual.preco.split(',')[0]);
            }

            if(plano_atual.popup === true) {
                $('#modal-abandono [data-link-banner]').each(function() {
                    const link_popup = $(this)
                    link_popup.attr('href', replaceUrlParam(link_popup.attr('href'), 'plano', plano_atual.nome+'mb'));
                    link_popup.attr('data-megas', plano_atual.nome+'mb');
                });

                $('#modal-abandono [data-mb-banner]').text(plano_atual.nome);
                $('#modal-abandono [data-preco-modal]').text(plano_atual.preco.split(',')[0]);
            }

            card.find('[data-preco]').text(plano_atual.preco.split(',')[0]);
            card.find('[data-plano]').attr('data-valor-plano', plano_atual.preco);  
        })

        sessionStorage.setItem('segmentacao', segmentacao_key);
        if ($(window).width() < 768) {
            

                      $('.card-oferta.oi-fibra').css('order', 2);
                      $('#flag-mais-vendido').parent().css('order', 1);


                      if(card_destaque.parent().hasClass('w-slide')) {
                       $("#" + card_destaque.attr('data-origin') ).prepend(card_destaque.parent())
                      }
                      
                  }

          
          var current_segmentacao_arr = segmentacao_key.split('-')
          console.log(current_segmentacao_arr)
          var nome_cidade = current_segmentacao_arr[0].toLowerCase().replaceAll('_', ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          var cidade = [title_case(nome_cidade).replaceAll(' De ', ' de '), current_segmentacao_arr[1]].join(', ');
          $('[data-open-search]').html((cidade));
          $('[data-city-name]').text((cidade));

        console.log("card_destaque", card_destaque);
                  
        setTimeout(() => {
          Webflow.require('slider').redraw()
          card_destaque.closest('.w-slider-nav').find('.w-slider-dot').trigger('click')
          if(card_destaque && card_destaque.parent().hasClass('w-slide')) {
                        console.log(card_destaque.index())
                        card_destaque.closest('.w-slider-nav').find('.w-slider-dot:eq('+ card_destaque.index() + ')').trigger('click')
                      }
        }, 2000);
  }
  
  function isMobile() {
    return $(window).width() < 768
  }
