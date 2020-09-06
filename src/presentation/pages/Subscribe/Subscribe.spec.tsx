import React from 'react'
import { render } from '@testing-library/react'
import Subscribe from '.'

describe('Subscribe Component', () => {
  test('Button should not be loading', () => {
    const { getByRole } = render(<Subscribe />)
    const button = getByRole('submit')
    expect(button.classList).not.toContain('loading')
  })
})
