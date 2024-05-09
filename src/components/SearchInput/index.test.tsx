import { dispatchOpenSearch, getOpenSearch, resetOpenSearch } from '@/states/openSearch'
import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SearchInput } from '.'

const originalTimeout = setTimeout

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation')

  return {
    ...actual,
    useRouter: vi.fn(() => ({ push: vi.fn() })),
  }
})

describe('SearchInput', () => {
  beforeEach(() => {
    window.setTimeout = ((fn: (...params: any) => void, _ms?: number | undefined, ...args: any[]): number => {
      fn(...args)
      return 1
    }) as any

    resetOpenSearch()
  })

  afterEach(() => {
    window.setTimeout = originalTimeout
  })

  it('deve renderizar o componente de SearchInput', () => {
    render(
      <SearchInput
        buttonRef={null as any}
        inputRef={null as any}
        query=""
        setQuery={() => {}}
        setLoading={() => {}}
        setMovieSuggestions={() => {}}
        setPersonSuggestions={() => {}}
      />
    )
    expect(screen.getByTestId('search-input-button')).toBeVisible()
  })

  it('deve renderizar o componente de SearchInput com input', () => {
    render(
      <SearchInput
        buttonRef={null as any}
        inputRef={null as any}
        query=""
        setQuery={() => {}}
        setLoading={() => {}}
        setMovieSuggestions={() => {}}
        setPersonSuggestions={() => {}}
      />
    )
    expect(screen.getByTestId('search-input')).toBeVisible()
  })

  it('deve renderizar o componente de SearchInput com botão', () => {
    render(
      <SearchInput
        buttonRef={null as any}
        inputRef={null as any}
        query=""
        setQuery={() => {}}
        setLoading={() => {}}
        setMovieSuggestions={() => {}}
        setPersonSuggestions={() => {}}
      />
    )
    expect(screen.getByTestId('search-button')).toBeVisible()
  })

  it.todo('deve chamar a função ao digitar no input')

  it('deve chamar a função ao clicar com enter no input', () => {
    dispatchOpenSearch(true)
    expect(getOpenSearch()).toBe(true)

    render(
      <SearchInput
        buttonRef={null as any}
        inputRef={null as any}
        query="test"
        setQuery={() => {}}
        setLoading={() => {}}
        setMovieSuggestions={() => {}}
        setPersonSuggestions={() => {}}
      />
    )

    const input = screen.getByTestId('search-input')
    expect(input).toBeVisible()
    expect(input).toHaveValue('test')
    fireEvent.keyUp(input, { key: 'Enter', keyCode: 13, code: 'Enter' })
    expect(getOpenSearch()).toBe(false)
  })

  it('deve chamar a função ao clicar no botão de pesquisar - com query - fecha a busca', () => {
    dispatchOpenSearch(true)
    expect(getOpenSearch()).toBe(true)

    render(
      <SearchInput
        buttonRef={null as any}
        inputRef={null as any}
        query="test"
        setQuery={() => {}}
        setLoading={() => {}}
        setMovieSuggestions={() => {}}
        setPersonSuggestions={() => {}}
      />
    )

    const searchButton = screen.getByTestId('search-button')
    fireEvent.click(searchButton)
    expect(getOpenSearch()).toBe(false)
  })

  it('deve chamar a função ao clicar no botão de pesquisar - sem query - mantém a busca aberta', () => {
    dispatchOpenSearch(true)
    expect(getOpenSearch()).toBe(true)

    render(
      <SearchInput
        buttonRef={null as any}
        inputRef={null as any}
        query=""
        setQuery={() => {}}
        setLoading={() => {}}
        setMovieSuggestions={() => {}}
        setPersonSuggestions={() => {}}
      />
    )

    const searchButton = screen.getByTestId('search-button')
    fireEvent.click(searchButton)
    expect(getOpenSearch()).toBe(true)
  })
})
