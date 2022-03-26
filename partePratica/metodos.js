import csv from 'csvtojson';

const metodos = {
  bolsistas: await csv().fromFile('./src/data.csv'),
  filtrarPorAno(ano){
    let filtrados = [];
    let bolsistaSelecionado;

    filtrados = this.bolsistas.filter(item => {
      return item.AN_REFERENCIA == ano
    })
  
    bolsistaSelecionado = filtrados[0];

    if(bolsistaSelecionado == null){
      return undefined;
    }

    return {
      Nome: bolsistaSelecionado.NM_BOLSISTA,
      CPF: bolsistaSelecionado.CPF_BOLSISTA,
      Entidade_de_ensino: bolsistaSelecionado.NM_ENTIDADE_ENSINO,
      Valor_bolsa: bolsistaSelecionado.VL_BOLSISTA_PAGAMENTO,
    }
  },
  codificaNome(palavra){
    let palavraTransformada = palavra.toUpperCase();
    palavraTransformada = palavraTransformada.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '');

    let nomeBuscado = this.bolsistas.filter(item => {
      let bolsistaAtual = item.NM_BOLSISTA;

      if(bolsistaAtual.includes(palavraTransformada)){
        return bolsistaAtual
      }

    })

    const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A']
  
    let bolsistaSelecionado = nomeBuscado[0];

    if(bolsistaSelecionado == null){
      return undefined;
    }

    let nomeBolsista = bolsistaSelecionado.NM_BOLSISTA

    nomeBolsista = nomeBolsista.split('')    
  
    for(let i = 0; i < nomeBolsista.length; i++){
        let indexCaracter = alfabeto.indexOf(nomeBolsista[i])
        
        if(indexCaracter!= -1){
          nomeBolsista[i] = alfabeto[indexCaracter+1]
        }
    }
  
    let aux = nomeBolsista[0]
  
    nomeBolsista[0] = nomeBolsista[nomeBolsista.length - 1]
    nomeBolsista[nomeBolsista.length - 1] = aux
  
   if(nomeBolsista.length > 3){
     bolsistaSelecionado.NM_BOLSISTA = nomeBolsista.reverse().join('')
   }
  
    bolsistaSelecionado.NM_BOLSISTA = nomeBolsista.join('')

    return {
      Nome: bolsistaSelecionado.NM_BOLSISTA,
      Ano: bolsistaSelecionado.AN_REFERENCIA,
      Entidade_de_ensino: bolsistaSelecionado.NM_ENTIDADE_ENSINO,
      Valor_bolsa: bolsistaSelecionado.VL_BOLSISTA_PAGAMENTO
    }
  },
  mediaPorAno(ano){
    let totalValor = [];

    this.bolsistas.forEach(item => {
      if(item.AN_REFERENCIA == parseInt(ano)){
        let numItem = Number(item.VL_BOLSISTA_PAGAMENTO)
        totalValor.push(numItem)
      }
    })

    if(totalValor.length == 0){
      return undefined
    } else {
      return (totalValor.reduce((a,b) => a+b)/totalValor.length).toFixed(2)
    }
  },
  mostraRankinsBolsistas(){
    const valoresBolsistas = []
    this.bolsistas.forEach(bols => valoresBolsistas.push(bols.VL_BOLSISTA_PAGAMENTO))
    
    const valoresBolsistasUnicos = [...new Set(valoresBolsistas)]
    const valoresEmOrdem = valoresBolsistasUnicos.sort((a,b) => a-b)

    const bolsistasComValores = []
    
    valoresEmOrdem.forEach(valor => {
      bolsistasComValores.push(this.bolsistas.find(bolsista => bolsista.VL_BOLSISTA_PAGAMENTO == valor))
    })

    let maiores = bolsistasComValores.slice(-3)
    let menores = bolsistasComValores.slice(0,3)

        
    return {
      Maiores_valores: maiores,
      Menores_valores: menores, 
    }
  }
}


export default metodos;


