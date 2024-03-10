import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HeaderDesktop } from '.'

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation')

  return {
    ...actual,
    useRouter: vi.fn(() => ({ push: vi.fn() })),
  }
})

describe('HeaderDesktop', () => {
  it('deve renderizar o header desktop', () => {
    render(<HeaderDesktop />)
    expect(screen.getByTestId('header-desktop')).toBeVisible()
  })

  it('deve renderizar o header desktop com logo', () => {
    render(<HeaderDesktop />)
    expect(screen.getByTestId('logo')).toBeVisible()
  })

  it('deve renderizar o header desktop com navbar', () => {
    render(<HeaderDesktop />)
    expect(screen.getByTestId('navbar')).toBeVisible()
  })

  it('deve renderizar o header desktop com link para conta', () => {
    render(<HeaderDesktop />)
    expect(screen.getByTestId('header-desktop-account')).toBeVisible()
  })

  it('não deve renderizar o header desktop com navbar de busca', () => {
    render(<HeaderDesktop />)
    expect(() => screen.getByTestId('navbar-search')).toThrow('Unable to find an element')
  })

  it('deve renderizar o header desktop com navbar de busca', () => {
    render(<HeaderDesktop />)
    const searchButton = screen.getByTestId('navbar-search-button')
    expect(searchButton).toBeVisible()
    fireEvent.click(searchButton)
    expect(screen.getByTestId('navbar-search')).toBeVisible()
  })
})
