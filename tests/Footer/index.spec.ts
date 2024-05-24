import test, { expect } from '@playwright/test'

test.describe('Footer', () => {
  test('Deve existir footer', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const footer = page.getByTestId('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()
  })

  test('Deve existir logo', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/filme/278')
    const footer = page.getByTestId('footer')
    await footer.scrollIntoViewIfNeeded()
    const logo = footer.getByTestId('logo')
    await expect(logo).toBeVisible()
    await expect(logo).toContainText('Cine Plex')

    await logo.click()
    await page.waitForTimeout(1000)
    expect(page.url()).toBe('https://cine-plex.vercel.app/')
  })

  test('Devem existir os menus', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const footer = page.getByTestId('footer')
    await footer.scrollIntoViewIfNeeded()
    const menus = footer.getByTestId('footer-middle')
    await expect(menus).toBeVisible()
    await expect(menus.getByText('Institucional')).toBeVisible()
    await expect(menus.getByText('Minha conta')).toBeVisible()
    await expect(menus.getByText('Contatos')).toBeVisible()
  })

  test('Deve navegar para outra página em uma nova aba', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const newPagePromise = page.waitForEvent('popup')

    const footer = page.getByTestId('footer')
    await footer.scrollIntoViewIfNeeded()
    const contacts = footer.getByTestId('footer-middle-content-2')
    await expect(contacts).toBeVisible()

    const link = contacts.getByRole('link').first()
    await expect(link).toBeVisible()

    await link.click()
    await page.waitForTimeout(1000)
    const popup = await newPagePromise
    expect(popup.url()).toBe('https://pt-br.facebook.com/')
  })

  test('Deve existir a marca Cine Plex no rodapé', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const footer = page.getByTestId('footer')
    await footer.scrollIntoViewIfNeeded()
    const brand = footer.getByTestId('footer-bottom')
    await expect(brand).toBeVisible()
    await expect(brand.getByText('Cine Plex')).toBeVisible()
  })

  test('Deve estar com o ano vigente no rodapé', async ({ page }) => {
    const date = new Date()
    const year = String(date.getFullYear())

    await page.goto('https://cine-plex.vercel.app/')
    const brand = page.getByTestId('footer-bottom')
    await brand.scrollIntoViewIfNeeded()
    await expect(brand.getByText(year)).toBeVisible()
  })
})
