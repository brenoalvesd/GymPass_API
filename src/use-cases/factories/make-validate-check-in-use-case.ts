import { PrismaCheckInsRepository } from '@/repositories/prisma-repository/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../services/validate-check-in-service'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
