import faker from 'faker'
import { EmailValidation } from '.'
import { InvalidFieldError } from '@/validation/errors'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate(faker.internet.email())
    expect(error).toEqual(new InvalidFieldError())
  })
})
