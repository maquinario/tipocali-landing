import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '../errors/RequiredFieldError'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}
