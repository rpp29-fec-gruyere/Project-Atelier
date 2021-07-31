import React, { useState } from 'react';
import Carousel from './Carousel.jsx';
import Carouseltest from './Carouseltest.jsx';



const AdditionalProducts = (props) => {
  { console.log(props.relatedItems); }

  return (
    <div data-testid="AdditionalProducts" className="additional-products">
      <h3>RELATED PRODUCTS</h3>
      <Carouseltest items={props.relatedItems} loadPage={props.loadPage} show={4}/>
      {/* <Carousel show={4} content={props.relatedItems}>
        {props.relatedItems.length > 0 && props.relatedItems.map(item => {
          const img = item.styles[0].photos[0].thumbnail_url;
          return (
            <img src={img} alt="" />
          );
        })}
      </Carousel> */}
      <h3>YOUR OUTFITS</h3>
    </div>
  );
};

export default AdditionalProducts;