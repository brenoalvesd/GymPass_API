import { FetchNearbyGymsUseCase } from '../services/fetch-nearby-gyms-service'
import { PrismaGymsRepository } from '@/repositories/prisma-repository/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
