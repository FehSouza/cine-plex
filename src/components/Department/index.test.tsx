import { MOCK_GET_POPULAR_PAGE_1, MOCK_GET_POPULAR_WITHOUT_RESULTS } from '@/mocks'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Department } from '.'

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

describe('Department', () => {
  it('deve renderizar o componente de Department', () => {
    render(<Department title="" movies={MOCK_GET_POPULAR_PAGE_1} />)
    expect(screen.getByTestId('department')).toBeVisible()
  })

  it('deve renderizar o título', () => {
    render(<Department title="test" movies={MOCK_GET_POPULAR_PAGE_1} />)
    expect(screen.getByTestId('department-title')).toBeVisible()
  })

  it('não deve renderizar o título', () => {
    const { rerender } = render(<Department title="" movies={MOCK_GET_POPULAR_PAGE_1} />)
    expect(() => screen.getByTestId('department-title')).toThrow('Unable to find an element')

    // @ts-ignore
    rerender(<Department title={undefined} movies={MOCK_GET_POPULAR_PAGE_1} />)
    expect(() => screen.getByTestId('department-title')).toThrow('Unable to find an element')

    // @ts-ignore
    rerender(<Department title={null} movies={MOCK_GET_POPULAR_PAGE_1} />)
    expect(() => screen.getByTestId('department-title')).toThrow('Unable to find an element')
  })

  it('deve renderizar a gallery com filmes', () => {
    render(<Department title="" movies={MOCK_GET_POPULAR_PAGE_1} />)
    expect(screen.getByTestId('department-movies-container')).toBeVisible()
    expect(() => screen.getByTestId('department-not-found-container')).toThrow('Unable to find an element')
  })

  it('deve renderizar a gallery com a classe de skeleton', () => {
    const movies = { ...MOCK_GET_POPULAR_PAGE_1, results: [] }
    render(<Department title="" movies={movies} />)
    const containerClass = screen.getByTestId('department-movies-container').classList
    expect(String(containerClass).includes('skeleton')).toBe(true)
  })

  it('deve renderizar a gallery sem filmes', () => {
    // @ts-ignore
    const { rerender } = render(<Department title="" movies={undefined} />)
    expect(screen.getByTestId('department-not-found-container')).toBeVisible()
    expect(() => screen.getByTestId('department-movies-container')).toThrow('Unable to find an element')

    // @ts-ignore
    rerender(<Department title="" movies={null} />)
    expect(screen.getByTestId('department-not-found-container')).toBeVisible()
    expect(() => screen.getByTestId('department-movies-container')).toThrow('Unable to find an element')

    // @ts-ignore
    rerender(<Department title="" movies={MOCK_GET_POPULAR_WITHOUT_RESULTS} />)
    expect(screen.getByTestId('department-not-found-container')).toBeVisible()
    expect(() => screen.getByTestId('department-movies-container')).toThrow('Unable to find an element')
  })

  it('deve renderizar a paginação', () => {
    render(<Department title="" movies={MOCK_GET_POPULAR_PAGE_1} />)
    expect(screen.getByTestId('pagination')).toBeVisible()
  })

  it('não deve renderizar a paginação', () => {
    render(<Department title="" movies={MOCK_GET_POPULAR_PAGE_1} upcoming />)
    expect(() => screen.getByTestId('pagination')).toThrow('Unable to find an element')
  })
})
