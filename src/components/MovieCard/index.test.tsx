import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MovieCard } from '.'

describe('MovieCard', () => {
  it('deve renderizar o MovieCard', () => {
    render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="" title="" />)
    expect(screen.getByTestId('movie-card-0')).toBeVisible()
  })

  it('o id no link deve ser o mesmo passado ao componente', () => {
    render(<MovieCard index={0} id={212121} date="2024/03/14" grade={1} poster="" title="" />)
    const movieCard = screen.getByTestId<HTMLLinkElement>('movie-card-0')
    expect(movieCard.href).contain('212121')
  })

  it('deve renderizar o MovieCard com a classe de department', () => {
    render(<MovieCard index={0} id={212121} date="2024/03/14" grade={1} poster="" title="" department />)
    const movieCardClass = screen.getByTestId('movie-card-0').classList
    expect(String(movieCardClass).includes('department')).toBe(true)
  })

  it('deve renderizar o MovieCard com a imagem do poster', () => {
    render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="test" title="" />)
    const image = screen.getByTestId<HTMLImageElement>('movie-card-image')
    expect(image).toBeVisible()
    expect(image.src).contain('test')
    expect(() => screen.getByTestId<HTMLDivElement>('movie-card-icon')).toThrow('Unable to find an element')
  })

  it('deve renderizar o MovieCard com o ícone - filme sem poster', () => {
    const { rerender } = render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="" title="" />)
    const icon1 = screen.getByTestId<HTMLDivElement>('movie-card-icon')
    expect(() => screen.getByTestId<HTMLImageElement>('movie-card-image')).toThrow('Unable to find an element')
    expect(icon1).toBeVisible()

    // @ts-ignore
    rerender(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster={undefined} title="" />)
    const icon2 = screen.getByTestId<HTMLDivElement>('movie-card-icon')
    expect(() => screen.getByTestId<HTMLImageElement>('movie-card-image')).toThrow('Unable to find an element')
    expect(icon2).toBeVisible()
  })

  it('deve renderizar o MovieCard com a pontuação', () => {
    render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="" title="" />)
    expect(screen.getByTestId('movie-card-grade')).toBeVisible()
  })

  it('deve renderizar o MovieCard sem a pontuação', () => {
    const { rerender } = render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="" title="" upcoming />)
    expect(() => screen.getByTestId('movie-card-grade')).toThrow('Unable to find an element')

    // @ts-expect-error
    rerender(<MovieCard index={0} id={1} date="2024/03/14" grade={undefined} poster="" title="" />)
    expect(() => screen.getByTestId('movie-card-grade')).toThrow('Unable to find an element')
  })

  it('deve renderizar o MovieCard com data de estreia', () => {
    render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="" title="" upcoming />)
    expect(screen.getByTestId('movie-card-date')).toBeVisible()
  })

  it('deve renderizar o MovieCard sem data de estreia', () => {
    const { rerender } = render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="" title="" />)
    expect(() => screen.getByTestId('movie-card-date')).toThrow('Unable to find an element')

    rerender(<MovieCard index={0} id={1} date="" grade={1} poster="" title="" upcoming />)
    expect(() => screen.getByTestId('movie-card-date')).toThrow('Unable to find an element')
  })

  it('deve renderizar o MovieCard com título', () => {
    render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="" title="test" upcoming />)
    expect(screen.getByTestId('movie-card-title')).toBeVisible()
  })

  it('deve renderizar o MovieCard sem título', () => {
    render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="" title="" upcoming />)
    expect(() => screen.getByTestId('movie-card-title')).toThrow('Unable to find an element')
  })

  it('deve renderizar o MovieCard com botão', () => {
    render(<MovieCard index={0} id={1} date="2024/03/14" grade={1} poster="" title="" upcoming />)
    expect(screen.getByTestId('movie-card-button')).toBeVisible()
  })
})
