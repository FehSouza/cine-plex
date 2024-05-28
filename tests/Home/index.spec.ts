import test, { expect } from '@playwright/test'

test.describe('Home', () => {
  test('Deve renderizar a home', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const title = page.title()
    expect((await title).toString()).toBe('Cine Plex')
  })

  test('Carrossel principal - deve ser renderizado com arrows', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const carousel = page.getByTestId('main-banner')
    await expect(carousel).toBeVisible()

    const card = carousel.getByTestId('main-banner-card-0')
    await expect(card).toBeVisible()

    const arrowPrev = carousel.getByTestId('carousel-arrow-prev')
    await expect(arrowPrev).toBeVisible()

    const arrowNext = carousel.getByTestId('carousel-arrow-next')
    await expect(arrowNext).toBeVisible()
  })

  test.skip('Carrossel principal - deve passar a imagem ao clicar na arrow de próximo', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const carousel = page.getByTestId('main-banner')

    const card0 = carousel.getByTestId('main-banner-card-0')
    const card1 = carousel.getByTestId('main-banner-card-1')
    await expect(card0).toBeInViewport()
    await expect(card1).not.toBeInViewport()

    const arrowNext = carousel.getByTestId('carousel-arrow-next')
    await arrowNext.click()

    await page.waitForTimeout(3000)

    const carouselD = page.getByTestId('main-banner')
    const card0D = carouselD.getByTestId('main-banner-card-0')
    const card1D = carouselD.getByTestId('main-banner-card-1')
    await expect(card0D).toBeInViewport()
    await expect(card1D).toBeInViewport()
  })
})
