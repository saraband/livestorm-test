const { ApolloServer } = require('apollo-server')
const { resolvers, typeDefs } = require('./schemas')
const { ProductHuntAPI } = require('./ProductHuntAPI')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    productHuntAPI: new ProductHuntAPI()
  })
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})