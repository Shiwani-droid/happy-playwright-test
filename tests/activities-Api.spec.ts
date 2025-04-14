import { test, expect } from '@playwright/test';

const activityPostRequestBody = require('../tests/test-data-for-api/post_request_body.json');
const activityPutRequestBody = require('../tests/test-data-for-api/put_request_body.json')

test('Get Activites', async ({ request }) => {
  const getAPIResponse = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Activities')
  //validate status
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(await getAPIResponse.status()).toBe(200);
});

test('Add activity by POST request', async ({ context }) => {
  const postAPIResponse = await context.request.post('https://fakerestapi.azurewebsites.net/api/v1/Activities', {
    data: activityPostRequestBody

  })
  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  //Validate json properties
  const postAPIResponseBody = await postAPIResponse.json();
  expect(postAPIResponseBody).toHaveProperty("id", 50)
  expect(postAPIResponseBody).toHaveProperty("title", "Created-By-Playwright")
  expect(postAPIResponseBody).toHaveProperty("dueDate", "2028-03-24T10:45:46.897Z")
  expect(postAPIResponseBody).toHaveProperty("completed", true)
});


test('Get specific Activity by ID', async ({ request }) => {
  const getAPIResponse = await request.get('https://fakerestapi.azurewebsites.net/api/v1/Activities/5')
  //validate status
  // expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200)
  //Validate json properties
  const getAPIResponseBody = await getAPIResponse.json();
  const getDueDatePropertyValue = JSON.parse(await getAPIResponse.text())
  expect(getAPIResponseBody).toHaveProperty("id", 5)
  expect(getAPIResponseBody).toHaveProperty("title", "Activity 5")
  expect(getAPIResponseBody).toHaveProperty("completed", false)
});

test('Update Activity by PUT request', async ({ context }) => {
  const putAPIResponse = await context.request.put('https://fakerestapi.azurewebsites.net/api/v1/Activities/4', {
    data: activityPutRequestBody

  })
  expect(putAPIResponse.ok()).toBeTruthy();
  expect(putAPIResponse.status()).toBe(200);
  //Validate json properties
  const putAPIResponseBody = await putAPIResponse.json();
  expect(putAPIResponseBody).toHaveProperty("id", 4)
  expect(putAPIResponseBody).toHaveProperty("title", "Update-Activity-By-Playwright")
  expect(putAPIResponseBody).toHaveProperty("dueDate", "2029-03-24T10:45:46.897Z")
  expect(putAPIResponseBody).toHaveProperty("completed", false)
});

test('Delete Activity', async ({ request }) => {
  const getAPIResponse = await request.delete('https://fakerestapi.azurewebsites.net/api/v1/Activities/2')
  //validate status
  expect(getAPIResponse.ok()).toBeTruthy();
  expect(await getAPIResponse.status()).toBe(200);
});