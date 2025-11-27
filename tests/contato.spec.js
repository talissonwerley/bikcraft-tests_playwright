import { test, expect } from '@playwright/test'
import { ContatoPage } from '../pages/ContatoPage'

let contatoPage

test.beforeEach(async ({ page }) => {
  contatoPage = new ContatoPage(page)
  await contatoPage.goto()
})

test.describe('Página de Contato - Bikcraft', () => {
  test('Deve exibir o formulário de contato visível', async ({ page }) => {
    await contatoPage.goto()

    // Verifica se os campos principais do formulário estão visíveis
    await expect(contatoPage.inputNome).toBeVisible()
  })

  test('Deve enviar formulário com dados válidos', async ({ page }) => {
    await contatoPage.goto()

    await contatoPage.preencherFormulario({
      nome: 'Teste Testador',
      telefone: '(21) 99999-9999',
      email: 'teste@testador.com',
      mensagem: 'Estava aqui testando, resolvi testar.',
    })

    await contatoPage.enviarFormulario()
    await contatoPage.validarMensagemErro()
  })

  test('Não deve enviar formulário com campos obrigatórios vazios', async ({
    page,
  }) => {
    await contatoPage.goto()

    await contatoPage.enviarFormulario()
    // Validar que erro aparece ou que a página não navegou
    // Pode ser validação nativa do navegador, então:
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/contato/)
  })
})
