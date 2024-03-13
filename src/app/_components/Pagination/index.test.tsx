import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Pagination } from '.'

let params: any = {}

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation')

  return {
    ...actual,

    useRouter: vi.fn(() => ({
      push: vi.fn((partialUrl) => {
        const [_, query] = partialUrl.split('?')
        const searchParams = new URLSearchParams(query)
        params = Object.fromEntries(searchParams.entries())
      }),
    })),

    useSearchParams: vi.fn(() => ({
      get: vi.fn((param) => {
        return params[param] ?? null
      }),
    })),
  }
})

describe('Pagination', () => {
  beforeEach(() => {
    params = {}
  })

  it('deve renderizar a paginação - 200 páginas', () => {
    render(<Pagination totalPages={200} />)
    expect(screen.getByTestId('pagination')).toBeVisible()
  })

  it('deve renderizar a paginação - limite de 500 páginas', () => {
    render(<Pagination totalPages={600} />)
    expect(screen.getByTestId('pagination')).toBeVisible()
  })

  it('não deve renderizar a paginação - 1 página', () => {
    render(<Pagination totalPages={1} />)
    expect(() => screen.getByTestId('pagination')).toThrow('Unable to find an element')
  })

  it('não deve renderizar a paginação - 0 página', () => {
    render(<Pagination totalPages={0} />)
    expect(() => screen.getByTestId('pagination')).toThrow('Unable to find an element')
  })

  it('deve renderizar a paginação com o botão de próximo', () => {
    render(<Pagination totalPages={200} />)
    expect(screen.getByTestId('pagination-button-next')).toBeVisible()
  })

  it('não deve renderizar a paginação com o botão de anterior', () => {
    render(<Pagination totalPages={200} />)
    expect(() => screen.getByTestId('pagination-button-prev')).toThrow('Unable to find an element')
  })

  it('não deve renderizar a paginação com os botões de anterior e próximo', () => {
    render(<Pagination totalPages={1} />)
    expect(() => screen.getByTestId('pagination-button-prev')).toThrow('Unable to find an element')
    expect(() => screen.getByTestId('pagination-button-next')).toThrow('Unable to find an element')
  })

  it('deve renderizar a paginação com o botão de anterior - após clicar em next', async () => {
    render(<Pagination totalPages={5} />)
    const buttonNext = screen.getByTestId('pagination-button-next')
    fireEvent.click(buttonNext)
    setTimeout(() => expect(screen.getByTestId('pagination-button-prev')).toBeVisible(), 200)
  })

  it('não deve renderizar a paginação com o botão de próximo - ao estar na última página', () => {
    render(<Pagination totalPages={2} />)
    const buttonNext = screen.getByTestId('pagination-button-next')
    fireEvent.click(buttonNext)
    setTimeout(() => expect(() => screen.getByTestId('pagination-button-next')).toThrow('Unable to find an element'), 200)
  })

  it('deve renderizar a paginação com os botões', () => {
    const totalPages = 5
    render(<Pagination totalPages={totalPages} />)
    for (let i = 1; i <= totalPages; i++) {
      expect(screen.getByTestId(`pagination-button-${i}`)).toBeVisible()
    }
  })

  it('não deve renderizar a paginação com os botões', () => {
    const totalPages = 1
    render(<Pagination totalPages={1} />)
    for (let i = 1; i <= totalPages; i++) {
      expect(() => screen.getByTestId(`pagination-button-${i}`)).toThrow('Unable to find an element')
    }
  })

  it('deve chamar a função ao clicar em algum botão', () => {
    const totalPages = 5
    render(<Pagination totalPages={totalPages} />)
    for (let i = 2; i <= totalPages; i++) {
      const button = screen.getByTestId(`pagination-button-${i}`)
      fireEvent.click(button)
      setTimeout(() => expect(params.page).toBe(i.toString()), 200)
    }
  })
})
