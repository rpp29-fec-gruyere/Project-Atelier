import ProductOverview from '../../client/src/components/ProductOverview';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import {item, reviews} from '../testData.js';


describe('ProductOverview', () => {

  const { getByTestId } = render(<ProductOverview item={item} reviews={reviews} />);
  const productOverview = getByTestId('ProductOverview');
  const name = document.getElementById('overview-product-title');

  test('renders ProductOverview component', () => {
    expect(productOverview).toBeInTheDocument();
  });

  test('renders product name', () => {
    expect(name).toHaveTextContent('Myrl Pants');
  });
});