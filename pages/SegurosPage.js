import { expect } from '@playwright/test'

export class SegurosPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    this.cards = page.locator('div.seguros.container > div.seguros-item')
    this.btnInscrevaSe = page.getByRole('link', { name: 'Inscreva-se' }).first()

    // Campos do formulário da página de orçamento
    this.inputNome = page.getByRole('textbox', { name: 'Nome', exact: true })
    this.inputSobrenome = page.getByRole('textbox', { name: 'Sobrenome' })
    this.inputCPF = page.getByRole('textbox', { name: 'CPF' })
    this.inputEmail = page.getByRole('textbox', { name: 'Email' })
    this.inputCEP = page.getByRole('textbox', { name: 'CEP' })
    this.inputNumero = page.getByRole('textbox', { name: 'Número' })
    this.inputLogradouro = page.getByRole('textbox', { name: 'Logradouro' })
    this.inputBairro = page.getByRole('textbox', { name: 'Bairro' })
    this.inputCidade = page.getByRole('textbox', { name: 'Cidade' })
    this.inputEstado = page.getByRole('textbox', { name: 'Estado' })
    this.btnSolicitarOrcamento = page.getByRole('button', {
      name: 'Solicitar Orçamento',
    })

    // Mensagens de feedback (ajuste os seletores conforme o site)
    this.mensagemErro = page.getByText('Erro no envio, você pode')
  }

  async goto() {
    await this.page.goto('/seguros.html')
  }

  async verificarCardsVisiveis() {
    await expect(this.cards).toHaveCount(2)
    await expect(this.cards.first()).toBeVisible()
    await expect(this.cards.nth(1)).toBeVisible()
  }

  async clicarInscrevaSe() {
    await this.btnInscrevaSe.click()
  }

  async verificarFormularioVisivel() {
    // Pode ser que não tenha um form com id, por isso validamos por um campo principal do formulário
    await expect(this.inputNome).toBeVisible()
  }

  async preencherFormulario(dados) {
    await this.inputNome.fill(dados.nome)
    await this.inputSobrenome.fill(dados.sobrenome)
    await this.inputCPF.fill(dados.cpf)
    await this.inputEmail.fill(dados.email)
    await this.inputCEP.fill(dados.cep)
    await this.inputNumero.fill(dados.numero)
    await this.inputLogradouro.fill(dados.logradouro)
    await this.inputBairro.fill(dados.bairro)
    await this.inputCidade.fill(dados.cidade)
    await this.inputEstado.fill(dados.estado)
  }

  async enviarFormulario() {
    await this.btnSolicitarOrcamento.click()
  }

  async validarMensagemErro() {
    await expect(this.mensagemErro).toBeVisible()
  }

  async obterTitulosDosCards() {
    const titulos = []
    const count = await this.cards.count()
    for (let i = 0; i < count; i++) {
      // Pega o texto visível do card i
      const texto = await this.cards.nth(i).innerText()
      titulos.push(texto.trim())
    }
    return titulos
  }
}
