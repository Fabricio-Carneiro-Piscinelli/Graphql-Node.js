
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