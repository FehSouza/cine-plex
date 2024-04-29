import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CarouselTitle } from '.'

describe('CarouselTitle', () => {
  it('deve renderizar o componente CarouselTitle', () => {
    render(<CarouselTitle title="" />)
    expect(screen.getByTestId('carousel-title')).toBeVisible()
  })

  it('deve renderizar o componente CarouselTitle apenas com o h2 - sem link', () => {
    render(<CarouselTitle title="testTitle" />)
    expect(() => screen.getByTestId('carousel-title-link')).toThrow('Unable to find an element')
    expect(screen.getByTestId('carousel-title')).toHaveTextContent('testTitle')
  })

  it('deve renderizar o componente CarouselTitle apenas com o h2 - sem link - href vazio', () => {
    render(<CarouselTitle title="testTitle" hrefTitle="" />)
    expect(() => screen.getByTestId('carousel-title-link')).toThrow('Unable to find an element')
    expect(screen.getByTestId('carousel-title')).toHaveTextContent('testTitle')
  })

  it('deve renderizar o componente CarouselTitle sem o texto direto no h2 - com link', () => {
    render(<CarouselTitle title="testTitle" hrefTitle="testLink" />)
    const link = screen.getByTestId<HTMLLinkElement>('carousel-title-link')
    expect(link).toBeVisible()
    expect(link).toHaveTextContent('testTitle')
    expect(link.href).contain('testLink')
  })

  it('deve renderizar o componente CarouselTitle com a prop de moviePage como classe', () => {
    render(<CarouselTitle title="" moviePage />)
    const title = screen.getByTestId('carousel-title')
    expect(title.classList.contains('titleMoviePage'))
  })
})
