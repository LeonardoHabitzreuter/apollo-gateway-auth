const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const login = require('./login')

const mock = () => { }

const typeDefs = gql`
  extend type Query {
    mock: String
  }

  type LoginResponse {
    token: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    login(input: LoginInput): LoginResponse!
  }
`

const resolvers = {
  Query: { mock },
  Mutation: { login }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([{ resolvers, typeDefs }])
})

server.listen({ port: 3000, cors: { origin: '*' } })