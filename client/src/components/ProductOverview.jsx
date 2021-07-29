import React from 'react';
import Stars from './Stars.jsx';

//HELPER FUNCTIONS
const ratingParser = (ratingsObj) => {
  let cumulativeStars = 0;
  let numberOfRatings = 0;
  for (let key in ratingsObj) {
    cumulativeStars += Number(key) * Number(ratingsObj[key]);
    numberOfRatings += Number(ratingsObj[key]);
  }
  return cumulativeStars / numberOfRatings;
};

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      rating: 0,
      styleIndex: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {
      item: {},
      rating: 0,
      styleIndex: 0
    };
    newState.item.category = props.item.category;
    newState.item.name = props.item.name;
    newState.item.slogan = props.item.slogan;
    newState.item.description = props.item.description;
    newState.item.features = props.item.features;
    newState.item.styles = props.item.styles;
    newState.rating = ratingParser(props.reviews.meta === undefined ? {0: 1} : props.reviews.meta.ratings);
    return newState;
  }



  render() {
    if (JSON.stringify(this.state.item) === '{}') {
      return (
        <div id="overview">
          <div id="overview-loading-container">
            <img id="overview-loading-icon" src="./assets/loading.gif"></img>
          </div>
        </div>
      );
    } else {

      let {category, name, slogan, description, features, styles} = this.state.item;
      let styleIndex = this.state.styleIndex;
      let price = styles[styleIndex].original_price;
      let rating = this.state.rating;
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
              <select id="size-selector" name="SELECT SIZE">
                {

                }
              </select>
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
  }
}


export default ProductOverview;