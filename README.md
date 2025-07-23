# Project Information

- This project uses **Playwright** as an automation tool for both **UI** and **API testing**.
- Web application used for UI testing: [https://demowebshop.tricentis.com/]
- API URL used for testing: [https://reqres.in]
- The UI framework follows the **Page Object Model (POM)** structure.

---

# Project Structure

- **/tests**  
  Contains both API and UI test files.

- **/fixture**  
  Contains different UI page objects with locators and methods used across tests.  
  Also includes the base URL configuration needed for API tests.

- **/test-data-for-api**  
  Contains API request payloads.

---

# How to Run the Tests

- Install dependencies (either command works):  
  ```bash
  npm i
  ```  
  or  
  ```bash
  npm install
  ```

- Run all tests under the `/tests` folder:  
  ```bash
  npx playwright test
  ```

- Run a specific test file:  
  ```bash
  npx playwright test activities-API.spec.ts
  ```

- Run tests where the file name contains a specific keyword (e.g., "Books"):  
  ```bash
  npx playwright test {Books}
  ```

- Skip or run specific tests by adding tags inside test files:  
  ```js
  test.skip(...)  // skip test
  test.only(...)  // run only this test
  ```

---

# Using Tags

Tags help run specific categories of tests, such as **Smoke** or **Regression** tests.

---

# Commands to Run Tests by Tag

- Run tests with a single tag:  
  ```bash
  npx playwright test --grep "{@tagName}"
  ```

- Exclude tests with a single tag:  
  ```bash
  npx playwright test --grep-invert "{@tagName}"
  ```

- Run tests matching multiple tags:  
  ```bash
  npx playwright test --grep "(?=.*@{tagName1})(?=.*@{tagName2})"
  ```

- Exclude tests matching multiple tags:  
  ```bash
  npx playwright test --grep-invert "(?=.*@{tagName1})(?=.*@{tagName2})"
  ```

---
