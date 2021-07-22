import AdditionalProducts from '../../client/src/components/AdditionalProducts';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';


describe('AdditionalProducts', () => {

  const { getByTestId } = render(<AdditionalProducts/>);
  const additionalProducts = getByTestId('AdditionalProducts');

  test('renders AdditionalProducts component', () => {
    expect(additionalProducts).toBeInTheDocument();
  });

  test('renders AdditionalProducts text', () => {
    expect(additionalProducts).toHaveTextContent('AdditionalProducts');
  });
});