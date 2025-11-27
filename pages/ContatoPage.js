import { expect } from '@playwright/test'

export class ContatoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page

    this.inputNome = page.getByRole('textbox', { name: 'Nome' })
    this.inputTelefone = page.getByRole('textbox', { name: 'Telefone' })
    this.inputEmail = page.getByRole('textbox', { name: 'Email' })
    this.inputMensagem = page.getByRole('textbox', { name: 'Mensagem' })

    this.btnEnviar = page.getByRole('button', { name: 'Enviar Mensagem' })

    // Mensagem de erro
    this.mensagemErro = page.getByText('Erro no envio, você pode')
  }

  async goto() {
    await this.page.goto('/contato.html')
  }

  // Validação de formulário visivel
  async verificarFormularioVisivel() {
    await expect(this.inputNome).toBeVisible()
  }

  async preencherFormulario(dados) {
    await this.inputNome.fill(dados.nome)
    await this.inputTelefone.fill(dados.telefone)
    await this.inputEmail.fill(dados.email)
    await this.inputMensagem.fill(dados.mensagem)
  }

  async enviarFormulario() {
    await this.btnEnviar.click()
  }

  async validarMensagemErro() {
    await expect(this.mensagemErro).toBeVisible()
  }
}
