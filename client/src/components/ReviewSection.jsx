import React, {useState, useEffect} from 'react';
import RatingsBreakdown from './RatingBreakdown.jsx';
import ReviewList from './ReviewList.jsx';
import AddReviewModal from './AddReviewModal.jsx';

const ReviewSection = props => {
  const [reviewModalDisplay, setReviewModalDisplay] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsMetaData, setReviewsMetaData] = useState({});
  const [sortOption, setSortOption] = useState('relevant');
  const [filters, setFilters] = useState({});

  const [filteredReviews, setFilteredReviews] = useState([]);


  const showAddReviewModal = () => {
    setReviewModalDisplay(true);
  };

  const closeAddReviewModal = () => {
    setReviewModalDisplay(false);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  const handleFilterChange = (target) => {
    let rating = target.innerHTML[0];
    let updatedFilters = filters;
    updatedFilters[rating] ? delete updatedFilters[rating] : updatedFilters[rating] = true;
    setFilters({ ...filters, ...updatedFilters});
  };

  // Function to retrieve review metaData for product from API via the server
  const fetchReviewsMetaData = () => {
    props.handleFetch({
      endpoint: 'reviews/meta',
      params: {
        'product_id': props.itemInfo.id
      }
    },
    data => {
      setReviewsMetaData(data);
    });
  };

  // Function to retrieve reviewList for product from API via the server
  const fetchReviews = (needMetaData = true) => {
    props.handleFetch({
      endpoint: 'reviews',
      params: {
        'sort': sortOption,
        'count': 100000,
        'product_id': props.itemInfo.id
      }
    },
    data => {
      setReviews(data.results);
      if (needMetaData) {
        fetchReviewsMetaData();
      }
    });
  };

  // Initializes ReviewList & Review metadata
  useEffect(() => {
    if (props.itemInfo.id) {
      fetchReviews();
    }
  }, [props.itemInfo.id]);

  // Updates ReviewList if sort option changes
  useEffect(() => {
    if (reviews && props.itemInfo.id) {
      fetchReviews(false);
    }
  }, [sortOption]);

  // Updated filtered review list
  useEffect(() => {
    let newFilteredReviews = [];
    reviews.forEach(review => {
      if (filters[review.rating]) {
        newFilteredReviews.push(review);
      }
    });
    setFilteredReviews(newFilteredReviews);
  }, [filters]);


  return (
    <div data-testid="reviewSection" className="reviewSection" id="reviewSection">
      {reviewModalDisplay ?
        <AddReviewModal
          itemInfo={props.itemInfo}
          characteristics={reviewsMetaData.characteristics}
          handleClose={closeAddReviewModal}
          handlePost={props.handlePost}
          updateReviews={fetchReviews}
        ></AddReviewModal> : null}
      <span className="widgetHeader">RATINGS &#38; REVIEWS</span>
      <div id="mainReviewSection">
        <RatingsBreakdown metaData={Object.keys(reviewsMetaData).length > 0 ? reviewsMetaData : undefined} handleFilterChange={handleFilterChange}/>
        <ReviewList
          reviews={reviews.length > 0 ? (Object.keys(filters) > 0 ? filteredReviews : reviews) : undefined}
          handleSortChange={handleSortChange}
          showAddReviewModal={showAddReviewModal}
          handlePut={props.handlePut}
          fetchReviews={fetchReviews}/>
      </div>
    </div>
  );
};




export default ReviewSection;