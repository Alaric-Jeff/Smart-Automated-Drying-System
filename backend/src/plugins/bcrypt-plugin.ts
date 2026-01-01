import bcrypt from 'bcrypt'
import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'

async function bcryptPlugin(fastify: FastifyInstance) {
  fastify.decorate('bcrypt', {
    hash: async (password: string, saltRounds = 10) => {
      return bcrypt.hash(password, saltRounds)
    },
    compare: async (password: string, hash: string) => {
      return bcrypt.compare(password, hash)
    }
  })
}

export default fp(bcryptPlugin, {
  name: 'fastify-bcrypt'
})