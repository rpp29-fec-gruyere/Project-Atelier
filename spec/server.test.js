const {app} = require('../server.js');
const request = require('supertest');

describe('Test root path', () => {
  test('response the GET method', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });

  // test('response the GET method', () => {
  //   return request(app)
  //     .get('/')
  //     .then(res => {
  //       console.log(typeof res.text);
  //       expect(res.statusCode).toBe(200);
  //     });
  // });
});