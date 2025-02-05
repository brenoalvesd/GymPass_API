import { PrismaUsersRepository } from '@/repositories/prisma-repository/prisma-users-repository'
import { RegisterUseCase } from '../services/register-service'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
