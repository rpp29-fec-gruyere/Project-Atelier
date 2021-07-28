import React from 'react';
import Stars from './Stars.jsx';

const ProductOverview = (props) => {
  // if (Object.keys(props.item).length > 0) {
  //   let {category, name, slogan, description, features, styles} = props.item;
  //   let price = styles[0].original_price;
  //   let rating = props.rating;
  // }
  console.log('[Product Overview] Props recieved: ', props);
  return (<div data-testid="ProductOverview" id="overview">
    <div id="overview-main">
      <div id="carousel">
      </div>
      <div id="controls">
        <div id="overview-reviews">
          {/* <Stars starsId={'overview-stars'} rating={5} /> */}
          <div id="link-to-reviews">Read all reviews</div>
        </div>
        <div id="overview-category">{props.item.category}</div>
        <div id="overview-product-title">{props.itemname}</div>
        <div id="overview-price">{props.item.styles[0].original_price}</div>
        <div id="selected-style">{props.item.styles[0].name}</div>
        <div id="style-selector">
          {
            props.item.styles.map((style, i) => {
              return (
                <div className="style-outline" id={`style-${i}`} key={`style-${i}`}>
                  <img className="style-icon" id={`style-${i}`} key={`style-${i}`} src={style.photos[0].thumbnail_url} onClick={() => { alert('click'); }}></img>
                </div>
              );
            })
          }
        </div>
        <div id="control-line-1">
          <div id="size-selector"></div>
          <div id="quantity-selector"></div>
        </div>
        <div id="control-line-2">
          <div id="add-to-bag"></div>
          <div id="favorite"></div>
        </div>
      </div>
    </div>
    <div id="overview-details">
      <div id="overview-description">
        <div id="product-tagline"></div>
        <div id="description-body"></div>
      </div>
      <div id="details-divide"></div>
      <div id="overview-features">

      </div>
    </div>
  </div>);
};

export default ProductOverview;