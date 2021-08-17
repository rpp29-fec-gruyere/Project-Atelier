const { API_KEY } = require('../config');
const axios = require('axios');
const STATIC_PATH = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

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
  // console.log('[API Helper] axios query created: ', query);
  // console.log('[API Helper] Initiating API query');
  return axios(query);
};

const fetchItemData = (productId) => {
  let fullProductInfo = {};
  let query = {
    url: `${STATIC_PATH}/products/${productId}`,
    method: 'GET',
    headers: {
      Authorization: API_KEY
    }
  };
  return axios(query)
    .then((productInfo) => {
      fullProductInfo = productInfo.data;
      query.url = `${STATIC_PATH}/products/${productId}/styles`;
      return axios(query);
    })
    .then((styles) => {
      fullProductInfo.styles = styles.data.results;
      return fullProductInfo;
    })
    .catch((error) => {
      throw error;
    });
};

// For retieving all data relevant to a certain item
// productId: [string] the id of the product being rendered
const fetchAllData = (productId) => {
  let fullDataSet = {};
  let query = {
    url: 'not-built-yet',
    method: 'GET',
    headers: {
      Authorization: API_KEY
    }
  };
  return fetchItemData(productId)
    .then((itemInfo) => {
      fullDataSet.item = itemInfo;
      query.url = `${STATIC_PATH}/products/${productId}/related`;
      return axios(query);
    })
    .then((relatedIds) => {
      fullDataSet.relatedItems = [];
      return Promise.all(relatedIds.data.map((id) => {
        return new Promise((resolve, reject) => {
          fetchItemData(id)
            .then((relatedItemInfo) => {
              fullDataSet.relatedItems.push(relatedItemInfo);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      }));
    })
    .then(() => {
      query.url = `${STATIC_PATH}/reviews/?product_id=${productId}&count=1000000000&sort=helpful`;
      return axios(query);
    })
    .then((reviews) => {
      fullDataSet.reviews = {};
      fullDataSet.reviews.allReviews = reviews.data.results;
      query.url = `${STATIC_PATH}/reviews/meta/?product_id=${productId}`;
      return axios(query);
    })
    .then((reviewMetaData) => {
      fullDataSet.reviews.meta = reviewMetaData.data;
      query.url = `${STATIC_PATH}/qa/questions/?product_id=${productId}&count=1000000000`;
      return axios(query);
    })
    .then((questions) => {
      fullDataSet.questionsAndAnswers = questions.data.results;
      query.url = `${STATIC_PATH}/cart`;
      return axios(query);
    })
    .then((itemsInCart) => {
      fullDataSet.cart = itemsInCart.data;
      // console.log('full data set: ', fullDataSet);
      return fullDataSet;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  buildGetRequest,
  buildPostRequest,
  fetch,
  fetchItemData,
  fetchAllData
};

// IT WORKS RIGHT NOW