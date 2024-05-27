import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CarouselArrow } from '.'

describe('CarouselArrow', () => {
  it('deve renderizar o CarouselArrow de voltar', () => {
    render(<CarouselArrow handleClick={() => {}} prev />)
    const button = screen.getByTestId<HTMLButtonElement>('carousel-arrow-prev')
    expect(button).toBeVisible()
    expect(button.ariaLabel).contain('voltar')
    const icon = screen.getByTestId('carousel-arrow-prev-icon')
    expect(icon).toBeVisible()
  })

  it('deve renderizar o CarouselArrow de avançar', () => {
    render(<CarouselArrow handleClick={() => {}} />)
    const button = screen.getByTestId<HTMLButtonElement>('carousel-arrow-next')
    expect(button).toBeVisible()
    expect(button.ariaLabel).contain('avançar')
    const icon = screen.getByTestId('carousel-arrow-next-icon')
    expect(icon).toBeVisible()
  })

  it('deve chamar a função passada ao componente ao clicar no botão', () => {
    const onClickFn = vi.fn()
    render(<CarouselArrow handleClick={onClickFn} />)
    const button = screen.getByTestId<HTMLButtonElement>('carousel-arrow-next')
    fireEvent.click(button)
    expect(onClickFn).toHaveBeenCalled()
  })

  it('deve renderizar o CarouselArrow com as props como classes', () => {
    render(<CarouselArrow handleClick={() => {}} hideMobile hideDesktop banner />)
    const carouselArrowClass = screen.getByTestId('carousel-arrow-next').classList
    expect(String(carouselArrowClass).includes('hideMobile')).toBe(true)
    expect(String(carouselArrowClass).includes('hideDesktop')).toBe(true)
    expect(String(carouselArrowClass).includes('banner')).toBe(true)
  })
})
