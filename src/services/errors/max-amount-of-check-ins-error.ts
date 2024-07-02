export class MaxAmountOfCheckInsError extends Error {
  constructor() {
    super('Max amount of check-ins reached. Please try again later.')
  }
}
