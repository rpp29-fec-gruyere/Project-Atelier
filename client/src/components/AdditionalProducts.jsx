import React, { useState } from 'react';
import Carousel from './Carousel.jsx';


const AdditionalProducts = (props) => {
  { console.log(props.relatedItems[0]); }

  return (
    <div data-testid="AdditionalProducts">
      AdditionalProducts

      <Carousel show={4} content={props.relatedItems}>
        <img src="https://via.placeholder.com/1600x2000" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x2000" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x2000" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x2000" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x2000" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x2000" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x2000" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x2000" alt="placeholder" />
      </Carousel>
    </div>
  );
};

export default AdditionalProducts;