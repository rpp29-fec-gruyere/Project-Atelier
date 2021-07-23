import ProductOverview from '../../client/src/components/ProductOverview';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';


describe('ProductOverview', () => {

  const { getByTestId } = render(<ProductOverview />);
  const productOverview = getByTestId('ProductOverview');

  test('renders ProductOverview component', () => {
    expect(productOverview).toBeInTheDocument();
  });

  test('renders ProductOverview component text', () => {
    expect(productOverview).toHaveTextContent('ProductOverview');
  });
});