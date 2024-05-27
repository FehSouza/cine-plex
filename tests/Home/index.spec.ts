import test, { expect } from '@playwright/test'

test.describe('Home', () => {
  test('Deve renderizar a home', async ({ page }) => {
    await page.goto('https://cine-plex.vercel.app/')
    const title = page.title()
    expect((await title).toString()).toBe('Cine Plex')
  })

  // test('Deve renderizar o carrossel principal', async ({ page }) => {
  //   await page.goto('https://cine-plex.vercel.app/')
  // })
})
