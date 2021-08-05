import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Carouseltest = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let length = props.items ? props.items.length : 0
  let children = props.items ? props.items.length : 0

  const next = () => {
    if (currentIndex < (length - 4)) {
      setCurrentIndex(prevState => prevState + 1);
      console.log(1)
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const renderProduct = (id) => {
    setCurrentIndex(() => 0);
    props.loadPage(id);
  };

  return (
    <div className="carousel-box">
      {currentIndex > 0 &&
      <div className="left-box">
        <div className="left">
          {/* left button */}
          <a href="javascript:void(0);" className="left-btn" onClick={prev}>
            <FaAngleLeft size="32" />
          </a>
        </div>
      </div>
      }
      <div className="card-container"
        style={{ transform: `translateX(-${currentIndex * 26}%)`}}
      >
        {props.items && props.items[0] !== undefined ? props.items.map((item, index) => {
          const { id, category, name, default_price, features } = item;
          let img = item.styles[0].photos[0].thumbnail_url;
          // if no img found on product, display placeholder img
          img = img || 'https://via.placeholder.com/1600x2000';

          return (
            <div className="carousel-wrapper">
              <div className="carousel-img">
                <img src={img} alt={`img${index}`} />
                {/* buy button overlay, onClick => reset state and render product */}
                <div className="carousel-overlay">
                  <a href="" className="buy-btn" onClick={() => {renderProduct(id)}}>Buy Now</a>
                </div>
              </div>
              <div className="carousel-detail">
                <div className="product-detail">
                  <span>{category}</span>
                  <a href="" onClick={() => {renderProduct(id)}}>{name}</a>
                  <div className="price">${default_price}</div>
                  <div>Star Rating</div>
                </div>
              </div>
            </div>
          );
        }) : null }
      </div>
      {currentIndex < (length - 4) &&
      <div className="right-box">
        <div className="right">
          {/* right button */}
          <a href="javascript:void(0);" className="right-btn" onClick={next}>
            <FaAngleRight size="32" />
          </a>
        </div>
      </div>
      }
    </div>

  )
}

export default Carouseltest;