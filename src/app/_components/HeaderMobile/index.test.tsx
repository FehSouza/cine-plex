import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HeaderMobile } from '.'

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation')

  return {
    ...actual,
    useRouter: vi.fn(() => ({ push: vi.fn() })),
  }
})

describe('HeaderMobile', () => {
  it('deve renderizar o header mobile', () => {
    render(<HeaderMobile />)
    expect(screen.getByTestId('header-mobile')).toBeVisible()
  })

  it('deve renderizar o header mobile com botão de menu', () => {
    render(<HeaderMobile />)
    expect(screen.getByTestId('header-mobile-menu-button')).toBeVisible()
  })

  it('deve renderizar o header mobile com logo', () => {
    render(<HeaderMobile />)
    expect(screen.getByTestId('logo')).toBeVisible()
  })

  it('deve renderizar o header mobile com botão de busca', () => {
    render(<HeaderMobile />)
    expect(screen.getByTestId('header-mobile-search-button')).toBeVisible()
  })

  it('não deve renderizar o header mobile com navbar de busca', () => {
    render(<HeaderMobile />)
    expect(() => screen.getByTestId('navbar-search')).toThrow('Unable to find an element')
  })

  it('deve renderizar o header mobile com navbar de busca', () => {
    render(<HeaderMobile />)
    const searchButton = screen.getByTestId('header-mobile-search-button')
    fireEvent.click(searchButton)
    expect(screen.getByTestId('navbar-search')).toBeVisible()
  })

  it('não deve renderizar o header mobile com menu', () => {
    render(<HeaderMobile />)
    expect(() => screen.getByTestId('header-mobile-menu')).toThrow('Unable to find an element')
  })

  it('deve renderizar o header mobile com menu', () => {
    render(<HeaderMobile />)
    const menuButton = screen.getByTestId('header-mobile-menu-button')
    fireEvent.click(menuButton)
    expect(screen.getByTestId('menu-mobile')).toBeVisible()
  })
})
