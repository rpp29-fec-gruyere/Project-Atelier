import React from 'react';
import Stars from './Stars.jsx';

const ProductOverview = () => (
  <div data-testid="ProductOverview">
    <Stars starId={'test-star'} rating={3.81342} />
  </div>
);

export default ProductOverview;