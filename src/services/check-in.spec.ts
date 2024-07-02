import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in-service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gymID-01',
      title: 'Champions gym',
      description: 'Only big men allowed',
      latitute: new Decimal(-27.0747279),
      longitute: new Decimal(-49.4889672),
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymID-01',
      userId: 'userID-01',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // TDD: Test Driven Development
  // RED (intentional error) -> GREEN (success with minnimum viable code) -> REFACTOR (code improvement)

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    await sut.execute({
      gymId: 'gymID-01',
      userId: 'userID-01',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gymID-01',
        userId: 'userID-01',
        userLatitude: -27.0747279,
        userLongitude: -49.4889672,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice, but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0)) // 21/01/2022 às 8:00

    await sut.execute({
      gymId: 'gymID-01',
      userId: 'userID-01',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    })

    vi.setSystemTime(new Date(2022, 0, 22, 9, 0, 0)) // 22/01/2022 às 9:00

    const { checkIn } = await sut.execute({
      gymId: 'gymID-01',
      userId: 'userID-01',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on a distant gym', async () => {
    gymsRepository.items.push({
      id: 'gymID-02',
      title: 'Champions2 gym',
      description: 'Only big boys allowed',
      phone: '',
      latitute: new Decimal(-27.0747279),
      longitute: new Decimal(-49.4889672),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gymID-02',
        userId: 'userID-01',
        userLatitude: -27.2092078,
        userLongitude: -49.6401567,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
