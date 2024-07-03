import { CheckInUseCase } from '../services/check-in-service'
import { PrismaCheckInsRepository } from '@/repositories/prisma-repository/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma-repository/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
