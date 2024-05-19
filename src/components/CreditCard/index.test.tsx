import { MOCK_GET_PERSON_CREDITS } from '@/mocks'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CreditCard } from '.'

describe('CreditCard', () => {
  it('deve renderizar o componente de CreditCard', () => {
    render(<CreditCard movie={MOCK_GET_PERSON_CREDITS.cast[0]} gender={1} />)
    expect(screen.getByTestId('credit-card')).toBeVisible()
  })

  it('não deve renderizar o componente de CreditCard', () => {
    render(<CreditCard movie={{ ...MOCK_GET_PERSON_CREDITS.cast[0], title: '', name: '' }} gender={1} />)
    expect(() => screen.getByTestId('credit-card')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente de CreditCard com o movie title', () => {
    const { rerender } = render(<CreditCard movie={{ ...MOCK_GET_PERSON_CREDITS.cast[0], title: 'test1', name: undefined }} gender={1} />)
    expect(screen.getByTestId('credit-card-name')).toHaveTextContent('test1')

    rerender(<CreditCard movie={{ ...MOCK_GET_PERSON_CREDITS.cast[0], title: 'test1', name: 'test2' }} gender={1} />)
    expect(screen.getByTestId('credit-card-name')).toHaveTextContent('test1')
  })

  it('deve renderizar o componente de CreditCard com o movie name', () => {
    render(<CreditCard movie={{ ...MOCK_GET_PERSON_CREDITS.cast[0], title: undefined, name: 'test1' }} gender={1} />)
    expect(screen.getByTestId('credit-card-name')).toHaveTextContent('test1')
  })

  it('deve renderizar o componente de CreditCard com o character', () => {
    const { rerender } = render(<CreditCard movie={MOCK_GET_PERSON_CREDITS.cast[0]} gender={1} />)
    expect(screen.getByTestId('credit-card-character')).toBeVisible()

    rerender(<CreditCard movie={{ ...MOCK_GET_PERSON_CREDITS.cast[0], character: 'Self' }} gender={1} />)
    expect(screen.getByTestId('credit-card-character')).toHaveTextContent('como ela própria')

    rerender(<CreditCard movie={{ ...MOCK_GET_PERSON_CREDITS.cast[0], character: 'Self' }} gender={2} />)
    expect(screen.getByTestId('credit-card-character')).toHaveTextContent('como ele próprio')
  })

  it('deve renderizar o componente de CreditCard sem o character', () => {
    render(<CreditCard movie={{ ...MOCK_GET_PERSON_CREDITS.cast[0], character: undefined, job: undefined }} gender={1} />)
    expect(() => screen.getByTestId('credit-card-character')).toThrow('Unable to find an element')
  })
})
