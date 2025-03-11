import { expect, type Locator, type Page } from '@playwright/test';
import exp from 'constants';

export class logOutForm {
  //Account locators
  readonly page: Page;
  readonly logOutLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.logOutLink = page.locator('//*[text()="Log out"]');

  }


  async logOut() {
    // click on logout
    await this.logOutLink.click();
  }
}