import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Biography } from '.'
import { MOCK_GET_PERSON } from '@/mocks/getPerson'

// Teste de componente async
describe.skip('Biography', () => {
  it('deve renderizar o componente Biography', () => {
    render(<Biography person={MOCK_GET_PERSON} quantCredits={2} />)
    expect(screen.getByTestId('biography')).toBeVisible()
  })
})
