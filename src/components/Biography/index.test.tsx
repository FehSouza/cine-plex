import { MOCK_GET_PERSON, MOCK_GET_SOCIAL_MEDIA } from '@/mocks'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Biography } from '.'

describe.skip('Biography', () => {
  it('deve renderizar o componente Biography', () => {
    render(<Biography person={MOCK_GET_PERSON} quantCredits={2} socialMedia={MOCK_GET_SOCIAL_MEDIA} />)
    expect(screen.getByTestId('biography')).toBeVisible()
  })
})
