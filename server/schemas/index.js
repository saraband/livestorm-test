const merge = require('lodash/merge')

const modules = [
  require('./Post')
]

const typeDefs = [`
  type Query {
    _empty: String
  }
  
  type Mutation {
    _empty: String
    foo: String
  }
  type schema {
    query: Query
    mutation: Mutation
  }
`]

// Merge all resolvers and typeDefs together
module.exports = {
  resolvers: merge(...modules.map((module) => module.resolvers)),
  typeDefs: typeDefs.concat(modules.map((module) => module.typeDefs))
}