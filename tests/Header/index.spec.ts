import test, { expect } from '@playwright/test'

test.describe('Header', () => {
  test('Deve existir title na página', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const title = await page.title()
    expect(title.toString()).toBe('Cine Plex')
  })

  test('Deve existir header', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const header = page.getByTestId('header-desktop')
    await expect(header).toBeVisible()
  })

  test('Deve existir logo', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/filme/278')
    const header = page.getByTestId('header-desktop')
    const logo = header.getByTestId('logo')
    await expect(logo).toBeVisible()

    await logo.click()
    await page.waitForTimeout(1000)
    expect(page.url()).toBe('https://cine-plex.vercel.app/')
  })

  test('Deve existir menu', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbar = page.getByTestId('navbar')
    await expect(navbar).toBeVisible()

    const department = navbar.getByTestId('depart-1')
    await expect(department).toBeVisible()

    await department.click()
    await expect(page.getByRole('heading', { name: 'Filmes em Cartaz' })).toBeVisible()
  })

  test('Deve existir busca com sugestão', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbarSearchButton = page.getByTestId('navbar-search-button')
    await expect(navbarSearchButton).toBeVisible()

    await navbarSearchButton.click()
    const searchInput = page.getByTestId('search-input')
    await expect(searchInput).toBeVisible()

    await searchInput.fill('test')
    await page.waitForTimeout(1000)

    const listMovies = page.getByTestId('search-results-filmes-sugeridos')
    await expect(listMovies).toBeVisible()
    const movies = listMovies.getByRole('link', { name: 'Test' })
    await expect(movies).toHaveCount(5)

    const listPeople = page.getByTestId('search-results-pessoas-sugeridas')
    await expect(listPeople).toBeVisible()
    const people = listPeople.getByRole('link', { name: 'Test' })
    await expect(people).toHaveCount(5)
  })

  test('Deve existir busca ao navegar', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbarSearchButton = page.getByTestId('navbar-search-button')
    await expect(navbarSearchButton).toBeVisible()

    await navbarSearchButton.click()
    const searchInput = page.getByTestId('search-input')
    await expect(searchInput).toBeVisible()

    await searchInput.fill('test')
    await searchInput.press('Enter')
    await expect(page.getByRole('heading', { name: 'test' })).toBeVisible()
  })

  test('Deve existir o botão de ir para a conta', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const accountButton = page.getByTestId('header-desktop-account')
    await expect(accountButton).toBeVisible()

    await accountButton.click()
    await expect(page.getByRole('heading', { name: 'Conta' })).toBeVisible()
  })
})
