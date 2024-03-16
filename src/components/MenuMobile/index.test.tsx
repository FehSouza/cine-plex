import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MenuMobile } from '.'

describe('MenuMobile', () => {
  it('deve renderizar o menu mobile', () => {
    render(<MenuMobile openMenu setOpenMenu={() => {}} />)
    expect(screen.getByTestId('menu-mobile')).toBeVisible()
  })

  it('deve renderizar o menu mobile com botão de fechar', () => {
    render(<MenuMobile openMenu setOpenMenu={() => {}} />)
    expect(screen.getByTestId('menu-mobile-close-button')).toBeVisible()
  })

  it('deve renderizar o menu mobile com content', () => {
    render(<MenuMobile openMenu setOpenMenu={() => {}} />)
    expect(screen.getByTestId('menu-mobile-content')).toBeVisible()
  })

  it('deve renderizar o menu mobile com logo', () => {
    render(<MenuMobile openMenu setOpenMenu={() => {}} />)
    expect(screen.getByTestId('logo')).toBeVisible()
  })

  it('deve renderizar o menu mobile com link para conta', () => {
    render(<MenuMobile openMenu setOpenMenu={() => {}} />)
    expect(screen.getByTestId('menu-mobile-account')).toBeVisible()
  })

  it('deve renderizar o menu mobile com navbar', () => {
    render(<MenuMobile openMenu setOpenMenu={() => {}} />)
    expect(screen.getByTestId('navbar')).toBeVisible()
  })

  it('deve renderizar o menu mobile com contatos', () => {
    render(<MenuMobile openMenu setOpenMenu={() => {}} />)
    expect(screen.getByTestId('menu-mobile-contact')).toBeVisible()
  })

  it('deve fechar o menu mobile', () => {
    render(<MenuMobile openMenu setOpenMenu={() => {}} />)
    fireEvent.click(screen.getByTestId('menu-mobile'))
    const hidden = screen.getByTestId('menu-mobile-close-button').getAttribute('aria-hidden')
    expect(hidden).toBe('true')
  })
})
