import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLenghValidation } from '.'

describe('MinLenghValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLenghValidation(faker.database.column(), 5)
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new InvalidFieldError())
  })
  test('Should return falsy if value is valid', () => {
    const sut = new MinLenghValidation(faker.database.column(), 5)
    const error = sut.validate(faker.random.alphaNumeric(8))
    expect(error).toBeFalsy()
  })
})
