import { test, expect, type Page, firefox } from '@playwright/test';
import { logInForm } from './fixture/logInPage';
import { addBook } from './fixture/books';
import { shoppingCart } from './fixture/shoppingCart';
import { logOutForm } from './fixture/logOutPage';
import { addApparelAndShoes } from './fixture/apparelAndShoes';


    let login;
    let logOut;
    let shoppingCartAdd;
    let apparelAndShoes;

[
  { username: process.env.username_7, password: process.env.password,shippingmethod: 'Ground', paymentmethod: 'Credit Card' },
  { username: process.env.username_8, password: process.env.password, shippingmethod: 'Next Day Air', paymentmethod: 'Check/Money Order' },
  { username: process.env.username_9, password: process.env.password,shippingmethod: '2nd Day Air', paymentmethod: 'Purchase Order' },
  { username: process.env.username_10, password: process.env.password,shippingmethod: '2nd Day Air', paymentmethod: 'Purchase Order' }
].forEach(({ username, password, shippingmethod, paymentmethod }) => {

  test(`E2E journey to buy apparel and shoes for ${username} with ${shippingmethod} and payment method ${paymentmethod}`,{tag: '@BuyApparelAndShoes'}, async ({ page }) => {
    login = new logInForm(page);
    logOut = new logOutForm(page);
    apparelAndShoes = new addApparelAndShoes(page);
    shoppingCartAdd = new shoppingCart(page);
    await login.login(username,password)
    await expect(login.logOutLink).toBeVisible()
    const emailAccount = await (login.username).allTextContents()
    console.log(emailAccount[0])
    //validate username display correctly
    await expect(emailAccount[0]).toBe(username);
    switch (username) {
          case process.env.username_7:
            //click on books category
            await apparelAndShoes.addApparelAndShoesItems("50's Rockabilly Polka Dot Top JR Plus Size")
            await expect(shoppingCartAdd.itemInCart).toBeVisible();
            await shoppingCartAdd.checkoutBook("Ground", "Credit Card", "MasterCard", "Test123", 5555555555554444, 7, 2027, 206)
            await expect(logOut.logOutLink).toBeVisible();
            await logOut.logOut();
            await expect(login.logInLink).toBeVisible();
            break;
    
          case process.env.username_8:
            //click on books category
            await apparelAndShoes.addApparelAndShoesItems("Blue and green Sneaker")
            await expect(shoppingCartAdd.itemInCart).toBeVisible();
            await shoppingCartAdd.checkoutBook("Next Day Air", "Check/Money Order")
            await expect(logOut.logOutLink).toBeVisible();
            await logOut.logOut();
            await expect(login.logInLink).toBeVisible();
            break;

          case process.env.username_9:
            //click on books category
            await apparelAndShoes.addApparelAndShoesItems("Blue Jeans")
            await expect(shoppingCartAdd.itemInCart).toBeVisible();
            await shoppingCartAdd.checkoutBook("2nd Day Air", "Purchase Order")
            await expect(logOut.logOutLink).toBeVisible();
            await logOut.logOut();
            await expect(login.logInLink).toBeVisible();
            break;

            case process.env.username_10:
            //click on books category
            await apparelAndShoes.addApparelAndShoesItems("Casual Golf Belt")
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

