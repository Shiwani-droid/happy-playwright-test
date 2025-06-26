import { expect, type Locator, type Page } from '@playwright/test';
import { shoppingCart } from './shoppingCart'

export class addBook {
  //Account locators
  readonly page: Page;
  readonly bookCategoryClick: Locator;
  readonly computingAndInternetBook: Locator;
  readonly computingAndInternetAddToTheCart: Locator;
  readonly fictionBook: Locator;
  readonly fictionBookAddToTheCart: Locator;
  readonly healthBook: Locator;
  readonly healthBookAddToTheCart: Locator;
  readonly shoppingCart: Locator;
  readonly computingAndInternetBookA: Locator;
  readonly fictionBookB: Locator;
  readonly HealthAndBookC: Locator;

  constructor(page: Page) {
    this.page = page;
     this.bookCategoryClick = page.locator('//*[@href="/books"]').first();
    this.computingAndInternetBook = page.locator("//*[text()='Computing and Internet']/parent::h2[@class='product-title']")
    this.computingAndInternetAddToTheCart = page.locator('//*[@id="add-to-cart-button-13"]');
    this.fictionBook = page.locator("//*[text()='Fiction']/parent::h2[@class='product-title']");
    this.fictionBookAddToTheCart = page.locator('//*[@id="add-to-cart-button-45"]');
    this.healthBook = page.locator("//*[text()='Health Book']/parent::h2[@class='product-title']");
    this.healthBookAddToTheCart = page.locator('//*[@id="add-to-cart-button-22"]');
    this.shoppingCart = page.locator("//*[@class='ico-cart']/parent::li[@id='topcartlink']");
    this.computingAndInternetBookA = page.locator('//*[contains(@onclick,"13")]');
    this.fictionBookB = page.locator('//*[contains(@onclick,"45")]');
    this.HealthAndBookC = page.locator('//*[contains(@onclick,"22")]')
  }


  async addBook(book: string) {
    let gotToCart = new shoppingCart(this.page)
    await this.bookCategoryClick.click();
    switch (book) {

      case "ComputingAndInternet":
        await this.computingAndInternetBookA.click();
        await gotToCart.shoppingCartLinkClick()
        if (await gotToCart.shoppingCartEmptyMessage.isVisible()) {
          await this.bookCategoryClick.click();
          await this.computingAndInternetBookA.click();
          await gotToCart.shoppingCartLinkClick();
        }
        break;

      case "Fiction":
        await this.fictionBookB.click();
        await gotToCart.shoppingCartLinkClick()

        if (await gotToCart.shoppingCartEmptyMessage.isVisible()) {
          await this.bookCategoryClick.click();
          await this.fictionBookB.click();
          await gotToCart.shoppingCartLinkClick();
        }
        break;

      case "HealthAndBook":
        await this.HealthAndBookC.click();
        await gotToCart.shoppingCartLinkClick()

        if (await gotToCart.shoppingCartEmptyMessage.isVisible()) {
          await this.bookCategoryClick.click();
          await this.HealthAndBookC.click();
          await gotToCart.shoppingCartLinkClick();
        }
        break;

      default:
        break;
    }
  }
}