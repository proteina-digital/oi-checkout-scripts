const segmentacoes = { "ABELARDO_LUZ-SC": "REGULAR", "AGUA_FRIA-CE": "COMBATE1", "AGUAS_LINDAS_DE_GOIAS-GO": "REGULAR", "ALEGRETE-RS": "COMBATE2", "ALMIRANTE_TAMANDARE-PR": "COMBATE2", "ALTA_FLORESTA_DO_OESTE-RO": "REGULAR", "ALVORADA-RS": "REGULAR", "AMAPA-AP": "REGULAR", "ANANINDEUA-PA": "COMBATE2", "ANAPOLIS-GO": "COMBATE2", "ANDIRA-PR": "COMBATE2", "ANGRA_DOS_REIS-RJ": "PRACASLIDERANCAS1", "APARECIDA_DE_GOIANIA-GO": "COMBATE2", "ARACAJU-SE": "COMBATE1", "ARAGUARI-MG": "COMBATE2", "ARAPIRACA-AL": "REGULAR", "ARARUAMA-RJ": "COMBATE1", "ARAUCARIA-PR": "COMBATE2", "ARCOVERDE-PE": "COMBATE1", "ARMACAO_DOS_BUZIOS-RJ": "COMBATE2", "BARRA_DO_GARCAS-MT": "REGULAR", "BARRA_DO_PIRAI-RJ": "COMBATE2", "BARRA_MANSA-RJ": "COMBATE2", "BARREIRAS-BA": "REGULAR", "BELEM-PA": "COMBATE2", "BELFORD_ROXO-RJ": "REGULAR", "BELO_HORIZONTE-MG": "COMBATE2", "BERTIOGA-PR": "REGULAR", "BETIM-MG": "COMBATE2", "BLUMENAU-SC": "COMBATE2", "BOA_VISTA-RR": "PRACASLIDERANCAS1", "BOCAIUVA-MG": "REGULAR", "BRASILIA-DF": "REGULAR", "BRUSQUE-SC": "REGULAR", "CABO_FRIO-RJ": "COMBATE1", "CACERES-MT": "COMBATE2", "CACHOEIRO_DE_ITAPEMIRIM-ES": "COMBATE2", "CACOAL-RO": "REGULAR", "CAMAQUA-RS": "COMBATE2", "CAMINHO_DE_BUZIOS-RJ": "COMBATE1", "CAMPINA_GRANDE-PB": "COMBATE1", "CAMPO_GRANDE-MS": "REGULAR", "CAMPOS_DOS_GOYTACAZES-RJ": "COMBATE1", "CANOAS-RS": "REGULAR", "CARAPINA-ES": "COMBATE2", "CARAZINHO-RS": "COMBATE2", "CARIACICA-ES": "COMBATE2", "CARUARU-PE": "COMBATE1", "CASCAVEL-PR": "COMBATE2", "CASIMIRO_DE_ABREU-RJ": "COMBATE1", "CATAGUASES-MG": "COMBATE1", "CAXIAS_DO_SUL-RS": "COMBATE2", "CEILANDIA-DF": "REGULAR", "CENTRO_PRIMAVERA-MT": "REGULAR", "CHAPECO-SC": "COMBATE1", "CIDADE_OCIDENTAL-GO": "REGULAR", "COLOMBO-PR": "COMBATE2", "COLONIA_FARIA-PR": "REGULAR", "COLORADO_DO_OESTE-RO": "REGULAR", "CONSELHEIRO_LAFAIETE-MG": "COMBATE2", "CONTAGEM-MG": "COMBATE2", "CORREIAS-RJ": "REGULAR", "CORUPA-SC": "REGULAR", "CRICIUMA-SC": "COMBATE2", "CUIABA-MT": "COMBATE2", "CURITIBA-PR": "COMBATE2", "DIVINOPOLIS-MG": "COMBATE2", "DOURADOS-MS": "REGULAR", "DUQUE_DE_CAXIAS-RJ": "REGULAR", "ELDORADO_DO_SUL-RS": "COMBATE2", "EMBRAPA-MS": "REGULAR", "ESMERALDAS-MG": "COMBATE2", "ESPIGAO_DO_OESTE-RO": "REGULAR", "ESTANCIA_VELHA-RS": "REGULAR", "EUNAPOLIS-BA": "COMBATE2", "FEIRA_DE_SANTANA-BA": "COMBATE1", "FLORESTA-PR": "COMBATE2", "FLORIANO-PI": "COMBATE2", "FLORIANOPOLIS-SC": "REGULAR", "FORTALEZA-CE": "COMBATE1", "FOZ_DO_IGUACU-PR": "REGULAR", "GARIBALDI-RS": "COMBATE2", "GOIANIA-GO": "COMBATE2", "GOVERNADOR_VALADARES-MG": "COMBATE1", "GRAVATAI-RS": "COMBATE2", "GUAIBA-RS": "COMBATE2", "GUARAI-TO": "REGULAR", "GUARULHOS-SP": "COMBATE2", "GURUPI-TO": "COMBATE2", "ICARA-SC": "COMBATE2", "IGUATU-CE": "COMBATE2", "ILHEUS-BA": "COMBATE2", "IMPERATRIZ-MA": "COMBATE2", "INDAIAL-SC": "REGULAR", "IRAI-PR": "REGULAR", "ITABORAI-RJ": "REGULAR", "ITABUNA-BA": "COMBATE1", "ITAGUAI-RJ": "COMBATE2", "ITAIPAVA-RJ": "REGULAR", "ITAIPUACU-RJ": "COMBATE2", "ITAJAI-SC": "COMBATE2", "ITUPORANGA-SC": "COMBATE2", "JACARAIPE-ES": "COMBATE2", "JACOBINA-BA": "COMBATE1", "JACUECANGA-RJ": "PRACASLIDERANCAS1", "JARDIM_ARARAS-RJ": "REGULAR", "JARU-RO": "COMBATE2", "JATAI-GO": "COMBATE2", "JD_GLORIA-MT": "REGULAR", "JEQUIE-BA": "COMBATE1", "JI_PARANA-RO": "REGULAR", "JOAO_PESSOA-PB": "COMBATE1", "JOINVILLE-SC": "REGULAR", "JUAZEIRO-BA": "COMBATE1", "JUAZEIRO_DO_NORTE-CE": "COMBATE1", "JUINA-MT": "COMBATE2", "JUIZ_DE_FORA-MG": "COMBATE1", "JUSCIMEIRA-MT": "REGULAR", "JUSTINOPOLIS-MG": "COMBATE2", "LAGES-SC": "COMBATE2", "LAGOA_SANTA-MG": "REGULAR", "LAURENTINO-SC": "REGULAR", "LAURO_DE_FREITAS-BA": "REGULAR", "LEOPOLDINA-MG": "REGULAR", "LONDRINA-PR": "REGULAR", "MACAPA-AP": "COMBATE2", "MACEIO-AL": "COMBATE1", "MAFRA-SC": "REGULAR", "MAMBUCABA-RJ": "PRACASLIDERANCAS1", "MANAUS-AM": "COMBATE2", "MANGARATIBA-RJ": "REGULAR", "MARABA-PA": "COMBATE2", "MARACAJU-MS": "REGULAR", "MARACANA-PR": "REGULAR", "MARACANAU-CE": "COMBATE1", "MARAMBAIA-RJ": "REGULAR", "MARAU-RS": "COMBATE2", "MARECHAL_DEODORO-AL": "COMBATE2", "MARICA-RJ": "COMBATE2", "MARINA_PORTO_BUZIOS-RJ": "REGULAR", "MARINGA-PR": "REGULAR", "MEDIANEIRA-PR": "COMBATE2", "MESQUITA-RJ": "REGULAR", "MONTE_NEGRO-RO": "REGULAR", "MONTES_CLAROS-MG": "COMBATE2", "MORRINHOS-GO": "COMBATE1", "NATAL-RN": "COMBATE1", "NAVEGANTES-SC": "COMBATE2", "NILOPOLIS-RJ": "REGULAR", "NITEROI-RJ": "COMBATE2", "NOVA_FRIBURGO-RJ": "COMBATE1", "NOVA_IGUACU-RJ": "REGULAR", "NOVA_LIMA-MG": "COMBATE2", "NOVA_VENECIA-ES": "REGULAR", "NOVO_GAMA-GO": "REGULAR", "NOVO_HAMBURGO-RS": "COMBATE2", "OLINDA-PE": "COMBATE1", "OROS-CE": "REGULAR", "OURO_PRETO_DO_OESTE-RO": "REGULAR", "PAICANDU-PR": "COMBATE2", "PALMAS-TO": "COMBATE2", "PARACAMBI-RJ": "COMBATE2", "PARANAGUA-PR": "COMBATE2", "PARNAIBA-PI": "COMBATE2", "PASSO_FUNDO-RS": "COMBATE2", "PATOS-PB": "REGULAR", "PATROCINIO-MG": "COMBATE2", "PAULISTA-PE": "COMBATE1", "PAULO_AFONSO-BA": "COMBATE2", "PEDRO_DE_ALCANTARA-RJ": "REGULAR", "PEDRO_DO_RIO-RJ": "REGULAR", "PELOTAS-RS": "COMBATE2", "PETROLINA-PE": "COMBATE1", "PETROPOLIS-RJ": "REGULAR", "PINHAIS-PR": "COMBATE2", "PIRAQUARA-PR": "COMBATE2", "PIRIPIRI-PI": "COMBATE2", "PLANALTINA-DF": "REGULAR", "PLANALTINA-GO": "REGULAR", "POCOS_DE_CALDAS-MG": "COMBATE1", "PONTA_GROSSA-PR": "COMBATE2", "PONTES_E_LACERDA-MT": "REGULAR", "PORTO_ALEGRE-RS": "REGULAR", "PORTO_BELO-RJ": "REGULAR", "PORTO_NACIONAL-TO": "COMBATE2", "PORTO_SEGURO-BA": "COMBATE1", "PORTO_VELHO-RO": "PRACASLIDERANCAS1", "POUSO_ALEGRE-MG": "COMBATE1", "PRIMAVERA_DO_LESTE-MT": "COMBATE2", "QUEIMADOS-RJ": "REGULAR", "QUIXERE-CE": "REGULAR", "RECIFE-PE": "COMBATE1", "RIACHO_FUNDO-DF": "REGULAR", "RIBEIRAO_DAS_NEVES-MG": "COMBATE2", "RIBEIRAO_DO_PINHAL-PR": "REGULAR", "RIO_BONITO-RJ": "REGULAR", "RIO_BRANCO-AC": "PRACASLIDERANCAS1", "RIO_BRILHANTE-MS": "REGULAR", "RIO_DE_JANEIRO-RJ": "REGULAR", "RIO_DO_SUL-SC": "COMBATE2", "RIO_VERDE-GO": "COMBATE1", "ROCA_GRANDE-PR": "REGULAR", "ROLIM_DE_MOURA-RO": "REGULAR", "RONDONOPOLIS-MT": "REGULAR", "ROSARIO_DO_SUL-RS": "COMBATE2", "SALETE-SC": "REGULAR", "SALVADOR-BA": "REGULAR", "SANTA_CRUZ_DO_SUL-RS": "COMBATE2", "SANTA_INES-MA": "REGULAR", "SANTA_LUZIA-PB": "COMBATE2", "SANTA_MARIA-RS": "REGULAR", "SANTA_RITA-PR": "REGULAR", "SANTO_ANGELO-RS": "COMBATE2", "SANTO_ANTONIO_DO_DESCOBERTO-GO": "COMBATE2", "SAO_GABRIEL_DA_PALHA-ES": "REGULAR", "SAO_GONCALO-RJ": "REGULAR", "SAO_JOAO_DE_MERITI-RJ": "REGULAR", "SAO_JOSE-SC": "REGULAR", "SAO_JOSE_DOS_PINHAIS-PR": "COMBATE2", "SAO_LEOPOLDO-RS": "REGULAR", "SAO_LOURENCO-MG": "COMBATE1", "SAO_LOURENCO_DO_SUL-RS": "COMBATE2", "SAO_LUIS-MA": "COMBATE2", "SAO_PAULO-SP": "COMBATE2", "SAO_PEDRO_DA_ALDEIA-RJ": "COMBATE1", "SAQUAREMA-RJ": "REGULAR", "SEROPEDICA-RJ": "REGULAR", "SERRA-ES": "COMBATE2", "SERRA_DEL_REI-MG": "COMBATE2", "SETE_LAGOAS-MG": "COMBATE2", "SINOP-MT": "COMBATE1", "SOBRADINHO-DF": "REGULAR", "SUDOESTE-GO": "REGULAR", "TAGUATINGA-DF": "REGULAR", "TANGARA_DA_SERRA-MT": "COMBATE2", "TAQUARALTO-TO": "REGULAR", "TEIXEIRA_DE_FREITAS-BA": "COMBATE2", "TELEMACO_BORBA-PR": "REGULAR", "TEOFILO_OTONI-MG": "REGULAR", "TERESINA-PI": "COMBATE1", "TERESOPOLIS-RJ": "COMBATE1", "TUBARAO-SC": "REGULAR", "UBA-MG": "REGULAR", "UNAMAR-RJ": "COMBATE1", "UNIAO_DA_VITORIA-PR": "COMBATE2", "VALENCA-RJ": "COMBATE2", "VARGINHA-MG": "COMBATE1", "VARZEA_GRANDE-MT": "COMBATE2", "VENDA_NOVA-MG": "REGULAR", "VESPASIANO-MG": "COMBATE2", "VIAMAO-RS": "REGULAR", "VIDEIRA-SC": "REGULAR", "VILA_ELZA-RS": "REGULAR", "VILA_VELHA-ES": "COMBATE2", "VILAR_DOS_TELES-RJ": "REGULAR", "VILHENA-RO": "REGULAR", "VITORIA-ES": "COMBATE2", "VITORIA_DA_CONQUISTA-BA": "COMBATE1", "VOLTA_REDONDA-RJ": "COMBATE2", "XISTO-PR": "REGULAR", "CACHOEIRINHA-RS": "COMBATE2", "GUARATUBA-PR": "COMBATE2", "WENCESLAU_BRAZ-PR": "COMBATE2", "CAXAMBU-MG": "COMBATE1", "GAROPABA-SC": "COMBATE2", "LUIS_EDUARDO_MAGALHAES-BA": "REGULAR", "JANDAIA_DO_SUL-PR": "REGULAR", "GUABIRUBA-SC": "REGULAR", "ITABAIANA-SE": "COMBATE2", "TRINDADE-GO": "COMBATE2", "PALMAS-PR": "COMBATE2", "ITAQUARI-ES": "COMBATE2", "SANTA_MARIA-GO": "REGULAR", "SABARA-MG": "COMBATE2", "PARAISO_DO_TOCANTINS-TO": "COMBATE2", "SAO_PEDRO_DO_IVAI-PR": "COMBATE2", "SAO_SEBASTIAO_DA_AMOREIRA-PR": "REGULAR", "SAO_JOSE_DE_RIBAMAR-MA": "REGULAR", "CABEDELO-PB": "COMBATE1", "ESTEIO-RS": "COMBATE2", "IMBITUBA-SC": "REGULAR", "ITABIRA-MG": "COMBATE2", "JOAO_MONLEVADE-MG": "COMBATE2", "CAMBE-PR": "COMBATE2", "CABO_DE_SANTO_AGOSTINHO-PE": "COMBATE2", "CAMPINAS-SP": "COMBATE2", "SANTA_LUZIA-MG": "COMBATE2", "CRUZEIRO-DF": "REGULAR", "JABOATAO_DOS_GUARARAPES-PE": "COMBATE1", "GOIANA-PE": "COMBATE2", "MARITUBA-PA": "REGULAR", "CONCEICAO_DE_JACAREI-RJ": "REGULAR", "CASTANHAL-PA": "COMBATE2", "CATALAO-GO": "COMBATE2", "VIANA-ES": "COMBATE2", "SANTA_MARIA-DF": "REGULAR", "NOVO_GAMA-DF": "REGULAR", "ARNIQUEIRA-DF": "REGULAR", "CANDANGOLANDIA-DF": "REGULAR", "GAMA-DF": "REGULAR", "GUARA-DF": "REGULAR", "NUCLEO_BANDEIRANTE-DF": "REGULAR", "VALPARAISO_DE_GOIAS-GO": "REGULAR", "VICENTE_PIRES-DF": "REGULAR", "CIDADE_OCIDENTAL-DF": "REGULAR", "SANTO_ANTONIO_DO_DESCOBERTO-DF": "COMBATE2", "IJUI-RS": "REGULAR", "SAO_BENTO_DO_SUL-SC": "REGULAR", "SAO_FRANCISCO_DO_SUL-SC": "REGULAR", "SIMOES_FILHO-BA": "REGULAR", "GUARAPUAVA-PR": "REGULAR", "CAMPO_MOURAO-PR": "REGULAR", "IBIPORA-PR": "REGULAR", "MARECHAL_CANDIDO_RONDON-PR": "REGULAR", "SOBRAL-CE": "COMBATE2", "SENADOR_CANEDO-GO": "COMBATE2", "AGUAS_LINDAS_DE_GOIAS-DF": "COMBATE1" };
