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
	    	name: 'teste',
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