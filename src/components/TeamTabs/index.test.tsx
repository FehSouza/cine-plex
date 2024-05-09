import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TeamTabs } from '.'
import { DICTIONARY_TEAM } from '@/dictionary'

let page = ''

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation')
  return {
    ...actual,
    useSelectedLayoutSegment: vi.fn(() => {
      return page
    }),
  }
})

describe('TeamTabs', () => {
  it('deve renderizar as tabs', () => {
    render(<TeamTabs id="test" />)
    expect(screen.getByTestId('team-tabs')).toBeVisible()
  })

  it('deve renderizar os opções de tabs', () => {
    const titles = Object.values(DICTIONARY_TEAM)
    render(<TeamTabs id="test" />)
    for (const item of titles) {
      expect(screen.getByTestId(`tab-${item}`)).toBeVisible()
    }
  })

  it('deve renderizar a primeira tab como ativa', () => {
    const titles = Object.values(DICTIONARY_TEAM)
    page = 'elenco'
    render(<TeamTabs id="test" />)
    expect(screen.getByTestId(`tab-${titles[0]}`).getAttribute('aria-selected')).toBe('true')
    expect(screen.getByTestId(`tab-${titles[1]}`).getAttribute('aria-selected')).toBe('false')
    expect(screen.getByTestId(`tab-${titles[2]}`).getAttribute('aria-selected')).toBe('false')
  })

  it('deve renderizar a segunda tab como ativa', () => {
    const titles = Object.values(DICTIONARY_TEAM)
    page = 'equipe-tecnica'
    render(<TeamTabs id="test" />)
    expect(screen.getByTestId(`tab-${titles[0]}`).getAttribute('aria-selected')).toBe('false')
    expect(screen.getByTestId(`tab-${titles[1]}`).getAttribute('aria-selected')).toBe('true')
    expect(screen.getByTestId(`tab-${titles[2]}`).getAttribute('aria-selected')).toBe('false')
  })

  it('deve renderizar a segunda tab como ativa', () => {
    const titles = Object.values(DICTIONARY_TEAM)
    page = 'elenco-e-equipe-tecnica'
    render(<TeamTabs id="test" />)
    expect(screen.getByTestId(`tab-${titles[0]}`).getAttribute('aria-selected')).toBe('false')
    expect(screen.getByTestId(`tab-${titles[1]}`).getAttribute('aria-selected')).toBe('false')
    expect(screen.getByTestId(`tab-${titles[2]}`).getAttribute('aria-selected')).toBe('true')
  })

  it('o id renderizado no link da tab deve ser o id fornecido ao componente', () => {
    const titles = Object.values(DICTIONARY_TEAM)
    render(<TeamTabs id="test" />)
    for (const item of titles) {
      const tab = screen.getByTestId<HTMLLinkElement>(`tab-${item}`)
      expect(tab.href).contain('test')
    }
  })

  it('não deve renderizar as tabs se não houver id', () => {
    // @ts-expect-error
    render(<TeamTabs />)
    expect(() => screen.getByTestId('team-tabs')).toThrow('Unable to find an element')
  })
})
