import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Navbar, menu } from '.'
import { getOpenSearch } from '@/states/openSearch'

describe('Navbar', () => {
  it('deve renderizar a navbar', () => {
    render(<Navbar />)
    expect(screen.getByTestId('navbar')).toBeVisible()
  })

  it('deve renderizar a navbar com itens no menu', () => {
    render(<Navbar />)
    for (const item of menu) {
      const elemMenuHome = screen.getByTestId(item.id)
      expect(elemMenuHome).toBeVisible()
    }
  })

  it('deve renderizar os itens do menu com link de navegação', () => {
    render(<Navbar />)
    for (const item of menu) {
      const elemMenuHome = screen.getByTestId(item.id)
      expect(elemMenuHome.getAttribute('href')).toBe(item.link)
    }
  })

  it('deve chamar a função ao clicar no item do menu', () => {
    const onClickFn = vi.fn()
    render(<Navbar closeMenuMobile={onClickFn} />)
    const elemMenuHome = screen.getByTestId(menu[0].id)
    expect(elemMenuHome).toBeVisible()
    fireEvent.click(elemMenuHome)
    expect(onClickFn).toHaveBeenCalled()
  })

  it('deve renderizar a navbar com o botão da busca', () => {
    render(<Navbar />)
    const elemButton = screen.getByTestId('navbar-search-button')
    expect(elemButton).toBeVisible()
  })

  it('deve chamar a função ao clicar no botão de busca', () => {
    render(<Navbar />)
    const elemButton = screen.getByTestId('navbar-search-button')
    expect(elemButton).toBeVisible()
    expect(getOpenSearch()).toBe(false)
    fireEvent.click(elemButton)
    expect(getOpenSearch()).toBe(true)
  })
})
