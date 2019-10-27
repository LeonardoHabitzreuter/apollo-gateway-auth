const { sign } = require('jsonwebtoken')

const login = (_, { input }) => {
  if (input.email != 'admin' || input.password != '123') {
    throw new Error('Invalid credentials')
  }

  return { token: sign({ userId: 1 }, 'privateKey', { expiresIn: '1h' }) }
}

module.exports = login