const API_KEY = require('../config');
const axios = require('axios');

// PATH: [string] i.e. 'products', 'reviews', etc.
// PARAMS: [object] i.e. {page: 1, count: 5}
// OUTPUT: [object] an axios request object
const buildGetRequest = (path, params) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${path}`;
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return {
    url: url + (queryString ? '/?' + queryString : ''),
    method: 'GET',
    headers: {
      Authorization: API_KEY
    }
  };
};

const buildPostRequest = (path, params) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${path}`;
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return {
    url: url + (queryString ? '/?' + queryString : ''),
    method: 'POST',
    headers: {
      Authorization: API_KEY
    }
  };
};

// BODY: [object] the request body
//   example: {
//     path: [string] the api endpoint,
//     params: [object] additional api parameters (i.e. {page: 1, count: 5})
//   }
// OUTPUT: a promise that resolves to the api result (object | array | error)
const fetch = (body) => {
  let query = buildGetRequest(body.endpoint, body.params);
  console.log('[API Helper] axios query created: ', query);
  console.log('[API Helper] Initiating API query');
  return axios(query);
};

module.exports = {
  buildGetRequest,
  buildPostRequest,
  fetch
};
