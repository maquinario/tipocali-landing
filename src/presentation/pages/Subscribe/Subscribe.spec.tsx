import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Subscribe from '.'
import { Validation } from '@/presentation/protocols/Validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string
  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Subscribe validation={validationSpy} />)
  return { sut, validationSpy }
}

describe('Subscribe Component', () => {
  afterEach(cleanup)

  test('Button should be disabled and not be loading', () => {
    const { sut } = makeSut()
    const button = sut.getByRole('submit') as HTMLButtonElement
    expect(button.classList).not.toContain('loading')
    expect(button.disabled).toBe(true)
  })
  test('Errors should not be displayed on initial state', () => {
    const { sut } = makeSut()
    const errorContainer = sut.getByRole('errors')
    expect(errorContainer.childElementCount).toBe(0)
  })
  test('Errors call validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByPlaceholderText('Email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })
  test('Errors call validation with correct name', () => {
    const { sut, validationSpy } = makeSut()
    const nameInput = sut.getByPlaceholderText('Nome')
    fireEvent.input(nameInput, { target: { value: 'any_name' } })
    expect(validationSpy.fieldName).toBe('name')
    expect(validationSpy.fieldValue).toBe('any_name')
  })
})
