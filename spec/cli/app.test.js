import { App } from '../../client/src/App';
import ReactDOM from 'react-dom';
import { JSDOM } from '../../node_modules/jsdom';
import React from 'react';

describe('Tests Main React App', () => {
  it('successfully renders', () => {
    const dom = new JSDOM('<div id="root"></div>');
    ReactDOM.render(<App></ App>, dom.window.document.getElementById('root'));
  });
});