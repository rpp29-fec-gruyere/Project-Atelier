import React from 'react';
import Stars from './Stars.jsx';

const RatingsBreakdown = props => {
  let metaData = props.metaData ? props.metaData : null;
  metaData ? console.log('Meta true') : console.log('Meta false');
  let rating = 0;
  let recommendedPercentage = 0;
  let percentageOfEachRating = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };

  if (metaData) {
    let sum = 0;
    let count = 0;
    for (let rating in metaData.ratings) {
      sum += parseInt(rating) * parseInt(metaData.ratings[rating]);
      count += parseInt(metaData.ratings[rating]);
      percentageOfEachRating[rating] = parseInt(metaData.ratings[rating]);
    }
    rating = sum / count;
    for (let ratingValue in percentageOfEachRating) {
      percentageOfEachRating[ratingValue] = (percentageOfEachRating[ratingValue] / count) * 100;
    }

    recommendedPercentage = (parseInt(metaData.recommended.true) / (parseInt(metaData.recommended.true) + parseInt(metaData.recommended.false))) * 100;

  }
  
  return (
    <div data-testid="ratingsBreakdown" className="ratingsBreakdown">
      <div id="ratingRepresentations">
        <span>{rating}</span>
        <Stars rating={rating}/>
      </div>
      <span id="recommended">{recommendedPercentage}% of reviews recommended this product</span>
      <div id="ratingBarGraph">
        <div id="rating5" className="ratingBar component">
          <span className="ratingBar title">5 stars</span>
          <div className="ratingBar container"><div className="ratingBar fill" style={{width: percentageOfEachRating[5] + '%'}}></div></div>
          <span className="ratingBar count">({metaData && metaData.ratings[5] ? parseInt(metaData.ratings[5]) : 0})</span>
        </div>
        <div id="rating4" className="ratingBar component">
          <span className="ratingBar title">4 stars</span>
          <div className="ratingBar container"><div className="ratingBar fill" style={{width: percentageOfEachRating[4] + '%'}}></div></div>
          <span className="ratingBar count">({metaData && metaData.ratings[4] ? parseInt(metaData.ratings[4]) : 0})</span>
        </div>
        <div id="rating3" className="ratingBar component">
          <span className="ratingBar title">3 stars</span>
          <div className="ratingBar container"><div className="ratingBar fill" style={{width: percentageOfEachRating[3] + '%'}}></div></div>
          <span className="ratingBar count">({metaData && metaData.ratings[3] ? parseInt(metaData.ratings[3]) : 0})</span>
        </div>
        <div id="rating2" className="ratingBar component">
          <span className="ratingBar title">2 stars</span>
          <div className="ratingBar container"><div className="ratingBar fill" style={{width: percentageOfEachRating[2] + '%'}}></div></div>
          <span className="ratingBar count">({metaData && metaData.ratings[2] ? parseInt(metaData.ratings[2]) : 0})</span>
        </div>
        <div id="rating1" className="ratingBar component">
          <span className="ratingBar title">1 stars</span>
          <div className="ratingBar container"><div className="ratingBar fill" style={{width: percentageOfEachRating[1] + '%'}}></div></div>
          <span className="ratingBar count">({metaData && metaData.ratings[1] ? parseInt(metaData.ratings[2]) : 0})</span>
        </div>
      </div>
    </div>
  );
};

export default RatingsBreakdown;