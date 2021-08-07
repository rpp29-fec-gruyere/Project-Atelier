import ReviewSection from '../../client/src/components/ReviewSection';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';


describe('Review Section', () => {

  const dom = render(<ReviewSection />);
  const reviewSection = dom.getByTestId('reviewSection');
  //const ratingsBreakdown = dom.getByTestId('ratingsBreakdown');

  
  test('renders ReviewSection component', () => {
    expect(reviewSection).toBeInTheDocument();
  });

  test('renders Review component text', () => {
    expect(reviewSection).toHaveTextContent('Ratings & Reviews');
  });
});