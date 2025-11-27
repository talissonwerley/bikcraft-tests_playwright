import { test, expect, devices } from '@playwright/test'
import { OrcamentoPage } from '../pages/OrcamentoPage'
import userData from '../fixtures/userData.json'

let orcamentoPage

test.beforeEach(async ({ page }) => {
  orcamentoPage = new OrcamentoPage(page)
  await orcamentoPage.goto()
})

test.describe('Página de Bicicletas - Bikcraft', () => {
  test('Deve exibir a lista de bicicletas', async ({ page }) => {
    await orcamentoPage.goto()

    await expect(orcamentoPage.titulo).toBeVisible()
    await expect(orcamentoPage.listaBikes).toHaveCount(3) // exemplo: espera 3 itens
  })

  test('Deve clicar na primeira bike e deve abrir a página de detalhes correta', async ({
    page,
  }) => {
    await orcamentoPage.goto()

    await orcamentoPage.clickPrimeiraBike()

    // Aqui você pode validar a URL
    await expect(page).toHaveURL(/nimbus\.html/)

    await expect(
      page.getByRole('heading', { name: /nimbus stark/i })
    ).toBeVisible()
  })

  test('Deve redirecionar o usuario para a pagina de Orçamento e checar o valor', async ({
    page,
  }) => {
    await orcamentoPage.goto()

    await orcamentoPage.clickPrimeiraBike()

    await expect(page).toHaveURL(/nimbus\.html/)

    await expect(
      page.getByRole('heading', { name: /nimbus stark/i })
    ).toBeVisible()

    await page.getByRole('link', { name: 'Comprar Agora' }).click()
    await expect(page).toHaveURL(
      /orcamento\.html\?tipo=bikcraft&produto=nimbus/
    )

    // Aqui você pega o label pelo texto completo com preço
    const labelNimbus = page.locator('label[for="nimbus"]')
    await expect(labelNimbus).toBeVisible()

    const textoLabel = await labelNimbus.textContent()
    expect(textoLabel.trim()).toBe('Nimbus Stark R$ 4999')
  })

  test('Deve preencher o formulário de orçamento', async ({ page }) => {
    await orcamentoPage.goto()

    await orcamentoPage.clickPrimeiraBike()

    await expect(page).toHaveURL(/nimbus\.html/)

    await expect(
      page.getByRole('heading', { name: /nimbus stark/i })
    ).toBeVisible()

    await page.getByRole('link', { name: 'Comprar Agora' }).click()
    await expect(page).toHaveURL(
      /orcamento\.html\?tipo=bikcraft&produto=nimbus/
    )

    // Preenchendo o formulário de orçamento
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
    await bikesPage.goto(
      'https://bikcraft-gamma.vercel.app/orcamento.html?tipo=seguro&produto=prata'
    )

    await context.close()
  })

  test('Teste com dispositivo Android Pixel 5', async ({ browser }) => {
    const pixel5 = devices['Pixel 5']
    const context = await browser.newContext({
      ...pixel5,
    })
    const bikesPage = await context.newPage()
    await bikesPage.goto(
      'https://bikcraft-gamma.vercel.app/orcamento.html?tipo=seguro&produto=prata'
    )

    await context.close()
  })
})
