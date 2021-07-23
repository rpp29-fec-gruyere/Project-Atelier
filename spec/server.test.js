import app from '../expressApp.js';
import { JSDOM } from '../node_modules/jsdom';
import request from '../node_modules/supertest';


describe('Tests root path', () => {

  it('gets successful response from GET request', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('response contains HTML file containing root div', () => {
    return request(app)
      .get('/')
      .then(res => {
        const dom = new JSDOM(res.text);
        let root = dom.window.document.getElementById('root');
        expect(root).not.toBe(null);
      });
  });
});

describe('Tests /direct-query path', () => {

  const url = '/direct-query/?endpoint=products&count=1';

  it('gets successful response from GET request w/ queryString', () => {
    return request(app)
      .get(url)
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('returns all necessary initial product data', () => {
    return request(app)
      .get(url)
      .then(res => {
        let data = res.body[0];
        expect(data.id).not.toBe(null);
        expect(data.campus).not.toBe(null);
        expect(data.name).not.toBe(null);
        expect(data.slogan).not.toBe(null);
        expect(data.description).not.toBe(null);
        expect(data.category).not.toBe(null);
        expect(data.default_price).not.toBe(null);
        expect(data.created_at).not.toBe(null);
        expect(data.updated_at).not.toBe(null);
      });
  });
});


describe('Tests /page-data path', () => {

  const sampleProductId = 28212;
  const url = `/page-data/?id=${sampleProductId}`;

  it('gets successful response from GET request w/ product id', () => {
    return request(app)
      .get(url)
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('returns all necessary initial product data', () => {
    return request(app)
      .get(url)
      .then(res => {
        let data = res.body;
        expect(data.item).not.toBe(null);
        expect(data.relatedItems).not.toBe(null);
        expect(data.reviews).not.toBe(null);
        expect(data.questionsAndAnswers).not.toBe(null);
        expect(data.cart).not.toBe(null);
      });
  });
});