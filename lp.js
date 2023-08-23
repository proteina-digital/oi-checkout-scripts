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

      on_select_city(cidade, estado);
  });
})

function on_select_city(cidade, estado) {
  $.ajax({
      url: 'https://formularios.proteina.digital/escale/oi_checkout/get_planos_por_cidade.php',
      dataType: 'text',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      data: {
          cidade: cidade,
          estado: estado,
      },
      beforeSend: function() {
       $('.loading-spinner').css('display', 'flex')
        $('.modal-cidades').hide();

      },
      success: function (res) {
          var json = JSON.parse(res)
          monta_planos_v1(json.planos)
          Webflow.require('slider').redraw()
          $('.loading-spinner').css('display', 'none')
      },
      error: function (jqxhr, status, exception) {
          console.log(jqxhr);
          console.log(status);
          console.log(exception);
          $('[data-select-cities]').hide();
          $('.loading-spinner').css('display', 'none')
      }
  });
}

function monta_planos_v1(planos) {

  $('[data-card]').each(function() {
      var sku = $(this).attr('data-sku');
      var found = planos.find(element => element.sku == sku);
      var wslide = $(this).closest('.w-slide');

      if(!found) {
          $(this).hide();
          if(isMobile()) {
            wslide.appendTo(".cards-slider");
            wslide.attr("data-disabled", 'disabled');
            // $(this).closest('[data-slider-nav]').find('.w-slider-dot:last-child').show();
          }
      } else {
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

  planos.forEach(function (plano_atual) {
      var sku = plano_atual.sku,
          preco = plano_atual.salePriceFormatted.replaceAll('R$ ', '').replaceAll(',90', ''),
          card = $("[data-sku='" + sku + "']"),
          wslide = $(this).closest('.w-slide');

      var card = $("[data-sku='" + sku + "']");

      // caso seja 500 mega, é plano destaque, caso não, removo todos os estilos que podem ter sido aplicados anteriormente
      if (sku == 709) {
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

          // estilos banner
          $('.section-banner [data-link-banner]').each(function () {
              var link_banner = $(this)
              link_banner.attr('href', replaceUrlParam(link_banner.attr('href'), 'plano', plano_atual.nome + 'mb'));
              link_banner.attr('data-megas', plano_atual.nome + 'mb');
          });
          $('.section-banner [data-mb-banner]').text(plano_atual.nome);
          $('.section-banner [data-preco-banner]').text(plano_atual.salePrice.toString().split(',')[0]);

          // estilos popup
          $('#modal-abandono [data-link-banner]').each(function () {
              const link_popup = $(this)
              link_popup.attr('href', replaceUrlParam(link_popup.attr('href'), 'plano', plano_atual.nome + 'mb'));
              link_popup.attr('data-megas', plano_atual.nome + 'mb');
          });

          $('#modal-abandono [data-mb-banner]').text(plano_atual.nome);
          $('#modal-abandono [data-preco-modal]').text(plano_atual.salePrice.toString().split(',')[0]);

          card.find('[data-preco]').text(plano_atual.salePrice.toString().split(',')[0]);
          card.find('[data-plano]').attr('data-valor-plano', plano_atual.salePrice.toString());
      }
  });
}

function isMobile() {
  return $(window).width() < 768
}
