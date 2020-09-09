/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class MinLenghValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLengh: number) {}
  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
