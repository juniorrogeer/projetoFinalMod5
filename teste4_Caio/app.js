//É preciso instalar o handlesbar também: npm install express-handlebars.

//Importando o express:
var express = require('express');

//Iportando handlesbar:
const exphbs = require('express-handlebars')
const mysql = require('mysql')


//Variável para definir o express:
var app = express();
var port = 3000

//Configuração handlesbar:
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')



//Rota:
//Rota raíz:
app.get('/', function(req,res){
    res.render('home', { layout: false})
})

//Express URL:
app.use(
    express.urlencoded({
        extended: true
        
  }) 
  )
  //Rota para inserir dados:
  app.post('/prod/insertprod', (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const idade = req.body.idade
    const telefone = req.body.telefone
    
  
    const sql = `INSERT INTO tab_cliente (nome, cpf, idade) VALUES ('${nome}', '${cpf}', '${idade}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
  
        res.redirect('/')
    })
  })

  
  //Rota de consulta geral:
  app.get('/prod', (req, res) => {
    const sql = 'SELECT * FROM tab_cliente'
    
    conn.query(sql, function(err, data){
      if(err){
        console.log(err)
        return
      }
      
      const listar = data
      
      console.log(listar)
      
      res.render('prod', { layout: false, listar })
      
    })
  })
  
  //Consultar um registo pelo id (tab_cliente.handlebars):
  app.get('/prod/:id', (req, res) => {
    const id = req.params.id
    
    const sql = `SELECT * FROM tab_cliente WHERE id = ${id}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const listarProd = data[0]
        res.render('produto', {  layout: false, listarProd } )
  
    })
  })

//Rota do buscar:
app.get('/busca', (req, res) => {
  res.render('busca', { layout: false })
})

//Rota busc para exibir o resultado do buscar:
app.post('/busc/', (req, res) => {
  const id = req.body.id
  const sql = `SELECT * FROM tab_cliente WHERE id = ${id}`

  conn.query(sql, function(err, data){
     if(err){
     console.log(err)
      return
    }
     const listarProd = data[0]
     res.render('produto', {  layout: false, listarProd } )
     })
    })

//pegando para editar registro
app.get('/prod/edit/:id', (req, res) => {
    
  const id = req.params.id

  const sql = `SELECT * FROM tab_cliente where id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const prod = data[0]
      res.render('edit', { layout: false, prod } )

  })
})

//rota de edicao do registro com post
app.post('/prod/updateprod', (req, res) => {

  const id = req.body.id
  const nome = req.body.nome
  const cpf = req.body.cpf
  const idade = req.body.idade
  const telefone = req.body.telefone
  
  const sql = `UPDATE tab_cliente SET nome = '${nome}', cpf = '${cpf}', idade = '${idade}', telefone = '${telefone}' WHERE id = '${id}'` 
  
  conn.query(sql, function(err) {
      if(err){
          console.log(err)
          return
      }
  
      res.redirect('/prod')
  })
  
  })

  //rota para deletar um registro
app.get('/prod/remove/:id', (req, res) => {
  const id = req.params.id
  
  const sql = `DELETE FROM tab_cliente WHERE id = '${id}'`
  
  conn.query(sql, function(err){
      if(err){
          console.log(err)
          return
      }
  
      res.redirect('/prod')
  })
  })

//Configurar o servidor:
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})


//Conexão com o banco de dados:
const conn = mysql.createConnection({
    host: 'localhost',    
    port: '3307',
    user:'root',
    password: '',
    database: 'crude'
  
  })

  conn.connect(function(err) {
    if(err){
        console.log(err)
    }
  
    console.log('Conectado com sucesso!')
    
  })

