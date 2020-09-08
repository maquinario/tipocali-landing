import faker from 'faker'
import { RequiredFieldValidation } from '.'
import { RequiredFieldError } from '../errors/RequiredFieldError'

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('name')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
  test('Should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('name')
    const error = sut.validate(faker.random.words())
    expect(error).toBeFalsy()
  })
})
