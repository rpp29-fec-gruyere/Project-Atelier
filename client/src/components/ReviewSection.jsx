import React, {useState, useEffect} from 'react';
import RatingsBreakdown from './RatingBreakdown.jsx';
import ReviewList from './ReviewList.jsx';
import AddReviewModal from './AddReviewModal.jsx';

// class ReviewSection extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showAddReviewModal: false,
//       reviews: []
//     };
//   }

//   showAddReviewModal() {
//     this.setState({showAddReviewModal: true});
//   }

//   closeAddReviewModal() {
//     this.setState({showAddReviewModal: false});
//   }

//   fetchReviews(sortOption = 'relevance') {
//     console.log('this.props.itemInfo.id', this.props.id);
//     this.props.handleFetch({
//       endpoint: 'reviews',
//       params: {
//         'sort': sortOption,
//         'product_id': this.props.itemInfo.id
//       }
//     },
//     data => {
//       this.setState({reviews: data.results});
//       console.log('Hi!');
//     });
//   }

//   componentDidMount() {
//     this.fetchReviews();
//   }

//   render() {

    
//     return (
//       <div data-testid="reviewSection" className="reviewSection" id="reviewSection">
//         {this.state.showAddReviewModal ? 
//           <AddReviewModal 
//             itemInfo={this.props.itemInfo}
//             characteristics={this.props.reviewData.meta.characteristics}
//             handleClose={this.closeAddReviewModal.bind(this)}
//             handlePost={this.props.handlePost}
//           ></AddReviewModal> : null}
//         <span className="widgetHeader">Ratings &#38; Reviews</span>
//         <div id="mainReviewSection">
//           <RatingsBreakdown metaData={this.props.reviewData ? this.props.reviewData.meta : false}/>
//           <ReviewList 
//             reviews={this.props.reviewData ? this.props.reviewData.allReviews : false} 
//             showAddReviewModal={this.showAddReviewModal.bind(this)} 
//             handlePut={this.props.handlePut}
//             fetchReviews={this.fetchReviews.bind(this)}/>
//         </div>
//       </div>
//     );
//   }
// }

const ReviewSection = props => {
  const [reviewModalDisplay, setReviewModalDisplay] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsMetaData, setReviewsMetaData] = useState({});
  const [sortOption, setSortOption] = useState('relevant');


  const showAddReviewModal = () => {
    setReviewModalDisplay(true);
  };

  const closeAddReviewModal = () => {
    setReviewModalDisplay(false);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
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
      console.log(data);
      setReviewsMetaData(data);
    });
  };

  // Function to retrieve reviewList for product from API via the server
  const fetchReviews = (needMetaData = true) => {
    props.handleFetch({
      endpoint: 'reviews',
      params: {
        'sort': sortOption,
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


  return (
    <div data-testid="reviewSection" className="reviewSection" id="reviewSection">
      {reviewModalDisplay ? 
        <AddReviewModal 
          itemInfo={props.itemInfo}
          characteristics={reviewsMetaData.characteristics}
          handleClose={closeAddReviewModal}
          handlePost={props.handlePost}
        ></AddReviewModal> : null}
      <span className="widgetHeader">Ratings &#38; Reviews</span>
      <div id="mainReviewSection">
        <RatingsBreakdown metaData={Object.keys(reviewsMetaData).length > 0 ? reviewsMetaData : undefined}/>
        <ReviewList 
          reviews={reviews.length > 0 ? reviews : undefined}
          handleSortChange={handleSortChange}
          showAddReviewModal={showAddReviewModal} 
          handlePut={props.handlePut}
          fetchReviews={fetchReviews}/>
      </div>
    </div>
  );
};




export default ReviewSection;