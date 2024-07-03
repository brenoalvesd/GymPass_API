import { PrismaUsersRepository } from '@/repositories/prisma-repository/prisma-users-repository'
import { GetUserProfileUseCase } from '../services/get-user-profile-service'
export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
