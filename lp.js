Webflow.push(function () {

  $("[data-search-cidade]").on("input", function () {
    var value = $(this).val(); var matches = [];
    if (value) {
      value = value.toLowerCase()
      db.find(function (estado) {
        if (estado.estado.sigla.toLowerCase().includes(value) || estado.estado.nome.toLowerCase().includes(value)) { matches = matches.concat(estado.cidades) }
        var cidades_match = [];
        estado.cidades.find(function (cidade) { if (cidade.cidade.toLowerCase().includes(value)) { cidades_match.push(cidade) } })
        matches = matches.concat(cidades_match)
      })
    }
    console.log(matches)
  })

  $('[data-open-search]').on("click", function() {
    console.log('oi')
    $('.modal-cidades').css('display', 'flex')
  })
})
