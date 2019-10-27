const { ApolloServer } = require('apollo-server')
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway')
const handleAuth = require('./handleAuth')

const server = new ApolloServer({
  gateway: new ApolloGateway({
    serviceList: [
      { name: 'auth', url: 'http://localhost:3000' },
      { name: 'products', url: 'http://localhost:4000' }
    ],
    buildService({ name, url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          request.http.headers.set('user-id', context.userId)
        }
      })
    }
  }),
  context: handleAuth,
  subscriptions: false
})

const serverConfig = { port: 8080, cors: { origin: '*' } }

server.listen(serverConfig).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})