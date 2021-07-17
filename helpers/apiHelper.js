let API_KEY = require('../config');

// PATH: [string] i.e. 'products', 'reviews', etc.
// PARAMS: [object] i.e. {page: 1, count: 5}
// OUTPUT: [object] an ajax request object
const buildGetRequest = (path, params) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${path}`;

  if (params) {
    url += '?';
    for (let param in params) {
      url += `${param}=${params[param]}${Object.keys(params).indexOf(param) !== Object.keys(params).length - 1 ? '&' : ''}`;
    }
  }

  return {
    url: url,
    method: 'GET',
    headers: {
      Authorization: API_KEY
    }
  };
};

const buildPostRequest = (path, params) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${path}`;

  if (params) {
    url += '?';
    for (let param in params) {
      url += `${param}=${params[param]}${Object.keys(params).indexOf(param) !== Object.keys(params).length - 1 ? '&' : ''}`;
    }
  }

  return {
    url: url,
    method: 'POST',
    headers: {
      Authorization: API_KEY
    }
  };
};

module.exports = {
  buildGetRequest
};
