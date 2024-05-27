import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MainBannerCard } from '.'

describe('MainBannerCard', () => {
  it('deve renderizar o MainBannerCard', () => {
    const index = 0
    render(<MainBannerCard index={index} id={1} backdrop="" title="" description="" grade={1} />)
    expect(screen.getByTestId(`main-banner-card-${index}`)).toBeVisible()
  })

  it('o id no link deve conter o valor passado ao componente', () => {
    const index = 0
    render(<MainBannerCard index={index} id={212121} backdrop="" title="" description="" grade={1} />)
    const link = screen.getByTestId<HTMLLinkElement>(`main-banner-card-${index}`)
    expect(link.href).contain('212121')
  })

  it('deve renderizar o MainBannerCard com a imagem', () => {
    render(<MainBannerCard index={0} id={1} backdrop="test" title="" description="" grade={1} />)
    expect(screen.getByTestId('main-banner-card-image')).toBeVisible()
  })

  it('o src da imagem deve conter o valor passado ao componente', () => {
    render(<MainBannerCard index={0} id={1} backdrop="test" title="" description="" grade={1} />)
    const image = screen.getByTestId<HTMLImageElement>('main-banner-card-image')
    expect(image.src).contain('test')
  })

  it('deve renderizar a primeira imagem do MainBannerCard com prioridade', () => {
    render(<MainBannerCard index={0} id={1} backdrop="test" title="" description="" grade={1} />)
    const priority = screen.getByTestId('main-banner-card-image').getAttribute('fetchpriority')
    expect(priority).toBe('high')
  })

  it('deve renderizar a partir da segunda imagem do MainBannerCard sem prioridade', () => {
    render(<MainBannerCard index={1} id={1} backdrop="test" title="" description="" grade={1} />)
    const priority = screen.getByTestId('main-banner-card-image').getAttribute('fetchpriority')
    expect(priority).toBe(null)
  })

  it('deve renderizar o MainBannerCard sem a imagem', () => {
    render(<MainBannerCard index={0} id={1} backdrop="" title="" description="" grade={1} />)
    expect(() => screen.getByTestId('main-banner-card-image')).toThrow('Unable to find an element')
  })

  it('deve renderizar o MainBannerCard com o título', () => {
    render(<MainBannerCard index={0} id={1} backdrop="" title="test" description="" grade={1} />)
    expect(screen.getByTestId('main-banner-card-title')).toBeVisible()
  })

  it('deve renderizar o MainBannerCard com a descrição', () => {
    render(<MainBannerCard index={0} id={1} backdrop="" title="" description="test" grade={1} />)
    expect(screen.getByTestId('main-banner-card-description')).toBeVisible()
  })

  it('deve renderizar o MainBannerCard com a nota', () => {
    render(<MainBannerCard index={0} id={1} backdrop="" title="" description="" grade={1} />)
    expect(screen.getByTestId('main-banner-card-grade')).toBeVisible()
  })

  it('a nota deve ter, no máximo, 1 casa decimal', () => {
    render(<MainBannerCard index={0} id={1} backdrop="" title="" description="" grade={9.2345} />)
    const grade = screen.getByTestId<HTMLSpanElement>('main-banner-card-grade').textContent
    if (grade) {
      const [_, decimal] = grade.split('.')
      expect(decimal.length).toBe(1)
    }
  })

  it('a nota não deve ter casa decimal', () => {
    render(<MainBannerCard index={0} id={1} backdrop="" title="" description="" grade={9} />)
    const grade = screen.getByTestId<HTMLSpanElement>('main-banner-card-grade').textContent
    if (grade) {
      const [_, decimal] = grade.split('.')
      expect(decimal).toBe(undefined)
    }
  })
})
