import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history-service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      gym_id: 'gymID-01',
      user_id: 'userID-01',
    })

    await checkInsRepository.create({
      gym_id: 'gymID-02',
      user_id: 'userID-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'userID-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gymID-01' }),
      expect.objectContaining({ gym_id: 'gymID-02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gymID-${i}`,
        user_id: 'userID-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'userID-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gymID-21' }),
      expect.objectContaining({ gym_id: 'gymID-22' }),
    ])
  })
})
