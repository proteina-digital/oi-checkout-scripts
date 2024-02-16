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

        monta_planos_v2(segmentacao_key, onde);
        $('.loading-spinner').css('display', 'none');
  }
  
  
  
  function monta_planos_v2(segmentacao_key, onde) {
    var existente = false;

    var current_segmentacao = nova_segmentacao[segmentacao_key].SEGMENTACAO;
    var planos = nova_segmentacao_precos.find(segmentacao_preco => segmentacao_preco.nome.toUpperCase() == current_segmentacao.toUpperCase());

    console.log('monta_planos_v2', segmentacao_key, 'tem plano? '+planos, onde);

    // var has600 = planos.filter(product => product.id === "oi_total_play_fibra_600mb").length >= 2;

    $('[data-plano]').each(function() {
        var card_mega = $(this).attr('data-card');

        var found = planos.produtos.find(function(element) {
          return element.nome == card_mega
        })
        var wslide = $(this).closest('.w-slide');
  
        if(!found) {
            console.log('Não encontrado: ', card_mega);
            $(this).hide();
            if(isMobile()) {
              Webflow.require('slider').redraw()
              wslide.appendTo(".cards-slider");
              wslide.attr("data-disabled", 'disabled');
            }
        } else {
            console.log('Encontrado: ', card_mega);
            $(this).show();
            if(isMobile()) {
              if(wslide.parent().hasClass('cards-slider')) {
                var $origin = '#' + wslide.attr('data-origin');
                wslide.appendTo($origin);
              }
              wslide.removeAttr('data-disabled') 
            }
        }
  
    })
  
    planos.produtos.forEach(function (plano_atual) {
        var plano_nome = plano_atual.nome,
            preco = plano_atual.preco,
            card = $("[data-plano='" + plano_atual.nome + "']"),
            wslide = $(this).closest('.w-slide');
  
        if (plano_atual.nome == '500') {
            card_destaque = card;
            card.append('<div id="flag-mais-vendido" class="melhor-oferta"><div class="melhor-oferta-txt">MELHOR PLANO</div></div>')

            if( card.hasClass('card-oferta') && card.hasClass('oi-fibra') && card.hasClass('oferta-rj') ){
                $(".card-oferta.oi-fibra.oferta-rj").removeClass("card-oferta-melhor");
                card.addClass('card-oferta-melhor');
            }else{
                card.css('background', "rgb(82, 82, 82)");
                card.css('color', 'rgb(255, 255, 255)');
            }

            
            card.find('.image-icon-card-2').css('display', 'block');
            card.find('.image-icon-card').css('display', 'none');


            // estilos popup
            $('#modal-abandono [data-link-banner]').each(function () {
                const link_popup = $(this)
                link_popup.attr('href', replaceUrlParam(link_popup.attr('href'), 'plano', plano_atual.nome + 'mb'));
                link_popup.attr('data-megas', plano_atual.nome + 'mb');
            });
  
            $('#modal-abandono [data-mb-banner]').text('500');
            $('#modal-abandono [data-preco-modal]').text(preco);

        }

        if (plano_atual.nome == '600') {

            // estilos banner
            $('.section-banner [data-link-banner]').each(function () {
                var link_banner = $(this)
                link_banner.attr('href', replaceUrlParam(link_banner.attr('href'), 'plano', plano_atual.nome + 'mb'));
                link_banner.attr('data-megas', plano_atual.nome + 'mb');
            });
            $('[data-mb-banner]').text('600');
            $('[data-preco-banner]').text(preco);

        }else {
            card.remove('#flag-mais-vendido')
            card.css('background', "#fff");
            card.css('color', "#333");
            card.find('.image-icon-card').css('display', 'block');
            card.find('.image-icon-card-2').css('display', 'none');
        }

        card.find('[data-preco]').text(preco);
        card.find('[data-plano]').attr('data-valor-plano', preco);
    });
  
  
   var tab_telefone = $('[data-with-telefone]')
    var tab_oiplay = $('[data-with-oiplay]')
  
  
    tab_telefone.each(function() {
      var card = $(this)
      var preco = card.find('[data-preco]')
      var centavos = preco.next()
  
      var preco_completo = parseFloat((preco.text() + centavos.text()).replace(',', '.').replace(/[^\d.-]/g, '')) + 29.90;
      preco_completo = preco_completo.toFixed(2).replace('.', ',')
      var arr_preco = preco_completo.split(',')
  
  
      preco.text(arr_preco[0])
      preco.next().html(',' + arr_preco[1] + '<br/>/mês')
    })
  
      tab_oiplay.each(function() {
         var card = $(this)
        var preco = card.find('[data-preco]')
        var centavos = preco.next()
  
        var preco_completo = parseFloat((preco.text() + centavos.text()).replace(',', '.').replace(/[^\d.-]/g, '')) + 69.90;
        preco_completo = preco_completo.toFixed(2).replace('.', ',')
        var arr_preco = preco_completo.split(',')
  
  
        preco.text(arr_preco[0])
        preco.next().html(',' + arr_preco[1] + '<br/>/mês')
      })
  
    
    $('[data-with]').on('click', function() {
      var current_plano_type = $(this).attr('data-with')
  
      $('[data-with]').removeClass('active');
      $(this).addClass('active')
  
      switch (current_plano_type) {
        case 'fibra':
          $('[data-with-fibra]').removeClass('hide');
          $('[data-with-telefone]').addClass('hide');
          $('[data-with-oiplay]').addClass('hide');
          $('[data-contratar-online]').show();
          break;
        case 'fixo':
          $('[data-with-fibra]').addClass('hide');
          $('[data-with-telefone]').removeClass('hide');
          $('[data-with-oiplay]').addClass('hide');
          $('[data-contratar-online]').hide();
          break;
        case 'oiplay':
          $('[data-with-fibra]').addClass('hide');
          $('[data-with-telefone]').addClass('hide');
          $('[data-with-oiplay]').removeClass('hide');
          $('[data-contratar-online]').hide();
          break;        
        default:
          break;
      }
  
    })
  }
  
  function isMobile() {
    return $(window).width() < 768
  }