import { fireEvent, render, screen } from '@testing-library/react'
import mediaQuery from 'css-mediaquery'
import { describe, expect, it } from 'vitest'
import { Footer } from '.'

const createMatchMedia = (width: number) => {
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: '',
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }
  }
}

const resizeScreenSize = (width: number) => (window.matchMedia = createMatchMedia(width))

describe('Footer', () => {
  it('deve renderizar o componente de Footer', () => {
    resizeScreenSize(1024)
    render(<Footer />)
    expect(screen.getByTestId('footer')).toBeVisible()
  })

  it('deve renderizar o componente de Footer com top, middle e bottom', () => {
    resizeScreenSize(1024)
    render(<Footer />)
    expect(screen.getByTestId('footer-top')).toBeVisible()
    expect(screen.getByTestId('footer-middle')).toBeVisible()
    expect(screen.getByTestId('footer-bottom')).toBeVisible()
  })

  it('deve renderizar o componente de Footer com o logo completo do Cine Plex', () => {
    resizeScreenSize(1024)
    render(<Footer />)
    const logo = screen.getByTestId('logo')
    expect(logo).toBeVisible()
    expect(logo).toHaveTextContent(/cine plex/i)
  })

  it('deve renderizar o componente de Footer com os menus', () => {
    resizeScreenSize(1024)
    render(<Footer />)
    const middle = screen.getByTestId('footer-middle')
    expect(middle.children.length > 0).toBe(true)
  })

  it('não deve abrir o accordion ao clicar no título do menu - ao estar no desktop', () => {
    resizeScreenSize(1024)
    render(<Footer />)
    const middle = screen.getByTestId('footer-middle')

    for (let index = 0; index < middle.children.length; index++) {
      const button = screen.getByTestId(`footer-middle-button-${index}`)
      const content = screen.getByTestId(`footer-middle-content-${index}`)
      fireEvent.click(button)
      expect(content.style.opacity).contain('')
    }
  })

  it('deve abrir o accordion ao clicar no título do menu - ao estar no mobile', () => {
    resizeScreenSize(580)
    render(<Footer />)
    const middle = screen.getByTestId('footer-middle')

    for (let index = 0; index < middle.children.length; index++) {
      const button = screen.getByTestId(`footer-middle-button-${index}`)
      const content = screen.getByTestId(`footer-middle-content-${index}`)
      fireEvent.click(button)
      expect(content.style.opacity).contain('1')
    }
  })

  it('deve abrir apenas um menu por vez - ao estar no mobile', () => {
    resizeScreenSize(580)
    render(<Footer />)
    const middle = screen.getByTestId('footer-middle')

    for (let index = 0; index < middle.children.length; index++) {
      const button = screen.getByTestId(`footer-middle-button-${index}`)
      fireEvent.click(button)

      for (let index2 = 0; index2 < middle.children.length; index2++) {
        const content = screen.getByTestId(`footer-middle-content-${index2}`)
        if (index === index2) expect(content.style.opacity).contain('1')
        if (index !== index2) expect(content.style.opacity).contain('')
      }
    }
  })

  it('ao clicar em um menu aberto, ele deve fechar', () => {
    resizeScreenSize(580)
    render(<Footer />)

    const button = screen.getByTestId(`footer-middle-button-0`)
    const content = screen.getByTestId(`footer-middle-content-0`)
    expect(button).toBeVisible()
    expect(content).toBeVisible()

    fireEvent.click(button)
    expect(content.style.opacity).contain('1')

    fireEvent.click(button)
    expect(content.style.opacity).contain('')
  })

  it('deve renderizar os menus com conteúdos', () => {
    resizeScreenSize(1024)
    render(<Footer />)
    const middle = screen.getByTestId('footer-middle')

    for (let index = 0; index < middle.children.length; index++) {
      const content = screen.getByTestId(`footer-middle-content-${index}`)
      expect(content.children.length > 0).toBe(true)
    }
  })

  it('deve renderizar o componente de Footer com as credenciais do Cine Plex', () => {
    resizeScreenSize(1024)
    render(<Footer />)
    const bottom = screen.getByTestId('footer-bottom')
    expect(bottom).toHaveTextContent(/cine plex/i)
  })
})
