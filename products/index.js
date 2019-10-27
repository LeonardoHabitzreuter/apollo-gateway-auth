const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')

const products = (_, __, { userId }) => [{
  id: 1,
  userId,
  name: 'Shoes'
}, {
  id: 2,
  userId,
  name: 'Jacket'
}]

const typeDefs = gql`
  type Product {
    id: ID
    userId: ID
    name: String
  }

  extend type Query {
    products: [Product]
  }
`

const resolvers = {
  Query: { products }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([{ resolvers, typeDefs }]),
  context: ({ req }) => ({ userId: req.headers['user-id'] })
})

server.listen({ port: 4000, cors: { origin: '*' } })