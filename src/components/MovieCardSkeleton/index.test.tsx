import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MovieCardSkeleton } from '.'

describe('MovieCardSkeleton', () => {
  it('deve renderizar o MovieCardSkeleton', () => {
    render(<MovieCardSkeleton />)
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`movie-card-skeleton-${i}`)).toBeVisible()
    }
  })

  it('deve renderizar o MovieCardSkeleton sem o campo para data de estreia', () => {
    render(<MovieCardSkeleton />)
    for (let i = 0; i < 5; i++) {
      expect(() => screen.getByTestId(`movie-card-skeleton-upcoming-${i}`)).toThrow('Unable to find an element')
    }
  })

  it('deve renderizar o MovieCardSkeleton com o campo para pontuação', () => {
    render(<MovieCardSkeleton />)
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`movie-card-skeleton-grade-${i}`)).toBeVisible()
    }
  })

  it('deve renderizar o MovieCardSkeleton com o campo para data de estreia', () => {
    render(<MovieCardSkeleton upcoming />)
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`movie-card-skeleton-upcoming-${i}`)).toBeVisible()
    }
  })

  it('deve renderizar o MovieCardSkeleton sem o campo para pontuação', () => {
    render(<MovieCardSkeleton upcoming />)
    for (let i = 0; i < 5; i++) {
      expect(() => screen.getByTestId(`movie-card-skeleton-grade-${i}`)).toThrow('Unable to find an element')
    }
  })
})
