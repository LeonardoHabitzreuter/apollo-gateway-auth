import { ApolloServer, gql } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import login from './login'

const typeDefs = gql`
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
  Mutation: { login }
}

const server = new ApolloServer({
  schema: buildFederatedSchema([{ resolvers, typeDefs }])
})

server.listen({ port: 3000, cors: { origin: '*' } })