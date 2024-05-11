import { renderHook, waitFor } from '@testing-library/react'
import mediaQuery from 'css-mediaquery'
import { describe, expect, it } from 'vitest'
import { useMediaQuery } from '.'

let listeners: ((...args: any) => void)[] = []

const createMatchMedia = (width: number) => {
  const matchMedia = (query: string) => {
    const media = {
      matches: mediaQuery.match(query, { width }),
      media: '',
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      dispatchEvent: () => true,
      addEventListener: (_: any, listener: (...args: any) => void, _option?: any) => {
        listeners.push(listener)
      },
      removeEventListener: (_: any, listener: (...args: any) => void, _option?: any) => {
        listeners = listeners.filter((i) => i !== listener)
      },
    } as any

    return media
  }

  return matchMedia
}

describe('useMediaQuery', () => {
  it('deve aplicar o hook de useMediaQuery com a tela sendo do mesmo tamanho que o media', () => {
    window.matchMedia = createMatchMedia(200)
    const { result } = renderHook(() => useMediaQuery(200))
    expect(result.current).toBe(true)
  })

  it('deve aplicar o hook de useMediaQuery com a tela sendo menor que o media', () => {
    window.matchMedia = createMatchMedia(100)
    const { result } = renderHook(() => useMediaQuery(200))
    expect(result.current).toBe(true)
  })

  it('deve aplicar o hook de useMediaQuery com a tela sendo maior que o media', () => {
    window.matchMedia = createMatchMedia(300)
    const { result } = renderHook(() => useMediaQuery(200))
    expect(result.current).toBe(false)
  })

  it('deve aplicar o hook de useMediaQuery com mudança de tamanho de tela', () => {
    window.matchMedia = createMatchMedia(2000)
    const { result } = renderHook(() => useMediaQuery(200))
    expect(result.current).toBe(false)

    listeners.forEach((listener) => listener({ matches: true }))
    waitFor(() => expect(result.current).toBe(true))

    listeners.forEach((listener) => listener({ matches: false }))
    waitFor(() => expect(result.current).toBe(false))
  })
})
