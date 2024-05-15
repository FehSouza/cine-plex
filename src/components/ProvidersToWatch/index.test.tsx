import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProvidersToWatch } from '.'

const MOCK_WATCH = {
  link: 'https://www.themoviedb.org/movie/787699-wonka/watch?locale=BR',
  rent: [
    {
      logo_path: '/9ghgSC0MA082EL6HLCW3GalykFD.jpg',
      provider_id: 2,
      provider_name: 'Apple TV',
      display_priority: 10,
    },
    {
      logo_path: '/seGSXajazLMCKGB5hnRCidtjay1.jpg',
      provider_id: 10,
      provider_name: 'Amazon Video',
      display_priority: 16,
    },
    {
      logo_path: '/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg',
      provider_id: 3,
      provider_name: 'Google Play Movies',
      display_priority: 17,
    },
    {
      logo_path: '/5vfrJQgNe9UnHVgVNAwZTy0Jo9o.jpg',
      provider_id: 68,
      provider_name: 'Microsoft Store',
      display_priority: 18,
    },
  ],
  flatrate: [
    {
      logo_path: '/fksCUZ9QDWZMUwL2LgMtLckROUN.jpg',
      provider_id: 1899,
      provider_name: 'Max',
      display_priority: 8,
    },
    {
      logo_path: '/xzN54gRvHqG9CkJPYPeS6DmJokS.jpg',
      provider_id: 484,
      provider_name: 'NOW',
      display_priority: 28,
    },
  ],
  buy: [
    {
      logo_path: '/9ghgSC0MA082EL6HLCW3GalykFD.jpg',
      provider_id: 2,
      provider_name: 'Apple TV',
      display_priority: 10,
    },
    {
      logo_path: '/seGSXajazLMCKGB5hnRCidtjay1.jpg',
      provider_id: 10,
      provider_name: 'Amazon Video',
      display_priority: 16,
    },
    {
      logo_path: '/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg',
      provider_id: 3,
      provider_name: 'Google Play Movies',
      display_priority: 17,
    },
    {
      logo_path: '/5vfrJQgNe9UnHVgVNAwZTy0Jo9o.jpg',
      provider_id: 68,
      provider_name: 'Microsoft Store',
      display_priority: 18,
    },
  ],
}

describe.only('ProvidersToWatch', () => {
  it('deve renderizar o ProvidersToWatch', () => {
    render(<ProvidersToWatch providers={MOCK_WATCH.buy} id="" title="" titleMovie="" />)
    expect(screen.getByTestId('providers-to-watch')).toBeVisible()
  })

  it('deve renderizar o ProvidersToWatch com título', () => {
    render(<ProvidersToWatch providers={MOCK_WATCH.buy} id="" title="test" titleMovie="" />)
    expect(screen.getByTestId('providers-to-watch-title')).toBeVisible()
  })

  it('não deve renderizar o ProvidersToWatch com título', () => {
    render(<ProvidersToWatch providers={MOCK_WATCH.buy} id="" title="" titleMovie="" />)
    expect(() => screen.getByTestId('providers-to-watch-title')).toThrow('Unable to find an element')
  })

  it('deve renderizar o ProvidersToWatch com imagem', () => {
    const providerBuy = MOCK_WATCH.buy
    render(<ProvidersToWatch providers={providerBuy} id="" title="" titleMovie="" />)
    for (const item of providerBuy) {
      expect(screen.getByTestId(`providers-to-watch-image-container-${item.provider_id}`)).toBeVisible()
    }
  })

  it('deve renderizar o ProvidersToWatch com a imagem do logo', () => {
    const providerBuy = MOCK_WATCH.buy
    render(<ProvidersToWatch providers={providerBuy} id="" title="" titleMovie="" />)
    for (const item of providerBuy) {
      const image = screen.getByTestId<HTMLImageElement>(`providers-to-watch-image-${item.provider_id}`)
      expect(image).toBeVisible()
      expect(image.src).includes(item.logo_path.replace('/', ''))
    }
  })
})
