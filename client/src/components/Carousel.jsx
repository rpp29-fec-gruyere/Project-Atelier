import React, { useEffect, useState } from 'react';

const Carousel = (props) => {
  const {children, show, content} = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < (length - show)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {
          currentIndex > 0 &&
          <button onClick={prev} className="left-arrow">
          &lt;
          </button>
        }
        <div className="carousel-content-wrapper">
          <div
            className={`carousel-content show-${show}`}
            style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
          >
            {children}
            <div>
              <span className="overlay">a</span>
            </div>

          </div>
          <div className="content">
            {content && content[0] !== undefined ? content.map((item, index) => {
              const { id, category, name, default_price, features } = item;
              return (
                <div className={`content-details item-${index}`} key={id}>
                  <div>
                    {category}
                  </div>
                  <div>
                    {name}
                  </div>
                  <span>
                    {default_price}
                  </span>
                  <div>
                    ratings
                  </div>
                </div>
              );
            }) : null }
          </div>
        </div>
        {
          currentIndex < (length - show) &&
          <button onClick={next} className="right-arrow">
          &gt;
          </button>}
      </div>
    </div>
  );
};

export default Carousel;