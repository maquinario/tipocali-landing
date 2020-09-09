import faker from 'faker'
import { EmailValidation } from '.'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (): EmailValidation => {
  return new EmailValidation(faker.database.column())
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
