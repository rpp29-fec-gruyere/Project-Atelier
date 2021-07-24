import React, { useState } from 'react';
import Carousel from './Carousel.jsx';


const AdditionalProducts = (props) => {
  { console.log(props.relatedItems[0]); }

  return (
    <div data-testid="AdditionalProducts">
      AdditionalProducts
      <div>
        {props.relatedItems[0] !== undefined ? props.relatedItems.map(item => {
          return (
            <div>
              {item.id}, {item.name}, {item.default_price}
            </div>
          );
        }) : null }
      </div>
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