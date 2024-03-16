import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { VideoThumbnail } from '.'

describe('VideoThumbnail', () => {
  it('deve renderizar o componente de thumbnail', () => {
    render(<VideoThumbnail videoKey="" onClick={() => {}} />)
    expect(screen.getByTestId('video-thumbnail')).toBeVisible()
  })

  it('deve renderizar a thumbnail com o elemento de imagem', () => {
    render(<VideoThumbnail videoKey="" onClick={() => {}} />)
    expect(screen.getByTestId('video-thumbnail-image')).toBeVisible()
  })

  it('deve renderizar a thumbnail com o botão de dar play', () => {
    render(<VideoThumbnail videoKey="" onClick={() => {}} />)
    expect(screen.getByTestId('video-thumbnail-button')).toBeVisible()
  })

  it('a videoKey usada na thumbnail deve ser a videoKey fornecida ao componente', () => {
    render(<VideoThumbnail videoKey="videoKeyTest" onClick={() => {}} />)
    const elemImage = screen.getByTestId('video-thumbnail-image')
    expect(elemImage.style.backgroundImage).contain('videoKeyTest')
  })

  it('deve chamar a função ao clicar no botão de play', () => {
    const onClickFn = vi.fn()
    render(<VideoThumbnail videoKey="" onClick={onClickFn} />)
    const elemButton = screen.getByTestId('video-thumbnail-button')
    fireEvent.click(elemButton)
    expect(onClickFn).toHaveBeenCalled()
  })
})
