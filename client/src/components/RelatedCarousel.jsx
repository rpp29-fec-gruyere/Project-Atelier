import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Stars from './Stars.jsx';
import $ from 'jquery';

const RelatedCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let length = props.items ? props.items.length : 0;
  const { toggleModal, changeModalIndex } = props;
  const [ratings, setRatings] = useState(false);

  const getRatingsOnProducts = (items) => {

    if (ratings === false && items[0].ratings === undefined) {
      items.map(item => {
        if (!item.ratings) {
          const productId = item.id;
          props.fetch({endpoint: 'reviews/meta', params: {product_id: productId}},
            (data) => {
              const { ratings } = data;
              let cumulativeStars = 0;
              let numberOfRatings = 0;
              for (let key in ratings) {
                cumulativeStars += Number(key) * Number(ratings[key]);
                numberOfRatings += Number(ratings[key]);
              }
              const reviewScore = cumulativeStars / numberOfRatings;
              item.ratings = (reviewScore.toString() === 'NaN' ? 0 : Math.round(reviewScore * 2) / 2);
              console.log(item.id, item.name, item.ratings)
            },
            (error) => {
              console.log(error);
            });
        }
      });
    } else {
      return;
    }
  };

  // update each related products ratings
  if (props.items.length > 0) {
    getRatingsOnProducts(props.items);
    setTimeout(() => {
      setRatings(() => true)
    }, 2000);
  }

  // carousel slides to right
  const next = () => {
    if (currentIndex < (length - 4)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };
  // carousel slides to left
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };
  // render product on Buy Now click
  const renderProduct = (id) => {
    //reset carousel index and render product
    setCurrentIndex(() => 0);
    setRatings(() => false);
    props.loadPage(id);
  };

  return (
    <div className="carousel-box">
      {currentIndex > 0 &&
      <div className="left-box">
        <div className="left">
          {/* left button */}
          <a className="left-btn" onClick={prev}>
            <FaAngleLeft size="32" />
          </a>
        </div>
      </div>
      }
      <div className="card-container"
        style={{ transform: `translateX(-${currentIndex * 26}%)`}}
      >
        {props.items && props.items[0] !== undefined ? props.items.map((item, index) => {
          const { id, category, name, default_price, features, ratings } = item;
          let img = item.styles[0].photos[0].thumbnail_url || 'https://via.placeholder.com/1600x2000';
          // if no img found on product, display placeholder img

          return (
            <div className="carousel-wrapper" key={index}>
              <div className="carousel-img">
                <img src={img} alt={`img${index}`} />
                <div className="carousel-overlay">
                  {/* star icon that opens up modal for comparison */}
                  <a href="javascript:void(0);"
                    id='star'
                    className="star-icon"
                    onClick={() => { toggleModal(); changeModalIndex(index); }}
                  >
                    <img className="compare-btn" src="./assets/stars/star0.png" alt="" />
                  </a>
                  <a href="#" className="buy-btn" onClick={() => renderProduct(id)}>Buy Now</a>
                </div>
              </div>
              <div className="carousel-detail">
                <div className="product-detail">
                  <span className="category">{category}</span>
                  <a href="#" onClick={() => renderProduct(id)}>{name}</a>
                  <div className="price">${default_price}</div>
                  <Stars rating={ratings ? ratings : 0}/>
                </div>
              </div>
            </div>
          );
        }) : null }
      </div>
      {
        currentIndex < (length - 4) &&
        <div className="right-box">
          <div className="right">
            {/* right button */}
            <a className="right-btn" onClick={next}>
              <FaAngleRight size="32" />
            </a>
          </div>
        </div>
      }
    </div>

  );
};

export default RelatedCarousel;