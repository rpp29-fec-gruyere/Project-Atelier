import App from '../../client/src/components/App';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';


describe('App', () => {

  const { getByTestId } = render(<App />);
  let app = getByTestId('app');

  test('renders App component', () => {
    expect(app).toBeInTheDocument();
  });

  test('renders header and 4 React components (5 elements)', () => {
    expect(app.children.length).toBe(5);
  });
});