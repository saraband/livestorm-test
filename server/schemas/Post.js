/*  GraphQL Post schema definition & resolvers
 */

const typeDefs = `
  type Maker {
    id: ID!
    name: String!
  }

  type Post {
    id: ID!
    name: String!
    tagline: String!
    votes_count: Int!
    comments_count: Int!
    makers: [Maker!]!
    thumbnail_url: String!
  }
  
  extend type Query {
    "Lists all the posts for a given day. Today if 'daysAgo' is not specified"
    postsList (daysAgo: Int): [Post!]!
  }
`

const resolvers = {
  Post: {
    thumbnail_url: ({ screenshot_url }) => screenshot_url['300px']
  },
  Query: {
    postsList: (_source, args, { dataSources }) => {
      return dataSources.productHuntAPI.getPosts(args)
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}