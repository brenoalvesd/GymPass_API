import { CreateGymUseCase } from '../services/create-gym-service'
import { PrismaGymsRepository } from '@/repositories/prisma-repository/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
