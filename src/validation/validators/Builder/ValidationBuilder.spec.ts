import faker from 'faker'
import { RequiredFieldValidation, EmailValidation, MinLenghValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from '.'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })
  test('Should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })
  test('Should return MinLenghValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).minLength(3).build()
    expect(validations).toEqual([new MinLenghValidation(fieldName, 3)])
  })
})
