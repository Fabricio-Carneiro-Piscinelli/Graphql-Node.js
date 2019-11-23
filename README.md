# Graphql-Node.js 🕵️ 
## Neste repositório irei mostrar a simplicidade de consultas de dados utilizando o GraphQL + Node.js
### 1 - O que é o GraphQL ? e para que server ? 🤷‍
#### O GraphQL é uma linguagem de consulta desenvolvida pelo Facebook em 2012, porem só foi levado a publico em ( 2015 || 2016 ). Sua ideia é tornar as consultas mais simples e rápidas, por fim ela também acabou se tornando uma alternativa para a arquitetura REST. seu funcionamento e bem simples, basta passar na rota o que você deseja e ela retorna. EX.: 
<img src="https://assets.digitalocean.com/ghost/2019/03/graphql-api.gif">

#### O GraphQL é comulmente utilizado como front-end de aplicações back-end, isso é mais conhecido coomo *Backend-For-Frontend*. Pense em um front-end ter que acessar API's distintas para ter uma informação, com o GraphQL conseguimos fazer isso de maneira simples. 

### 2 - Borá "Codar" 💻
#### Para começarmos a "codar" vamos instalar algumas bibliotecas e dependencias do Node.js.
##### 1° - Passo `npm init -y`
##### 2° - Passo `npm install express --save`
##### 3° - Passo `npm install graphql --save`
##### 4° - Passo `npm install express-graphql --save`
##### 5° - Passo: Criando nosso servidor *Node.js*. Vamos fazer desta forma.
```

const graphql = require('graphql')
const graphqlHTTP = require('express-graphql')
const express = require('express')
const users = require('./graphql')
const app = express()

//rota para buscar usuario 
app.use('/usuario', graphqlHTTP({schema:users, pretty: true}))


app.listen(3000, function () {
  console.log('Servidor online!')
})

```

##### 6° - Passo: Agora vamos criar um arquivo chamado *usuario.json* eremos fazer isso por que não vamos utilizar banco de dados, então vamos armazenar esses dados em um arquivo *JSON*
```

[
 {
  "id": 0,
  "nome":"Fabricio Carneiro",
  "idade": 19,
  "estado": "solteiro",
  "cidade": "Bauru-sp",
  "sexo": "masculino"
 },
 {
  "id": 1,
  "nome":"Willian",
  "idade": 19,
  "estado": "solteiro",
  "cidade": "Agudos-sp",
  "sexo": "masculino"
 },
 {
  "id": 2,
  "nome":"Marcos Vinicius",
  "idade": 30,
  "estado": "solteiro",
  "cidade": "Lençois Paulista-sp",
  "sexo": "masculino"
 }
]

```

##### 7° - Passo: Agora o bicho 🐶 pega, vamos criar nosso arquivo *graphql.js*, neste arquivo estara todos nossos esquemas para podermos fazer as consultas no arquivo *usuario.json*. 

```
const graphql = require('graphql')
const usuarios = require('./usuarios.json')

let dadosUsuario = new graphql.GraphQLObjectType({
  name: 'usuarios',
  fields: {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
    nome: { type: graphql.GraphQLString },
    idade: {type: graphql.GraphQLInt}, 
    estado: {type: graphql.GraphQLString },
    cidade: {type: graphql.GraphQLString },
    sexo: {type: graphql.GraphQLString}
  }
 })
 
 let schema  = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'query',
    fields: {
    busca_usuario: {
       type: dadosUsuario,
       args: {
         id: { type: graphql.GraphQLInt },
       },
        resolve: function (_ , args) {
          let response = usuarios.find(function ( user ){
            return (user.id === args.id)
          })
         return response
        }
       }
     }
   })
 })
  
module.exports = schema 

```

### 3 - Explicando alguns passos 🏃‍
##### No passo 5° criamos nosso servidor *node.js* e importamos algumas dependências nele, e também importamos nosso cod *graphql.js*. Bom dentro deles temos uma rota, que faz chamada para "usuario" e nela passamos nosso cod *graphql.js* 
`app.use('/usuario', graphqlHTTP({schema:users, pretty: true})) `

##### No passo 7° criamos nosso arquivo *graphql.js* dentro dele temos nossa função que define o tipo de dados que sera passado como ( int, string ), veja abaixo:

```
let dadosUsuario = new graphql.GraphQLObjectType({
  name: 'usuarios',
  fields: {
   id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
   nome: { type: graphql.GraphQLString },
   idade: {type: graphql.GraphQLInt}, 
   estado: {type: graphql.GraphQLString },
   cidade: {type: graphql.GraphQLString },
   sexo: {type: graphql.GraphQLString}
  }
})
```
##### ok logo mais abaixo temos outra que é responsavél pela passagem de parametro e pelo retorno desejado.
```
let schema  = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'query',
    fields: {
      busca_usuario: {
      type: dadosUsuario,
      args: {
         id: { type: graphql.GraphQLInt },
      },
      resolve: function (_ , args) {
        let response = usuarios.find(function ( user ){
           return (user.id === args.id)
        })
         return response
        }
      }
    }
  })
})
```
##### Agora se rodarmos o comando `node servidor` e fezermos uma busca na *url* do navegador, como por exmplo **http://localhost:3000/usuario?query={busca_usuario(id:2){id,nome}}** vamos ter um retorno como:
```
{
  "data": {
   "busca_usuario": {
     "id": 2,
     "nome": "Marcos Vinicius"
    }
  }
}
```
### Bom se tudo funfou é isso. Logicamente que isso é um exemplo básico, e que a complexidade disso não tem limites. valeuuu!! 🙋‍🙋‍
