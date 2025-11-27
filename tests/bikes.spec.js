import { test, expect, devices } from '@playwright/test'
import { BikesPage } from '../pages/BikesPage'

let bikesPage

test.beforeEach(async ({ page }) => {
  bikesPage = new BikesPage(page)
  await bikesPage.goto()
})

test.describe('Página de Bicicletas - Bikcraft', () => {
  test('Deve exibir a lista de bicicletas', async ({ page }) => {
    await bikesPage.goto()

    await expect(bikesPage.titulo).toBeVisible()
    await expect(bikesPage.listaBikes).toHaveCount(3) // exemplo: espera 3 itens
  })

  test('clique na primeira bike deve abrir a página de detalhes correta', async ({
    page,
  }) => {
    await bikesPage.goto()
    await bikesPage.clickPrimeiraBike()

    // Aqui você pode validar a URL
    await expect(page).toHaveURL(/nimbus\.html/)

    await expect(
      page.getByRole('heading', { name: /nimbus stark/i })
    ).toBeVisible()
  })

  test('Deve redirecionar o usuario para a pagina de Orçamento', async ({
    page,
  }) => {
    await bikesPage.goto()
    await bikesPage.clickPrimeiraBike()

    await expect(page).toHaveURL(/nimbus\.html/)

    await expect(
      page.getByRole('heading', { name: /nimbus stark/i })
    ).toBeVisible()

    await page.getByRole('link', { name: 'Comprar Agora' }).click()
    await expect(page).toHaveURL(
      /orcamento\.html\?tipo=bikcraft&produto=nimbus/
    )
  })

  // Testes com dispositivos móveis
  test('Teste com dispositivo iPhone 12', async ({ browser }) => {
    const iPhone = devices['iPhone 12']
    const context = await browser.newContext({
      ...iPhone,
    })

    await bikesPage.goto('/bicicletas.html')

    await context.close()
  })

  test('Teste com dispositivo Android Pixel 5', async ({ browser }) => {
    const pixel5 = devices['Pixel 5']
    const context = await browser.newContext({
      ...pixel5,
    })

    await bikesPage.goto('/bicicletas.html')

    await context.close()
  })
})
