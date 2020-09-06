import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Subscribe from '.'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Subscribe />)
  return { sut }
}

describe('Subscribe Component', () => {
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
})
