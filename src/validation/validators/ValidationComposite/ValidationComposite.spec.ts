import faker from 'faker'
import { ValidationComposite } from '.'
import { FieldValidationSpy } from '../test/MockFieldValidation'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const errorMessage = faker.random.words(3)
    const fieldValidationSpy = new FieldValidationSpy(fieldName)
    fieldValidationSpy.error = new Error(errorMessage)
    const fieldValidationSpy2 = new FieldValidationSpy(fieldName)
    fieldValidationSpy2.error = new Error(faker.random.words(3))
    const sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })
})
