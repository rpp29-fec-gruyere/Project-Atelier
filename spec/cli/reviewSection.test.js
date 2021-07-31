import ReviewSection from '../../client/src/components/ReviewSection';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';


describe('Review Section', () => {

  const { getByTestId } = render(<ReviewSection />);
  const reviewSection = getByTestId('reviewSection');

  
  test('renders ReviewSection component', () => {
    expect(getByTestId('reviewSection')).toBeInTheDocument();
  });

  test('renders Review component text', () => {
    expect(reviewSection).toHaveTextContent('Ratings & Reviews');
  });

  test('renders Ratingsbreakdown component', () => {
    expect(getByTestId('ratingsBreakdown')).toBeInTheDocument();
  });

  test('renders ReviewList component', () => {
    expect(getByTestId('reviewList')).toBeInTheDocument();
  });
});