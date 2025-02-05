import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '../services/check-in-service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxAmountOfCheckInsError } from '../errors/max-amount-of-check-ins-error'
import { MaxDistanteError } from '../errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gymID-01',
      title: 'Gaviões',
      description: 'Fedor e Má educação',
      latitude: -27.0747279,
      longitude: -49.4889672,
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
    ).rejects.toBeInstanceOf(MaxAmountOfCheckInsError)
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
      title: 'Champions Gym',
      description: 'Only big boys allowed',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gymID-02',
        userId: 'userID-01',
        userLatitude: -27.2092078,
        userLongitude: -49.6401567,
      }),
    ).rejects.toBeInstanceOf(MaxDistanteError)
  })
})
