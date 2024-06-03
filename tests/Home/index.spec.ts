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

  test('Carrossel principal - deve passar a imagem ao clicar nas arrows', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const carousel = page.getByTestId('main-banner')
    const card0 = carousel.getByTestId('main-banner-card-0')
    const card1 = carousel.getByTestId('main-banner-card-1')
    const card2 = carousel.getByTestId('main-banner-card-2')
    const arrowNext = carousel.getByTestId('carousel-arrow-next')
    const arrowPrev = carousel.getByTestId('carousel-arrow-prev')

    await expect(card0).toBeInViewport()
    await expect(card1).not.toBeInViewport()
    await expect(card2).not.toBeInViewport()

    await arrowNext.click()
    await page.waitForTimeout(250)
    await arrowNext.click()
    await page.waitForTimeout(250)

    await expect(card0).not.toBeInViewport()
    await expect(card1).toBeInViewport()
    await expect(card2).toBeInViewport()

    await arrowPrev.click()
    await page.waitForTimeout(250)
    await arrowPrev.click()
    await page.waitForTimeout(250)

    await expect(card0).toBeInViewport()
    await expect(card1).toBeInViewport()
    await expect(card2).not.toBeInViewport()
  })

  test('Carrossel principal - deve navegar ao clicar em algum banner', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const carousel = page.getByTestId('main-banner')
    const card0 = carousel.getByTestId('main-banner-card-0')

    await card0.click()
    await page.waitForTimeout(750)
    expect(page.url()).not.toBe('https://cine-plex.vercel.app/')
  })
})
