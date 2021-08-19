import React, {useState} from 'react';
import RatingsBreakdown from './RatingBreakdown.jsx';
import ReviewList from './ReviewList.jsx';
import AddReviewModal from './AddReviewModal.jsx';

class ReviewSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddReviewModal: false,
      reviews: []
    };
  }

  showAddReviewModal() {
    this.setState({showAddReviewModal: true});
  }

  closeAddReviewModal() {
    this.setState({showAddReviewModal: false});
  }

  fetchReviews() {

  }

  render() {

    // characteristics={Object.keys(this.reviewData.meta.characteristics)}
    return (
      <div data-testid="reviewSection" className="reviewSection" id="reviewSection">
        {this.state.showAddReviewModal ? 
          <AddReviewModal 
            itemInfo={this.props.itemInfo}
            characteristics={this.props.reviewData.meta.characteristics}
            handleClose={this.closeAddReviewModal.bind(this)}
            handlePost={this.props.handlePost}
          ></AddReviewModal> : null}
        <span className="widgetHeader">Ratings &#38; Reviews</span>
        <div id="mainReviewSection">
          <RatingsBreakdown metaData={this.props.reviewData ? this.props.reviewData.meta : false}/>
          <ReviewList reviews={this.props.reviewData ? this.props.reviewData.allReviews : false} showAddReviewModal={this.showAddReviewModal.bind(this)} handlePut={this.props.handlePut}/>
        </div>
      </div>
    );
  }
}

export default ReviewSection;