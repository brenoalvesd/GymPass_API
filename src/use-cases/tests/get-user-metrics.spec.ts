import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from '../services/get-user-metrics-service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gymID-01',
      user_id: 'userID-01',
    })

    await checkInsRepository.create({
      gym_id: 'gymID-02',
      user_id: 'userID-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'userID-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
