import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TeamCard } from '.'

describe('TeamCard', () => {
  it('deve renderizar o TeamCard', () => {
    render(<TeamCard gender={1} id={1} image="" name="" subName="" />)
    expect(screen.getByTestId('team-card')).toBeVisible()
  })

  it('deve renderizar o TeamCard com link', () => {
    render(<TeamCard gender={1} id={1} image="" name="" subName="" />)
    expect(screen.getByTestId('team-card-link')).toBeVisible()
  })

  it('o id renderizado no link deve ser o id fornecido ao componente', () => {
    render(<TeamCard gender={1} id={212121} image="" name="" subName="" />)
    const link = screen.getByTestId<HTMLLinkElement>('team-card-link')
    expect(link.href).contain('212121')
  })

  it('deve renderizar o TeamCard com imagem', () => {
    render(<TeamCard gender={1} id={1} image="test" name="" subName="" />)
    expect(screen.getByTestId('team-card-image')).toBeVisible()
  })

  it('não deve renderizar o TeamCard com imagem', () => {
    render(<TeamCard gender={1} id={1} image="" name="" subName="" />)
    expect(() => screen.getByTestId('team-card-image')).toThrow('Unable to find an element')
  })

  it('deve renderizar o TeamCard com ícone', () => {
    render(<TeamCard gender={1} id={1} image="" name="" subName="" />)
    expect(screen.getByTestId('team-card-image-icon')).toBeVisible()
  })

  it('não deve renderizar o TeamCard com ícone', () => {
    render(<TeamCard gender={1} id={1} image="test" name="" subName="" />)
    expect(() => screen.getByTestId('team-card-image-icon')).toThrow('Unable to find an element')
  })

  it('deve renderizar o TeamCard com nome', () => {
    render(<TeamCard gender={1} id={1} image="" name="test" subName="" />)
    expect(screen.getByTestId('team-card-name')).toBeVisible()
  })

  it('deve renderizar o TeamCard com sub nome', () => {
    render(<TeamCard gender={1} id={1} image="" name="" subName="test" />)
    expect(screen.getByTestId('team-card-sub-name')).toBeVisible()
  })
})
