import Reviews from '../../client/src/components/Reviews';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';


describe('Reviews', () => {

  const { getByTestId } = render(<Reviews />);
  const reviews = getByTestId('Reviews');

  test('renders Reviews component', () => {
    expect(reviews).toBeInTheDocument();
  });

  test('renders Reviews component text', () => {
    expect(reviews).toHaveTextContent('Reviews');
  });
});