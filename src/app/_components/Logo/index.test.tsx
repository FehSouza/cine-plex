import { render, screen, fireEvent } from '@/utils/testUtils'
import { expect, describe, it, vi } from 'vitest'
import { Logo } from '.'

describe('Logo', () => {
  it('deve renderizar o logo', () => {
    render(<Logo />)
    expect(screen.getByTestId('Logo')).toBeVisible()
  })

  it('deve renderizar o logo com o texto', () => {
    render(<Logo hasText />)
    expect(screen.getByTestId('Logo')).toBeVisible()
    expect(screen.getByText(/cine plex/i)).toBeVisible() // ele está vendo na "tela" inteira, ou no elemento?
  })

  it('deve chamar a função ao clicar no logo', () => {
    const onClick = vi.fn()
    render(<Logo closeMenuMobile={onClick} />)
    const elem = screen.getByTestId('Logo')
    expect(elem).toBeVisible()
    fireEvent.click(elem)
    expect(onClick).toHaveBeenCalled()
  })

  it('o logo deve ser um elemento link', () => {
    render(<Logo />)
    const elem = screen.getByTestId('Logo')
    expect(elem).toBeVisible()
    expect(elem.tagName).toBe('A')
  })
})
