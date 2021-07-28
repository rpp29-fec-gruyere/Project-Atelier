import React from 'react';
import Stars from './Stars.jsx';

const ProductOverview = (props) => {
  if (JSON.stringify(props.item) === '{}') {
    return (
      <div id="overview-main"></div>
    );
  } else {
    const ratingParser = (ratingsObj) => {
      let cumulativeStars = 0;
      let numberOfRatings = 0;
      for (let key in ratingsObj) {
        cumulativeStars += Number(key) * Number(ratingsObj[key]);
        numberOfRatings += Number(ratingsObj[key]);
      }
      return cumulativeStars / numberOfRatings;
    };

    let {category, name, slogan, description, features, styles} = props.item;
    let price = styles[0].original_price;
    let rating = ratingParser(props.reviews.meta.ratings);
    return (<div data-testid="ProductOverview" id="overview">
      <div id="overview-main">
        <div id="carousel">
        </div>
        <div id="controls">
          <div id="overview-reviews">
            <Stars starsId={'overview-stars'} rating={rating} />
            <a id="link-to-reviews" href="#reviewSection">Read all reviews</a>
          </div>
          <br></br>
          <div id="overview-category">{category.toUpperCase()}</div>
          <div id="overview-product-title">{name}</div>
          <br></br>
          <div id="overview-price">${styles[0].original_price}</div>
          <br></br>
          <div id="style-indicator">
            <div id="overview-style">STYLE:</div>
            <div id="selected-style">{styles[0].name.toUpperCase()}</div>
          </div>
          <br></br>
          <div id="style-selector">
            {
              styles.map((style, i) => {
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
          <div id="product-tagline">{slogan}</div>
          <div id="description-body">{description}</div>
        </div>
        <div id="details-divide"></div>
        <div id="overview-features">
          {
            // features.slice(0, 5).map((feature) => (
            //   <div className="product-feature">

            //   </div>
            // ))
          }
        </div>
      </div>
    </div>);
  }

};

export default ProductOverview;