var checkout_url = window.location.origin+'/checkout';
// FIND POLYFILL
if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
      if (this == null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
              return value;
          }
      }
      return undefined;
  };
}

function cards_por_segmentacao(tipo_pagina_planos){

  var cards = jQuery('[data-card]');

  // Verificar se 'cidade' está presente e tem algum valor
  var cidade = sessionStorage.getItem('cidade');
  if (cidade === null && cidade === undefined && cidade === '') {
      window.location.href = checkout_url + window.location.search;
      return false;
  }

  // Verificar se 'uf' está presente e tem algum valor
  var uf = sessionStorage.getItem('uf');
  if (uf === null && uf === undefined && uf === '') {
      window.location.href = checkout_url + window.location.search;
      return false;
  }

  var enderecoOriginal = cidade+'-'+uf;

  var enderecoFormatado = enderecoOriginal.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_').toUpperCase();

  var segment = nova_segmentacao[enderecoFormatado].SEGMENTACAO;

  if( !segment ){
    window.location.href = checkout_url + window.location.search;
      return false;
  }

  const segmentacaoEncontrada = nova_segmentacao_precos.find(seg => seg.nome === segment);

  if( !segmentacaoEncontrada ){
    window.location.href = checkout_url + window.location.search;
      return false;
  }

  segmentacaoEncontrada.produtos.forEach(function(produto) {

    var card = jQuery('[data-card="' + produto.nome + '"]');

    // retirar quando a página de planos nova for pro ar
    if(tipo_pagina_planos === null || tipo_pagina_planos === undefined || tipo_pagina_planos === ''){
      // retirar quando a página de planos nova for pro ar
        card.find('.card-preco').html('<span class="card-preco-moeda">R$ </span>' + produto.preco + '<span class="card-preco-mes">/MÊS</span>')
        card.find('[data-plano]').attr('data-valor-plano', produto.preco)

        if( produto.mais_vendido ){
            $('#flag-mais-vendido').appendTo(card)
            card.addClass('ck-melhor-oferta');
            card.find('.text-block-2').addClass('ck-melhor-oferta');
            card.find('.text-block-4').addClass('ck-melhor-oferta');
            card.find('.text-block-5').addClass('ck-melhor-oferta');
            card.find('.text-block-6').addClass('ck-melhor-oferta');
            card.find('.texto-debito').addClass('ck-melhor-oferta');
            card.find('.txt-servicos').addClass('ck-melhor-oferta');
            card.find('.btn').css('background', '#00ab0f');
            card.find('.btn').css('color', '#fff');
        }
    }else{
        card.find('[data-preco]').text(produto.preco)
        card.find('[data-plano]').attr('data-valor-plano', produto.preco)
    }

    

  });

  $('[data-card]').each(function () {
        var card_id = $(this).attr('data-card')
        var found = segmentacaoEncontrada.produtos.find(element => element.nome == parseInt(card_id));
        if (!found) {
            $(this).closest('[data-card]').parent().remove()
        }
    })


    if($(window).width() < 768) {
        var index_destaque = 2
        $('.w-slider-dot').eq(index_destaque).trigger('click')
    }

    Webflow.require('slider').redraw()
    console.log('pronto atualiza cards por segmentacao')
    verifica_plano_escolhido()

}

function extrairNumeroEUnidade(texto) {
    // Encontra o número seguido de "Mega" ou "Giga"
    const matches = texto.match(/(\d+)\s*(Mega|Giga)/i);

    // Verifica se houve correspondência
    if (matches) {
        const numero = matches[1];
        const unidade = matches[2];
        return { numero, unidade };
    } else {
        // Se não houver correspondência, retorna null ou faz algo apropriado ao seu caso
        return null;
    }
}

function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}
var index_plano_destaque = false;
var address_ready = false;

function validEmail(e) {
    return !!String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function _GETURLPARAM(variavel){
    var url   = window.location.search.replace("?", "");
    var itens = url.split("&");
    for(n in itens)
    {
      if( itens[n].match(variavel) )
      {
      return decodeURIComponent(itens[n].replace(variavel+"=", ""));
      }
    }
    return null;
}

function verifica_plano_escolhido() {
  if(sessionStorage.getItem('plano_escolhido')) {
    const plano_escolhido = sessionStorage.getItem('plano_escolhido');
    console.log(plano_escolhido)

    var limpa_url = plano_escolhido.replace(/\D/g, '');

    if(!isNaN(limpa_url)){
        if( $("[data-card='"+limpa_url+"']").length ){
            var card_escolhido_url_plano = $("[data-card='"+limpa_url+"']");
            var btn_plano_url = $("[data-card='"+limpa_url+"']").find('[data-plano]');

            avanca_etapa_3(card_escolhido_url_plano, btn_plano_url);
        }else{
            $('#loadingspinner').hide()
            $('.skeleton').hide()
            $('.nv-cards').removeClass('card-loading')
        }
    }else{
        $('#loadingspinner').hide()
        $('.skeleton').hide()
        $('.nv-cards').removeClass('card-loading')
    }
  }
}


function form_produtos_api(){

  let tipo_pagina_planos = undefined;

  var cep = sessionStorage.getItem('cep');
  var numero = sessionStorage.getItem('numero');
  var telefone = sessionStorage.getItem('telefone');

  var tel = telefone.replace(/\D/g, '');
 
$.ajax({
      url: 'https://chatbot.xclapi.in/homeservices/oi',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify({
          zipCode: cep.replace(/\D/g, ''),
          acao: 'produto'
      }),
    success: function(resp){
      // var response = JSON.parse(resp);
      var response = resp;
      var viabilidade = false


            // if(false) {
            if(!response.viabilidade) {
              window.location.href = checkout_url + "/sem-cobertura" + window.location.search;
            } else {
              sessionStorage.setItem('planos_api', JSON.stringify(response));

              get_endereco_pagina_planos(tipo_pagina_planos);
            }
    }, 
    error: function(jqxhr, status, exception){
        console.log(jqxhr);
        console.log(status);
        console.log(exception);
    },
    complete: function(){
    }
  });
return false;
}

function atualiza_cards_por_api() {
    var _cep = sessionStorage.getItem('cep'),
        _numero = sessionStorage.getItem('numero');

    var requestData = {
        "zipCode": _cep,
        "acao": "produto"
    };


    console.log("PLANOS POR API");


    // Obtém o valor do sessionStorage
    var planosApi = sessionStorage.getItem('planos_api');

    // Verifica se o item existe e não está vazio
    if (planosApi !== null && planosApi !== '') {
      var papi = JSON.parse(planosApi);
      // var papi = planosApi;
      console.log("buscando do storage");
      mostra_cards(papi);
    }else{
      $.ajax({
          url: 'https://chatbot.xclapi.in/homeservices/oi',
          dataType: 'json',
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify({
              zipCode: _cep.replace(/\D/g, ''),
              acao: 'produto'
          }),
          success: function (res) {
            console.log("buscando da api");
              mostra_cards(res);
          },
          error: function (jqxhr, status, exception) {
              console.log(jqxhr);
              console.log(status);
              console.log(exception);
          }
      });
    }
}

function get_endereco_pagina_planos(tipo_pagina_planos) {
    var cep_viabilidade = sessionStorage.getItem('cep');
    var numero_viabilidade = sessionStorage.getItem('numero');

    $.ajax({
        dataType: "json",
        url: "https://viacep.com.br/ws/"+ cep_viabilidade +"/json/?callback=?",
      type: 'get',
      contentType: 'application/json',
        async: false,
        success: function(dados){
            var endereco_fornecido = dados.logradouro+', '+numero_viabilidade+' - '+cep_viabilidade+', '+dados.bairro+', '+dados.localidade+' - '+dados.uf;

            sessionStorage.removeItem('endereco_fornecido');
            sessionStorage.setItem('endereco_fornecido', endereco_fornecido);

            sessionStorage.setItem('bairro', dados.bairro);
            sessionStorage.setItem('cidade', dados.localidade);
            sessionStorage.setItem('uf', dados.uf);

            sessionStorage.removeItem('campo_endereco1');
            sessionStorage.setItem('campo_endereco1', dados.logradouro);
            
            address_ready = true;
            cards_por_segmentacao(tipo_pagina_planos);
            // atualiza_cards_por_api_cidades()
            // atualiza_cards_por_api() 12/01/2023


            $('[data-plano]').removeClass('loading-state')
            if(!_GETURLPARAM('plano')) {
                $('#loadingspinner').hide()
                $('.skeleton').hide()
                $('.nv-cards').removeClass('card-loading')
                if(index_plano_destaque) {
                    console.log(index_plano_destaque)
                    // $('.navegacao-cards div').eq(index_plano_destaque).trigger('click');
                }
            }
            verifica_plano_escolhido()
            // provavelmente é o data-attr no card
        }, 
        error: function(jqxhr, status, exception){
            address_ready = true;
            $('[data-plano]').removeClass('loading-state')
            if(!_GETURLPARAM('plano')) {
                $('#loadingspinner').hide()
                $('.skeleton').hide()
                $('.nv-cards').removeClass('card-loading')
                if(index_plano_destaque) {
                    // $('.navegacao-cards div').eq(index_plano_destaque).trigger('click');
                }
            }
            console.log(jqxhr);
            console.log(status);
            console.log(exception);
        }
    });

}

function setup_endereco(){
    var endereco_fornecido = sessionStorage.getItem('endereco_fornecido');

    if(!endereco_fornecido) {
        $(".endereco_instalacao").text('Endereço não encontrado!');
    } else {
        $("#endereco_instalacao").val(sessionStorage.getItem('logradouro')); //input
        // $("#endereco_instalacao").val(endereco_fornecido); //input
        $(".endereco_instalacao").text(endereco_fornecido); //h3

        // novos campos
        $("input[name='cep']").val(sessionStorage.getItem('cep'));
        $("input[name='uf']").val(sessionStorage.getItem('uf'));
        $("input[name='numero']").val(sessionStorage.getItem('numero'));
        $("input[name='bairro']").val(sessionStorage.getItem('bairro'));
        $("input[name='cidade']").val(sessionStorage.getItem('cidade'));


        if($( "#finish_order" ).length) {
            console.log('finish order');
            $('#finish_order').removeAttr('disabled');
            $('#finish_order').val('FINALIZAR');
        }
    }
}

function telefone_validation(telefone) {
    //retira todos os caracteres menos os numeros
    telefone = telefone.replace(/\D/g, '');
    //verifica se tem a qtde de numero correto
    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;
    //Se tiver 11 caracteres, verificar se começa com 9 o celular
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;
    //verifica se não é nenhum numero digitado errado (propositalmente)
    for (var n = 0; n < 10; n++) {
        //um for de 0 a 9.
        //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
        //caractere a ser repetido
        if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
    }
    //DDDs validos
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;
    //  E por ultimo verificar se o numero é realmente válido. Até 2016 um celular pode
    //ter 8 caracteres, após isso somente numeros de telefone e radios (ex. Nextel)
    //vão poder ter numeros de 8 digitos (fora o DDD), então esta função ficará inativa
    //até o fim de 2016, e se a ANATEL realmente cumprir o combinado, os numeros serão
    //validados corretamente após esse período.
    //NÃO ADICIONEI A VALIDAÇÂO DE QUAIS ESTADOS TEM NONO DIGITO, PQ DEPOIS DE 2016 ISSO NÃO FARÁ DIFERENÇA
    //Não se preocupe, o código irá ativar e desativar esta opção automaticamente.
    //Caso queira, em 2017, é só tirar o if.
    if (new Date().getFullYear() < 2017) return true;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;
    //se passar por todas as validações acima, então está tudo certo
    return true;
}

function send_phonemanager(cep, telefone, campanha, source, medium, numero_endereco, receber_ligacao){
    // console.log(cep, telefone, campanha, source, medium, numero_endereco)
    // guarda telefone e cep para remover da fila de abandono no final
    sessionStorage.setItem('telefone_', telefone)
    sessionStorage.setItem('cep_', cep)

    $.ajax({
      url: 'https://formularios.proteina.digital/escale/phonemanager_ajax_abandono.php',
      dataType: 'text',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
        async: false,
      data: {
            cep: cep,
          number:telefone,
            numero_endereco: numero_endereco,
          // queue: 702,
          queue: 625,
          campanha:campanha,
          source:source,
          medium:medium,
            receber_ligacao: receber_ligacao,
          endpoint: 'https://api-pdp.phonemanager.escale.com.br/api/clicktocall/savenumber/b551f70f9fdbf7136349a5ed479a8a93'
    },
    success: function(res){
            console.log('sucesso')
      console.log("Phonemanager: ", res);

      if (res == 'Sucesso') {
        console.log("Contato Enviado");
      }else{
        console.log("Contato não Enviado");
      }

    }, 
    error: function(jqxhr, status, exception){
        console.log(jqxhr);
        console.log(status);
        console.log(exception);
    }
  });
}

function form_cobertura(form){

    var cep = form.find("input[name='cep']");
    var numero = form.find("input[name='numero']");
    var telefone = form.find("input[name='telefone']");
    var btn = form.find("input[type='submit']");

    console.log("telefone", telefone.val());

    var tel = telefone.val().replace(/\D/g, '');

    if (tel.length < 10 || tel.length > 11) {
        telefone.focus();
        telefone.css('border-color', 'red');
        return false;
    }

    if (cep.val().replace(/\D/g, '').length != 8) {
        cep.focus();
        cep.css('border-color', 'red');
        return false;
    }

    if (numero.val().replace(/\D/g, '').length < 1) {
        numero.focus();
        numero.css('border-color', 'red');
        return false;
    }

  $.ajax({
        url: 'https://formularios.proteina.digital/escale/cobertura_oi_v4.php',
        type:"POST",
        dataType:'text',
          timeout: 10000,
        data: {
          cep:cep.val().replace(/\D/g, ''),
          num_fachada:numero.val().replace(/\D/g, '')
      },
      beforeSend: function() {
        if (form !== null) {
        btn.val(btn.attr('data-wait'));
        }
      },
      success: function(resp){
        var response = JSON.parse(resp);
        var viabilidade = false

              // if(false) {
              if(!response.status_viability) {
                window.location.href = checkout_url + "/sem-cobertura" + window.location.search;
              } else {

          // RETORNO COBERTURA
                  let receber_ligacao;
                  if($("input[name='receber_ligacao']").is(":checked")) {receber_ligacao = 1 } else { receber_ligacao = 0 }
          send_phonemanager(cep.val().replace(/\D/g, ''), tel, sessionStorage.getItem('form_campaign'), sessionStorage.getItem('form_source'), sessionStorage.getItem('form_medium'), numero.val(), true);

            sessionStorage.setItem('cep', cep.val());
            sessionStorage.setItem('numero', numero.val());
            sessionStorage.setItem('telefone', telefone.val());

            sessionStorage.removeItem('etapa');
        sessionStorage.setItem('etapa', 'etapa2');
            window.location.href = checkout_url + "/planos" + window.location.search;
        }
      }, 
      error: function(jqxhr, status, exception){
          console.log(jqxhr);
          console.log(status);
          console.log(exception);
          if (form !== null) {
          var btn = form.find("input[type='submit']");
        btn.val("AVANÇAR");
        }                
        // alert("Algo deu errado. Tente novamente!");
      },
      complete: function(){
        if (form !== null) {
          var btn = form.find("input[type='submit']");
        btn.val("AVANÇAR");
                  form.trigger("reset");
        }
      }
    });
  return false;
}

function api_infos(response) {
    let type_viability = response.hasOwnProperty('type_viability') && response.type_viability !== null && response.type_viability !== undefined && response.type_viability !== "" ? response.type_viability : 'default';
    
    let value_stream = response.hasOwnProperty('value_stream') && response.value_stream !== null && response.value_stream !== undefined && response.value_stream !== "" ? response.value_stream : 'default';

    sessionStorage.setItem('typeViability', type_viability);
    sessionStorage.setItem('valueStream', value_stream);
}
