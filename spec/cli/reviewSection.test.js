import ReviewSection from '../../client/src/components/ReviewSection';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';


describe('Review Section', () => {

  const { getByTestId } = render(<ReviewSection />);
  const reviews = getByTestId('reviewSection');

  
  test('renders Review component', () => {
    expect(reviews).toBeInTheDocument();
  });

  test('renders Review component text', () => {
    expect(reviews).toHaveTextContent('Ratings & Reviews');
  });
});