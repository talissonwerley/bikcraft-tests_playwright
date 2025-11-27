export class BikesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page

    // Seletores principais da página de bicicletas
    this.titulo = page.getByRole('heading', { name: /nossas bicicletas/i })
    this.listaBikes = page.locator('main .bicicletas.container')
    this.primeiraBike = this.listaBikes.first().getByRole('link')
  }

  async goto() {
    await this.page.goto('/bicicletas.html')
  }

  async getQuantidadeBikes() {
    return await this.listaBikes.count()
  }

  async clickPrimeiraBike() {
    await this.primeiraBike.click()
  }
}
