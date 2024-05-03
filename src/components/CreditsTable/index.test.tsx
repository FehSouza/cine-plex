import { MOCK_LIST_CREDITS } from '@/mocks'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CreditsTable } from '.'

const list = ['Acting', { '1972': [{ date: '1972-11-30', year: 1972, info: MOCK_LIST_CREDITS[0] }] }]

describe('CreditsTable', () => {
  it('deve renderizar o componente de CreditsTable', () => {
    render(<CreditsTable list={list} filters={[]} orderBy="" gender={1} />)
    expect(screen.getByTestId('credits-table')).toBeVisible()
  })

  it('deve renderizar o componente de CreditsTable asc', () => {
    render(<CreditsTable list={list} filters={[]} orderBy="Ascendente" gender={1} />)
    const creditsTableListClass = screen.getByTestId('credits-table-list').classList
    expect(String(creditsTableListClass).includes('asc')).toBe(true)
  })

  it('deve renderizar o componente de CreditsTable desc', () => {
    render(<CreditsTable list={list} filters={[]} orderBy="Descendente" gender={1} />)
    const creditsTableListClass = screen.getByTestId('credits-table-list').classList
    expect(String(creditsTableListClass).includes('asc')).toBe(false)
  })

  it('deve renderizar o componente de CreditsTable com filtro aplicado', () => {
    render(<CreditsTable list={list} filters={['Acting']} orderBy="" gender={1} />)
    expect(screen.getByTestId('credits-table')).toBeVisible()
  })

  it('não deve renderizar o componente de CreditsTable com filtro aplicado - sem filtro correspondente', () => {
    render(<CreditsTable list={list} filters={['Production']} orderBy="" gender={1} />)
    expect(() => screen.getByTestId('credits-table')).toThrow('Unable to find an element')
  })
})
