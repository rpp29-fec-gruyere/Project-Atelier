import React from 'react';
import Review from './Review.jsx';

const ReviewList = props => {
  let reviewCount = props.reviews ? props.reviews.length : 0;
  return (
    <div data-testid="reviewList" className="reviewList">
      <div id="sortOptions">
        <span>{reviewCount} reviews, sorted by relevance</span>
      </div>
      <div>{props.reviews ? props.reviews.map(review => <Review key={review.review_id} reviewInfo={review}/>) : null}</div>
    </div>
  );
};

export default ReviewList;