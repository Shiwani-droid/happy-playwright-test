# Project Information
 - This Project is using Playwright as an automation tool for both UI and API Testing
 - Web application used for UI testing - https://demowebshop.tricentis.com/
 - API url used for testing - https://reqres.in
 - POM structure used for UI framework

 # Project structure
 - /tests:
        Containing both API and UI test files
   -/fixture
         Containing different pages of UI with their locators and methods used in different tests file.
         Also, the base url test for API which need in API tests
   -/test-data-for-api
        Containing APIs request Payload

# To run the test
 - `npm i` - To install al the dependencies
 - `npm install` - To install al the dependencies
 - `npx playwright test`  - run all the test under tests folder
 - `npx playwright test activities-API.spec.ts` - To run specific test
 - `npx playwright test {Books}` - To run the spec file whose name contains mit
 - `test.skip` / `test.only` - To skip or run specific test by using this tags in test file

 # Tags
 - Sometimes we want to run particular category of test or specific integration test. In that case tags are very helpful

 # Command to run the test with particular tag
 - `npx playwright test --grep "{@tagName}"`        - To run the test with single tag
 - `npx playwright test --grep-invert "{@tagName}"` - To exclude test from run with single tag
 - `npx playwright test --grep "(?=.*@{tagName})(?=.*@{tagName})"` - To run test with multiple tags
 - `npx playwright test --grep-invert "(?=.*@{tagName})(?=.*@{tagName})"` - To exculde test from run with multiple tags
