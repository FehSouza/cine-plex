import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VideoLazyLoad } from '.'

describe('VideoLazyload', () => {
  it('deve renderizar o VideoThumbnail', () => {
    render(<VideoLazyLoad alt="test" videoKey="test" />)
    const videoThumbnail = screen.getByTestId('video-thumbnail')
    expect(videoThumbnail).toBeVisible()
  })

  it('deve renderizar o Video', () => {
    render(<VideoLazyLoad alt="test" videoKey="test" />)
    const videoThumbnailButton = screen.getByTestId('video-thumbnail-button')
    expect(videoThumbnailButton).toBeVisible()
    fireEvent.click(videoThumbnailButton)
    const video = screen.getByTestId('video')
    expect(video).toBeVisible()
  })

  it('o VideoThumbnail deve sumir ao renderizar o Video', () => {
    render(<VideoLazyLoad alt="test" videoKey="test" />)
    const videoThumbnailButton = screen.getByTestId('video-thumbnail-button')
    expect(videoThumbnailButton).toBeVisible()
    fireEvent.click(videoThumbnailButton)
    expect(() => screen.getByTestId('video-thumbnail')).toThrow('Unable to find an element')
  })

  it('o Video não deve ser renderizado', () => {
    render(<VideoLazyLoad alt="" videoKey="" />)
    expect(() => screen.getByTestId('video')).toThrow('Unable to find an element')
  })

  it('não deve renderizar nada se não passar videoKey', () => {
    //@ts-expect-error
    render(<VideoLazyLoad alt="" />)
    expect(() => screen.getByTestId('video-thumbnail')).toThrow('Unable to find an element')
    expect(() => screen.getByTestId('video')).toThrow('Unable to find an element')
  })

  it('não deve renderizar nada se não passar alt', () => {
    //@ts-expect-error
    render(<VideoLazyLoad videoKey="" />)
    expect(() => screen.getByTestId('video-thumbnail')).toThrow('Unable to find an element')
    expect(() => screen.getByTestId('video')).toThrow('Unable to find an element')
  })
})
