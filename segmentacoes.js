const segmentacoes = {"RIO_BRANCO-AC":"REGULAR","ARAPIRACA-AL":"COMBATE","MACEIO-AL":"COMBATE","MARECHAL_DEODORO-AL":"COMBATE","MANAUS-AM":"COMBATE2","MACAPA-AP":"REGULARUNIFICADO","BARREIRAS-BA":"COMBATE","EUNAPOLIS-BA":"COMBATE","FEIRA_DE_SANTANA-BA":"LOWCOST","ILHEUS-BA":"COMBATE","ITABUNA-BA":"COMBATE","JACOBINA-BA":"LOWCOST","JEQUIE-BA":"LOWCOST","JUAZEIRO-BA":"LOWCOST","LAURO_DE_FREITAS-BA":"REGULARUNIFICADO","LUIS_EDUARDO_MAGALHAES-BA":"COMBATE","PAULO_AFONSO-BA":"LOWCOST","PORTO_SEGURO-BA":"LOWCOST","SALVADOR-BA":"REGULARUNIFICADO","SIMOES_FILHO-BA":"REGULARUNIFICADO","TEIXEIRA_DE_FREITAS-BA":"COMBATE","VITORIA_DA_CONQUISTA-BA":"COMBATE","FORTALEZA-CE":"LOWCOST","IGUATU-CE":"LOWCOST","JUAZEIRO_DO_NORTE-CE":"LOWCOST","SOBRAL-CE":"LOWCOST","BRASILIA-DF":"COMBATE2","CACHOEIRO_DE_ITAPEMIRIM-ES":"COMBATE","CARIACICA-ES":"COMBATE","NOVA_VENECIA-ES":"COMBATE2","SAO_GABRIEL_DA_PALHA-ES":"COMBATE2","SERRA-ES":"COMBATE","VIANA-ES":"COMBATE","VILA_VELHA-ES":"COMBATE","VITORIA-ES":"COMBATE","AGUAS_LINDAS_DE_GOIAS-GO":"COMBATE2","ANAPOLIS-GO":"COMBATE2","APARECIDA_DE_GOIANIA-GO":"COMBATE2","CATALAO-GO":"COMBATE2","CIDADE_OCIDENTAL-GO":"COMBATE2","FORMOSA-GO":"COMBATE2","GOIANIA-GO":"COMBATE2","JATAI-GO":"COMBATE2","LUZIANIA-GO":"COMBATE2","MORRINHOS-GO":"COMBATE2","NOVO_GAMA-GO":"COMBATE2","PLANALTINA-GO":"COMBATE2","RIO_VERDE-GO":"COMBATE2","SANTO_ANTONIO_DO_DESCOBERTO-GO":"COMBATE2","TRINDADE-GO":"COMBATE2","VALPARAISO_DE_GOIAS-GO":"COMBATE2","IMPERATRIZ-MA":"LOWCOST","SANTA_INES-MA":"COMBATE","SAO_LUIS-MA":"COMBATE","TIMON-MA":"COMBATE","ARAGUARI-MG":"COMBATE","BELO_HORIZONTE-MG":"REGULAR","BETIM-MG":"REGULAR","CATAGUASES-MG":"COMBATE3","CAXAMBU-MG":"COMBATE3","CONTAGEM-MG":"REGULAR","CORONEL_FABRICIANO-MG":"COMBATE","DIVINOPOLIS-MG":"COMBATE","GOVERNADOR_VALADARES-MG":"COMBATE","IPATINGA-MG":"COMBATE","ITABIRA-MG":"COMBATE","JOAO_MONLEVADE-MG":"COMBATE","JUIZ_DE_FORA-MG":"COMBATE","LAVRAS-MG":"COMBATE","LEOPOLDINA-MG":"COMBATE","MONTES_CLAROS-MG":"COMBATE","MURIAE-MG":"COMBATE","NOVA_LIMA-MG":"REGULAR","PARACATU-MG":"COMBATE","PATROCINIO-MG":"COMBATE","POCOS_DE_CALDAS-MG":"COMBATE","POUSO_ALEGRE-MG":"COMBATE","RIBEIRAO_DAS_NEVES-MG":"REGULAR","SANTA_LUZIA-MG":"REGULAR","SANTA_RITA_DO_SAPUCAI-MG":"COMBATE","SAO_LOURENCO-MG":"COMBATE3","SETE_LAGOAS-MG":"COMBATE","TIMOTEO-MG":"COMBATE","UBA-MG":"COMBATE","VARGINHA-MG":"COMBATE","VESPASIANO-MG":"REGULAR","CAMPO_GRANDE-MS":"COMBATE2","CORUMBA-MS":"PRICEUPUNIFICADO","DOURADOS-MS":"REGULAR","MARACAJU-MS":"COMBATE2","BARRA_DO_GARCAS-MT":"COMBATE2","CACERES-MT":"COMBATE2","CUIABA-MT":"COMBATE2","JUINA-MT":"COMBATE2","PONTES_E_LACERDA-MT":"COMBATE2","PRIMAVERA_DO_LESTE-MT":"COMBATE2","RONDONOPOLIS-MT":"COMBATE2","SINOP-MT":"COMBATE2","TANGARA_DA_SERRA-MT":"COMBATE2","VARZEA_GRANDE-MT":"COMBATE2","ANANINDEUA-PA":"REGULAR","BELEM-PA":"REGULAR","CASTANHAL-PA":"COMBATE2","MARABA-PA":"COMBATE2","CAMPINA_GRANDE-PB":"LOWCOST","JOAO_PESSOA-PB":"LOWCOST","SANTA_LUZIA-PB":"LOWCOST","CABO_DE_SANTO_AGOSTINHO-PE":"LOWCOST","CARUARU-PE":"LOWCOST","GOIANA-PE":"LOWCOST","OLINDA-PE":"COMBATE","PETROLINA-PE":"LOWCOST","RECIFE-PE":"COMBATE","FLORIANO-PI":"COMBATE","PARNAIBA-PI":"COMBATE","PIRIPIRI-PI":"COMBATE","TERESINA-PI":"COMBATE","ALMIRANTE_TAMANDARE-PR":"REGULAR","ANDIRA-PR":"COMBATE","APUCARANA-PR":"COMBATE","ARAPONGAS-PR":"COMBATE","ARAUCARIA-PR":"REGULAR","ASTORGA-PR":"COMBATE","CAMBE-PR":"COMBATE","CAMPINA_GRANDE_DO_SUL-PR":"REGULAR","CAMPO_LARGO-PR":"COMBATE","CAMPO_MOURAO-PR":"COMBATE","CASCAVEL-PR":"COMBATE","CASTRO-PR":"COMBATE","CIANORTE-PR":"COMBATE","COLOMBO-PR":"REGULAR","COLORADO-PR":"COMBATE","CORNELIO_PROCOPIO-PR":"COMBATE","CURITIBA-PR":"REGULAR","FAZENDA_RIO_GRANDE-PR":"REGULAR","FLORESTA-PR":"COMBATE","FOZ_DO_IGUACU-PR":"COMBATE","FRANCISCO_BELTRAO-PR":"COMBATE","GUARAPUAVA-PR":"COMBATE","GUARATUBA-PR":"COMBATE","IBIPORA-PR":"COMBATE","IRATI-PR":"COMBATE","JANDAIA_DO_SUL-PR":"COMBATE","LONDRINA-PR":"COMBATE","MARECHAL_CANDIDO_RONDON-PR":"COMBATE","MARINGA-PR":"COMBATE","MATINHOS-PR":"COMBATE","MEDIANEIRA-PR":"COMBATE","PAICANDU-PR":"COMBATE","PALMAS-PR":"COMBATE","PARANAGUA-PR":"COMBATE","PATO_BRANCO-PR":"COMBATE","PINHAIS-PR":"REGULAR","PIRAQUARA-PR":"REGULAR","PONTA_GROSSA-PR":"REGULAR","QUATRO_BARRAS-PR":"REGULAR","RIBEIRAO_DO_PINHAL-PR":"COMBATE","SANTO_ANTONIO_DA_PLATINA-PR":"COMBATE","SAO_JOSE_DOS_PINHAIS-PR":"REGULAR","SAO_PEDRO_DO_IVAI-PR":"COMBATE","SAO_SEBASTIAO_DA_AMOREIRA-PR":"COMBATE","SARANDI-PR":"COMBATE","TELEMACO_BORBA-PR":"COMBATE","TOLEDO-PR":"COMBATE","UMUARAMA-PR":"COMBATE","UNIAO_DA_VITORIA-PR":"COMBATE","WENCESLAU_BRAZ-PR":"COMBATE","ANGRA_DOS_REIS-RJ":"REGULAR","ARARUAMA-RJ":"COMBATE3","ARMACAO_DOS_BUZIOS-RJ":"COMBATE","BARRA_DO_PIRAI-RJ":"COMBATE3","BARRA_MANSA-RJ":"COMBATE","BELFORD_ROXO-RJ":"REGULAR","CABO_FRIO-RJ":"COMBATE3","CAMPOS_DOS_GOYTACAZES-RJ":"COMBATE","CASIMIRO_DE_ABREU-RJ":"COMBATE","DUQUE_DE_CAXIAS-RJ":"REGULAR","ITAGUAI-RJ":"COMBATE2","MANGARATIBA-RJ":"COMBATE","MARICA-RJ":"COMBATE3","NILOPOLIS-RJ":"REGULAR","NITEROI-RJ":"COMBATE","NOVA_FRIBURGO-RJ":"COMBATE3","NOVA_IGUACU-RJ":"REGULAR","PARACAMBI-RJ":"COMBATE3","PETROPOLIS-RJ":"COMBATE","PINHEIRAL-RJ":"COMBATE3","QUEIMADOS-RJ":"REGULAR","RESENDE-RJ":"COMBATE","RIO_DE_JANEIRO-RJ":"REGULAR","SAO_GONCALO-RJ":"COMBATE2","SAO_JOAO_DE_MERITI-RJ":"REGULAR","SAO_PEDRO_DA_ALDEIA-RJ":"COMBATE3","SAQUAREMA-RJ":"COMBATE","TERESOPOLIS-RJ":"COMBATE","VALENCA-RJ":"COMBATE3","VOLTA_REDONDA-RJ":"COMBATE3","MOSSORO-RN":"LOWCOST","NATAL-RN":"LOWCOST","SAO_GONCALO_DO_AMARANTE-RN":"LOWCOST","CACOAL-RO":"COMBATE","JARU-RO":"COMBATE","JI_PARANA-RO":"REGULAR","OURO_PRETO_DO_OESTE-RO":"COMBATE","PIMENTA_BUENO-RO":"COMBATE","PORTO_VELHO-RO":"REGULAR","ROLIM_DE_MOURA-RO":"COMBATE","VILHENA-RO":"COMBATE","BOA_VISTA-RR":"REGULARUNIFICADO","ALEGRETE-RS":"COMBATE","ALVORADA-RS":"PRICEUPUNIFICADO","BAGE-RS":"COMBATE","BENTO_GONCALVES-RS":"REGULAR","CACHOEIRINHA-RS":"PRICEUPUNIFICADO","CAMAQUA-RS":"COMBATE","CAMPO_BOM-RS":"COMBATE","CANOAS-RS":"PRICEUPUNIFICADO","CARAZINHO-RS":"COMBATE","CAXIAS_DO_SUL-RS":"REGULAR","ELDORADO_DO_SUL-RS":"PRICEUPUNIFICADO","ERECHIM-RS":"COMBATE","ESTEIO-RS":"PRICEUPUNIFICADO","FARROUPILHA-RS":"REGULAR","FLORES_DA_CUNHA-RS":"REGULAR","GARIBALDI-RS":"REGULAR","GRAVATAI-RS":"PRICEUPUNIFICADO","GUAIBA-RS":"PRICEUPUNIFICADO","IJUI-RS":"COMBATE","LAJEADO-RS":"COMBATE","MARAU-RS":"COMBATE","MONTENEGRO-RS":"COMBATE","NOVO_HAMBURGO-RS":"COMBATE","PASSO_FUNDO-RS":"COMBATE","PELOTAS-RS":"REGULAR","PORTO_ALEGRE-RS":"PRICEUPUNIFICADO","RIO_GRANDE-RS":"REGULAR","ROSARIO_DO_SUL-RS":"COMBATE","SANTA_CRUZ_DO_SUL-RS":"COMBATE","SANTA_MARIA-RS":"REGULAR","SANTIAGO-RS":"COMBATE","SANTO_ANGELO-RS":"COMBATE","SAO_LEOPOLDO-RS":"PRICEUPUNIFICADO","SAO_LOURENCO_DO_SUL-RS":"REGULAR","SAPUCAIA_DO_SUL-RS":"PRICEUPUNIFICADO","TAQUARA-RS":"COMBATE","URUGUAIANA-RS":"COMBATE","VENANCIO_AIRES-RS":"COMBATE","VIAMAO-RS":"PRICEUPUNIFICADO","BALNEARIO_CAMBORIU-SC":"REGULAR","BLUMENAU-SC":"COMBATE","BRUSQUE-SC":"COMBATE","CHAPECO-SC":"COMBATE","CRICIUMA-SC":"COMBATE","FLORIANOPOLIS-SC":"COMBATE","GAROPABA-SC":"COMBATE","GUABIRUBA-SC":"COMBATE","ICARA-SC":"COMBATE","INDAIAL-SC":"COMBATE","ITAJAI-SC":"REGULAR","ITUPORANGA-SC":"COMBATE","JOINVILLE-SC":"REGULAR","LAGES-SC":"COMBATE","NAVEGANTES-SC":"REGULAR","PALHOCA-SC":"COMBATE","RIO_DO_SUL-SC":"COMBATE","TUBARAO-SC":"COMBATE","ARACAJU-SE":"COMBATE","ITABAIANA-SE":"COMBATE","CAMPINAS-SP":"COMBATE","GUARULHOS-SP":"COMBATE","JUNDIAI-SP":"COMBATE","MOGI_DAS_CRUZES-SP":"COMBATE","SAO_JOSE_DOS_CAMPOS-SP":"COMBATE","SAO_PAULO-SP":"COMBATE","SOROCABA-SP":"COMBATE","VOTORANTIM-SP":"COMBATE","GURUPI-TO":"COMBATE2","PALMAS-TO":"COMBATE2","PARAISO_DO_TOCANTINS-TO":"COMBATE2","PORTO_NACIONAL-TO":"COMBATE2","MARACANAU-CE":"LOWCOST","AGUAS_LINDAS_DE_GOIAS-DF":"COMBATE2","CEILANDIA-DF":"COMBATE2","CIDADE_OCIDENTAL-DF":"COMBATE2","CRUZEIRO-DF":"COMBATE2","GAMA-DF":"COMBATE2","GUARA-DF":"COMBATE2","NOVO_GAMA-DF":"COMBATE2","NUCLEO_BANDEIRANTE-DF":"COMBATE2","PARANOA-DF":"COMBATE2","PLANALTINA-DF":"COMBATE2","RECANTO_DAS_EMAS-DF":"COMBATE2","RIACHO_FUNDO-DF":"COMBATE2","SAMAMBAIA-DF":"COMBATE2","SANTA_MARIA-DF":"COMBATE2","SANTO_ANTONIO_DO_DESCOBERTO-DF":"COMBATE2","SOBRADINHO-DF":"COMBATE2","TAGUATINGA-DF":"COMBATE2","CARAPINA-ES":"COMBATE","ITAQUARI-ES":"COMBATE","SENADOR_CANEDO-GO":"COMBATE2","PACO_DO_LUMIAR-MA":"COMBATE","SAO_JOSE_DE_RIBAMAR-MA":"COMBATE","CONSELHEIRO_LAFAIETE-MG":"REGULAR","ESMERALDAS-MG":"REGULAR","IBIRITE-MG":"REGULAR","JUSTINOPOLIS-MG":"REGULAR","SABARA-MG":"REGULAR","SERRA_DEL_REI-MG":"REGULAR","VENDA_NOVA-MG":"REGULAR","CABEDELO-PB":"LOWCOST","ARCOVERDE-PE":"LOWCOST","JABOATAO_DOS_GUARARAPES-PE":"COMBATE","PAULISTA-PE":"COMBATE","CAMPO_MAGRO-PR":"REGULAR","COLONIA_FARIA-PR":"REGULAR","MARACANA-PR":"REGULAR","ROCA_GRANDE-PR":"REGULAR","SANTA_RITA-PR":"REGULAR","CAMINHO_DE_BUZIOS-RJ":"COMBATE3","CORREIAS-RJ":"COMBATE","ITABORAI-RJ":"COMBATE2","ITAIPAVA-RJ":"COMBATE","ITAIPUACU-RJ":"COMBATE3","JACUECANGA-RJ":"REGULAR","JARDIM_ARARAS-RJ":"COMBATE","MAMBUCABA-RJ":"REGULAR","MARAMBAIA-RJ":"COMBATE2","MARINA_PORTO_BUZIOS-RJ":"COMBATE","MESQUITA-RJ":"REGULAR","PEDRO_DO_RIO-RJ":"COMBATE","PIRAI-RJ":"COMBATE3","PORTO_BELO-RJ":"COMBATE","UNAMAR-RJ":"COMBATE3","VILAR_DOS_TELES-RJ":"REGULAR","VILA_ELZA-RS":"PRICEUPUNIFICADO","SAO_JOSE-SC":"COMBATE","HORTOLANDIA-SP":"COMBATE","BRAZILANDIA-DF":"COMBATE2","SAO_SEBASTIAO-DF":"COMBATE2","PEDRO_DE_ALCANTARA-RJ":"COMBATE2"};
const segmentacoes_precos = [
    {
        nome: "regular",
        produtos: [
            { nome: 400, preco: "109,90", mais_vendido: false, popup: true, banner: false },
            { nome: 500, preco: "119,90", mais_vendido: true, popup: false, banner: true },
            { nome: 1, preco: "199,90", mais_vendido: false, popup: false, banner: false },
        ],
    },
    {
        nome: "combate1",
        produtos: [
            { nome: 400, preco: "99,90", mais_vendido: false, popup: true, banner: false },
            { nome: 500, preco: "109,90", mais_vendido: true, popup: false, banner: true },
            { nome: 1, preco: "199,90", mais_vendido: false, popup: false, banner: false },
        ],
    },
    {
        nome: "combate2",
        produtos: [
            { nome: 400, preco: "99,90", mais_vendido: false, popup: false, banner: false },
            { nome: 500, preco: "119,90", mais_vendido: true, popup: true, banner: true },
            { nome: 1, preco: "199,90", mais_vendido: false, popup: false, banner: false },
        ],
    },
    {
        nome: "combate3",
        produtos: [
            { nome: 500, preco: "99,90", mais_vendido: true, popup: true, banner: true },
            { nome: 1, preco: "199,90", mais_vendido: false, popup: false, banner: false },
        ],
    },
    {
        nome: "lowcost",
        produtos: [
            { nome: 100, preco: "79,90", mais_vendido: false, popup: false, banner: false },
            { nome: 400, preco: "99,90", mais_vendido: false, popup: true, banner: false },
            { nome: 500, preco: "109,90", mais_vendido: true, popup: false, banner: true },
            { nome: 1, preco: "199,90", mais_vendido: false, popup: false, banner: false },
        ],
    },
    {
        nome: "regularunificado",
        produtos: [
            { nome: 400, preco: "109,90", mais_vendido: false, popup: true, banner: false },
            { nome: 500, preco: "119,90", mais_vendido: true, popup: false, banner: true },
            { nome: 1, preco: "199,90", mais_vendido: false, popup: false, banner: false },
        ],
    },
    {
        nome: "priceupunificado",
        produtos: [
            { nome: 400, preco: "119,90", mais_vendido: false, popup: true, banner: false },
            { nome: 500, preco: "129,90", mais_vendido: true, popup: false, banner: true },
            { nome: 1, preco: "199,90", mais_vendido: false, popup: false, banner: false },
        ],
    },
];
