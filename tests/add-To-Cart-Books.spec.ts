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
  { username: 'test.12@gmail.com', password: 'Password@123' },
  { username: 'test.13@gmail.com', password: 'Password@123' },
  { username: 'test.14@gmail.com', password: 'Password@123' },
  { username: 'test.15@gmail.com', password: 'Password@123' },
].forEach(({ username, password }) => {

  test(`Add Computing and internet book to the cart ${username}`, async ({ page }) => {
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
    if(username=='test.12@gmail.com'){
    await bookAdd.addBook("ComputingAndInternet");
    await expect(shoppingCartAdd.itemInCart).toBeVisible();
    }
    else if(username=='test.13@gmail.com'){
      await bookAdd.addBook("Fiction");
      await expect(shoppingCartAdd.itemInCart).toBeVisible();

    }
    else if(username=='test.14@gmail.com'){
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

