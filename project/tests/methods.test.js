import methods from "../methods";

describe("Fucionalidades" , () => {
  describe("filterByYear()", () => {
    it("DeveRetornarPrimeiroBolsistaDe2013", async () => {
      expect(await methods.filterByYear(2013)).toEqual({
        Nome: 'JOSE QUERGINALDO BEZERRA',
        CPF: '***.283.554-**',
        Entidade_de_ensino: 'UNIVERSIDADE FEDERAL DO RIO GRANDE DO NORTE',
        Valor_bolsa: '1400'
      })
    }),
    it("DeveRetornarPrimeiroBolsistaDe2014", async () => {
      expect(await methods.filterByYear(2014)).toEqual({
        Nome: 'CAROLINE ALCANTARA DUARTE',
        CPF: '***.877.525-**',
        Entidade_de_ensino: 'UNIVERSIDADE DO ESTADO DA BAHIA',
        Valor_bolsa: '1100'
      })
    }),
    it("DeveRetornarPrimeiroBolsistaDe2015", async () => {
      expect(await methods.filterByYear(2015)).toEqual({
        Nome: 'CICERO SARAIVA SOBRINHO',
        CPF: '***.202.853-**',
        Entidade_de_ensino: 'UNIVERSIDADE DA INTEGRACAO INTERNACIONAL DA LUSOFONIA AFRO-BRASILEIRA',
        Valor_bolsa: '1300'
      })
    }),
    it("DeveRetornarPrimeiroBolsistaDe2016", async () => {
      expect(await methods.filterByYear(2016)).toEqual({
        Nome: 'ALEXANDRE RIBEIRO NETO',
        CPF: '***.195.647-**',
        Entidade_de_ensino: 'UNIVERSIDADE FEDERAL DO ESTADO DO RIO DE JANEIRO',
        Valor_bolsa: '765'
      })
    })
  }),
  describe("criptName()", () => {
    it("DeveCodificarEBuscarBolsistaComNomePortela", async () => {
      expect(await methods.criptName("portela")).toEqual({
        Nome: 'CMFUSPQ AFOJUSBN POVSB',
        Ano: '2016',
        Entidade_de_ensino: 'UNIVERSIDADE FEDERAL DE SANTA MARIA',
        Valor_bolsa: '765'
      })
    }),
    it("DeveCodificarEBuscarBolsistaComNomeGuStaVO",  async () => {
      expect(await methods.criptName("GuStaVo")).toEqual({
        Nome: 'MEOBMPS PSJFCJS PWBUTVH AJVP',
        Ano: '2016',
        Entidade_de_ensino: 'UNIVERSIDADE ESTADUAL DO NORTE FLUMINENSE DARCY RIBEIRO',
        Valor_bolsa: '765'
      })
    }),
    it("DeveCodificarEBuscarBolsistaComNomeADRIANA", async () => {
      expect(await methods.criptName("ADRIANA")).toEqual({
        Nome: 'BUMPIDT TVTFK FE BOBJSEA',
        Ano: '2016',
        Entidade_de_ensino: 'UNIVERSIDADE ESTADUAL DO CENTRO-OESTE',
        Valor_bolsa: '1300'
      })
    })
  }),
  describe("averageYear()", () => {
    it("DeveRetornarAMediaCorretaDoAnoDe2013", async () => {
      expect(await methods.averageYear(2013)).toBe("935.69")
    }),
    it("DeveRetornarAMediaCorretaDoAnoDe2014", async () => {
      expect(await methods.averageYear(2014)).toBe("936.24")
    }),
    it("DeveRetornarAMediaCorretaDoAnoDe2015", async () => {
      expect(await methods.averageYear(2015)).toBe("938.02")
    }),
    it("DeveRetornarAMediaCorretaDoAnoDe2016", async () => {
      expect(await methods.averageYear(2016)).toBe("966.90")
    })
  }),
  describe("showRankingsStudents()", () => {
    it("DeveRetornarOsTresMaioresEOsTresMenoresBolsistasEmRelacaoValorDeBolsa", async () => {
      expect(await methods.showRankingsStudents()).toEqual({
        Maiores_valores: [
          {
            NM_BOLSISTA: 'LIAMARA SCORTEGAGNA',
            CPF_BOLSISTA: '***.446.459-**',
            NM_ENTIDADE_ENSINO: 'UNIVERSIDADE FEDERAL DE JUIZ DE FORA',
            ME_REFERENCIA: '01',
            AN_REFERENCIA: '2016',
            SG_DIRETORIA: 'DED',
            SG_SISTEMA_ORIGEM: 'SGB',
            CD_MODALIDADE_SGB: '218',
            DS_MODALIDADE_PAGAMENTO: 'COORDENADORIA DE GERAL',
            CD_MOEDA: 'R$',
            VL_BOLSISTA_PAGAMENTO: '1500'
          },
          {
            NM_BOLSISTA: 'JOSE GLEBSON VIEIRA',
            CPF_BOLSISTA: '***.912.754-**',
            NM_ENTIDADE_ENSINO: 'UNIVERSIDADE FEDERAL DO RIO GRANDE DO NORTE',
            ME_REFERENCIA: '01',
            AN_REFERENCIA: '2016',
            SG_DIRETORIA: 'DED',
            SG_SISTEMA_ORIGEM: 'SGB',
            CD_MODALIDADE_SGB: '248',
            DS_MODALIDADE_PAGAMENTO: 'COORDENADORIA DE CURSO I',
            CD_MOEDA: 'R$',
            VL_BOLSISTA_PAGAMENTO: '1400'
          },
          {
            NM_BOLSISTA: 'MARIA ELZA BOCATTI ROSSINI',
            CPF_BOLSISTA: '***.180.719-**',
            NM_ENTIDADE_ENSINO: 'UNIVERSIDADE ESTADUAL DE LONDRINA',
            ME_REFERENCIA: '01',
            AN_REFERENCIA: '2016',
            SG_DIRETORIA: 'DED',
            SG_SISTEMA_ORIGEM: 'SGB',
            CD_MODALIDADE_SGB: '245',
            DS_MODALIDADE_PAGAMENTO: 'COORDENADOR DE TUTORIA',
            CD_MOEDA: 'R$',
            VL_BOLSISTA_PAGAMENTO: '1300'
          }
        ],
        Menores_valores: [
          {
            NM_BOLSISTA: 'ALEXANDRE RIBEIRO NETO',
            CPF_BOLSISTA: '***.195.647-**',
            NM_ENTIDADE_ENSINO: 'UNIVERSIDADE FEDERAL DO ESTADO DO RIO DE JANEIRO',
            ME_REFERENCIA: '01',
            AN_REFERENCIA: '2016',
            SG_DIRETORIA: 'DED',
            SG_SISTEMA_ORIGEM: 'SGB',
            CD_MODALIDADE_SGB: '253',
            DS_MODALIDADE_PAGAMENTO: 'TUTOR',
            CD_MOEDA: 'R$',
            VL_BOLSISTA_PAGAMENTO: '765'
          },
          {
            NM_BOLSISTA: 'ZENILTON ALBUQUERQUE LIRA',
            CPF_BOLSISTA: '***.619.612-**',
            NM_ENTIDADE_ENSINO: 'PREFEITURA MUNICIPAL DE JURUTI',
            ME_REFERENCIA: '01',
            AN_REFERENCIA: '2016',
            SG_DIRETORIA: 'DED',
            SG_SISTEMA_ORIGEM: 'SGB',
            CD_MODALIDADE_SGB: '244',
            DS_MODALIDADE_PAGAMENTO: 'COORDENADORIA DE POLO',
            CD_MOEDA: 'R$',
            VL_BOLSISTA_PAGAMENTO: '1100'
          },
          {
            NM_BOLSISTA: 'MARIA ELZA BOCATTI ROSSINI',
            CPF_BOLSISTA: '***.180.719-**',
            NM_ENTIDADE_ENSINO: 'UNIVERSIDADE ESTADUAL DE LONDRINA',
            ME_REFERENCIA: '01',
            AN_REFERENCIA: '2016',
            SG_DIRETORIA: 'DED',
            SG_SISTEMA_ORIGEM: 'SGB',
            CD_MODALIDADE_SGB: '245',
            DS_MODALIDADE_PAGAMENTO: 'COORDENADOR DE TUTORIA',
            CD_MOEDA: 'R$',
            VL_BOLSISTA_PAGAMENTO: '1300'
          }
        ]
      })
    })
  })
})