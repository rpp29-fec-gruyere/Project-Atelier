import React from 'react';
import RatingBreakdown from './ReviewList.jsx';
import ReviewList from './RatingBreakdown.jsx';

const Reviews = () => {
  return (
    <div data-testid="reviewsSection" className="reviewsSection">
      <span id="">Ratings &#38; Reviews</span>
      <div>
        <RatingBreakdown />
        <ReviewList />
      </div>
    </div>
  );
};

export default Reviews;