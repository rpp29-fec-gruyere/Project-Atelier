import React, { useState, useEffect } from 'react';
import Stars from './Stars.jsx';
import { FaAngleLeft, FaAngleRight, FaPlus } from 'react-icons/fa';


const RelatedOutfits = (props) => {
  const { outfits, addToOutfit } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  let length = props.outfits ? props.outfits.length : 0;
  const [ratings, setRatings] = useState(false);

  // carousel slides to right
  const next = () => {
    if (currentIndex < (length - 3)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };
  // carousel slides to left
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  return props.items && props.items.length > 0 ? (
    null
  )
    : (
      <div className="outfit-box">
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
        <div className="outfit-container">
          <div className="outfit-btn-container">
            <div className="outfit-wrapper">
              <div className="outfit-btn-box">
                <div className="outfit-btn" onClick={() => { addToOutfit() }}>
                  <FaPlus size="32" />
                  <div className="add-outfit-btn">Add to Outfit</div>
                </div>
              </div>
            </div>
          </div>
          <div className="outfit-card-container"
            style={{ transform: `translateX(-${currentIndex * 35.8}%)` }}
          >
            {outfits.length > 0 &&
              outfits.map((outfit, index) => {
                const { id, category, name, default_price, features, ratings } = outfit;
                let img = outfit.styles[0].photos[0].thumbnail_url || 'https://via.placeholder.com/1600x2000';
                return (
                  <div className="outfit-card">
                    <div className="outfit-img">
                      <img src={img} alt={`outfit-${img + index}`} loading="lazy" />
                      <div className="carousel-overlay">
                        <a className="remove-btn" onClick={() => { props.removeOutfit(index) } }>remove</a>
                      </div>
                    </div>
                    <div className="carousel-detail">
                      <div className="product-detail">
                        <span className="category">{category}</span>
                        <a href="#">{name}</a>
                        <div className="price">${default_price}</div>
                        <Stars rating={ratings ? ratings : 0} />
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        {currentIndex < (length - 3) &&
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


export default RelatedOutfits;