import React, {useEffect, useState} from 'react';
import Review from './Review.jsx';

const ReviewList = props => {
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewsToShow, setReviewsToShow] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');

  useEffect(() => {
    setReviewCount(props.reviews ? props.reviews.length : 0);
    setReviews(props.reviews ? props.reviews.slice(0, reviewsToShow) : []);
  }, [props.reviews]);


  useEffect(() => {
    setReviewsToShow(props.reviews ? reviewCount > 2 ? 2 : reviewCount : 0);
  }, [reviewCount]);

  useEffect(() => {
    setReviews(props.reviews ? props.reviews.slice(0, reviewsToShow) : []);
  }, [reviewsToShow]);

  const handleShowMoreReviews = () => {
    if (reviewCount - reviewsToShow > 1) {
      setReviewsToShow(reviewsToShow + 2);
    } else {
      setReviewsToShow(reviewsToShow + 1);
    }
  };

  const handleSortChange = ({target}) => {
    setSortOption(target.value);
    props.handleSortChange(target.value);
  };




  return (
    <div data-testid="reviewList" className="reviewList">
      <div id="sortOptions">
        <span>{reviewCount} reviews, sorted by 
          <select name="sortOptions" id="sortOptions" value={sortOption} onChange={(e) => { handleSortChange(e); }}>
            <option value="relevant">relevant</option>
            <option value="newest">newest</option>
            <option value="helpful">helpful</option>
          </select></span>
      </div>
      <div>{reviews.map(review => <Review key={review.review_id} reviewInfo={review} handlePut={props.handlePut} fetchReviews={props.fetchReviews}
      />)}</div>
      <div id="reviewButtons">
        <button className="reviewBtn" onClick={() => props.showAddReviewModal()}>ADD REVIEW</button>
        {reviewCount > reviewsToShow ? <button className="reviewBtn" onClick={() => handleShowMoreReviews()}>MORE REVIEWS</button> : null}
      </div>
    </div>
  );
};


export default ReviewList;