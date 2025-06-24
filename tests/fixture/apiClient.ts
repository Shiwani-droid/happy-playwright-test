// apiClient.js
const { request } = require('@playwright/test');

async function createApiContext() {
  return await request.newContext({
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
      'x-api-key': 'reqres-free-v1',
    },
  });
}

module.exports = { createApiContext };
