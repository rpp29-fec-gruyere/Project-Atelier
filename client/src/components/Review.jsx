import React from 'react';
import Stars from './Stars.jsx';

const Review = props => {
  let reviewDate = new Date(props.reviewInfo.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  let response = undefined;
  if (props.reviewInfo.response) {
    response = 
      <div className="response">
        <span>Response:</span>
        <p>{props.reviewInfo.response}</p>
      </div>;
  }

  return (
    <div className="review">
      <div className="reviewHeader">
        <Stars rating={props.reviewInfo.rating}/>
        <div className="reviewUser">{props.reviewInfo.reviewer_name}, {reviewDate}</div>
      </div>
      <span>{props.reviewInfo.summary}</span>
      <p>{props.reviewInfo.body}</p>
      {response ? response : null}
      <div className="feedback">
        <span className="helpful">Helpful? <span className="helpfulResponse">Yes</span></span>
        <span className="report">Report</span>
      </div>
    </div>
  );
};

export default Review;