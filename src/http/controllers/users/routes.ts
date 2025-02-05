import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { register } from './users-controllers/register-controller'
import { authenticate } from './users-controllers/authenticate-controller'
import { profile } from './users-controllers/profile-controller'
import { refresh } from './users-controllers/refresh-token-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
