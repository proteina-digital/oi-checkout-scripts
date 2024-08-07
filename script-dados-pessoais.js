var Webflow = Webflow || [];
const search = window.location.search;
var cpf_valido = false;

function validaAgenciaConta(banco, campo, agencia_ou_conta) {
    var agenciaPattern, contaPattern;

    var tipo_pagamento = sessionStorage.getItem('pagamento');

    if (tipo_pagamento === null || tipo_pagamento != "dcc") {
        return true;
    }

    switch (banco) {
        case 'Banco Bradesco':
            agenciaPattern = /^\d{4}-[A-Za-z0-9]$/;
            contaPattern = /^\d{7}-[A-Za-z0-9]$/;
            break;
        case 'Banco do Brasil':
            agenciaPattern = /^\d{4}-[A-Za-z0-9]$/;
            contaPattern = /^\d{5}-\d{3}[A-Za-z0-9]$/;
            break;
        case 'Banco Santander':
            agenciaPattern = /^\d{4}$/;
            contaPattern = /^\d{8}-[A-Za-z0-9]$/;
            break;
        case 'Itaú Unibanco':
            agenciaPattern = /^\d{4}$/;
            contaPattern = /^\d{5}-[A-Za-z0-9]$/;
            break;
        case 'Nubank':
            agenciaPattern = /^0001$/;
            contaPattern = /^\d{8}$/;
            break;
        default:
            agenciaPattern = /.*/;
            contaPattern = /.*/;
            break;
    }

    // Verificação de sequência ou repetição
    var sequencialRepetido = /^(\d)\1+$|0123456789|9876543210/;

    if (campo == 'agencia') {
        if (!agenciaPattern.test(agencia_ou_conta) || sequencialRepetido.test(agencia_ou_conta.replace(/-/g, ''))) {
            return false;
        }
    }

    if (campo == 'conta') {
        if (!contaPattern.test(agencia_ou_conta) || sequencialRepetido.test(agencia_ou_conta.replace(/-/g, ''))) {
            return false;
        }
    }

    return true;
}

function validaCPF(cpf) {
  var Soma = 0
  var Resto

  var strCPF = String(cpf).replace(/[^\d]/g, '')
  
  if (strCPF.length !== 11)
     return false
  
  if ([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    ].indexOf(strCPF) !== -1)
    return false

  for (i=1; i<=9; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(9, 10)) )
    return false

  Soma = 0

  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(10, 11) ) )
    return false

  return true
}

function consulta_cpf(cpf) {
    $.ajax({
        dataType: "json",
        url: "https://formularios.proteina.digital/escale/consulta_cpf.php?cpf=" + cpf,
        type: 'get',
        // async: false,
        timeout: 5000,
        success: function (dados) {
            console.log(dados.erro)
            if (dados.erro === 'CPF inválido!') {
                cpf_valido = false;
                $("input[name='cpf']").focus();
                $("input[name='cpf']").css("border-color", "red");
                return;
            } else if (dados.erro || dados.erroCodigo) {
                cpf_valido = true;
                $("input[name='nome_completo']").parent().removeClass('hide')
                $("input[name='nome_mae']").parent().removeClass('hide')
                $("input[name='data_nascimento']").parent().removeClass('hide')
                
                alert('Você deixou algumas informações pessoais em branco, preencha por favor.');
                $('#hidden_button').trigger('click');
                window.setTimeout(function () { 
                    document.querySelector("input[name='nome_completo']") = "";
                    document.querySelector("input[name='nome_completo']").focus(); 
                }, 0); 
                return;
            } else {
                cpf_valido = true;
                $("input[name='nome_completo']").val(dados.nome)
                $("input[name='nome_mae']").val(dados.mae)
                $("input[name='data_nascimento']").val(dados.nascimento)
                return false;
            }
        },
        error: function (jqxhr, status, exception) {
            cpf_valido = true;
            $("input[name='nome_completo']").parent().removeClass('hide')
            $("input[name='nome_mae']").parent().removeClass('hide')
            $("input[name='data_nascimento']").parent().removeClass('hide')

            console.log(jqxhr);
            console.log(status);
            console.log(exception);

            alert('Você deixou algumas informações pessoais em branco, preencha por favor.');
            $('#hidden_button').trigger('click');
            window.setTimeout(function () { 
                document.querySelector("input[name='nome_completo']") = "";
                document.querySelector("input[name='nome_completo']").focus(); 
            }, 0); 
            return false;
        }
    });
}

function envia_email(email) {
    var telefone = sessionStorage.getItem('telefone_')
    var segmentacao = sessionStorage.getItem('segmentacao')
    var cidade_estado = sessionStorage.getItem('cidade_estado')

    $.ajax({
        url: 'https://formularios.proteina.digital/escale/oi_checkout/abandono/enviar_email.php',
        dataType: 'text',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        // async: false,
        data: {
            email: email,
            segmentacao: segmentacao,
            telefone: telefone,
            cidade_estado: cidade_estado
        },
        success: function(res){}, 
         error: function(jqxhr, status, exception){
            console.log(jqxhr);
            console.log(status);
            console.log(exception);
         }
    });
}


Webflow.push(function () {

    jQuery('select[name="banco"]').on('change', function () {
        var banco = this.value;
        var $agencia = jQuery('input[name="agencia"]');
        var $conta = jQuery('input[name="conta"]');

        $agencia.unmask();
        $conta.unmask();
        $agencia.attr('placeholder', 'Agência');
        $conta.attr('placeholder', 'Conta');

        switch (banco) {
            case 'Banco Bradesco':
                $agencia.mask('0000-S', { translation: { 'S': { pattern: /[A-Za-z0-9]/ } } });
                $agencia.attr('placeholder', '9999-X');
                $conta.mask('0000000-S', { translation: { 'S': { pattern: /[A-Za-z0-9]/ } } });
                $conta.attr('placeholder', '9999999-X');
                break;
            case 'Banco do Brasil':
                $agencia.mask('0000-S', { translation: { 'S': { pattern: /[A-Za-z0-9]/ } } });
                $agencia.attr('placeholder', '9999-X');
                $conta.mask('00000-000S', { translation: { 'S': { pattern: /[A-Za-z0-9]/ } } });
                $conta.attr('placeholder', '99999-999X');
                break;
            case 'Banco Santander':
                $agencia.mask('0000');
                $agencia.attr('placeholder', '9999');
                $conta.mask('00000000-S', { translation: { 'S': { pattern: /[A-Za-z0-9]/ } } });
                $conta.attr('placeholder', '99999999-X');
                break;
            case 'Itaú Unibanco':
                $agencia.mask('0000');
                $agencia.attr('placeholder', '9999');
                $conta.mask('00000-S', { translation: { 'S': { pattern: /[A-Za-z0-9]/ } } });
                $conta.attr('placeholder', '99999-X');
                break;
            case 'Nubank':
                $agencia.mask('0000');
                $agencia.attr('placeholder', '0001');
                $conta.mask('00000000');
                $conta.attr('placeholder', '99999999');
                break;
        }
    });

    function atualizarEndereco() {
        var cep = sessionStorage.getItem('cep');
        var cidade = sessionStorage.getItem('cidade');
        var estado = sessionStorage.getItem('uf');
        
        var endereco = jQuery('#endereco_instalacao').val();
        var numero = jQuery('#numero').val();
        var bairro = jQuery('#bairro').val();

        if (endereco && numero && bairro) {
            var enderecoFormatado = endereco + ', ' + numero + ' - ' + cep + ', ' + bairro + ', ' + cidade + ' - ' + estado;
            jQuery('.endereco_instalacao').text(enderecoFormatado);
            sessionStorage.setItem('endereco_fornecido', enderecoFormatado);
            sessionStorage.setItem("campo_endereco1", endereco);
            sessionStorage.setItem("bairro", bairro);
            sessionStorage.setItem("numero", numero);
        }
    }

    // Eventos para detectar quando os campos foram preenchidos
    jQuery('#endereco_instalacao, #numero, #bairro').on('blur change', function() {
        atualizarEndereco();
    });


  $("[data-option-saude]").on('click', function() {
    $('[data-select-dependentes]').toggleClass('hide')
  });

    $('[data-select-dependentes] select').on('change', function() {
    var valor_antigo = parseFloat($('[data-option-saude]').attr('data-valor').replace(',', '.'));

    var dependentes_hash = [{'id': '2588', 'preco': '19,90'}, {'id': '2597', 'preco': '39,80'}, {'id': '2598', 'preco': '59,70'}, {'id': '2599', 'preco': '79,60'}, {'id': '2600', 'preco': '99,50'}]
    $('[data-option-saude]').attr('data-id', $(this).val())
    $("[data-option-saude] [data-valor-txt]").text('R$ ' + dependentes_hash.find(item => item.id == $(this).val()).preco)
    $('[data-option-saude]').attr('data-valor', dependentes_hash.find(item => item.id == $(this).val()).preco)

    var valor_total = parseFloat($('[data-valor-total]').text().replace(',', '.').replace(/[^\d.-]/g, '')) - valor_antigo,
    novo_valor = parseFloat($('[data-option-saude]').attr('data-valor').replace(',', '.'));

    $('[data-valor-total]').text('R$ ' + (valor_total + novo_valor).toFixed(2).toString().replace('.', ','));
    $('[data-preco-card-all]').html('<span class="card-preco-moeda">R$ </span>'+(valor_total + novo_valor).toFixed(2).toString().replace('.', ',')+'<span class="card-preco-mes">/MÊS</span>');
    $('[data-dropdown-texto]').text('R$ ' + (valor_total + novo_valor).toFixed(2).toString().replace('.', ','));
    
    $('input[name="aggregations"]').val(JSON.stringify({id: $(this).val(), valor: $('[data-option-saude]').attr('data-valor') }))
})

$('[data-tv-id]').on('click', function() {
  if(!$(this).hasClass('checked')) {
    var valor_total = parseFloat($('[data-valor-total]').text().replace(',', '.').replace(/[^\d.-]/g, '')),novo_valor = parseFloat($(this).attr('data-valor').replace(',', '.'))
    $('[data-valor-total]').text('R$ ' + (valor_total + novo_valor).toFixed(2).toString().replace('.', ','));
    $('[data-preco-card-all]').html('<span class="card-preco-moeda">R$ </span>'+(valor_total + novo_valor).toFixed(2).toString().replace('.', ',')+'<span class="card-preco-mes">/MÊS</span>');
    $('[data-dropdown-texto]').text('R$ ' + (valor_total + novo_valor).toFixed(2).toString().replace('.', ','));
    
    $(this).addClass('checked')
    $(this).find('.icon-add').toggle()
    $(this).find('.icon-added').toggle()
    $("input[name='oi-fixo']").val(JSON.stringify({ 'id': $(this).attr('data-tv-id'), 'valor': $(this).attr('data-valor')}))
    $("*[data-sva-card-fibra]").show()
  } else {
    var valor_total = parseFloat($('[data-valor-total]').text().replace(',', '.').replace(/[^\d.-]/g, '')),novo_valor = parseFloat($(this).attr('data-valor').replace(',', '.'))
    $('[data-valor-total]').text('R$ ' + (valor_total - novo_valor).toFixed(2).toString().replace('.', ','));
    $('[data-preco-card-all]').html('<span class="card-preco-moeda">R$ </span>'+(valor_total - novo_valor).toFixed(2).toString().replace('.', ',')+'<span class="card-preco-mes">/MÊS</span>');
    $('[data-dropdown-texto]').text('R$ ' + (valor_total - novo_valor).toFixed(2).toString().replace('.', ','));

    $(this).removeClass('checked')
    $(this).find('.icon-add').toggle()
    $(this).find('.icon-added').toggle()
    $("input[name='oi-fixo']").val(null)
    $("*[data-sva-card-fibra]").hide()
  }
})

$('[data-oi-play-id]').on('click', function() {
  if(!$(this).hasClass('checked')) {
    var valor_total = parseFloat($('[data-valor-total]').text().replace(',', '.').replace(/[^\d.-]/g, '')),novo_valor = parseFloat($(this).attr('data-valor').replace(',', '.'))
    $('[data-valor-total]').text('R$ ' + (valor_total + novo_valor).toFixed(2).toString().replace('.', ','));
    $('[data-preco-card-all]').html('<span class="card-preco-moeda">R$ </span>'+(valor_total + novo_valor).toFixed(2).toString().replace('.', ',')+'<span class="card-preco-mes">/MÊS</span>');
    $('[data-dropdown-texto]').text('R$ ' + (valor_total + novo_valor).toFixed(2).toString().replace('.', ','));
    
    $(this).addClass('checked')
    $(this).find('.icon-add').toggle()
    $(this).find('.icon-added').toggle()
    $("input[name='oi-play']").val(JSON.stringify({ 'id': $(this).attr('data-oi-play-id'), 'valor': $(this).attr('data-valor')}))
    $("*[data-sva-card-oi-play]").show()
  } else {
    var valor_total = parseFloat($('[data-valor-total]').text().replace(',', '.').replace(/[^\d.-]/g, '')),novo_valor = parseFloat($(this).attr('data-valor').replace(',', '.'))
    $('[data-valor-total]').text('R$ ' + (valor_total - novo_valor).toFixed(2).toString().replace('.', ','));
    $('[data-preco-card-all]').html('<span class="card-preco-moeda">R$ </span>'+(valor_total - novo_valor).toFixed(2).toString().replace('.', ',')+'<span class="card-preco-mes">/MÊS</span>');
    $('[data-dropdown-texto]').text('R$ ' + (valor_total - novo_valor).toFixed(2).toString().replace('.', ','));

    $(this).removeClass('checked')
    $(this).find('.icon-add').toggle()
    $(this).find('.icon-added').toggle()
    $("input[name='oi-play']").val(null)
    $("*[data-sva-card-oi-play]").hide()
  }
})

$('[data-id-x]').on('click', function() {
  if(!$(this).hasClass('checked')) {
    var id_x = $(this).attr('data-id-x');
    var valor_total = parseFloat($('[data-valor-total]').text().replace(',', '.').replace(/[^\d.-]/g, '')), novo_valor = parseFloat($(this).attr('data-valor')).replace(',', '.'), valor_a_remover = 0;

    if($("input[name='fibra-x']").val()) {
      $('[data-id-x]').each(function(index, elemento) {
        if(id_x != $(elemento).attr('data-id-x') && $(elemento).hasClass('checked')) {
          $(elemento).removeClass('checked')
          $(elemento).find('.icon-add').show()
          $(elemento).find('.icon-added').hide()
          valor_a_remover = valor_a_remover + parseFloat($(elemento).attr('data-valor').replace(',', '.'));
        }
      })
    }
    $('[data-valor-total]').text('R$ ' + ((valor_total + novo_valor) - valor_a_remover).toFixed(2).toString().replace('.', ','));
    $('[data-preco-card-all]').html('<span class="card-preco-moeda">R$ </span>'+((valor_total + novo_valor) - valor_a_remover).toFixed(2).toString().replace('.', ',')+'<span class="card-preco-mes">/MÊS</span>');

    $(this).addClass('checked')
    $(this).find('.icon-add').toggle()
    $(this).find('.icon-added').toggle()
    $("input[name='fibra-x']").val(JSON.stringify({ 'id': $(this).attr('data-id-x'), 'valor': $(this).attr('data-valor')}))
  } else {
    var valor_total = parseFloat($('[data-valor-total]').text().replace(',', '.').replace(/[^\d.-]/g, '')), novo_valor = parseFloat($(this).attr('data-valor').replace(',', '.'))
    $('[data-valor-total]').text('R$ ' + (valor_total - novo_valor).toFixed(2).toString().replace('.', ','));
    $('[data-preco-card-all]').html('<span class="card-preco-moeda">R$ </span>'+(valor_total - novo_valor).toFixed(2).toString().replace('.', ',')+'<span class="card-preco-mes">/MÊS</span>');

    $(this).removeClass('checked');
    $(this).find('.icon-add').toggle()
    $(this).find('.icon-added').toggle()
    $("input[name='fibra-x']").val(null)
  }
})

$('[data-id]').on('click', function() {
  if(!$(this).hasClass('checked')) {
    if($(this).attr('data-option-saude')) { $('saude[name="saude"]').val($('saude[name="saude"] option:first').val()); }
    
    var _id = $(this).attr('data-id'),
        valor_total = parseFloat($('[data-valor-total]').text().replace(',', '.').replace(/[^\d.-]/g, '')), novo_valor = parseFloat($(this).attr('data-valor').replace(',', '.')),
        valor_a_remover = 0;

    if($("input[name='aggregations']").val()) {
      $('[data-id]').each(function(index, elemento) {
        if(_id != $(elemento).attr('data-id') && $(elemento).hasClass('checked')) {
          $(elemento).removeClass('checked')
          $(elemento).find('.icon-add').show()
          $(elemento).find('.icon-added').hide()
          valor_a_remover = valor_a_remover + parseFloat($(elemento).attr('data-valor').replace(',', '.'));
        }
      })
    }
    $('[data-valor-total]').text('R$ ' + ((valor_total + novo_valor) - valor_a_remover).toFixed(2).toString().replace('.', ','));
    $('[data-preco-card-all]').html('<span class="card-preco-moeda">R$ </span>'+((valor_total + novo_valor) - valor_a_remover).toFixed(2).toString().replace('.', ',')+'<span class="card-preco-mes">/MÊS</span>');
    
    $(this).addClass('checked')
    $(this).find('.icon-add').toggle()
    $(this).find('.icon-added').toggle()
    $("input[name='aggregations']").val(JSON.stringify({ 'id': $(this).attr('data-id'), 'valor': $(this).attr('data-valor')}))
  } else {
    var valor_total = parseFloat($('[data-valor-total]').text().replace(',', '.').replace(/[^\d.-]/g, '')), novo_valor = parseFloat($(this).attr('data-valor').replace(',', '.'))
    $('[data-valor-total]').text('R$ ' + (valor_total - novo_valor).toFixed(2).toString().replace('.', ','));
    $('[data-preco-card-all]').html('<span class="card-preco-moeda">R$ </span>'+(valor_total - novo_valor).toFixed(2).toString().replace('.', ',')+'<span class="card-preco-mes">/MÊS</span>');

    $(this).removeClass('checked');
    $(this).find('.icon-add').toggle()
    $(this).find('.icon-added').toggle()
    $("input[name='aggregations']").val(null)
  }
})
    
    setTimeout(function () {
        $("#finish_order").removeAttr("disabled", true);
        $("#finish_order").val("FINALIZAR");
    }, 5000);

    $('input[name="email"]').change(function() {
        var input = $(this).val();
        if (input.length) {
            envia_email(input);
        }
    })

    $('input[name="cpf"]').change(function () {
        var input = $(this).val();
        if (input.length) {
            var input_clean = input.replace(/\D/g, '');
            sessionStorage.setItem('identifier', input_clean);
            // consulta_cpf(input_clean);
            cpf_valido = true;
        }
    });

    $('input[name="cpf"]').mask("000.000.000-00", { reverse: true });
    // $('input[name="rg"]').mask("00.000.000-0", { reverse: true });
    var RGMaskBehavior = function (val) {
        return val.replace(/\D/g, "").length === 9
            ? "00.000.000-0"    
            : "00.000.000-9";
    },
        rgOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(RGMaskBehavior.apply({}, arguments), options);
            },
        };
    $("input[name='rg']").mask(RGMaskBehavior, rgOptions);
    
    
    $('input[name="user_agent"]').val(navigator.userAgent);
    $("#finish_order").attr("disabled", true);
    $("#finish_order").val("CARREGANDO...");

    $('input[name="id_plano_fixo"]').val("740"); // plano de telefone
    $("[name='celular']").val(sessionStorage.getItem('telefone'))
    $("[data-vencimento='11']").addClass('selecionado')
    $("input[name='dia_vencimento']").val(11)

    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, "").length === 11
            ? "(00) 00000-0000"
            : "(00) 0000-00009";
    },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            },
        };

    $("input[name='celular']").mask(SPMaskBehavior, spOptions);
    $("input[name='outro_telefone']").mask(SPMaskBehavior, spOptions);
    $("input[name='telefone_atual']").mask(SPMaskBehavior, spOptions);
    $("input[name='data_nascimento']").mask("00/00/0000");

    if (sessionStorage.getItem("etapa") == null) { window.location.href = site + search; }
    else {
        if (sessionStorage.getItem("etapa") != "etapa3") {
            window.location.href = site + "/planos" + search;
        }
    }

    if ($("input[name='cep'").val() === "") { setup_endereco(); }
    $(".endereco_instalacao").text(sessionStorage.getItem("endereco_fornecido"));
    $("input[name='endereco_instalacao']").val(sessionStorage.getItem("campo_endereco1"));

    var card_escolhido = sessionStorage.getItem("card_escolhido");
    var plano_escolhido = sessionStorage.getItem("plano_escolhido");
    var valor_plano_escolhido = sessionStorage.getItem("valor_plano_escolhido");
    var id_do_plano = sessionStorage.getItem("id_do_plano");

    sessionStorage.setItem("valor_plano_escolhido", valor_plano_escolhido);

    $(".dropdown-card-text").text(plano_escolhido);
    $(".dropdown-card-text-preco").text("R$ " + valor_plano_escolhido);
    $("input[name='plano_escolhido']").val(plano_escolhido);
    $("input[name='valor_plano_escolhido']").val(valor_plano_escolhido);
    $("input[name='id_do_plano']").val(id_do_plano);

    $("#card_escolhido").empty();
    var card_escolhido_el = document.getElementById("card_escolhido");
    card_escolhido_el.insertAdjacentHTML("beforeend", card_escolhido);

    if ($(window).width() > 991) {
        document.getElementById("dropdown-card-list").classList.add("w--open");
    }
    dataLayer.push({ event: "evento_contratar_plano", v_evento: "evento_contratar_plano", v_etapa: "Etapa 2", v_valor: valor_plano_escolhido, v_plano: plano_escolhido, });
    dataLayer.push({ event: "plano_escolhido", etapa: "Checkout", plano: plano_escolhido, bairro: sessionStorage.getItem("bairro"), cidade: sessionStorage.getItem("cidade"), estado: sessionStorage.getItem("uf"), });

    $("input[name='portabilidade']").change(function () {
        var radio = $("input[name='portabilidade']:checked").val();
        var input_portabilidade = $("div[data-opcional='portabilidade']");

        if (radio == "Sim") {
            input_portabilidade.removeClass("hide");
            input_portabilidade.find("input").attr("required", "true");
            dataLayer.push({ event: "evento_escolher_telefone", v_evento: "evento_escolher_telefone", v_etapa: "Etapa 3", v_valor: valor_plano_escolhido, v_plano: plano_escolhido, v_tipo: "atual", });
            sessionStorage.setItem("portabilidade_nome", "atual");
        } else {
            input_portabilidade.addClass("hide");
            input_portabilidade.find("input").removeAttr("required");
            dataLayer.push({ event: "evento_escolher_telefone", v_evento: "evento_escolher_telefone", v_etapa: "Etapa 3", v_valor: valor_plano_escolhido, v_plano: plano_escolhido, v_tipo: "novo", });
            sessionStorage.setItem("portabilidade_nome", "novo");
        }
        sessionStorage.setItem("portabilidade", radio);
        console.log(radio);
    });

    $("input[value='dcc']").attr("checked", "checked"); // JÁ CRIA A SESSION COM O VALOR DO PAGAMENTO PRÉ SELECIONADO (DCC)
    sessionStorage.setItem("pagamento", $("input[name='pagamento']:checked").val());

    $("input[name='pagamento']").change(function () {
        var radio = $("input[name='pagamento']:checked").val();
        var input_dcc = $("div[data-opcional='dcc']");

        if (radio == "dcc") {
            input_dcc.removeClass("hide");
            input_dcc.find("input").attr("required", "true");
            dataLayer.push({ event: "evento_escolher_pagamento", v_evento: "evento_escolher_pagamento", v_etapa: "Etapa 5", v_valor: valor_plano_escolhido, v_plano: plano_escolhido, v_tipo_pagto: "Débito", v_tipo: sessionStorage.getItem("portabilidade_nome"), });
            $("#banco").attr("required", "true");
            $(".div-pagamento-cc").addClass("hide");
            $(".aceitar_cc").removeAttr("required");
            $(".aceitar_cc").removeAttr("checked");
        } else if(radio == "Boleto" || radio == "boleto") {
            input_dcc.addClass("hide");
            input_dcc.find("input").removeAttr("required");
            $("input[value='dcc']").removeAttr("checked");
            dataLayer.push({ event: "evento_escolher_pagamento", v_evento: "evento_escolher_pagamento", v_etapa: "Etapa 5", v_valor: valor_plano_escolhido, v_plano: plano_escolhido, v_tipo_pagto: "Boleto", v_tipo: sessionStorage.getItem("portabilidade_nome"), });
            $("#banco").removeAttr("required");
            $(".div-pagamento-cc").addClass("hide");
            $(".aceitar_cc").removeAttr("required");
            $(".aceitar_cc").removeAttr("checked");
        } else{
            input_dcc.addClass("hide");
            input_dcc.find("input").removeAttr("required");
            $("input[value='dcc']").removeAttr("checked");
            dataLayer.push({ event: "evento_escolher_pagamento", v_evento: "evento_escolher_pagamento", v_etapa: "Etapa 5", v_valor: valor_plano_escolhido, v_plano: plano_escolhido, v_tipo_pagto: "Cartão", v_tipo: sessionStorage.getItem("portabilidade_nome"), });
            $("#banco").removeAttr("required");
            $(".div-pagamento-cc").removeClass("hide");
            $(".aceitar_cc").attr("required", "true");
            $(".aceitar_cc").removeAttr("checked");
        }

        sessionStorage.setItem("pagamento", radio);
        console.log(radio);
    });

    $(document).on("click", ".dia_vencimento", function (e) {
        e.preventDefault();

        var dia_vencimento = $(this);
        $(".dia_vencimento").removeClass("selecionado");
        dia_vencimento.addClass("selecionado");

        $("input[name='dia_vencimento']").val(
            dia_vencimento.attr("data-vencimento")
        );
        console.log($("input[name='dia_vencimento']").val());

        dataLayer.push({
            event: "evento_escolher_vencimento",
            v_evento: "evento_escolher_vencimento",
            v_etapa: "Etapa 5",
            v_valor: valor_plano_escolhido,
            v_plano: plano_escolhido,
            v_tipo_pagto: sessionStorage.getItem("pagamento"),
            v_data: dia_vencimento.attr("data-vencimento"),
            v_tipo: sessionStorage.getItem("portabilidade_nome"),
        });

        sessionStorage.setItem(
            "dia_vencimento",
            dia_vencimento.attr("data-vencimento")
        );
    });

    if (sessionStorage.getItem("form_campaign") != null) { $("input[name='utm_campaign']").val(sessionStorage.getItem("form_campaign")); }
    if (sessionStorage.getItem("form_source") != null) { $("input[name='utm_source']").val(sessionStorage.getItem("form_source")); }
    if (sessionStorage.getItem("form_medium") != null) { $("input[name='utm_medium']").val(sessionStorage.getItem("form_medium")); }
    if (sessionStorage.getItem("form_gclid") != null) { $("input[name='gclid']").val(sessionStorage.getItem("form_gclid")); }

    $("input[type='tel'], input[type='text'], input[type='email']").one("keyup", function () {
        let nome_campo = $(this).attr("name");
        let etapa = "Etapa 3";
        let v_tipo_pagto = "";
        let v_tipo = "";
        console.log("Input digitado:", nome_campo);
        switch (nome_campo) {
            case "complemento_endereco":
            case "referencia":
                etapa = "Etapa 4";
                break;
            case "banco":
            case "agencia":
            case "conta":
                etapa = "Etapa 5";
                v_tipo_pagto = "Débito";
                v_tipo = sessionStorage.getItem("portabilidade_nome");
        }
        dataLayer.push({ event: "evento_preencher_campo", v_evento: "evento_preencher_" + nome_campo, v_nome_campo: nome_campo, v_etapa: etapa, v_valor: valor_plano_escolhido, v_plano: plano_escolhido, v_tipo_pagto: v_tipo_pagto, v_tipo: v_tipo, });
    }
    );

    var form = $("#wf-form-Email-Form");
    form.find("input").each(function () {
        $(this).on("click", function (e) {
            $(this).removeAttr("style");
        });
    });

    form.on("submit", function (e) {
        e.preventDefault(e);

        if (!cpf_valido) return false;

        var inputs = [form.find("input[name='celular']"), form.find("input[name='outro_telefone']"), form.find("input[name='telefone_atual']"), form.find("input[name='email']"), form.find("input[name='cpf']"), form.find("input[name='nome_completo']"), form.find("input[name='data_nascimento']"), form.find("input[name='agencia']"), form.find("input[name='conta']")];
        let invalid = false;
        inputs.forEach(function (item) {
            let expre;
            const input_name = item.attr("name");
            let val =
                input_name === "email" ? item.val() : item.val().replace(/\D/g, "");

            sessionStorage.setItem("form_input_" + input_name, item.val());

            switch (input_name) {
                /*
                case "nome_completo":
                    expre = !/^[a-zA-Z\s]*$/.test(item.val());
                    break;
                */
                case "celular":
                    expre = !telefone_validation(val);
                    break;
                case "outro_telefone":
                    expre = val !== "" && !telefone_validation(val);
                    break;
                case "telefone_atual":
                    if (item.attr("required")) {
                        expre = !telefone_validation(val);
                    }
                    break;
                case "email":
                    expre = !validEmail(val);
                    break;
                case "cpf":
                    expre = !validaCPF(val);
                    break;
                case "data_nascimento":
                    expre = !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(item.val());
                    break;
                case "agencia":
                    expre = !validaAgenciaConta(form.find("select[name='banco']"), "agencia", val);
                    break;
                case "conta":
                    expre = !validaAgenciaConta(form.find("select[name='banco']"), "conta", val);
                    break;
                default:
                    true;
            }

            if (expre) {
                item.focus();
                item.css("border-color", "red");
                item[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                invalid = true;
                console.log(input_name, expre);
            }

            
        });
        if (invalid) return false;
    });
});
$(document).ajaxComplete(function (e, x, config) { if (config.url.indexOf('https://webflow.com/api/v1/form/') !== -1) { window.location.href = site + '/confirmacao' + search } });
