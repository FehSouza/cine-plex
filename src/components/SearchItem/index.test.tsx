import {
  MOCK_GET_MOVIE_SUGGESTIONS,
  MOCK_GET_MOVIE_SUGGESTIONS_WITHOUT_RESULTS,
  MOCK_GET_PERSON_SUGGESTIONS,
  MOCK_GET_PERSON_SUGGESTIONS_WITHOUT_RESULTS,
} from '@/mocks'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SearchItem } from '.'

describe('SearchItem', () => {
  it('deve renderizar o componente de SearchItem', () => {
    const movie = MOCK_GET_MOVIE_SUGGESTIONS.results[0]
    const { rerender } = render(<SearchItem suggestion={movie} path="/filme/" />)
    expect(screen.getByTestId(`search-item-${movie.id}`)).toBeVisible()

    const person = MOCK_GET_PERSON_SUGGESTIONS.results[0]
    rerender(<SearchItem suggestion={person} path="/pessoa/" />)
    expect(screen.getByTestId(`search-item-${person.id}`)).toBeVisible()
  })

  it('não deve renderizar o componente de SearchItem', () => {
    const { rerender } = render(<SearchItem suggestion={MOCK_GET_MOVIE_SUGGESTIONS_WITHOUT_RESULTS.results[0]} path="/filme/" />)
    expect(() => screen.getByTestId('search-item')).toThrow('Unable to find an element')

    rerender(<SearchItem suggestion={MOCK_GET_PERSON_SUGGESTIONS_WITHOUT_RESULTS.results[0]} path="/filme/" />)
    expect(() => screen.getByTestId('search-item')).toThrow('Unable to find an element')

    rerender(<SearchItem suggestion={MOCK_GET_MOVIE_SUGGESTIONS.results[0]} path="" />)
    expect(() => screen.getByTestId('search-item')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente de SearchItem com imagem', () => {
    render(<SearchItem suggestion={MOCK_GET_MOVIE_SUGGESTIONS.results[0]} path="/filme/" />)
    expect(screen.getByTestId('search-item-image')).toBeVisible()
    expect(() => screen.getByTestId('search-item-icon')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente de SearchItem sem imagem', () => {
    render(<SearchItem suggestion={MOCK_GET_PERSON_SUGGESTIONS.results[0]} path="/pessoa/" />)
    expect(() => screen.getByTestId('search-item-image')).toThrow('Unable to find an element')
    expect(screen.getByTestId('search-item-icon')).toBeVisible()
  })
})
