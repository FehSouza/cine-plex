import test, { expect } from '@playwright/test'
import { waitFor } from '@testing-library/react'

test.describe('Header', () => {
  test('Deve existir title na página', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const title = await page.title()
    expect(title.toString()).toBe('Cine Plex')
  })

  test('Deve existir header', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const header = page.getByTestId('header-desktop')
    expect(header).toBeVisible()
  })

  test('Deve existir logo', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const header = page.getByTestId('header-desktop')
    const logo = header.getByTestId('logo')
    expect(logo).toBeVisible()
  })

  test('Deve existir menu', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbar = page.getByTestId('navbar')
    expect(navbar).toBeVisible()
  })

  test('Deve existir menu navegável', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    await page.getByTestId('depart-1').click()
    await expect(page.getByRole('heading', { name: 'Filmes em Cartaz' })).toBeVisible()
  })

  test.skip('Deve existir busca com sugestão', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbarSearchButton = page.getByTestId('navbar-search-button')
    await navbarSearchButton.click()
    const navbarSearch = page.getByTestId('search-input')
    await navbarSearch.fill('test')
    const list = page.getByTestId('search-results-title-filmes-sugeridos')
    
    // const list2 = page.getByTestId('search-results-pessoas-sugeridas ul')
    expect(list).toBeVisible()
  })

  test('Deve existir busca ao navegar', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbarSearchButton = page.getByTestId('navbar-search-button')
    await navbarSearchButton.click()
    const navbarSearch = page.getByTestId('search-input')
    await navbarSearch.fill('test')
    await navbarSearch.press('Enter')
    await expect(page.getByRole('heading', { name: 'test' })).toBeVisible()
  })

  test('Deve navegar para a conta', async ({page}) => {
    await page.goto('https://cine-plex.vercel.app/')
    const navbarSearchButton = page.getByTestId('header-desktop-account')
    await navbarSearchButton.click()
    await expect(page.getByText('Conta')).toBeVisible();
  })
})
