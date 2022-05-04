var Webflow = Webflow || [];
const search = window.location.search;
var cpf_valido = false;
function consulta_cpf(cpf) {
    $.ajax({
        dataType: "json",
        url: "https://formularios.proteina.digital/escale/consulta_cpf.php?cpf=" + cpf,
        type: 'get',
        // async: false,
        timeout: 3000,
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

                $("input[name='nome_completo']").focus();
                return;
            } else {
                cpf_valido = true;
                $("input[name='nome_completo']").val(dados.nome)
                $("input[name='nome_mae']").val(dados.mae)
                $("input[name='data_nascimento']").val(dados.nascimento)
                return;
            }
        },
        error: function (jqxhr, status, exception) {
            cpf_valido = true;
            $("input[name='nome_completo']").parent().removeClass('hide')
            $("input[name='nome_mae']").parent().removeClass('hide')
            $("input[name='data_nascimento']").parent().removeClass('hide')

            $("input[name='nome_completo']").focus();
            console.log(jqxhr);
            console.log(status);
            console.log(exception);
        }
    });
}

Webflow.push(function () {
    setTimeout(function () {
        $("#finish_order").removeAttr("disabled", true);
        $("#finish_order").val("FINALIZAR");
    }, 5000);

    $('input[name="cpf"]').change(function () {
        var input = $(this).val();
        if (input.length) {
            var input_clean = input.replace(/\D/g, '');
            consulta_cpf(input_clean);
        }
    });

    $('input[name="cpf"]').mask("000.000.000-00", { reverse: true });
    $('input[name="rg"]').mask("00.000.000-0", { reverse: true });
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
        } else {
            input_dcc.addClass("hide");
            input_dcc.find("input").removeAttr("required");
            $("input[value='dcc']").removeAttr("checked");
            dataLayer.push({ event: "evento_escolher_pagamento", v_evento: "evento_escolher_pagamento", v_etapa: "Etapa 5", v_valor: valor_plano_escolhido, v_plano: plano_escolhido, v_tipo_pagto: "Boleto", v_tipo: sessionStorage.getItem("portabilidade_nome"), });
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

        var inputs = [form.find("input[name='celular']"), form.find("input[name='outro_telefone']"), form.find("input[name='telefone_atual']"), form.find("input[name='email']"), form.find("input[name='rg']"), form.find("input[name='cpf']"), form.find("input[name='nome_completo']"), form.find("input[name='data_nascimento']")];
        let invalid = false;
        inputs.forEach(function (item) {
            let expre;
            const input_name = item.attr("name");
            let val =
                input_name === "email" ? item.val() : item.val().replace(/\D/g, "");

            sessionStorage.setItem("form_input_" + input_name, item.val());

            switch (input_name) {
                case "nome_completo":
                    expre = !/^[a-zA-Z\s]*$/.test(item.val());
                    break;
                case "celular":
                case "outro_telefone":
                    expre = !telefone_validation(val);
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
                    expre = val.length !== 11;
                    break;
                case "rg":
                    expre = val.length !== 9;
                    break;
                case "data_nascimento":
                    expre = !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(item.val());
                    break;
                default:
                    true;
            }

            if (expre) {
                item.focus();
                item.css("border-color", "red");
                invalid = true;
            }
        });
        if (invalid) return false;
    });
});
$(document).ajaxComplete(function (e, x, config) { if (config.url.indexOf('https://webflow.com/api/v1/form/') !== -1) { window.location.href = site + '/confirmacao' + search } });
