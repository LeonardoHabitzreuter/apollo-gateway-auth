const { verify } = require('jsonwebtoken')

const PUBLIC_ACTIONS = ["login("]

const actionIsPublic = ({ query }) => PUBLIC_ACTIONS.some(action => action.includes(query))

const isIntrospectionQuery = ({ operationName }) => operationName === 'IntrospectionQuery'

const shouldAuthenticate = body => !isIntrospectionQuery(body) && !actionIsPublic(body)

const handleAuth = ({ req }) => {
  if (shouldAuthenticate(req.body)) {
    const decoded = verify(req.headers.authorization, 'privateKey')

    return { userId: decoded.userId }
  }
}

module.exports = handleAuth