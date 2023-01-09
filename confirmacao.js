var weekDays = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
var periodoEl = $('.periodo')
var periodoDataTextoEl = $('#periodo-data-texto')
var periodoDiaDaSemanaEl = $('#periodo-dia-da-semana')
var isMobile = $(window).width() < 768;
var feriados = []
var data_agendamento;

var datas_agendamento = []

function finish_order() {
          const telefone = sessionStorage.getItem('telefone_')
          const cep = sessionStorage.getItem('cep_')
  
          $.ajax({
              url: 'https://formularios.proteina.digital/escale/oi_abandono.php',
              dataType : "text",
              type: 'post',
              contentType: 'application/x-www-form-urlencoded',
              data: {
                  action: 'remove',
                  cep: cep,
                  telefone: telefone,
                  receber_ligacao: 0,
                  plano: 0
              },
              success: function(res){
                  // console.log('sucesso')
                  console.log("Phonemanager: ", res);
                  if (res == 'Sucesso') {
                      console.log("Contato removido da fila de abandono");
                  }else{
                      console.log("Contato não removido da fila de abandono");
                  }
               }, 
               error: function(jqxhr, status, exception){
                  console.log(jqxhr);
                  console.log(status);
                  console.log(exception);
               }
          })
}

function envia_dados_instalacao(periodo, periodo_id, agendamento_data) {
    if(agendamento_data.length != 2) {
        alert('Por favor escolha duas datas para possíveis para o agendamento da instalação!')
        return
    }

    var segmentacao = sessionStorage.getItem('segmentacao')
    var plano = sessionStorage.getItem('plano_escolhido')
    sessionStorage.setItem('periodo_id', periodo_id)
    sessionStorage.setItem('agendamento_data_1', agendamento_data[0])
    sessionStorage.setItem('agendamento_data_2', agendamento_data[1])

    $combate1400mega = segmentacao === 'COMBATE1' && plano === '400 MB';
    $combate2400mega = segmentacao === 'COMBATE2' && plano === '400 MB';

    if($combate1400mega || $combate2400mega) {
        $('.pre-agendamento-200mega').removeClass('hide')
        $('#pre-agendamento-section').addClass('hide')
    } else if (segmentacao === 'COMBATE3' && plano === '500 MB') {
        $('[data-acrescimo]').text('100')
        $('[data-megas]').text('1')
        $('[data-tipo-velocidade]').text('GIGA')

        $('[data-plano]').attr('data-plano', '1GB')
        $('[data-plano]').attr('data-valor-plano', '199,90')
        $('[data-plano]').attr('data-plano-id', '2390')

        $('.pre-agendamento-200mega').removeClass('hide')
        $('#pre-agendamento-section').addClass('hide')
    } else {
        $('#pre-agende').addClass('hide');
        $('.agendamento').addClass('hide');
        $('.agendamento-finalizado').removeClass('hide');

        var identifier = sessionStorage.getItem('identifier')
        var segmentacao = sessionStorage.getItem('segmentacao')


//         $.ajax({
//             url: 'https://formularios.proteina.digital/escale/oi_checkout/pre_envio.php',
//             dataType: 'text',
//             type: 'post',
//             contentType: "application/json; charset=utf-8",
//             // async: false,
//             data: JSON.stringify({
//                 periodo_id: periodo_id,
//                 agendamento_data: agendamento_data[0],
//                 agendamento_data_1: agendamento_data[0],
//                 agendamento_data_2: agendamento_data[1],
//                 identifier: identifier
//             }),
//             success: function (res) { },
//             error: function (jqxhr, status, exception) {
//             console.log(jqxhr);
//             console.log(status);
//             console.log(exception);
//             }
//         });
//     }

	var agendamento_1_formatted = agendamento_data[0].split('-').reverse().join('/')
	var agendamento_2_formatted = agendamento_data[1].split('-').reverse().join('/')

    $('[data-periodo-completo]').html('Dia ' + agendamento_1_formatted + ' ou ' + agendamento_2_formatted + '<br> Periodo&ensp;' + periodo)
}

function carrega_feriados() {
  var ano = new Date().getFullYear();
  $.ajax({
    url: 'https://brasilapi.com.br/api/feriados/v1/2022',
    success: function (res, textStatus, xhr) {
      if (xhr.status) {
        feriados = res
      }
    }
  })
}
function verifica_feriado(data) {
  for (var i = 0; i < feriados.length; i++) {
    var achei_um_feriado = feriados[i].date === data
    if (achei_um_feriado) {
      return achei_um_feriado
    }
  }
  return false
}
Webflow.push(function () {
  carrega_feriados();
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "pt-br",
    selectable: true,
  });
  if(isMobile){ calendar.setOption('height', 300); }
  $(".calendario").removeClass("hide");
  calendar.render();
  var fc_today = $('.fc-day-today').attr('data-date');
  var hora = (new Date).getHours()
  $('.voltar-calendario').on('click', function() {
      $('.periodo').addClass('hide')
      $('.calendario').show()
      $('.agendamento').removeAttr('style')
  })
  $('[data-plano-id]').on('click', function() {
    var $this = $(this);
    var identifier = sessionStorage.getItem('identifier')
    var segmentacao = sessionStorage.getItem('segmentacao')
    var periodo_id = sessionStorage.getItem('periodo_id')
    var agendamento_data = sessionStorage.getItem('agendamento_data')
    $.ajax({
        url: 'https://formularios.proteina.digital/escale/oi_checkout/pre_envio.php',
        dataType: 'text',
        type: 'post',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            periodo_id: periodo_id,
            agendamento_data: agendamento_data,
            identifier: identifier,
            plano: $this.attr('data-plano-id'),
            valor_plano: $this.attr('data-valor-plano')
        }),
        success: function (res) {},
        error: function (jqxhr, status, exception) {console.log(jqxhr); console.log(status);console.log(exception);}
    });
    $this.text('Seu upgrade foi realizado ✓')
  })

  calendar.on("dateClick", function (info) {
    var timeDiff = dayjs(info.dateStr).diff(dayjs(), 'hour')
    var duas_semanas_em_horas = 336;
    if (timeDiff > duas_semanas_em_horas) {
        alert('A data selecionada é muito distante do dia da compra. Selecione uma data mais próxima.')
        calendar.unselect();
        return false;
    }
    if(timeDiff < 0) {
        if(timeDiff === -hora) {
            alert('Infelizmente, não é possível agendar a instalação para o mesmo dia da compra. Selecione uma data a partir de amanhã.')
        }
        calendar.unselect();
        return false;
    }
    if(timeDiff <= 24) {
        alert('Precisamos de um dia útil para processar sua compra, você pode agendar a instalação amanhã.')
        calendar.unselect();
        return false;
    }
    var weekDay = weekDays[dayjs(info.dateStr).day()];
    var data_feriado = verifica_feriado(info.dateStr)
    if (weekDay === 'Domingo') {
      alert('A instalação da Oi Fibra não pode ser feita no domingo por favor selecione outra data.')
      calendar.unselect();
      return false;
    }
    if (data_feriado) {
      alert('Você selecionou uma data com feriado nacional. A Oi não consegue instalar Oi Fibra nesta data. Por favor, selecione um dia útil.')
      calendar.unselect();
      return false;
    }
    var data = dayjs(info.dateStr).format('DD/MM/YYYY');

    if(datas_agendamento.length == 2) {
      datas_agendamento.shift()
    }
    datas_agendamento.push(info.dateStr)

	// SE A LENGH FOR 2 APÓS O PUSH NO DATAS_AGENDAMENTO ENTÃO MOSTRA OS BOTÕES DE HORARIO
	if (datas_agendamento.length == 2) {
		periodoEl.removeClass('hide')
	}

    fill_bicks()
    datas_agendamento.forEach(function(_data) {
        $('[data-date=' + _data + ']').css('background-color', '#009e0c')
        $('[data-date=' + _data + ']').css('border-radius', '8px')
    })
  });
  
  $('[data-periodo]').on('click', function () {
    if($(this).attr('disabled') === 'disabled' || $(this).attr('disabled') == 'true') {
        return false;
    }

    $('[data-periodo].selected').each(function( index ) {
        $(this).removeClass('selected')
    });

    $(this).toggleClass('selected')
  	// sessionStorage.clear();
  })

  $('.agendar-btn').on('click', function () {
    var periodo_selecionado = $('[data-periodo].selected')

    if(periodo_selecionado.length > 0) {
        envia_dados_instalacao(periodo_selecionado.attr('data-periodo'), periodo_selecionado.attr('data-periodo-id'), datas_agendamento)
  	    sessionStorage.clear();
    }
  })

  $(document).on('click', '.fc-prev-button, .fc-next-button', function() {
    fill_bicks();
  })

  function fill_bicks() {
    $('.fc-day').each(function(index) {
        var element = $(this)
        var fc_day = element.attr('data-date')
        var dias_diff = dayjs(fc_day).diff(dayjs(fc_today), 'day')
        if((dias_diff == 0 || dias_diff == 1) && element.attr('role') != 'columnheader') {
            element.css('background-color', 'rgba(255, 0, 0, 0.61)')
        }
        if(dias_diff <= 14 && dias_diff > 1) {
          // !element.hasClass('fc-day-sat') &&  
          if(!element.hasClass('fc-day-sun')) {
                element.css('background-color', '#abeda1')
                element.css('cursor', 'pointer')
                element.addClass('enabled')
            }
        }
    })
  }
  fill_bicks();
});
