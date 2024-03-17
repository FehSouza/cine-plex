import { render, screen } from '@testing-library/react'
import mediaQuery from 'css-mediaquery'
import { describe, expect, it } from 'vitest'
import { Header } from '.'

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

describe('Header', () => {
  it('deve renderizar o header desktop', () => {
    resizeScreenSize(1024)
    render(<Header />)
    const headerDesktop = screen.getByTestId('header-desktop')
    expect(headerDesktop).toBeVisible()
  })

  it('deve renderizar o header mobile', () => {
    resizeScreenSize(580)
    render(<Header />)
    const headerMobile = screen.getByTestId('header-mobile')
    expect(headerMobile).toBeVisible()
  })

  it('o header mobile não deve ser renderizado', () => {
    resizeScreenSize(1024)
    render(<Header />)
    expect(() => screen.getByTestId('header-mobile')).toThrow('Unable to find an element')
  })

  it('o header desktop não deve ser renderizado', () => {
    resizeScreenSize(580)
    render(<Header />)
    expect(() => screen.getByTestId('header-desktop')).toThrow('Unable to find an element')
  })
})
