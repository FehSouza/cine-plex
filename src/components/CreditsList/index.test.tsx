import { MOCK_LIST_CREDITS } from '@/mocks'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CreditsList } from '.'

const LIST = [['Acting', { '1972': [{ date: '1972-11-30', year: 1972, info: MOCK_LIST_CREDITS[0] }] }]]

describe('CreditsList', () => {
  it('deve renderizar o componente de CreditsList', () => {
    render(<CreditsList listCredits={LIST} gender={1} />)
    expect(screen.getByTestId('credits-list')).toBeVisible()
  })
})
