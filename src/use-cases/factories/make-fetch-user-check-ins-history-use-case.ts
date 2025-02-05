import { PrismaCheckInsRepository } from '@/repositories/prisma-repository/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../services/fetch-user-check-ins-history-service'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
