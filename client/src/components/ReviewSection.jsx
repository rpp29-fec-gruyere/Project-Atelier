import React from 'react';
import RatingsBreakdown from './RatingBreakdown.jsx';
import ReviewList from './ReviewList.jsx';

const ReviewSection = props => {
  return (
    <div data-testid="reviewSection" className="reviewSection">
      <span className="widgetHeader">Ratings &#38; Reviews</span>
      <div id="mainReviewSection">
        <RatingsBreakdown metaData={props.reviewData ? props.reviewData.meta : {}}/>
        <ReviewList reviews={props.reviewData ? props.reviewData.allReviews : []}/>
      </div>
    </div>
  );
};

export default ReviewSection;