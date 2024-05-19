import { MOCK_GET_PERSON_CREDITS } from '@/mocks'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CreditLine } from '.'

describe('CreditLine', () => {
  it('deve renderizar o componente de CreditLine', () => {
    render(
      <CreditLine item={['2020', [{ date: '2020-09-14', year: 2020, info: MOCK_GET_PERSON_CREDITS.cast[0] }]]} listName="test" gender={1} />
    )
    expect(screen.getByTestId('credit-line')).toBeVisible()
  })

  it('não deve renderizar o componente de CreditLine', () => {
    const info = MOCK_GET_PERSON_CREDITS.cast[0]
    const { rerender } = render(<CreditLine item={['', [{ date: '2020-09-14', year: 2020, info }]]} listName="test" gender={1} />)
    expect(() => screen.getByTestId('credit-line')).toThrow('Unable to find an element')

    rerender(<CreditLine item={['2020', []]} listName="test" gender={1} />)
    expect(() => screen.getByTestId('credit-line')).toThrow('Unable to find an element')
  })
})
