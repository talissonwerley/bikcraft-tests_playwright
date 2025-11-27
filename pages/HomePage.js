// pages/HomePage.js
export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page

    // Seletores básicos da home (exemplos, ajuste conforme o site)
    this.logo = page.getByRole('link', { name: 'Bikcraft', exact: true })
    this.bannerPrincipal = page
      .locator('div')
      .filter({ hasText: 'Bicicletas feitas sob medida' })
      .first()
    this.footer = page
      .locator('div')
      .filter({ hasText: 'Contato +55 21 9999-9999' })
      .first()
    this.menuBikes = page.getByRole('link', { name: /bicicletas/i }).first()
    this.menuSeguros = page.getByRole('link', { name: /seguros/i }).first()
    this.menuContato = page.getByRole('link', { name: /contato/i }).first()
  }

  async goto() {
    await this.page.goto('/')
  }

  async isLogoVisible() {
    return this.logo.isVisible()
  }

  async clickMenuBikes() {
    await this.menuBikes.click()
  }

  async clickMenuSeguros() {
    await this.menuSeguros.click()
  }

  async clickMenuContato() {
    await this.menuContato.click()
  }

  async isBannerVisible() {
    return this.bannerPrincipal.isVisible()
  }

  async isFooterVisible() {
    return this.footer.isVisible()
  }
}
