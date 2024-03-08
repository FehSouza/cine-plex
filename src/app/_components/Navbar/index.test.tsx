import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Navbar } from '.'
import { getOpenSearch } from '@/states/openSearch'

describe('Navbar', () => {
  it('deve renderizar a navbar', () => {
    render(<Navbar />)
    expect(screen.getByTestId('navbar')).toBeVisible()
  })

  it('deve renderizar a navbar com itens no menu', () => {
    render(<Navbar />)
    const elemMenuHome = screen.getByTestId('home')
    expect(elemMenuHome).toBeVisible()

    const elemMenuDepart = screen.getByTestId('depart-1')
    expect(elemMenuDepart).toBeVisible()
  })

  it('deve renderizar os itens do menu com link de navegação', () => {
    render(<Navbar />)
    const elemMenuHome = screen.getByTestId('home')
    expect(elemMenuHome.getAttribute('href')).toBe('/')

    const elemMenuDepart = screen.getByTestId('depart-1')
    expect(elemMenuDepart.getAttribute('href')).toBe('/cartaz')
  })

  it('deve chamar a função ao clicar no item do menu', () => {
    const onClickFn = vi.fn()
    render(<Navbar closeMenuMobile={onClickFn} />)
    const elemMenuHome = screen.getByTestId('home')
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
