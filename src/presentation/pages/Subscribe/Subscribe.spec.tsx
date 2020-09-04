import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import SubscribePage from '.'
import { ValidationSpy } from '@/presentation/test'
import { Subscribe, SubscribeParams } from '@/domain/usecases'
import { SubscriberModel } from '@/domain/models'
import { mockSubscribe } from '@/domain/test'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  subscribeSpy: SubscribeSpy
}

class SubscribeSpy implements Subscribe {
  subscriber = mockSubscribe()
  params: SubscribeParams
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  async subscribe (params: SubscribeParams): Promise<SubscriberModel> {
    return Promise.resolve(this.subscriber)
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const subscribeSpy = new SubscribeSpy()
  const errorMessage = faker.random.words(6)
  validationSpy.errorMessage = errorMessage
  const sut = render(<SubscribePage validation={validationSpy} subscribe={subscribeSpy} />)
  return { sut, validationSpy, subscribeSpy }
}

describe('Subscribe Component', () => {
  afterEach(cleanup)
  test('Errors should not be displayed on initial state', () => {
    const { sut } = makeSut()
    const errorContainer = sut.getByRole('errors')
    expect(errorContainer.childElementCount).toBe(0)
  })
  test('Should show name error if validation fails', () => {
    const { sut } = makeSut()
    const inputWrap = sut.getByRole('fieldWrap-name')
    const nameInput = sut.getByRole('field-name')
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    fireEvent.input(nameInput, { target: { value: name } })
    expect(inputWrap.classList).toContain('invalid')
  })
  test('Should show email error if validation fails', () => {
    const { sut } = makeSut()
    const inputWrap = sut.getByRole('fieldWrap-name')
    const emailInput = sut.getByRole('field-name')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(inputWrap.classList).toContain('invalid')
  })
  test('Should not add invalid class to name input if Validation succeeds', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null
    const nameInput = sut.getByPlaceholderText('Nome')
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    fireEvent.input(nameInput, { target: { value: name } })
    expect(nameInput.classList).not.toContain('invalid')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null
    const nameInput = sut.getByPlaceholderText('Nome')
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    fireEvent.input(nameInput, { target: { value: name } })
    const emailInput = sut.getByPlaceholderText('Nome')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    const submitBtn = sut.getByRole('submit') as HTMLButtonElement
    expect(submitBtn.disabled).toBe(false)
  })
})
