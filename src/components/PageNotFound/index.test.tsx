import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageNotFound } from '.'

describe('PageNotFound', () => {
  it('deve renderizar o componente de PageNotFound', () => {
    render(<PageNotFound />)
    expect(screen.getByTestId('page-not-found')).toBeVisible()
  })

  it('deve renderizar o componente de PageNotFound com título', () => {
    render(<PageNotFound />)
    expect(screen.getByTestId('page-not-found-title')).toBeVisible()
  })

  it('deve renderizar o componente de PageNotFound com texto', () => {
    render(<PageNotFound />)
    expect(screen.getByTestId('page-not-found-text')).toBeVisible()
  })

  it('deve renderizar o componente de PageNotFound com link', () => {
    render(<PageNotFound />)
    expect(screen.getByTestId('page-not-found-link')).toBeVisible()
  })
})
