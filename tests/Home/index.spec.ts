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
    const card = carousel.getByTestId('main-banner-card-0')
    await card.click()
    await page.waitForTimeout(750)
    expect(page.url()).not.toBe('https://cine-plex.vercel.app/')
  })

  test('Carrossel principal - deve navegar para o filme correto ao clicar em algum banner', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const carousel = page.getByTestId('main-banner')
    const card = carousel.getByTestId('main-banner-card-0')
    await expect(card).toBeVisible()
    const cardTitle = card.getByTestId('main-banner-card-title')
    await expect(cardTitle).toBeVisible()
    const cardTitleText = await cardTitle.textContent()

    await card.click()
    await page.waitForTimeout(750)

    const pageTitle = page.getByTestId('movie-page-title')
    await expect(pageTitle).toBeVisible()
    const pageTitleText = await pageTitle.textContent()

    expect(cardTitleText?.toLowerCase()).toBe(pageTitleText?.toLowerCase())
  })

  test('Carrossel secundário - deve renderizar pelo menos um carrossel secundário', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const numberCarousels = await page.locator('[data-testid="carousel"]').count()
    expect(numberCarousels).not.toBe(0)
  })

  test('Carrossel secundário - deve ser renderizado com arrows', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const carousel = page.getByTestId('carousel').first()
    await expect(carousel).toBeVisible()
    await carousel.scrollIntoViewIfNeeded()

    const card = carousel.getByTestId('movie-card-0')
    await expect(card).toBeVisible()

    const arrowPrev = carousel.getByTestId('carousel-arrow-prev')
    await expect(arrowPrev).toBeVisible()

    const arrowNext = carousel.getByTestId('carousel-arrow-next')
    await expect(arrowNext).toBeVisible()
  })

  test('Carrossel secundário - deve passar ao clicar nas arrows', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const carousel = page.getByTestId('carousel').first()
    await carousel.scrollIntoViewIfNeeded()
    const card0 = carousel.getByTestId('movie-card-0')
    const card4 = carousel.getByTestId('movie-card-4')
    const card5 = carousel.getByTestId('movie-card-5')
    const arrowNext = carousel.getByTestId('carousel-arrow-next')
    const arrowPrev = carousel.getByTestId('carousel-arrow-prev')

    await expect(card0).toBeInViewport()
    await expect(card4).not.toBeInViewport()
    await expect(card5).not.toBeInViewport()

    await arrowNext.click()
    await page.waitForTimeout(250)
    await arrowNext.click()
    await page.waitForTimeout(250)

    await expect(card0).not.toBeInViewport()
    await expect(card4).toBeInViewport()
    await expect(card5).toBeInViewport()

    await arrowPrev.click()
    await page.waitForTimeout(250)
    await arrowPrev.click()
    await page.waitForTimeout(250)

    await expect(card0).toBeInViewport()
    await expect(card4).toBeInViewport()
    await expect(card5).not.toBeInViewport()
  })

  test('Carrossel secundário - deve navegar ao clicar em algum filme', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const carousel = page.getByTestId('carousel').first()
    await carousel.scrollIntoViewIfNeeded()
    const card = carousel.getByTestId('movie-card-0')
    await card.dblclick()
    await page.waitForTimeout(1000)
    expect(page.url()).not.toBe('https://cine-plex.vercel.app/')
  })

  test('Carrossel secundário - deve navegar para o filme correto ao clicar em algum banner', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const carousel = page.getByTestId('carousel').first()
    await carousel.scrollIntoViewIfNeeded()
    const card = carousel.getByTestId('movie-card-0')
    await expect(card).toBeVisible()
    const cardTitle = card.getByTestId('movie-card-title')
    await expect(cardTitle).toBeVisible()
    const cardTitleText = await cardTitle.textContent()

    await card.dblclick()
    await page.waitForTimeout(1000)

    const pageTitle = page.getByTestId('movie-page-title')
    await expect(pageTitle).toBeVisible()
    const pageTitleText = await pageTitle.textContent()

    expect(cardTitleText?.toLowerCase()).toBe(pageTitleText?.toLowerCase())
  })
})
