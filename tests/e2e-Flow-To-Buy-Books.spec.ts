import { test, expect, type Page, firefox } from '@playwright/test';
import { logInForm } from './fixture/logInPage';
import { addBook } from './fixture/books';
import { shoppingCart } from './fixture/shoppingCart';
import { logOutForm } from './fixture/logOutPage';

    let login;
    let logOut;
    let bookAdd;
    let shoppingCartAdd;

[
  { username: process.env.username_robot, password: process.env.password, shippingmethod: 'Ground', paymentmethod: 'Credit Card' },
  { username: process.env.username_3, password: process.env.password, shippingmethod: 'Next Day Air', paymentmethod: 'Check/Money Order' },
  { username: process.env.username_4, password: process.env.password, shippingmethod: '2nd Day Air', paymentmethod: 'Purchase Order' }
].forEach(({ username, password, shippingmethod, paymentmethod }) => {

  test(`E2E journey to buy book for ${username} with ${shippingmethod} and payment method ${paymentmethod}`,{tag: '@BuyBooks'}, async ({ page }) => {

    login = new logInForm(page);
    logOut = new logOutForm(page);
    bookAdd = new addBook(page);
    shoppingCartAdd = new shoppingCart(page);
    await login.login(username, password);
    await shoppingCartAdd.emptyCart();
    switch (username) {
      case process.env.username_robot:
        //click on books category
        await bookAdd.addBook("ComputingAndInternet");
        await expect(shoppingCartAdd.itemInCart).toBeVisible();
        await shoppingCartAdd.checkoutBook("Ground", "Credit Card", "MasterCard", "Test123", 5555555555554444, 7, 2027, 206)
        await expect(logOut.logOutLink).toBeVisible();
        await logOut.logOut();
        await expect(login.logInLink).toBeVisible();
        break;

      case process.env.username_3:
        //click on books category
        await bookAdd.addBook("HealthAndBook");
        await expect(shoppingCartAdd.itemInCart).toBeVisible();
        await shoppingCartAdd.checkoutBook("Next Day Air", "Check/Money Order")
        await expect(logOut.logOutLink).toBeVisible();
        await logOut.logOut();
        await expect(login.logInLink).toBeVisible();
        break;

      case process.env.username_4:
        //click on books category
        await bookAdd.addBook("Fiction");
        await expect(shoppingCartAdd.itemInCart).toBeVisible();
        await shoppingCartAdd.checkoutBook("2nd Day Air", "Purchase Order")
        await expect(logOut.logOutLink).toBeVisible();
        await logOut.logOut();
        await expect(login.logInLink).toBeVisible();
        break;

      default:
        break;
    }
  })
});

