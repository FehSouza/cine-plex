import { MOCK_GET_MOVIE_SUGGESTIONS, MOCK_GET_MOVIE_SUGGESTIONS_WITHOUT_RESULTS } from '@/mocks'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SearchResults } from '.'

describe('SearchResults', () => {
  it('deve renderizar o componente de SearchResults', () => {
    render(<SearchResults title="" searchList={MOCK_GET_MOVIE_SUGGESTIONS} loading={false} isMobile={false} path="/filme/" />)
    expect(screen.getByTestId('search-results-sugeridos')).toBeVisible()
  })

  it('deve renderizar o componente de SearchResults com título', () => {
    render(<SearchResults title="test" searchList={MOCK_GET_MOVIE_SUGGESTIONS} loading={false} isMobile={false} path="/filme/" />)
    expect(screen.getByTestId('search-results-title-test')).toBeVisible()
    expect(screen.getByTestId('search-results-title-test')).toHaveTextContent('test')
  })

  it('deve renderizar o componente de SearchResults com título default', () => {
    render(<SearchResults title="" searchList={MOCK_GET_MOVIE_SUGGESTIONS} loading={false} isMobile={false} path="/filme/" />)
    expect(screen.getByTestId('search-results-title-sugeridos')).toBeVisible()
    expect(screen.getByTestId('search-results-title-sugeridos')).toHaveTextContent('sugeridos')
  })

  it('deve renderizar o componente de SearchResults com o loading', () => {
    render(
      <SearchResults title="" searchList={MOCK_GET_MOVIE_SUGGESTIONS_WITHOUT_RESULTS} loading={true} isMobile={false} path="/filme/" />
    )
    expect(screen.getByTestId('search-results-loading')).toBeVisible()
  })

  it('deve renderizar o componente de SearchResults sem resultados', () => {
    const { rerender } = render(
      <SearchResults title="" searchList={MOCK_GET_MOVIE_SUGGESTIONS_WITHOUT_RESULTS} loading={false} isMobile={false} path="/filme/" />
    )
    expect(screen.getByTestId('search-results-without-items')).toBeVisible()

    rerender(<SearchResults title="" searchList={MOCK_GET_MOVIE_SUGGESTIONS} loading={false} isMobile={false} path="" />)
    expect(screen.getByTestId('search-results-without-items')).toBeVisible()
  })

  it('deve renderizar o componente de SearchResults com resultados - para desktop', () => {
    const movies = MOCK_GET_MOVIE_SUGGESTIONS
    render(<SearchResults title="" searchList={movies} loading={false} isMobile={false} path="/filme/" />)

    for (let i = 0; i <= 5; i++) {
      if (i === 5) return expect(() => screen.getByTestId(`search-item-${movies.results[i].id}`)).toThrow('Unable to find an element')
      expect(screen.getByTestId(`search-item-${movies.results[i].id}`)).toBeVisible()
    }
  })

  it('deve renderizar o componente de SearchResults com resultados - para mobile', () => {
    const movies = MOCK_GET_MOVIE_SUGGESTIONS
    render(<SearchResults title="" searchList={movies} loading={false} isMobile path="/filme/" />)

    for (let i = 0; i <= 4; i++) {
      if (i === 4) return expect(() => screen.getByTestId(`search-item-${movies.results[i].id}`)).toThrow('Unable to find an element')
      expect(screen.getByTestId(`search-item-${movies.results[i].id}`)).toBeVisible()
    }
  })
})
