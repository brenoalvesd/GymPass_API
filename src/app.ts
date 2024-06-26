import fastify from 'fastify'
import { appRoutes } from './http/routes'
// import { PrismaClient } from '@prisma/client'

export const app = fastify()

app.register(appRoutes)
