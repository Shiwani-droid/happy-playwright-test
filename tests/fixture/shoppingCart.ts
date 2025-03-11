import { expect, type Locator, type Page } from '@playwright/test';
import { logOutForm } from './logOutPage';
import { logInForm } from './logInPage';

export class shoppingCart {
  //Account locators
  readonly page: Page;
  readonly shoppingCart: Locator;
  readonly fictionBookInCart: Locator;
  readonly computingAndInternetBookInCart: Locator;
  readonly healthBookInCart: Locator;
  readonly removeFromCartCheckbox: Locator;
  readonly updateShoppingCartButton: Locator;
  readonly itemInCart: Locator;
  readonly healthBookInCartCheckBoxAtShoppingCart: Locator;
  readonly computingAndInternetAtShoppingCart: Locator;
  readonly fictionAtShoppingCart: Locator;
  readonly shoppingCartEmptyMessage: Locator;
  readonly termsOfServiceCheckbox: Locator;
  readonly checkoutButton: Locator;
  //Billing Address
  readonly billingAddressContinueButton: Locator;
  //shipping address
  readonly shippingAddressContinueButton: Locator;
  //shipping method
  readonly groundShippingMethod: Locator;
  readonly nextDayAirShippingMethod: Locator;
  readonly secondDayAirShippingMethod: Locator;
  readonly shippingMethodContinueButton: Locator;
  //payment method
  readonly codPaymentMothod: Locator;
  readonly checkOrMoneyOrderPaymentMethod: Locator;
  readonly creditCardPaymentMethod: Locator;
  readonly selectCreditCardDropdown: Locator;
  readonly cardHolderNameTextBox: Locator;
  readonly cardNumberTextBox: Locator;
  readonly expirationDateSelect: Locator;
  readonly expirationYearSelect: Locator;
  readonly cardCode: Locator;
  readonly purchaseOrderPaymentMethod: Locator;
  readonly paymenthMethodContinueButton: Locator;
  readonly purchaseOrderNumberTextBox: Locator;
  //Payment Information continue button
  readonly paymentInformationConitnueButton: Locator;
  //Confirm order
  readonly confirmOrderConfirmButton: Locator;
  //order placed successfully
  readonly successfulOrderMessage: Locator;
  //Thank you page
  readonly successfulOrderContinueButton: Locator;





  constructor(page: Page) {
    this.page = page;
    this.shoppingCart = page.locator("//*[@class='ico-cart']/parent::li[@id='topcartlink']");
    this.itemInCart = page.locator("//*[@class='product-name']").first();
    this.removeFromCartCheckbox = page.locator("//*[@name='removefromcart']");
    this.updateShoppingCartButton = page.locator('//*[@name="updatecart"]');
    this.computingAndInternetAtShoppingCart = page.locator('//*[@value="4912734"]');
    this.healthBookInCart = page.locator('//*[@value="4912733"]');
    this.fictionAtShoppingCart = page.locator('//*[@value="4912735"]')
    this.termsOfServiceCheckbox = page.locator('//*[@id="termsofservice"]');
    this.checkoutButton = page.locator('//*[@id="checkout"]');
    this.billingAddressContinueButton = page.locator('//*[@onclick="Billing.save()"]');
    this.shippingAddressContinueButton = page.locator('//*[@onclick="Shipping.save()"]');
    this.groundShippingMethod = page.locator('//*[@id="shippingoption_0"]');
    this.nextDayAirShippingMethod = page.locator('//*[@id="shippingoption_1"]');
    this.secondDayAirShippingMethod = page.locator('//*[@id="shippingoption_2"]');
    this.shippingMethodContinueButton = page.locator('//*[@onclick="ShippingMethod.save()"]')
    this.codPaymentMothod = page.locator('//*[@value="Payments.CashOnDelivery"]');
    this.checkOrMoneyOrderPaymentMethod = page.locator('//*[@value="Payments.CheckMoneyOrder"]')
    this.creditCardPaymentMethod = page.locator('//*[@value="Payments.Manual"]')
    this.selectCreditCardDropdown = page.locator('//*[@id="CreditCardType"]');
    this.cardHolderNameTextBox = page.locator('//*[@id="CardholderName"]');
    this.cardNumberTextBox = page.locator('//*[@id="CardNumber"]');
    this.expirationDateSelect = page.locator('//*[@id="ExpireMonth"]');
    this.expirationYearSelect = page.locator('//*[@id="ExpireYear"]')
    this.cardCode = page.locator('//*[@id="CardCode"]');
    this.purchaseOrderPaymentMethod = page.locator('//*[@value="Payments.PurchaseOrder"]');
    this.paymenthMethodContinueButton = page.locator('//*[@onclick="PaymentMethod.save()"]');
    this.paymentInformationConitnueButton = page.locator('//*[@onclick="PaymentInfo.save()"]');
    this.purchaseOrderNumberTextBox = page.locator('//*[@id="PurchaseOrderNumber"]');
    this.confirmOrderConfirmButton = page.locator('//*[@onclick="ConfirmOrder.save()"]');
    this.successfulOrderMessage = page.locator('//strong[text()="Your order has been successfully processed!"]')
    this.successfulOrderContinueButton = page.locator('//*[@class="button-2 order-completed-continue-button"]')

    this.shoppingCartEmptyMessage = page.locator('//*[contains(text(),"Your Shopping Cart is empty")]');

  }

  async shoppingCartLinkClick() {
    //click on shopping cart link
    await this.shoppingCart.click()
  }

  async emptyCart() {
    await this.shoppingCartLinkClick()
    while (await this.removeFromCartCheckbox.first().isVisible()) {
      await this.removeFromCartCheckbox.first().click()
      await this.updateShoppingCartButton.click();
      if (!(await this.removeFromCartCheckbox.first().isVisible())) {
        break;
      }

    }
    // const logOut = new logOutForm(this.page)
    //  await logOut.logOut()

  }

  async checkoutBook(shippingMehtod: string, paymentMethod: string, creditCardType: string, cardHolderNameInput: string, cardNumberInput: number, expireMonth: string, expireYear: string, cardCordInput: number
  ) {
    await this.termsOfServiceCheckbox.click();
    await this.checkoutButton.click();
    await this.billingAddressContinueButton.click();
    await this.shippingAddressContinueButton.click();
    switch (shippingMehtod) {
      case "Ground":
        await this.groundShippingMethod.click();
        break;
      case "Next Day Air":
        await this.nextDayAirShippingMethod.click();
        break;
      case "2nd Day Air":
        await this.secondDayAirShippingMethod.click();
        break;
      default:
        break;
    }
    await this.shippingMethodContinueButton.click();
    switch (paymentMethod) {
      case "COD":
        await this.paymentMethodCOD()
        break;
      case "Check/Money Order":
        await this.paymentMethodCheckOrMoneyOrder();
        break;
      case "Credit Card":
        await this.paymentMethodCreditCard(creditCardType, cardHolderNameInput, cardNumberInput, expireMonth, expireYear, cardCordInput
        );
        break;
      case "Purchase Order":
        await this.paymentMethodPurchaseOrder()
        break;
      default:
        break;
    }
    await this.paymentInformationConitnueButton.scrollIntoViewIfNeeded();
    await this.paymentInformationConitnueButton.click();
    //click on confirm button on confirm order page
    await this.confirmOrderConfirmButton.scrollIntoViewIfNeeded();
    await this.confirmOrderConfirmButton.click();
    await this.successfulOrderContinueButton.click();
  }

  async paymentMethodCOD() {
    await this.codPaymentMothod.click();
    await this.paymenthMethodContinueButton.click();
  }

  async paymentMethodCheckOrMoneyOrder() {
    await this.checkOrMoneyOrderPaymentMethod.click();
    await this.paymenthMethodContinueButton.click();

  }

  async paymentMethodCreditCard(creditCardType: string, cardHolderNameInput: string, cardNumberInput: number, expireMonth: string, expireYear: string, cardCordInput: number
  ) {
    await this.creditCardPaymentMethod.click();
    await this.paymenthMethodContinueButton.click();
    await this.selectCreditCardDropdown.selectOption({ value: `${creditCardType}` })
    await this.cardHolderNameTextBox.fill(`${cardHolderNameInput}`);
    //example of card number: 5555555555554444
    await this.cardNumberTextBox.fill(`${cardNumberInput}`);
    await this.expirationDateSelect.selectOption({ value: `${expireMonth}` });
    await this.expirationYearSelect.selectOption({ value: `${expireYear}` });
    await this.cardCode.fill(`${cardCordInput}`);

  }

  async paymentMethodPurchaseOrder() {
    await this.purchaseOrderPaymentMethod.click();
    await this.paymenthMethodContinueButton.click();
    await this.purchaseOrderNumberTextBox.fill("1234");

  }

}