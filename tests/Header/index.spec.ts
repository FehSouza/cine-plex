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
    await page.waitForTimeout(750)
    expect(page.url()).toBe('https://cine-plex.vercel.app/')
  })

  test('Deve existir menu', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbar = page.getByTestId('navbar')
    await expect(navbar).toBeVisible()

    const department = navbar.getByTestId('depart-1')
    await expect(department).toBeVisible()

    await department.click()
    await page.waitForSelector('[data-testid="department-title"]')

    expect(page.url()).not.toBe('https://cine-plex.vercel.app/')
    const titleDepartment = page.getByTestId('department-title')
    await expect(titleDepartment).toBeVisible()
  })

  test('Deve existir busca ao navegar', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbarSearchButton = page.getByTestId('navbar-search-button')
    await navbarSearchButton.click()
    const searchInput = page.getByTestId('search-input')

    await searchInput.fill('test')
    await searchInput.press('Enter')
    await page.waitForSelector('[data-testid="department-title"]')

    expect(page.url()).not.toBe('https://cine-plex.vercel.app/')
    const searchPageTitle = page.getByTestId('department-title')
    await expect(searchPageTitle).toBeVisible()
    const text = await searchPageTitle.textContent()
    expect(text).toBe('test')
  })

  test('Não deve existir busca ao navegar - página de busca não encontrada', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbarSearchButton = page.getByTestId('navbar-search-button')
    await navbarSearchButton.click()
    const searchInput = page.getByTestId('search-input')

    await searchInput.fill('testTestTestTest')
    await searchInput.press('Enter')
    await page.waitForSelector('[data-testid="department-title"]')

    expect(page.url()).not.toBe('https://cine-plex.vercel.app/')
    const searchPageTitle = page.getByTestId('department-title')
    await expect(searchPageTitle).toBeVisible()
    const text = await searchPageTitle.textContent()
    expect(text).toBe('testTestTestTest')
    await expect(page.getByRole('list')).toBeVisible()
  })

  test('Deve navegar para outra página ao clicar em um filme da busca', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbarSearchButton = page.getByTestId('navbar-search-button')
    await navbarSearchButton.click()
    const searchInput = page.getByTestId('search-input')

    await searchInput.fill('test')
    await page.waitForSelector('[data-testid="search-results-filmes-sugeridos"]')

    const listMovies = page.getByTestId('search-results-filmes-sugeridos')
    await expect(listMovies).toBeVisible()
    const movies = listMovies.getByRole('link', { name: 'Test' })
    await expect(movies).not.toHaveCount(0)
    const movie = movies.first()
    const movieTitleText = await movie.textContent()

    movie.click()
    await page.waitForSelector('[data-testid="movie-page-title"]')

    expect(page.url()).not.toBe('https://cine-plex.vercel.app/')
    const pageTitle = page.getByTestId('movie-page-title')
    await expect(pageTitle).toBeVisible()
    const pageTitleText = await pageTitle.textContent()
    expect(movieTitleText?.toLowerCase()).toBe(pageTitleText?.toLowerCase())
  })

  test('Deve navegar para outra página ao clicar em uma pessoa da busca', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbarSearchButton = page.getByTestId('navbar-search-button')
    await navbarSearchButton.click()
    const searchInput = page.getByTestId('search-input')

    await searchInput.fill('test')
    await page.waitForSelector('[data-testid="search-results-pessoas-sugeridas"]')

    const listPeople = page.getByTestId('search-results-pessoas-sugeridas')
    await expect(listPeople).toBeVisible()
    const people = listPeople.getByRole('link', { name: 'Test' })
    await expect(people).not.toHaveCount(0)
    const person = people.first()
    const personTitleText = await person.textContent()

    person.click()
    await page.waitForSelector('[data-testid="person-page-title"]')

    expect(page.url()).not.toBe('https://cine-plex.vercel.app/')
    const pageTitle = page.getByTestId('person-page-title')
    await expect(pageTitle).toBeVisible()
    const pageTitleText = await pageTitle.textContent()
    expect(personTitleText?.toLowerCase()).toBe(pageTitleText?.toLowerCase())
  })

  test('Deve existir o botão de ir para a conta', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const accountButton = page.getByTestId('header-desktop-account')
    await expect(accountButton).toBeVisible()

    await accountButton.click()
    await page.waitForSelector('[data-testid="account-title"]')

    expect(page.url()).not.toBe('https://cine-plex.vercel.app/')
    const accountPageTitle = page.getByTestId('account-title')
    await expect(accountPageTitle).toBeVisible()
    const text = await accountPageTitle.textContent()
    expect(text).toBe('Conta')
    await expect(page.getByRole('heading', { name: 'Conta' })).toBeVisible()
  })
})
