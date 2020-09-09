import faker from 'faker'
import { RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from '.'

describe('ValidationBuilder', () => {
  test('Sould return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })
  test('Sould return EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })
})
