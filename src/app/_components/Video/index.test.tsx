import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Video } from '.'

describe('Video', () => {
  it('deve renderizar o componente de vídeo', () => {
    render(<Video alt="" videoKey="" />)
    expect(screen.getByTestId('video')).toBeVisible()
  })

  it('o componente de vídeo deve conter um elemento Iframe', () => {
    render(<Video alt="" videoKey="" />)
    const elemIframe = screen.getByTestId('video-iframe')
    expect(elemIframe).toBeVisible()
    expect(elemIframe.tagName).toBe('IFRAME')
  })

  it('o alt renderizado no Iframe deve ser o alt fornecido ao componente', () => {
    render(<Video alt="test" videoKey="" />)
    const elemIframe = screen.getByTestId('video-iframe')
    expect(elemIframe).toBeVisible()
    expect(elemIframe.ariaLabel).toBe('test')
  })
})
