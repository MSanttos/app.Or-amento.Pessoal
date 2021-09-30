class Despesa{
  constructor(ano, mes, dia, tipo, descricao, valor){
    this.ano = ano
    this.mes = mes
    this.dia = dia 
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }
}

class BancoDados{

  constructor(){
    let id = localStorage.getItem('id')

    if(id === null){
      localStorage.setItem('id', 0)
    }
  }

  getProximoId(){
    let proximoId = localStorage.getItem('id')//null
    return parseInt(proximoId) + 1
  }

  gravar(paramDespesa){

    let id = this.getProximoId()

    localStorage.setItem(id, JSON.stringify(paramDespesa))

    localStorage.setItem('id', id)
    
  }
}
//instanciar classe
let bancodados = new BancoDados()

function cadastrarDespesa(){
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  //Debug console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )
  bancodados.gravar(despesa)
}
