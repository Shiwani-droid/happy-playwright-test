import { test, expect, request } from '@playwright/test';

const { createApiContext } = require('../tests/fixture/apiClient');
const usersPostRequestBody = require('../tests/test-data-for-api/post_request_body_to_create_users .json');
const usersPutRequestBody = require('../tests/test-data-for-api/put_request_body_to_update_users.json')
const usersPatchRequestBody = require('../tests/test-data-for-api/patch_request_body_to_update_users.json')
const usersPostRequestBodyToRegisterSuccessfully = require('../tests/test-data-for-api/post_request_body_to_register_user_successfully.json')
const usersPostRequestBodyToRegisterUnsuccessful = require('../tests/test-data-for-api/post_request_body_to_register_user_unsuccessful.json')
const usersPostRequestBodyToLoginUserSuccessfully = require('../tests/test-data-for-api/post_request_body_to_login-user-successfully.json')

let apiContext// Declare it globally

test.beforeAll(async () => {
  apiContext = await createApiContext()
});


test('Get list of users', async () => {
  // const apiContext = await createApiContext();
  const getAPIResponse = await apiContext.get('/api/users?page=2')
  //validate status
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(await getAPIResponse.status()).toBe(200);
});

test('Get single User', async ({ request }) => {
  const getAPIResponse = await apiContext.get('/api/users/2')
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

test('Get single user not found', async () => {
  const response = await apiContext.get('/api/users/23')
  expect(await response.status()).toBe(404)
});

test('Get list of Resource', async () => {
  const response= await apiContext.get('/api/unknown');
  //validate status
  expect(await response.status()).toBeTruthy()
  expect(await response.status()).toBe(200);
});

test('Get list of single Resource', async () => {
  const response= await apiContext.get('/api/unknown/2');
  //validate status
  expect(await response.status()).toBeTruthy()
  expect(await response.status()).toBe(200);
  //Get the response
  const getApiResponseBody = await response.json();
  //Validating response body keys
  expect (getApiResponseBody.data).toHaveProperty("id");
  expect (getApiResponseBody.data).toHaveProperty("name");
  expect (getApiResponseBody.data).toHaveProperty("year");
  expect (getApiResponseBody.data).toHaveProperty("color");
  expect (getApiResponseBody.data).toHaveProperty("pantone_value");
  expect (getApiResponseBody.support).toHaveProperty("url");
  expect (getApiResponseBody.support).toHaveProperty("text");
});

test('Get Resource Not Found', async () => {
  const response= await apiContext.get('/api/unknown/23');
  //validate status
  expect(await response.status()).toBeTruthy()
  expect(await response.status()).toBe(404);

});


test('Create user', async () => {
  const response= await apiContext.post('/api/users', {
    data: usersPostRequestBody
  })
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  //Validate json properties
  const postAPIResponseBody = await response.json();
  expect(postAPIResponseBody).toHaveProperty("name", "Jolly")
  expect(postAPIResponseBody).toHaveProperty("job", "Head of Deptt")
});

test('Update user by Put request', async () => {
  const postAPIResponse = await apiContext.put('/api/users/2', {
    data: usersPutRequestBody

  })
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("name", "Molly")
  expect(postAPIResponseBody).toHaveProperty("job", "HR")
});

test('Update user by patch request', async () => {
  const postAPIResponse = await apiContext.patch('/api/users/9', {
    data: usersPatchRequestBody
  })
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("name", "Shelly")
  expect(postAPIResponseBody).toHaveProperty("job", "QA")
});


test('Delete user', async () => {
  const getAPIResponse = await apiContext.delete('/api/users/7')
  //validate status
  expect(await getAPIResponse.status()).toBe(204);
  // console.log(await getAPIResponse.json())
});

test('Register user successfully', async () => {
  const postAPIResponse = await apiContext.post('/api/register', {
    data: usersPostRequestBodyToRegisterSuccessfully

  })
  expect(postAPIResponse.status()).toBe(200);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("id",4)
  expect(postAPIResponseBody).toHaveProperty("token","QpwL5tke4Pnpja7X4")
});

test('Register user un-successful', async () => {
  const postAPIResponse = await apiContext.post('/api/register', {
    data: usersPostRequestBodyToRegisterUnsuccessful
  })
  expect(postAPIResponse.status()).toBe(400);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("error","Missing password");
});

test('Successful Login', async () => {
  const postAPIResponse = await apiContext.post('/api/login', {
    data: usersPostRequestBodyToLoginUserSuccessfully
  })
  expect(postAPIResponse.status()).toBe(200);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("token","QpwL5tke4Pnpja7X4");
});

test('Un-Successful Login', async () => {
  const postAPIResponse = await apiContext.post('/api/login', {
    data: usersPostRequestBodyToRegisterUnsuccessful
  })
  expect(postAPIResponse.status()).toBe(400);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("error","Missing password");
});