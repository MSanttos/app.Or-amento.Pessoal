class Despesa{
  constructor(ano, mes, dia, tipo, descricao, valor){
    this.ano = ano
    this.mes = mes
    this.dia = dia 
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDados(){
    for(let i in this){
      // console.log(i, this[i])
      if(this[i] == undefined || this[i] == null || this[i] == ''){
        return false
      }
    }
    return true
  }
}

class DB{

  constructor(){
    let id = localStorage.getItem('id')

    if(id === null){
      localStorage.setItem('id', 0)
    }
  }

  getProximoId(){
    let proximoId = localStorage.getItem('id')
    return parseInt(proximoId) + 1
  }

  gravar(paramDespesa){

    let id = this.getProximoId()

    localStorage.setItem(id, JSON.stringify(paramDespesa))

    localStorage.setItem('id', id)
    
  }
}
//instanciar classe
let db = new DB()

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

  if(despesa.validarDados()){
    //db.gravar(despesa)
    $('#registraDespesa').modal('show')
    document.getElementById('modal-titulo-div').className = 'modal-header text-success'
    document.getElementById('modal-titulo-h5').innerHTML = 'Registro realizado com sucesso.'
    document.getElementById('modal-conteudo').innerHTML = '✔️ Despesa inserida com sucesso!'
    document.getElementById('modal-button').className = 'btn btn-primary'
    document.getElementById('modal-button').innerHTML = 'Voltar'
  } else {
    $('#registraDespesa').modal('show')
    document.getElementById('modal-titulo-div').className = 'modal-header text-danger'
    document.getElementById('modal-titulo-h5').innerHTML = 'Erro na gravação dos dados.'
    document.getElementById('modal-conteudo').innerHTML = '❌ Existem campos obrigatórios que não foram preenchidos.'
    document.getElementById('modal-button').className = 'btn btn-danger'
    document.getElementById('modal-button').innerHTML = 'Voltar e corrigir'
  }
}
