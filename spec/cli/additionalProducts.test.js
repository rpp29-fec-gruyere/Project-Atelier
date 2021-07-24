import AdditionalProducts from '../../client/src/components/AdditionalProducts';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';


describe('AdditionalProducts', () => {

  const mockItems = [{id: 0, name: 'testing', default_price: 999.99}]
  const { getByTestId } = render(<AdditionalProducts relatedItems={mockItems}/>);
  const additionalProducts = getByTestId('AdditionalProducts');

  test('renders AdditionalProducts component', () => {
    expect(additionalProducts).toBeInTheDocument();
  });

  test('renders AdditionalProducts text', () => {
    expect(additionalProducts).toHaveTextContent('AdditionalProducts');
  });
});