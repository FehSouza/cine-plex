import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NavbarSearch } from '.'
import { SearchInput } from '../SearchInput'
import { dispatchOpenSearch, getOpenSearch } from '@/states/openSearch'

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation')

  return {
    ...actual,
    useRouter: vi.fn(() => ({ push: vi.fn() })),
  }
})

describe('NavbarSearch', () => {
  it('deve renderizar o componente de NavbarSearch', () => {
    render(<NavbarSearch />)
    expect(screen.getByTestId('navbar-search')).toBeVisible()
  })

  it('deve renderizar o componente de NavbarSearch sem os resultados - sem query', () => {
    render(<NavbarSearch />)
    expect(() => screen.getByTestId('navbar-search-container')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente de NavbarSearch com os resultados - com query', () => {
    render(<NavbarSearch />)
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(screen.getByTestId('navbar-search-container')).toBeVisible()
  })

  it('deve fechar o componente de NavbarSearch após clicar no document', () => {
    dispatchOpenSearch(true)
    expect(getOpenSearch()).toBe(true)
    render(<NavbarSearch />)
    fireEvent.click(document)
    expect(getOpenSearch()).toBe(false)
  })

  it('deve manter o componente de NavbarSearch aberto após clicar no input', () => {
    dispatchOpenSearch(true)
    expect(getOpenSearch()).toBe(true)
    render(<NavbarSearch />)
    fireEvent.click(screen.getByTestId('search-input'))
    expect(getOpenSearch()).toBe(true)
  })

  it('deve manter o componente de NavbarSearch aberto após clicar no button', () => {
    dispatchOpenSearch(true)
    expect(getOpenSearch()).toBe(true)
    render(<NavbarSearch />)
    fireEvent.click(screen.getByTestId('search-button'))
    expect(getOpenSearch()).toBe(true)
  })

  it('deve manter o componente de NavbarSearch aberto após clicar nos resultados', () => {
    dispatchOpenSearch(true)
    expect(getOpenSearch()).toBe(true)
    render(<NavbarSearch />)
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(screen.getByTestId('navbar-search-container'))
    expect(getOpenSearch()).toBe(true)
  })

  it('deve manter o componente de NavbarSearch aberto após clicar no título 1', () => {
    dispatchOpenSearch(true)
    expect(getOpenSearch()).toBe(true)
    render(<NavbarSearch />)
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(screen.getByTestId('search-results-title-filmes-sugeridos'))
    expect(getOpenSearch()).toBe(true)
  })

  it('deve manter o componente de NavbarSearch aberto após clicar no título 2', () => {
    dispatchOpenSearch(true)
    expect(getOpenSearch()).toBe(true)
    render(<NavbarSearch />)
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(screen.getByTestId('search-results-title-pessoas-sugeridas'))
    expect(getOpenSearch()).toBe(true)
  })
})
