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
  { username: process.env.username_12, password: process.env.password },
  { username: process.env.username_13, password: process.env.password },
  { username: process.env.username_14, password: process.env.password },
  { username: process.env.username_15, password: process.env.password },
].forEach(({ username, password }) => {

  test(`Add Computing and internet book to the cart ${username}`,{tag: '@AddBooksToCart'}, async ({ page }) => {
    login = new logInForm(page);
    logOut = new logOutForm(page);
    bookAdd = new addBook(page);
    shoppingCartAdd = new shoppingCart(page);
    await login.login(username,password)
    await expect(login.logOutLink).toBeVisible()
    const emailAccount = await (login.username).allTextContents()
    console.log(emailAccount[0])
    //validate username display correctly
    await expect(emailAccount[0]).toBe(username);
    if(username==process.env.username_12){
    await bookAdd.addBook("ComputingAndInternet");
    await expect(shoppingCartAdd.itemInCart).toBeVisible();
    }
    else if(username==process.env.username_13){
      await bookAdd.addBook("Fiction");
      await expect(shoppingCartAdd.itemInCart).toBeVisible();

    }
    else if(username==process.env.username_14){
      await bookAdd.addBook("HealthAndBook");
      await expect(shoppingCartAdd.itemInCart).toBeVisible();

    }
    else{
      await bookAdd.addBook("ComputingAndInternet");
      await expect(shoppingCartAdd.itemInCart).toBeVisible();
    }
    await logOut.logOut();
    await expect(login.logInLink).toBeVisible();
  })
});

