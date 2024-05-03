import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Filter } from '.'

describe('Filter', () => {
  it('deve renderizar o componente de Filter', () => {
    render(<Filter title="Test" filterOptions={['Ascendente', 'Descendente']} handleFilter={() => {}} orderBy="Descendente" />)
    expect(screen.getByTestId('filter-Test')).toBeVisible()
  })

  it('não deve renderizar o componente de Filter', () => {
    const { rerender } = render(
      <Filter title="" filterOptions={['Ascendente', 'Descendente']} handleFilter={() => {}} orderBy="Descendente" />
    )
    expect(() => screen.getByTestId('filter')).toThrow('Unable to find an element')

    rerender(<Filter title="Test" filterOptions={[]} handleFilter={() => {}} orderBy="Descendente" />)
    expect(() => screen.getByTestId('filter')).toThrow('Unable to find an element')
  })

  it('deve renderizar o componente de Filter com título', () => {
    render(<Filter title="Test" filterOptions={['Ascendente', 'Descendente']} handleFilter={() => {}} orderBy="Descendente" />)
    expect(screen.getByTestId('filter-title')).toBeVisible()
    expect(screen.getByTestId('filter-title')).toHaveTextContent('Test')
  })

  it('deve renderizar o componente de Filter com os filtros', () => {
    const filters = ['Ascendente', 'Descendente']
    render(<Filter title="Test" filterOptions={filters} handleFilter={() => {}} orderBy="Descendente" />)
    for (let i = 0; i < filters.length; i++) {
      expect(screen.getByTestId(`filter-${filters[i]}-${i}`)).toBeVisible()
    }
  })

  it('deve atualizar a ordenação ao escolher um ordem', () => {
    const filterOptions = ['Ascendente', 'Descendente']
    const handleFilter = vi.fn()
    render(<Filter title="Test" filterOptions={filterOptions} handleFilter={handleFilter} orderBy="Descendente" />)

    const button = screen.getByTestId(`filter-${filterOptions[0]}-0`)
    expect(button).toBeVisible()
    fireEvent.click(button)
    expect(handleFilter).toHaveBeenCalledWith('Ascendente')
  })

  it('deve atualizar os filtros ao escolher um filtro novo', () => {
    const filterOptions = ['Acting', 'Art', 'Camera']
    let filters: string[] = []
    const handleFilter = (newFilters: any) => (filters = [...filters, newFilters])
    render(<Filter title="Test" filterOptions={filterOptions} handleFilter={handleFilter} filters={filters} />)

    const button = screen.getByTestId(`filter-${filterOptions[0]}-0`)
    expect(button).toBeVisible()
    fireEvent.click(button)
    expect(filters).toStrictEqual(['Acting'])
  })
})
