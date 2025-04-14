import { test, expect } from '@playwright/test';

const usersPostRequestBody = require('../tests/test-data-for-api/post_request_body_to_create_users .json');
const usersPutRequestBody = require('../tests/test-data-for-api/put_request_body_to_update_users.json')
const usersPatchRequestBody = require('../tests/test-data-for-api/patch_request_body_to_update_users.json')
const usersPostRequestBodyToRegisterSuccessfully = require('../tests/test-data-for-api/post_request_body_to_register_user_successfully.json')
const usersPostRequestBodyToRegisterUnsuccessful = require('../tests/test-data-for-api/post_request_body_to_register_user_unsuccessful.json')
const usersPostRequestBodyToLoginUserSuccessfully = require('../tests/test-data-for-api/post_request_body_to_login-user-successfully.json')


test('Get list of users', async ({ request }) => {
  const getAPIResponse = await request.get('https://reqres.in/api/users?page=2')
  //validate status
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(await getAPIResponse.status()).toBe(200);
});

test('Get single User', async ({ request }) => {
  const getAPIResponse = await request.get('https://reqres.in/api/users/2')
  //validate status
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(await getAPIResponse.status()).toBe(200);
  //Get the response
  const getApiResponseBody = await getAPIResponse.json();
  //Validating response body keys
  expect (getApiResponseBody.data).toHaveProperty("id");
  expect (getApiResponseBody.data).toHaveProperty("email");
  expect (getApiResponseBody.data).toHaveProperty("first_name");
  expect (getApiResponseBody.data).toHaveProperty("last_name");
  expect (getApiResponseBody.data).toHaveProperty("avatar");
  expect (getApiResponseBody.support).toHaveProperty("url");
  expect (getApiResponseBody.support).toHaveProperty("text");
});

test('Get single user not found', async ({ request }) => {
  const getAPIResponse = await request.get('https://reqres.in/api/users/23')
  //validate status
  expect(await getAPIResponse.status()).toBe(404);
});

test('Get list of Resource', async ({ request }) => {
  const getAPIResponse = await request.get('https://reqres.in/api/unknown')
  //validate status
  expect(await getAPIResponse.status()).toBeTruthy()
  expect(await getAPIResponse.status()).toBe(200);
});

test('Get list of single Resource', async ({ request }) => {
  const getAPIResponse = await request.get('https://reqres.in/api/unknown/2')
  //validate status
  expect(await getAPIResponse.status()).toBeTruthy()
  expect(await getAPIResponse.status()).toBe(200);
  //Get the response
  const getApiResponseBody = await getAPIResponse.json();
  //Validating response body keys
  expect (getApiResponseBody.data).toHaveProperty("id");
  expect (getApiResponseBody.data).toHaveProperty("name");
  expect (getApiResponseBody.data).toHaveProperty("year");
  expect (getApiResponseBody.data).toHaveProperty("color");
  expect (getApiResponseBody.data).toHaveProperty("pantone_value");
  expect (getApiResponseBody.support).toHaveProperty("url");
  expect (getApiResponseBody.support).toHaveProperty("text");
});

test('Get Resource Not Found', async ({ request }) => {
  const getAPIResponse = await request.get('https://reqres.in/api/unknown/23')
  //validate status
  expect(await getAPIResponse.status()).toBeTruthy()
  expect(await getAPIResponse.status()).toBe(404);

});


test('Create user', async ({ context }) => {
  const postAPIResponse = await context.request.post('https://reqres.in/api/users', {
    data: usersPostRequestBody
  })
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(201);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("name", "Jolly")
  expect(postAPIResponseBody).toHaveProperty("job", "Head of Deptt")
});

test('Update user by Put request', async ({ context }) => {
  const postAPIResponse = await context.request.put('https://reqres.in/api/users/2', {
    data: usersPutRequestBody

  })
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("name", "Molly")
  expect(postAPIResponseBody).toHaveProperty("job", "HR")
});

test('Update user by patch request', async ({ context }) => {
  const postAPIResponse = await context.request.patch('https://reqres.in/api/users/9', {
    data: usersPatchRequestBody
  })
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("name", "Shelly")
  expect(postAPIResponseBody).toHaveProperty("job", "QA")
});


test('Delete user', async ({ request }) => {
  const getAPIResponse = await request.delete('https://reqres.in/api/users/7')
  //validate status
  expect(await getAPIResponse.status()).toBe(204);
  // console.log(await getAPIResponse.json())
});

test('Register user successfully', async ({ context }) => {
  const postAPIResponse = await context.request.post('https://reqres.in/api/register', {
    data: usersPostRequestBodyToRegisterSuccessfully

  })
  expect(postAPIResponse.status()).toBe(200);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("id",4)
  expect(postAPIResponseBody).toHaveProperty("token","QpwL5tke4Pnpja7X4")
});

test('Register user un-successful', async ({ context }) => {
  const postAPIResponse = await context.request.post('https://reqres.in/api/register', {
    data: usersPostRequestBodyToRegisterUnsuccessful
  })
  expect(postAPIResponse.status()).toBe(400);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("error","Missing password");
  console.log(postAPIResponseBody)
});

test('Successful Login', async ({ context }) => {
  const postAPIResponse = await context.request.post('https://reqres.in/api/login', {
    data: usersPostRequestBodyToLoginUserSuccessfully
  })
  expect(postAPIResponse.status()).toBe(200);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("token","QpwL5tke4Pnpja7X4");
});

test('Un-Successful Login', async ({ context }) => {
  const postAPIResponse = await context.request.post('https://reqres.in/api/login', {
    data: usersPostRequestBodyToRegisterUnsuccessful
  })
  expect(postAPIResponse.status()).toBe(400);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("error","Missing password");
});







