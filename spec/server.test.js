import { app } from '../server.js';
import { JSDOM } from '../node_modules/jsdom';
import request from '../node_modules/supertest';
import React from 'react';

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