import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CarouselArrow } from '.'

describe('CarouselArrow', () => {
  it('deve renderizar o CarouselArrow', () => {
    render(<CarouselArrow handleClick={() => {}} />)
    expect(screen.getByTestId('carousel-arrow')).toBeVisible()

    const arrow = screen.getByTestId('carousel-arrow')
    expect(arrow.classList.contains('next'))
  })

  it('deve renderizar o CarouselArrow de voltar', () => {
    render(<CarouselArrow handleClick={() => {}} prev />)
    const button = screen.getByTestId<HTMLButtonElement>('carousel-arrow')
    expect(button.ariaLabel).contain('voltar')
    const icon = screen.getByTestId('carousel-arrow-icon-prev')
    expect(icon).toBeVisible()
  })

  it('deve renderizar o CarouselArrow de avançar', () => {
    render(<CarouselArrow handleClick={() => {}} />)
    const button = screen.getByTestId<HTMLButtonElement>('carousel-arrow')
    expect(button.ariaLabel).contain('avançar')
    const icon = screen.getByTestId('carousel-arrow-icon-next')
    expect(icon).toBeVisible()
  })

  it('deve chamar a função passada ao componente ao clicar no botão', () => {
    const onClickFn = vi.fn()
    render(<CarouselArrow handleClick={onClickFn} />)
    const button = screen.getByTestId<HTMLButtonElement>('carousel-arrow')
    fireEvent.click(button)
    expect(onClickFn).toHaveBeenCalled()
  })

  it('deve renderizar o CarouselArrow com as props como classes', () => {
    render(<CarouselArrow handleClick={() => {}} hideMobile hideDesktop banner />)
    const arrow = screen.getByTestId('carousel-arrow')
    expect(arrow.classList.contains('hideMobile'))
    expect(arrow.classList.contains('hideDesktop'))
    expect(arrow.classList.contains('banner'))
  })
})
