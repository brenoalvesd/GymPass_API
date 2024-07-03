import { SearchGymsUseCase } from '../services/search-gyms-service'
import { PrismaGymsRepository } from '@/repositories/prisma-repository/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
