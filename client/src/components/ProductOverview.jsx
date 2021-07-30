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

const sizeOptionsGenerator = (skus) => {
  let options = [];
  for (let sku in skus) {
    let size = skus[sku];
    if (size.quantity < 1) {
      options.push(<option className="size-option" key={sku} >{`${size.size.toUpperCase()} (SOLD OUT)`}</option>);
    } else if (size.quantity <= 10) {
      options.push(<option className="size-option" key={sku} value={sku}>{`${size.size.toUpperCase()} (ALMOST GONE)`}</option>);
    } else {
      options.push(<option className="size-option" key={sku} value={sku}>{size.size.toUpperCase()}</option>);
    }
  }
  return options;
};

const quantityOptionsGenerator = (max) => {
  let options = [];
  for (let i = 2; i <= max && i <= 15; i++) {
    options.push(<option className="quantity-option" key={`quantity${i}`} value="i">{String(i)}</option>);
  }
  return options;
};

//PRODUCT OVERVIEW COMPONENT
class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      rating: 0,
      numberOfReviews: 0,
      styleIndex: 0,
      sku: 956686,
      quantity: 1
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
    if (JSON.stringify(props.reviews) !== '{}') {
      newState.rating = ratingParser(props.reviews.meta === undefined ? {0: 1} : props.reviews.meta.ratings);
      newState.numberOfReviews = props.reviews.allReviews.length;
    }

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
      let numberOfReviews = this.state.numberOfReviews;
      return (<div data-testid="ProductOverview" id="overview">
        <div id="overview-main">
          <div id="carousel">
          </div>
          <div id="controls">
            <div id="overview-reviews">
              <Stars starsId={'overview-stars'} rating={rating} />
              <a id="link-to-reviews" href="#reviewSection">
                {
                  numberOfReviews > 1 ? `Read all ${numberOfReviews} reviews` : numberOfReviews = 1 ? 'Read review' : 'Be the first to leave a review'
                }
              </a>
            </div>
            <br></br>
            <div id="overview-category">{category.toUpperCase()}</div>
            <div id="overview-product-title">{name}</div>
            <br></br>
            <div id="overview-price">${styles[styleIndex].original_price}</div>
            <br></br>
            <div id="style-indicator">
              <div id="overview-style">STYLE:</div>
              <div id="selected-style">{styles[styleIndex].name.toUpperCase()}</div>
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
            <br></br>
            <div id="control-line-1">
              <select id="size-selector" name="size" defaultValue="">
                <option value="" disabled hidden>SELECT SIZE</option>
                {
                  sizeOptionsGenerator(styles[styleIndex].skus)
                }
              </select>
              <select id="quantity-selector" name="quantity" defaultValue="1">
                <option className="quantity-option" key="quantity1" value="1">1</option>
                {
                  quantityOptionsGenerator(styles[styleIndex].skus[this.state.sku].quantity)
                }
              </select>
            </div>
            <button id="add-to-cart">ADD TO CART</button>
          </div>
        </div>
        <div id="overview-details">
          <div id="overview-description">
            <div id="product-tagline">{slogan}</div>
            <br></br>
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