import { test, expect, devices } from '@playwright/test'
import { SegurosPage } from '../pages/SegurosPage'
import userData from '../fixtures/userData.json'

let segurosPage

test.beforeEach(async ({ page }) => {
  segurosPage = new SegurosPage(page)
  await segurosPage.goto()
})

test.describe('Página de Seguros - Bikcraft', () => {
  test('Deve mostrar os dois cards e retornar seus títulos', async ({
    page,
  }) => {
    await segurosPage.goto()

    // Verificar se os cards estão visíveis
    await segurosPage.verificarCardsVisiveis()

    // Pegar os títulos dos cards e validar
    const titulos = await segurosPage.obterTitulosDosCards()
    console.log('Títulos dos cards:', titulos)

    expect(titulos.length).toBe(2)
    expect(titulos[0].toLowerCase()).toContain('prata')
    expect(titulos[1].toLowerCase()).toContain('ouro')
  })

  test('Não deve enviar formulário com campos obrigatórios em branco', async ({
    page,
  }) => {
    const segurosPage = new SegurosPage(page)

    await segurosPage.goto()
    await segurosPage.clicarInscrevaSe()
    await segurosPage.verificarFormularioVisivel()

    await segurosPage.enviarFormulario()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/orcamento/)

    const focused = await page.evaluate(() => document.activeElement.id)
    expect(['nome', 'email', 'cpf']).toContain(focused)
  })

  test('Deve permitir a inscrição com formulário válido', async ({ page }) => {
    await segurosPage.goto()

    await segurosPage.verificarCardsVisiveis()

    await segurosPage.clicarInscrevaSe()
    await expect(page).toHaveURL(/orcamento/)

    await segurosPage.verificarFormularioVisivel()
    await expect(page).toHaveURL(/orcamento\.html\?tipo=seguro&produto=prata/)

    /* Preenchendo o formulário de orçamento */
    await page
      .getByRole('textbox', { name: 'Nome', exact: true })
      .fill(userData.nome)
    await page
      .getByRole('textbox', { name: 'Sobrenome' })
      .fill(userData.sobrenome)
    await page.getByRole('textbox', { name: 'CPF' }).fill(userData.cpf)
    await page.getByRole('textbox', { name: 'Email' }).fill(userData.email)
    await page.getByRole('textbox', { name: 'CEP' }).fill(userData.cep)
    await page.getByRole('textbox', { name: 'Número' }).fill(userData.numero)
    await page
      .getByRole('textbox', { name: 'Logradouro' })
      .fill(userData.logradouro)
    await page.getByRole('textbox', { name: 'Bairro' }).fill(userData.bairro)
    await page.getByRole('textbox', { name: 'Cidade' }).fill(userData.cidade)
    await page.getByRole('textbox', { name: 'Estado' }).fill(userData.estado)

    /* Enviando o formulário */
    await page.getByRole('button', { name: 'Solicitar Orçamento' }).click()

    // Apenas para visualizar o resultado final antes do teste encerrar
    const mensagem = await page.locator('p.font-2-l').textContent()
    expect(mensagem.trim()).toContain('Erro no envio')
    expect(mensagem.trim()).toContain('contato@bikcraft.net')
  })

  // Testes com dispositivos móveis
  test('Teste com dispositivo iPhone 12', async ({ browser }) => {
    const iPhone = devices['iPhone 12']
    const context = await browser.newContext({
      ...iPhone,
    })
    const bikesPage = await context.newPage()
    await bikesPage.goto('https://bikcraft-gamma.vercel.app/seguros.html')

    await context.close()
  })

  test('Teste com dispositivo Android Pixel 5', async ({ browser }) => {
    const pixel5 = devices['Pixel 5']
    const context = await browser.newContext({
      ...pixel5,
    })
    const bikesPage = await context.newPage()
    await bikesPage.goto('https://bikcraft-gamma.vercel.app/seguros.html')

    await context.close()
  })
})
