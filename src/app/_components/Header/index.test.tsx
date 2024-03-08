import { afterEach, describe, expect, it } from 'vitest'
import mediaQuery from 'css-mediaquery'
import { Header } from '.'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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
})
