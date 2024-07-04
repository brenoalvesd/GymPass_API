import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { search } from './gyms-controllers/search-gyms-controller'
import { nearby } from './gyms-controllers/fetch-nearby-gyms-controller'
import { create } from './gyms-controllers/create-gym-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}
