import test, { expect } from '@playwright/test'

test.describe('Department', () => {
  test('Deve ter um título na página', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbar = page.getByTestId('navbar')
    const department = navbar.getByTestId('depart-1')
    await department.click()
    await page.waitForTimeout(750)

    await expect(page.getByRole('heading')).toBeVisible()
  })

  test('Deve existir pelo menos um filme na página', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbar = page.getByTestId('navbar')
    const department = navbar.getByTestId('depart-1')
    await department.click()
    await page.waitForTimeout(750)

    const moviesContainer = page.getByTestId('department-movies-container')
    await expect(moviesContainer).toBeVisible()
    const movies = await moviesContainer.getByRole('link').count()
    expect(movies).not.toBe(0)
  })

  test('Deve navegar para outra página ao clicar em um filme', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbar = page.getByTestId('navbar')
    const department = navbar.getByTestId('depart-1')
    await department.click()
    await page.waitForTimeout(750)

    const url1 = page.url()
    const card = page.getByTestId('movie-card-0')
    await expect(card).toBeVisible()

    card.click()
    await page.waitForTimeout(1000)

    const url2 = page.url()
    expect(url2).not.toBe(url1)
  })

  test('Deve navegar para o filme correto ao clicar em um filme', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbar = page.getByTestId('navbar')
    const department = navbar.getByTestId('depart-1')
    await department.click()
    await page.waitForTimeout(750)

    const card = page.getByTestId('movie-card-0')
    await expect(card).toBeVisible()
    const cardTitle = card.getByTestId('movie-card-title')
    await expect(cardTitle).toBeVisible()
    const cardTitleText = await cardTitle.textContent()

    card.click()
    await page.waitForTimeout(1000)

    const pageTitle = page.getByTestId('movie-page-title')
    await expect(pageTitle).toBeVisible()
    const pageTitleText = await pageTitle.textContent()

    expect(cardTitleText?.toLowerCase()).toBe(pageTitleText?.toLowerCase())
  })

  test('Se existir paginação, deve trocar de página ao clicar nas arrows', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbar = page.getByTestId('navbar')
    const department = navbar.getByTestId('depart-1')
    await department.click()
    await page.waitForTimeout(750)

    const pagination = page.getByTestId('pagination')
    await expect(pagination).toBeVisible()

    await pagination.scrollIntoViewIfNeeded()
    const arrowPrev = pagination.getByTestId('pagination-button-prev')
    await expect(arrowPrev).not.toBeVisible()
    const arrowNext = pagination.getByTestId('pagination-button-next')
    await expect(arrowNext).toBeVisible()

    arrowNext.click()
    await page.waitForTimeout(750)

    expect(page.url()).toContain('page=2')
    await expect(pagination).toBeVisible()
    await pagination.scrollIntoViewIfNeeded()
    await expect(arrowPrev).toBeVisible()

    arrowPrev.click()
    await page.waitForTimeout(750)

    expect(page.url()).toContain('page=1')
    await expect(pagination).toBeVisible()
    await pagination.scrollIntoViewIfNeeded()
    await expect(arrowPrev).not.toBeVisible()
    await expect(arrowNext).toBeVisible()
  })

  test('Se existir paginação, deve trocar de página ao clicar nos números', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbar = page.getByTestId('navbar')
    const department = navbar.getByTestId('depart-1')
    await department.click()
    await page.waitForTimeout(750)

    const pagination = page.getByTestId('pagination')
    await expect(pagination).toBeVisible()

    await pagination.scrollIntoViewIfNeeded()
    const number1 = pagination.getByTestId('pagination-button-1')
    await expect(number1).toBeVisible()
    const number2 = pagination.getByTestId('pagination-button-2')
    await expect(number2).toBeVisible()

    number2.click()
    await page.waitForTimeout(750)

    expect(page.url()).toContain('page=2')
    await expect(pagination).toBeVisible()
    await pagination.scrollIntoViewIfNeeded()

    number1.click()
    await page.waitForTimeout(750)

    expect(page.url()).toContain('page=1')
    await expect(pagination).toBeVisible()
    await pagination.scrollIntoViewIfNeeded()
  })
})
