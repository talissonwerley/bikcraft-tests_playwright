// tests/home.spec.js
import { test, expect, devices } from '@playwright/test'
import { HomePage } from '../pages/HomePage.js'

test.describe('Home Page - Bikcraft', () => {
  let home

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page)
    await home.goto()
  })

  test('Deve carregar a página inicial com elementos principais visíveis', async () => {
    await expect(await home.isLogoVisible()).toBeTruthy()
    await expect(await home.isBannerVisible()).toBeTruthy()
    await expect(await home.isFooterVisible()).toBeTruthy()
  })

  test('Deve navegar para a página de bicicletas pelo menu', async ({
    page,
  }) => {
    await home.clickMenuBikes()
    await expect(page).toHaveURL(/bicicletas/)
  })

  test('Deve navegar para a página de seguros pelo menu', async ({ page }) => {
    await home.clickMenuSeguros()
    await expect(page).toHaveURL(/seguros/)
  })

  test('Deve navegar para a página de contato pelo menu', async ({ page }) => {
    await home.clickMenuContato()
    await expect(page).toHaveURL(/contato/)
  })

  // Testes com dispositivos móveis
  test('Teste com dispositivo iPhone 12', async ({ browser }) => {
    const iPhone = devices['iPhone 12']
    const context = await browser.newContext({
      ...iPhone,
    })
    const page = await context.newPage()
    await page.goto('https://bikcraft-gamma.vercel.app/')

    await context.close()
  })

  test('Teste com dispositivo Android Pixel 5', async ({ browser }) => {
    const pixel5 = devices['Pixel 5']
    const context = await browser.newContext({
      ...pixel5,
    })
    const page = await context.newPage()
    await page.goto('https://bikcraft-gamma.vercel.app/')

    await context.close()
  })
})
