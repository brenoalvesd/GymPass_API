import { GetUserMetricsUseCase } from '../services/get-user-metrics-service'
import { PrismaCheckInsRepository } from '@/repositories/prisma-repository/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
