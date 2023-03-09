// importar express
var express = require('express');
// importar o handlebars
const exphbs = require('express-handlebars')
const mysql = require('mysql');
// variável para definir o express
var app = express();
var port = 3000

// configuração handlebars

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


//rotas 
//rota raiz
app.get('/', (req, res) => {
    res.render('locacoes/home', { layout: false })
})


//rota da seção de cadastro
app.get('/cadastrarNovaLocacao', (req, res) => {
    res.render('locacoes/cadastrarNovaLocacao', { layout: false })
})


//express url
app.use(
        express.urlencoded({
            extended: true

        })
    )
    //rota para inserir dados
app.post('/exibirTodasLocacoes/insertprod', (req, res) => {
    const cnpj = req.body.cnpj
    const nome = req.body.nome
    const endereco = req.body.endereco
    const localidade = req.body.localidade
    const capacidade = req.body.capacidade

    const sql = `INSERT INTO locacoes (cnpj, nome_locacao, endereco, localidade, capacidade) VALUES ('${cnpj}', '${nome}', '${endereco}', '${localidade}', '${capacidade}')`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/cadastrarNovaLocacao')
    })
})

//rota de consulta geral
app.get('/exibirTodasLocacoes', (req, res) => {
    const sql = 'SELECT * FROM locacoes'

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listar = data

        console.log(listar)

        res.render('locacoes/exibirTodasLocacoes', { layout: false, listar })

    })
})

// consulta um registo pelo id (produto.handlebars)
app.get('/exibirTodasLocacoes/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM locacoes WHERE id = ${id}`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarProd = data[0]
        res.render('locacoes/detalheIndividualLocacao', { layout: false, listarProd })

    })
})

//rota do buscar
app.get('/buscandoLocacao', (req, res) => {
    res.render('locacoes/buscarLocacao', { layout: false })
})

//rota busc para exibir o resultado do buscar
app.post('/buscandoLocacao/', (req, res) => {
    const nome_locacao = req.body.nome
    const sql = `SELECT * FROM locacoes WHERE nome_locacao LIKE "${nome_locacao}%"`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarProd = data[0]
        res.render('locacoes/detalheIndividualLocacao', { layout: false, listarProd })
    })
})


//rota para editar registro - Coleta de dados para edição
app.get('/exibirTodasLocacoes/editLocacoes/:id', (req, res) => {

    const id = req.params.id

    const sql = `SELECT * FROM locacoes where id = ${id}`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const prod = data[0]
        res.render('locacoes/editLocacoes', { layout: false, prod })

    })
})


//rota de edicao do registro com post
app.post('/exibirTodasLocacoes/updateprod', (req, res) => {

    const id = req.body.id
    const cnpj = req.body.cnpj
    const nome = req.body.nome
    const endereco = req.body.endereco
    const localidade = req.body.localidade
    const capacidade = req.body.capacidade

    const sql = `UPDATE locacoes SET cnpj = '${cnpj}', nome_locacao = '${nome}', endereco = '${endereco}', localidade = '${localidade}', capacidade = '${capacidade}' WHERE id = '${id}'`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/exibirTodasLocacoes')
    })

})


//rota para deletar um registro
app.get('/exibirTodasLocacoes/remove/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM locacoes WHERE id = '${id}'`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/exibirTodasLocacoes')
    })
})

app.get('/cadastro_prod', (req, res) =>{
    res.render('produtos/cadastro_produto', {layout: false})
})
// rota de cadastro
  app.post('/prod/insertprod', (req, res) => {
    const nome = req.body.nome
    const qtd = req.body.qtd
    const fornecedor = req.body.fornecedor

    const sql = `INSERT INTO produto (nome, qtd, fornecedor) VALUES ('${nome}', '${qtd}','${fornecedor}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
  
        res.redirect('/')
    })
  })
  //rota de consulta geral
  app.get('/produto', (req, res) => {
    const sql = 'SELECT * FROM produto'

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
    
        const listar = data
        
        console.log(listar)

        res.render('produtos/prod', { layout: false, listar })

    })
})
//consulta a um produto especifico
app.get('/produto/:id', (req, res) => {
    const id = req.params.id
    
    const sql = `SELECT * FROM produto WHERE id = ${id}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const listarProd = data[0]
        res.render('produtos/produto', {  layout: false, listarProd } )
  
    })
  })
   // rotas de busca
  app.get('/buscando_produto', (req, res) => {
    res.render('produtos/busca_produto', { layout: false })
  })
 
  app.post('/buscaprod/', (req, res) => {
    const nome = req.body.nome
    const sql = `SELECT * FROM produto WHERE nome LIKE  '%${nome}%'`
  
    conn.query(sql, function(err, data){
       if(err){
       console.log(err)
        return
      }
       const listarProd = data[0]
       res.render('produtos/produto', {  layout: false, listarProd } )
       })
      })
 //rota de visualização de produtos especificos
app.get('/produto/edit/:id', (req, res) => {
    
    const id = req.params.id

    const sql = `SELECT * FROM produto where id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const prod = data[0]
        res.render('produtos/edit_produto', { layout: false, prod } )

    })
})
//rota de edicao do registro com post
app.post('/produto/updateprod', (req, res) => {

  const id = req.body.id
  const nome = req.body.nome
  const quant = req.body.quant
  const fornecedor = req.body.fornecedor
  const sql = `UPDATE produto SET nome = '${nome}', qtd = '${quant}', fornecedor ='${fornecedor}' WHERE id = '${id}'` 

  conn.query(sql, function(err) {
      if(err){
          console.log(err)
          return
      }

      res.redirect('/produto')
  })

})
//rota para deletar um registro
app.get('/produto/remove/:id', (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM produto WHERE id = '${id}'`

  conn.query(sql, function(err){
      if(err){
          console.log(err)
          return
      }

      res.redirect('/produto')
  })
})
//rota da seção de cadastro
app.get('/cadastrarNovoServico', (req, res) => {
    res.render('servicos/cadastrarNovoServico', { layout: false })
})
app.post('/exibirTodosServicos/insertprod', (req, res) => {
    const nome = req.body.nome
    const preco = req.body.preco
    const embrulho = req.body.embrulho
    const locacao = req.body.locacao
    const descricao = req.body.descricao

    const sql = `INSERT INTO servico (nome, preco, embrulho, locacao, descricao) VALUES ('${nome}', '${preco}', '${embrulho}', '${locacao}', '${descricao}')`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/cadastrarNovoServico')
    })
})

//rota de consulta geral
app.get('/exibirTodosServicos', (req, res) => {
    const sql = 'SELECT * FROM servico'

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listar = data

        console.log(listar)

        res.render('servicos/exibirTodosServicos', { layout: false, listar })

    })
})

// consulta um registo pelo id (produto.handlebars)
app.get('/exibirTodosServicos/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM servico WHERE id = ${id}`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarProd = data[0]
        res.render('servicos/detalheIndividualServico', { layout: false, listarProd })

    })
})

//rota do buscar
app.get('/buscandoServico', (req, res) => {
    res.render('servicos/buscarServico', { layout: false })
})

//rota busc para exibir o resultado do buscar
app.post('/buscandoServico/', (req, res) => {
    const nome = req.body.nome
    const sql = `SELECT * FROM servico WHERE nome LIKE "%${nome}%"`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarProd = data[0]
        res.render('servicos/detalheIndividualServico', { layout: false, listarProd })
    })
})


//rota para editar registro - Coleta de dados para edição
app.get('/exibirTodosServicos/editServico/:id', (req, res) => {

    const id = req.params.id

    const sql = `SELECT * FROM servico where id = ${id}`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const prod = data[0]
        res.render('servicos/editServico', { layout: false, prod })

    })
})


//rota de edicao do registro com post
app.post('/exibirTodosServicos/updateprod', (req, res) => {

    const id = req.body.id
    const nome = req.body.nome
    const preco = req.body.preco
    const embrulho = req.body.embrulho
    const locacao = req.body.locacao
    const descricao = req.body.descricao

    const sql = `UPDATE servico SET nome = '${nome}', preco = '${preco}', locacao = '${locacao}', embrulho = '${embrulho}', descricao = '${descricao}' = '${embrulho}' WHERE id = '${id}'`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/exibirTodosServicos')
    })

})


//rota para deletar um registro
app.get('/exibirTodosServicos/remove/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM servico WHERE id = '${id}'`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/exibirTodosServicos')
    })
})

// Cadastro de Clientes
//rota da seção de cadastro
app.get('/cadastroCliente', (req, res) => {
    res.render('clientes/cadastroCliente', { layout: false })
})
app.post('/listarTodosClientes/insertprod', (req, res) => {
    const nomecliente = req.body.nomecliente
    const cpfcliente = req.body.cpfcliente
    const idadecliente = req.body.idadecliente
    const telefonecliente = req.body.telefonecliente
    

    const sql = `INSERT INTO cliente (nome, cpf, idade, telefone) VALUES ('${nomecliente}', '${cpfcliente}', '${idadecliente}', '${telefonecliente}')`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/cadastroCliente')
    })
})

//rota de consulta geral de Clientes
app.get('/listarTodosClientes', (req, res) => {
    const sql = 'SELECT * FROM cliente'

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listar = data

        console.log(listar)

        res.render('clientes/listarTodosClientes', { layout: false, listar })

    })
})

// consulta um registo pelo id (produto.handlebars)
app.get('/listarTodosClientes/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM cliente WHERE id = ${id}`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const listarProd = data[0]
        res.render('clientes/detalheIndividualCliente', { layout: false, listarProd })

    })
})

//rota do buscar Serviço
app.get('/buscarCliente', (req, res) => {
    res.render('clientes/buscarCliente', { layout: false })
})

//rota busc para exibir o resultado do buscar Serviço
app.post('/buscandoCliente/', (req, res) => {
    const nomecliente = req.body.nomecliente
    const sql = `SELECT * FROM cliente WHERE nome LIKE "%${nomecliente}%"`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarProd = data[0]
        res.render('clientes/detalheIndividualCliente', { layout: false, listarProd })
    })
})


//rota para editar Serviço - Coleta de dados para edição
app.get('/listarTodosClientes/editarCliente/:id', (req, res) => {

    const id = req.params.id

    const sql = `SELECT * FROM cliente where id = ${id}`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const prod = data[0]
        res.render('clientes/editarCliente', { layout: false, prod })

    })
})


//rota de edicao do Serviço com post
app.post('/detalheIndividualCliente/updateprod', (req, res) => {

    const id = req.body.id
    const nomecliente = req.body.nomecliente
    const cpfcliente = req.body.cpfcliente
    const idadecliente = req.body.idadecliente
    const telefonecliente = req.body.telefonecliente

    const sql = `UPDATE cliente SET nome = '${nomecliente}', cpf = '${cpfcliente}', idade = '${idadecliente}', telefone = '${telefonecliente}' WHERE id = '${id}'`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/listarTodosClientes')
    })

})


//rota para deletar um Cliente
app.get('/listarTodosClientes/remove/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM cliente WHERE id = '${id}'`

    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/listarTodosClientes')
    })
})


//Rota cadastro de dependentes:
app.get('/cadastrodep', function(req,res){
    res.render('dependentes/cadastro_depedentes', { layout: false})
})

 //Rota para inserir dados:
 app.post('/dependente/insertdep', (req, res) => {
    const nome_dependente = req.body.nome_dependente
    const cpf_dependente = req.body.cpf_dependente
    const grau_de_parentesco = req.body.grau_de_parentesco
    const nome_titular = req.body.nome_titular
    const cpf_titular = req.body.cpf_titular
  
    const sql = `INSERT INTO dependentes (nome_dependente, cpf_dependente, grau_de_parentesco, nome_titular, cpf_titular) VALUES ('${nome_dependente}', '${cpf_dependente}', '${grau_de_parentesco}', '${nome_titular}', '${cpf_titular}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
  
        res.redirect('/cadastrodep')
    })
  })

  
  //Rota de consulta geral:
  app.get('/dependentes', (req, res) => {
    const sql = 'SELECT * FROM dependentes'
    
    conn.query(sql, function(err, data){
      if(err){
        console.log(err)
        return
      }
      
      const listar = data
      
      console.log(listar)
      
      res.render('dependentes/lista_dependente', { layout: false, listar })
      
    })
  })
  
  //Consultar um registo pelo id (produto.handlebars):
  app.get('/dependentes/:id', (req, res) => {
    const id = req.params.id
    
    const sql = `SELECT * FROM dependentes WHERE id= ${id}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const listarProd = data[0]
        res.render('dependentes/individuo', {  layout: false, listarProd } )
  
    })
  })

//Rota do buscar:
app.get('/buscadep', (req, res) => {
  res.render('dependentes/busca_dependentes', { layout: false })
})

//Rota busc para exibir o resultado do buscar:
app.post('/buscandodep/', (req, res) => {
  const id = req.body.id
  const sql = `SELECT * FROM dependentes WHERE id = ${id}`

  conn.query(sql, function(err, data){
     if(err){
     console.log(err)
      return
    }
     const listarProd = data[0]
     res.render('dependentes/individuo', {  layout: false, listarProd } )
     })
    })

//pegando para editar registro
app.get('/dependentes/edit/:id', (req, res) => {
    
  const id = req.params.id

  const sql = `SELECT * FROM dependentes where id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const prod = data[0]
      res.render('dependentes/editar_dependente', { layout: false, prod } )

  })
})

//rota de edicao do registro com post
app.post('/dependentes/updatedep', (req, res) => {

  const id = req.body.id
  const nome_dependente = req.body.nome_dependente
  const cpf_dependente = req.body.cpf_dependente
  const grau_de_parentesco = req.body.grau_de_parentesco
  const nome_titular = req.body.nome_titular
  const cpf_titular = req.body.cpf_titular
  
  const sql = `UPDATE dependentes SET nome_dependente = '${nome_dependente}', cpf_dependente = '${cpf_dependente}', grau_de_parentesco = '${grau_de_parentesco}', nome_titular = '${nome_titular}', cpf_titular = '${cpf_titular}' WHERE id = '${id}'` 
  
  conn.query(sql, function(err) {
      if(err){
          console.log(err)
          return
      }
  
      res.redirect('/dependentes')
  })
  
  })

  //rota para deletar um registro
app.get('/dependentes/remove/:id', (req, res) => {
  const id = req.params.id
  
  const sql = `DELETE FROM dependentes WHERE id = '${id}'`
  
  conn.query(sql, function(err){
      if(err){
          console.log(err)
          return
      }
  
      res.redirect('/dependentes')
  })
  })

// conexao banco de dados
const conn = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '',
    database: 'funerariadb'

})

conn.connect(function(err) {
    if (err) {
        console.log(err)
    }

    console.log('Conectado com sucesso!')


})

//configurar o servidor

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})