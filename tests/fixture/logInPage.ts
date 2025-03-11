import { expect, type Locator, type Page } from '@playwright/test';
import exp from 'constants';

export class logInForm {
  //Account locators
  readonly page: Page;
  readonly logInLink: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly logInButton: Locator;
  readonly logOutLink: Locator;
  readonly username: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInLink = page.locator('//*[contains(text(),\'Log in\')]');
    this.emailField = page.locator('//*[@id="Email"]');
    this.passwordField = page.locator('//*[@id="Password"]');
    this.logInButton = page.locator('//*[@value="Log in"]');
    this.logOutLink = page.locator("//*[contains(text(),'Log out')]");
    this.username = page.locator('//*[@class="account"]')

  }


  async login(username: string, password: string) {
    await this.page.goto('https://demowebshop.tricentis.com/');
    // click on login
    await this.logInLink.click();
    // Enter username and password
    // await this.emailField.fill('test.robot@gmail.com')
    // await this.passwordField.fill('Password@123')
    await this.emailField.fill(username)
    await this.passwordField.fill(password)
    await this.logInButton.click();
  }
}