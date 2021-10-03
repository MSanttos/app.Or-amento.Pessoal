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

  recuperarTodosRegistros(){
    //array de despesas
    let despesas = []
    //alert('chegamos aqui')
    let id = localStorage.getItem('id')
    //recuperar despesas armazenadas no localStorage
    for(let i = 1; i <= id; i++) {
      //recupera despesas
      let despesa = JSON.parse(localStorage.getItem(i))
      //existe possibilidade de índices removido
      if(despesa === null) {
        continue
      }
      despesa.id = i
      despesas.push(despesa)
    }
    //console.log(despesas)
    return despesas
  }
  pesquisar(despesa) {

    let despesasFiltradas = []
    despesasFiltradas = this.recuperarTodosRegistros()

    console.log(despesa)
    console.log(despesasFiltradas)

    //ano
    if(despesa.dia != ''){
      console.log('dia')
      despesasFiltradas = despesasFiltradas.filter(paramIndice => paramIndice.dia == despesa.dia)
    }
    //mes
    if(despesa.mes != ''){
      console.log('mes')
      despesasFiltradas = despesasFiltradas.filter(paramIndice => paramIndice.mes == despesa.mes)
    }
    //dia
    if(despesa.ano != ''){
      console.log('ano')
      despesasFiltradas = despesasFiltradas.filter(paramIndice => paramIndice.ano == despesa.ano)
    }
    //tipo
    if(despesa.tipo != ''){
      console.log('tipo')
      despesasFiltradas = despesasFiltradas.filter(paramIndice => paramIndice.tipo == despesa.tipo)
    }
    //descricao
    if(despesa.descricao != ''){
      console.log('descricao')
      despesasFiltradas = despesasFiltradas.filter(paramIndice => paramIndice.descricao == despesa.descricao)
    }
    //valor
    if(despesa.valor != ''){
      console.log('valor')
      despesasFiltradas = despesasFiltradas.filter(paramIndice => paramIndice.valor == despesa.valor)
    }
    return despesasFiltradas
  }
  remover(id){
    localStorage.removeItem(id)
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

    db.gravar(despesa)

    $('#registraDespesa').modal('show')
    document.getElementById('modal-titulo-div').className = 'modal-header text-success'
    document.getElementById('modal-titulo-h5').innerHTML = 'Registro realizado com sucesso.'
    document.getElementById('modal-conteudo').innerHTML = '✔️ Despesa inserida com sucesso!'
    document.getElementById('modal-button').className = 'btn btn-primary'
    document.getElementById('modal-button').innerHTML = 'Voltar'

    //limpa campos após inserção
    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''

  } else {
    $('#registraDespesa').modal('show')
    document.getElementById('modal-titulo-div').className = 'modal-header text-danger'
    document.getElementById('modal-titulo-h5').innerHTML = 'Erro na gravação dos dados.'
    document.getElementById('modal-conteudo').innerHTML = '❌ Existem campos obrigatórios que não foram preenchidos.'
    document.getElementById('modal-button').className = 'btn btn-danger'
    document.getElementById('modal-button').innerHTML = 'Voltar e corrigir'
  }
}

function carregaListaDespesa(despesas = [], filter = false) {

  if(despesas.length == 0 && filter == false) {
    despesas = db.recuperarTodosRegistros()
  }
  //seleciona o elemento tbody da tabela
  let listaDespesas = document.getElementById('listaDespesas')
  listaDespesas.innerHTML = ''
  //percorrer arrya listando despesas de forma dinâmica
  despesas.forEach((paramDespesa) => {
    //console.log(paramDespesa)
    
    let linhas = listaDespesas.insertRow(paramDespesa) //criando linhas(tr)
    
    linhas.insertCell().innerHTML = `${paramDespesa.dia}/${paramDespesa.mes}/${paramDespesa.ano}` //criando (td)
    //ajustar tipo conversão de númeral para literal
    switch (paramDespesa.tipo){
      case '1': paramDespesa.tipo = 'Alimentação'
        break
      case '2': paramDespesa.tipo = 'Educação'
        break
      case '3': paramDespesa.tipo = 'Lazer'
        break
      case '4': paramDespesa.tipo = 'Saúde'
        break
      case '5': paramDespesa.tipo = 'Transporte'
        break
    }
    linhas.insertCell().innerHTML = `${paramDespesa.tipo}` //criando (td)
    linhas.insertCell().innerHTML = paramDespesa.descricao //criando (td)
    linhas.insertCell().innerHTML = paramDespesa.valor //criando (td)
    //botão exclusão
    let button = document.createElement('button')
    button.className = 'btn btn-danger'//estilizando button
    button.innerHTML = '<i class="fa fa-times"></i>'
    button.id = `id_despesa_ ${paramDespesa.id}`
    button.onclick = function() {
     //alert(this.id)//this.id recupera o procpio di selecionado
      let id = this.id.replace('id_despesa_', '')
      //alert(id)
      db.remover(paramDespesa.id)

      window.location.reload()

    }//adicionando icon no button
    linhas.insertCell().append(button) //criando (botão excluir)
    console.log(paramDespesa)
  })
}

/*----------------------Comparação----------------------*/
//isto:
//    despesas.forEach((paramDespesa) => {
//      console.log(paramDespesa)
//    })

//é igual a isto
//    despesas.forEach(function(paramDespesa) {
//      console.log(paramDespesa)
//    })
/*-------------------------------------------------------*/

function pesquisarDespesa(){
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

  let despesas = db.pesquisar(despesa)

  this.carregaListaDespesa(despesas, true)
}