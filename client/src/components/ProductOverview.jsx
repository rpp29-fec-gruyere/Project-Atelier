import React from 'react';
import $ from 'jquery';
import Stars from './Stars.jsx';
import PhotoCarousel from './PhotoCarousel.jsx';

//HELPER FUNCTIONS
const ratingParser = (ratingsObj) => {
  let cumulativeStars = 0;
  let numberOfRatings = 0;
  for (let key in ratingsObj) {
    cumulativeStars += Number(key) * Number(ratingsObj[key]);
    numberOfRatings += Number(ratingsObj[key]);
  }
  return numberOfRatings === 0 ? 0 : cumulativeStars / numberOfRatings;
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
      sku: null,
      quantity: 1,
      sizeSelected: false,
      currentPhoto: 0
    };

    this.selectStyle = this.selectStyle.bind(this);
    this.selectSize = this.selectSize.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {item: {}};
    newState.item.category = props.item.category;
    newState.item.name = props.item.name;
    newState.item.slogan = props.item.slogan;
    newState.item.description = props.item.description;
    newState.item.features = props.item.features;
    newState.item.styles = props.item.styles;
    newState.item.id = props.item.id;
    if (JSON.stringify(props.reviews) !== '{}') {
      newState.rating = ratingParser(props.reviews.meta === undefined ? {0: 1} : props.reviews.meta.ratings);
      newState.numberOfReviews = props.reviews.allReviews.length;
      if (state.sku === null || state.item.id !== newState.item.id) {
        newState.sku = Object.keys(newState.item.styles[0].skus)[0];
        newState.styleIndex = 0;
      }
    }
    return newState;
  }

  selectStyle(event) {
    let stateUpdate = (state, props) => {
      let currentSelectedSize = state.item.styles[state.styleIndex].skus[state.sku].size;
      let newState = state;
      newState.styleIndex = Number(event.target.id.slice(event.target.id.indexOf('-') + 1));
      newState.currentPhoto = 0;
      let skuFound = false;
      for (let sku in state.item.styles[newState.styleIndex].skus) {
        if (state.item.styles[newState.styleIndex].skus[sku].size === currentSelectedSize) {
          newState.sku = sku;
          skuFound = true;
          break;
        }
      }
      if (!skuFound) {
        newState.sku = Object.keys(state.item.styles[state.styleIndex].skus)[0];
      }
      // console.log('next state: ', state);
      return newState;
    };
    this.setState(stateUpdate);
  }

  selectSize(event) {
    this.setState({sku: event.target.value, sizeSelected: true});
  }

  addToCart(event) {
    $('#size-selector').change();
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
      console.log('state recieved in render: ', this.state);
      let {category, name, slogan, description, features, styles} = this.state.item;
      let {styleIndex, rating, numberOfReviews, sku, sizeSelected, currentPhoto} = this.state;
      let price = styles[styleIndex].original_price;
      return (<div data-testid="ProductOverview" id="overview" className="product-overview">
        <div id="overview-main">

          {/* OVERVIEW CAROUSEL */}
          <PhotoCarousel photos={styles[styleIndex].photos} description={`${styles[styleIndex].name} ${name}`} />

          {/* OVERVIEW CONTROLS (STYLE, SIZE, & QUANTITY SELECTION) */}
          <div id="controls">
            {
              numberOfReviews === 0 ? '' :
                (<div id="overview-reviews">
                  <Stars starsId={'overview-stars'} rating={rating} />
                  <a id="link-to-reviews" href="#reviewSection">
                    {
                      numberOfReviews > 1 ? `Read all ${numberOfReviews} reviews` : 'Read review'
                    }
                  </a>
                </div>)
            }
            <div id="product-info">
              <div id="overview-category">{category.toUpperCase()}</div>
              <div id="overview-product-title">{name}</div>
            </div>
            <div id="overview-price">${styles[styleIndex].original_price}</div>
            <div id="style-section">
              <div id="style-indicator">
                <div id="overview-style">STYLE:</div>
                <div id="selected-style">{styles[styleIndex].name.toUpperCase()}</div>
              </div>
              <div id="style-selector">
                {
                  styles.map((style, i) => {
                    return (
                      <div className={`style-outline${styleIndex === i ? ' current-style' : ''}`} id={`style-${i}`} key={`style-${i}`}>
                        <img className="style-icon"
                          id={`style-${i}`}
                          key={`style-${i}`}
                          src={style.photos[0].thumbnail_url}
                          alt={`${styles[styleIndex].name} style`}
                          onClick={this.selectStyle}>
                        </img>
                        {
                          styleIndex !== i ? '' : (<img
                            className="style-checkmark"
                            key={`style-checkmark-${i}`}
                            src="./assets/checkmark.png"
                            alt={`${styles[styleIndex].name} style selected`}>
                          </img>)
                        }
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <div id="order-controls">
              <div id="control-line-1">
                <select id="size-selector" name="size" value={sizeSelected ? sku : ''} onChange={this.selectSize}>
                  <option value="" disabled hidden>SELECT SIZE</option>
                  {
                    sizeOptionsGenerator(styles[styleIndex].skus)
                  }
                </select>
                <select id="quantity-selector" name="quantity" defaultValue="1">
                  <option className="quantity-option" key="quantity1" value="1">1</option>
                  {
                    quantityOptionsGenerator(styles[styleIndex].skus[sku].quantity)
                  }
                </select>
              </div>
              {
                styles[styleIndex].skus[sku].quantity ?
                  <button id="add-to-cart" onClick={this.addToCart}>ADD TO CART</button> :
                  <div id="sold-out">SOLD OUT</div>
              }
            </div>
          </div>
        </div>

        {/* OVERVIEW DESCRIPTION */}
        <div id="overview-details">
          <div id="overview-description">
            <div id="product-tagline">{slogan}</div>
            <br></br>
            <div id="description-body">{description}</div>
          </div>
          {
            features.length > 0 ?
              (<React.Fragment>
                <div id="details-divide-container">
                  <div id="details-divide"></div>
                </div>
                <div id="overview-features">
                  <ul id="features-list">
                    <div className="filler" key="top"></div>
                    {
                      features.slice(0, 5).map((feature, i) => (
                        <li className="product-feature" key={feature.feature}>
                          <strong>{feature.feature}:</strong>{`  ${feature.value}`}
                        </li>
                      ))
                    }
                    <div className="filler" key='bottom'></div>
                  </ul>
                </div>
              </React.Fragment>) : ''
          }
        </div>
      </div>);
    }
  }
}

export default ProductOverview;