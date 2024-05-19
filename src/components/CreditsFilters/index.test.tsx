import { MOCK_GET_PERSON_CREDITS } from '@/mocks'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CreditsFilters } from '.'

const LIST = [['Acting', { '1972': [{ date: '1972-11-30', year: 1972, info: MOCK_GET_PERSON_CREDITS.cast[0] }] }]]

describe('CreditsFilters', () => {
  it('deve renderizar o componente de CreditsFilters', () => {
    render(<CreditsFilters listCredits={LIST} filters={[]} setFilters={() => {}} orderBy="Descendente" setOrderBy={() => {}} />)
    expect(screen.getByTestId('credits-filters')).toBeVisible()
  })

  it('deve renderizar o componente de CreditsFilters sem o botão de limpar filtros aplicados', () => {
    render(<CreditsFilters listCredits={LIST} filters={[]} setFilters={() => {}} orderBy="Descendente" setOrderBy={() => {}} />)
    expect(() => screen.getByTestId('credits-filters-button')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente de CreditsFilters com o botão de limpar filtros aplicados', () => {
    render(<CreditsFilters listCredits={LIST} filters={['test']} setFilters={() => {}} orderBy="Descendente" setOrderBy={() => {}} />)
    expect(screen.getByTestId('credits-filters-button')).toBeVisible()
  })

  it('deve renderizar o botão de limpar filtros com o texto correto', () => {
    const { rerender } = render(
      <CreditsFilters listCredits={LIST} filters={['test']} setFilters={() => {}} orderBy="Descendente" setOrderBy={() => {}} />
    )
    expect(screen.getByTestId('credits-filters-button')).toHaveTextContent('Limpar seleção')

    rerender(
      <CreditsFilters listCredits={LIST} filters={['test', 'test2']} setFilters={() => {}} orderBy="Descendente" setOrderBy={() => {}} />
    )
    expect(screen.getByTestId('credits-filters-button')).toHaveTextContent('Limpar seleções')
  })

  it('deve remover o botão de limpar filtros após o clique', () => {
    const setFilters = vi.fn()
    render(<CreditsFilters listCredits={LIST} filters={['test']} setFilters={setFilters} orderBy="Descendente" setOrderBy={() => {}} />)
    const button = screen.getByTestId('credits-filters-button')
    expect(button).toBeVisible()
    fireEvent.click(button)
    expect(setFilters).toHaveBeenCalledWith([])
  })

  it('deve remover o botão de limpar filtros após o clique', () => {
    let filters = ['test']
    const setFilters = (newFilters: any) => (filters = newFilters)
    const { rerender } = render(
      <CreditsFilters listCredits={LIST} filters={filters} setFilters={setFilters} orderBy="Descendente" setOrderBy={() => {}} />
    )
    const button = screen.getByTestId('credits-filters-button')
    expect(button).toBeVisible()
    fireEvent.click(button)

    rerender(<CreditsFilters listCredits={LIST} filters={filters} setFilters={setFilters} orderBy="Descendente" setOrderBy={() => {}} />)
    expect(() => screen.getByTestId('credits-filters-button')).toThrow('Unable to find an element')
  })

  it('deve remover um filtro aplicado', () => {
    let filters = ['Acting']
    const setFilters = vi.fn((fn: (() => any) | any) => {
      filters = fn(filters)
    })
    render(<CreditsFilters listCredits={LIST} filters={filters} setFilters={setFilters} orderBy="Descendente" setOrderBy={() => {}} />)
    const filter = screen.getByTestId('filter-Departamentos')
    fireEvent.mouseOver(filter)
    const itemFilter = screen.getByTestId('filter-Acting-0')
    fireEvent.click(itemFilter)
    expect(setFilters).toHaveBeenCalledOnce()
    expect(filters).toStrictEqual([])
  })

  it('deve aplicar um novo filtro', () => {
    let filters: string[] = []
    const setFilters = vi.fn((fn: (() => any) | any) => {
      filters = fn(filters)
    })
    render(<CreditsFilters listCredits={LIST} filters={filters} setFilters={setFilters} orderBy="Descendente" setOrderBy={() => {}} />)
    const filter = screen.getByTestId('filter-Departamentos')
    fireEvent.mouseOver(filter)
    const itemFilter = screen.getByTestId('filter-Acting-0')
    fireEvent.click(itemFilter)
    expect(setFilters).toHaveBeenCalledOnce()
    expect(filters).toStrictEqual(['Acting'])
  })
})
