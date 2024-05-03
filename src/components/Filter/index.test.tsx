import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Filter } from '.'

describe('Filter', () => {
  it('deve renderizar o componente de Filter', () => {
    render(<Filter title="Test" filterOptions={['Ascendente', 'Descendente']} handleFilter={() => {}} orderBy="Descendente" />)
    expect(screen.getByTestId('filter')).toBeVisible()
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
})
