import React from 'react';
import Stars from './Stars.jsx';
import CharacteristicSection from './CharacteristicsSection.jsx';

const RatingsBreakdown = props => {
  let metaData = props.metaData ? props.metaData : undefined;
  let averageRating = 0;
  let recommendedPercentage = 0;
  let percentageOfEachRating = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };

  if (metaData && Object.keys(metaData.ratings).length > 0) {
    let sum = 0;
    let count = 0;
    for (let rating in metaData.ratings) {
      sum += parseInt(rating) * parseInt(metaData.ratings[rating]);
      count += parseInt(metaData.ratings[rating]);
      percentageOfEachRating[rating] = parseInt(metaData.ratings[rating]);
    }

    averageRating = (sum / count).toFixed(1);
    for (let rating in percentageOfEachRating) {
      percentageOfEachRating[rating] = (percentageOfEachRating[rating] / count) * 100;
    }

    let recommended = props.metaData.recommended.true ? parseInt(props.metaData.recommended.true) : 0;
    let notRecommended = props.metaData.recommended.false ? parseInt(props.metaData.recommended.false) : 0;
    recommendedPercentage = Math.ceil((recommended / (recommended + notRecommended)) * 100);
  }

  
  return (
    <div data-testid="ratingsBreakdown" className="ratingsBreakdown" id="ratingBreakdown">
      <div id="ratingRepresentations">
        <span>{averageRating}</span>
        <Stars rating={averageRating}/>
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
          <span className="ratingBar count">({metaData && metaData.ratings[1] ? parseInt(metaData.ratings[1]) : 0})</span>
        </div>
      </div>
      <CharacteristicSection characteristicsData={metaData ? metaData.characteristics : false}/>
    </div>
  );
};

export default RatingsBreakdown;
