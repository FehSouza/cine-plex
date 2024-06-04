import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CarouselTitle } from '.'

describe('CarouselTitle', () => {
  it('deve renderizar o componente CarouselTitle', () => {
    render(<CarouselTitle title="Test Title" />)
    expect(screen.getByTestId('carousel-title')).toBeVisible()
  })

  it('deve renderizar o componente CarouselTitle apenas com o h2 - sem link', () => {
    render(<CarouselTitle title="Test Title" />)
    expect(() => screen.getByTestId('carousel-title-link')).toThrow('Unable to find an element')
    expect(screen.getByTestId('carousel-title')).toHaveTextContent('Test Title')
  })

  it('deve renderizar o componente CarouselTitle apenas com o h2 - sem link - href vazio', () => {
    render(<CarouselTitle title="Test Title" hrefTitle="" />)
    expect(() => screen.getByTestId('carousel-title-link')).toThrow('Unable to find an element')
    expect(screen.getByTestId('carousel-title')).toHaveTextContent('Test Title')
  })

  it('deve renderizar o componente CarouselTitle sem o texto direto no h2 - com link', () => {
    render(<CarouselTitle title="Test Title" hrefTitle="testLink" />)
    const link = screen.getByTestId<HTMLLinkElement>('carousel-title-link')
    expect(link).toBeVisible()
    expect(link).toHaveTextContent('Test Title')
    expect(link.href).contain('testLink')
  })

  it('deve renderizar o componente CarouselTitle com a prop de moviePage como classe', () => {
    render(<CarouselTitle title="Test Title" moviePage />)
    const titleClass = screen.getByTestId('carousel-title').classList
    expect(String(titleClass).includes('titleMoviePage')).toBe(true)
  })
})
