import faker from 'faker'
import { ValidationComposite } from '.'
import { FieldValidationSpy } from '../test/MockFieldValidation'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

const fieldName = faker.database.column()
const makeSut = (): SutTypes => {
  const fieldValidationSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldValidationSpies)

  return { sut, fieldValidationSpies }
}
describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationSpies } = makeSut()
    const errorMessage = faker.random.words(3)
    fieldValidationSpies[0].error = new Error(errorMessage)
    fieldValidationSpies[1].error = new Error(faker.random.words(3))
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })
  test('Should return error if any validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
