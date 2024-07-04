import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './check-ins-controllers/create-controller'
import { history } from './check-ins-controllers/history-controller'
import { metrics } from './check-ins-controllers/metrics-controller'
import { validate } from './check-ins-controllers/validate-controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
