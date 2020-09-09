/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class MinLenghValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLenght: number) {}
  validate (value: string): Error {
    return value.length >= this.minLenght ? null : new InvalidFieldError()
  }
}
