import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Carouseltest = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(props.items ? props.items.length : 0);
  let children = props.items ? props.items.length : 0

  const next = () => {
    if (currentIndex < (length - 4)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };
  return (
    <div className="carousel-box">
      <span className="left">
        <a href="#" className="left">
          <FaAngleLeft size="32" onClick={() => console.log('clicked')}/>
        </a>
      </span>
      {props.items && props.items[0] !== undefined ? props.items.map((item, index) => {
        const { id, category, name, default_price, features } = item;
        let img = item.styles[0].photos[0].thumbnail_url;
        img = img || 'https://via.placeholder.com/1600x2000';
        return (
          <div className="carousel-wrapper"
            style={{ transform: `translateX(-${currentIndex * 25}%)`}}
          >
            <div className="carousel-img">
              <img src={img} alt="placeholder" />
              <div className="carousel-overlay">
                <a href="#" className="buy-btn" onClick={() => {props.loadPage(id)}}>Buy Now</a>
              </div>
            </div>
            <div className="carousel-detail">
              <div className="product-detail">
                <span>{category}</span>
                <a href="#">{name}</a>
                <span className="price">${default_price}</span>
                <div>Star Rating</div>
              </div>
            </div>
          </div>
        );
      }) : null }
      <span className="right">
        <a href="#">
          <FaAngleRight size="32" onClick={next}/>
        </a>
      </span>
    </div>

  )
}

export default Carouseltest;