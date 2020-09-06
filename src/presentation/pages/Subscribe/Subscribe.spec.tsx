import React from 'react'
import { render } from '@testing-library/react'
import Subscribe from '.'

describe('Subscribe Component', () => {
  test('Button should be disabled and not be loading', () => {
    const { getByRole } = render(<Subscribe />)
    const button = getByRole('submit') as HTMLButtonElement
    expect(button.classList).not.toContain('loading')
    expect(button.disabled).toBe(true)
  })
})
