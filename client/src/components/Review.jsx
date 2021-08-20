import React from 'react';
import Stars from './Stars.jsx';
import $ from 'jquery';

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

  let imgs = [];
  props.reviewInfo.photos.forEach(photo => {
    imgs.push(<img src={photo.url} key={photo.id} className="reviewPhoto"/>);
  });

  let markAsHelpful = () => {
    props.handlePut({'endpoint': `reviews/${props.reviewInfo.review_id}/helpful`, params: {'review_id': props.reviewInfo.review_id}});
    setTimeout(() => { props.fetchReviews(false); }, 50);
  };

  return (
    <div className="review">
      <div className="reviewHeader">
        <Stars rating={props.reviewInfo.rating}/>
        <div className="reviewUser">{props.reviewInfo.reviewer_name}, {reviewDate}</div>
      </div>
      <span>{props.reviewInfo.summary}</span>
      <p>{props.reviewInfo.body}</p>
      {imgs.length > 0 ? <div className="reviewPhotoContainer">
        {imgs}
      </div> : undefined}
      {response ? response : null}
      <div className="feedback">
        <span className="helpful">Helpful? <span className="helpfulResponse" onClick={() => markAsHelpful()}>Yes</span> ({props.reviewInfo.helpfulness})</span>
      </div>
    </div>
  );
};

export default Review;