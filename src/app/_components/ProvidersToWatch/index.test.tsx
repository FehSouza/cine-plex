import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProvidersToWatch } from '.'
import { MOCK_GET_WATCH } from '@/mocks/getWatch'

describe('ProvidersToWatch', () => {
  it('deve renderizar o ProvidersToWatch', () => {
    render(<ProvidersToWatch providers={MOCK_GET_WATCH.buy} id="" title="" titleMovie="" />)
    expect(screen.getByTestId('providers-to-watch')).toBeVisible()
  })

  it('deve renderizar o ProvidersToWatch com título', () => {
    render(<ProvidersToWatch providers={MOCK_GET_WATCH.buy} id="" title="test" titleMovie="" />)
    expect(screen.getByTestId('providers-to-watch-title')).toBeVisible()
  })

  it('não deve renderizar o ProvidersToWatch com título', () => {
    render(<ProvidersToWatch providers={MOCK_GET_WATCH.buy} id="" title="" titleMovie="" />)
    expect(() => screen.getByTestId('providers-to-watch-title')).toThrow('Unable to find an element')
  })

  it('deve renderizar o ProvidersToWatch com imagem', () => {
    const providerBuy = MOCK_GET_WATCH.buy
    render(<ProvidersToWatch providers={providerBuy} id="" title="" titleMovie="" />)
    for (const item of providerBuy) {
      expect(screen.getByTestId(`providers-to-watch-image-${item.provider_id}`)).toBeVisible()
    }
  })

  it('deve renderizar o ProvidersToWatch com a imagem do logo', () => {
    const providerBuy = MOCK_GET_WATCH.buy
    render(<ProvidersToWatch providers={providerBuy} id="" title="" titleMovie="" />)
    for (const item of providerBuy) {
      const image = screen.getByTestId<HTMLImageElement>(`providers-to-watch-image-${item.provider_id}`)
      expect(image.src).includes(item.logo_path.replace('/', ''))
    }
  })
})
