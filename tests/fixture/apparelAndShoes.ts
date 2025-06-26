import { expect, type Locator, type Page } from '@playwright/test';
import { shoppingCart } from './shoppingCart'

export class addApparelAndShoes {

  readonly page: Page;
  readonly apparelAndShoesClick: Locator;
  readonly rockabillyPolkaDotTopJRPlusSize: Locator;
  readonly blueAndGreenSneaker: Locator;
  readonly blueJeans:Locator;
  readonly casualGolfBelt: Locator;
  readonly genuineLeatherHandbag: Locator;

  readonly apparelAndShoesClickAddToTheCart: Locator;
  readonly rockabillyPolkaDotTopJRPlusSizeAddToTheCart: Locator;
  readonly blueAndGreenSneakerAddToTheCart: Locator;
  readonly blueJeansAddToTheCart:Locator;
  readonly casualGolfBeltAddToTheCart: Locator;
  readonly genuineLeatherHandbagAddToTheCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.apparelAndShoesClick = page.locator('//*[@class="top-menu"]/li/a[@href="/apparel-shoes"]');
    this.rockabillyPolkaDotTopJRPlusSize= page.locator('//*[contains(@onclick,"5")]');
    this.blueAndGreenSneaker= page.locator('//*[contains(@onclick,"28")]');
    this.blueJeans= page.locator('//*[contains(@onclick,"36")]');
    this.casualGolfBelt= page.locator('//*[contains(@onclick,"40")]');
    this.genuineLeatherHandbag= page.locator('//*[contains(@onclick,"29")]');
    this.rockabillyPolkaDotTopJRPlusSizeAddToTheCart = page.locator('//*[@id="add-to-cart-button-5"]');
    this.blueAndGreenSneakerAddToTheCart = page.locator('//*[@id="add-to-cart-button-28"]');
    this.blueJeansAddToTheCart = page.locator('//*[@id="add-to-cart-button-36"]');
    this.casualGolfBeltAddToTheCart = page.locator('//*[@id="add-to-cart-button-40"]');
  }


  async addApparelAndShoesItems(ApparelAndShoes: string) {
    let gotToCart = new shoppingCart(this.page)
    await this.apparelAndShoesClick.click();
    switch (ApparelAndShoes) {
      case "50's Rockabilly Polka Dot Top JR Plus Size":
        await this.rockabillyPolkaDotTopJRPlusSize.click();
        await this.rockabillyPolkaDotTopJRPlusSizeAddToTheCart.click();
        await gotToCart.shoppingCartLinkClick()
        if (await gotToCart.shoppingCartEmptyMessage.isVisible()) {
          await this.apparelAndShoesClick.click();
          await this.rockabillyPolkaDotTopJRPlusSize.click();
          await this.rockabillyPolkaDotTopJRPlusSizeAddToTheCart.click();
          await gotToCart.shoppingCartLinkClick();
        }
        break;

      case "Blue and green Sneaker":
        await this.blueAndGreenSneaker.click();
        await this.blueAndGreenSneakerAddToTheCart.click();
        await gotToCart.shoppingCartLinkClick()

        if (await gotToCart.shoppingCartEmptyMessage.isVisible()) {
          await this.apparelAndShoesClick.click();
          await this.blueAndGreenSneaker.click();
          await this.blueAndGreenSneakerAddToTheCart.click();
          await gotToCart.shoppingCartLinkClick();
        }
        break;

      case "Blue Jeans":
        await this.blueJeans.click();
        await gotToCart.shoppingCartLinkClick()

        if (await gotToCart.shoppingCartEmptyMessage.isVisible()) {
          await this.apparelAndShoesClick.click();
          await this.blueJeans.click();
          await gotToCart.shoppingCartLinkClick();
        }
        break;

        case "Casual Golf Belt":
        await this.casualGolfBelt.click();
        await gotToCart.shoppingCartLinkClick()

        if (await gotToCart.shoppingCartEmptyMessage.isVisible()) {
          await this.apparelAndShoesClick.click();
          await this.casualGolfBelt.click();
          await gotToCart.shoppingCartLinkClick();
        }
        break;

      default:
        break;
    }
  }
}

