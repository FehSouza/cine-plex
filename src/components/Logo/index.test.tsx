import { render, screen, fireEvent } from '@/utils/testUtils'
import { expect, describe, it, vi } from 'vitest'
import { Logo } from '.'

describe('Logo', () => {
  it('deve renderizar o logo', () => {
    render(<Logo />)
    expect(screen.getByTestId('logo')).toBeVisible()
  })

  it('deve renderizar o logo com o texto', () => {
    render(<Logo hasText />)
    expect(screen.getByTestId('logo')).toBeVisible()
    expect(screen.getByText(/cine plex/i)).toBeVisible()
  })

  it('deve chamar a função ao clicar no logo', () => {
    const onClick = vi.fn()
    render(<Logo closeMenuMobile={onClick} />)
    const elem = screen.getByTestId('logo')
    expect(elem).toBeVisible()
    fireEvent.click(elem)
    expect(onClick).toHaveBeenCalled()
  })

  it('o logo deve ser um elemento link', () => {
    render(<Logo />)
    const elem = screen.getByTestId('logo')
    expect(elem).toBeVisible()
    expect(elem.tagName).toBe('A')
  })

  it('o texto não deve ser renderizado', () => {
    render(<Logo />)
    expect(() => screen.getByText(/cine plex/i)).toThrow('Unable to find an element')
  })
})
