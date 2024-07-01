import { PrismaUsersRepository } from '@/repositories/prisma-repository/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate-service'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
