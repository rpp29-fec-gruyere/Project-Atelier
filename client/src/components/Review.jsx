import React, {useEffect, useState} from 'react';
import Stars from './Stars.jsx';

const Review = props => {
  let reviewDate = new Date(props.reviewInfo.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  let response = undefined;

  const [showFullReviewBody, setShowFullReviewBody] = useState(true);
  const [showImgModal, setShowImgModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');
  const [foundHelpful, setFoundHelpul] = useState(false);

  if (props.reviewInfo.response) {
    response =
      <div className="response">
        <span>Response:</span>
        <p>{props.reviewInfo.response}</p>
      </div>;
  }

  let handleImgClick = ({target}) => {
    setSelectedImg(target.src);
    setShowImgModal(true);
  };

  let handleImgModalClose = () => {
    setSelectedImg('');
    setShowImgModal(false);
  };

  let imgModal = (
    <div id="imgModal">
      <img src="./assets/closeBtn.png" alt="" onClick={() => { handleImgModalClose(); }}/>
      <img src={selectedImg} alt="" />
    </div>
  );

  let imgs = [];
  props.reviewInfo.photos.forEach(photo => {
    imgs.push(<img src={photo.url} key={photo.id} className="reviewPhoto" onClick={() => { window.open(photo.url); }} />);
  });

  let markAsHelpful = ({target}) => {
    if (!foundHelpful) {
      setFoundHelpul(true);
      target.style.fontWeight = '550';
      target.style.textDecoration = 'none';
      target.style.cursor = 'default';
      props.handlePut({'endpoint': `reviews/${props.reviewInfo.review_id}/helpful`, params: {'review_id': props.reviewInfo.review_id}});
      setTimeout(() => { props.fetchReviews(false); }, 50);
    }
  };

  let handleShowMoreBtnClick = () => {
    setShowFullReviewBody(true);
  };

  let minimizedReviewBody = (
    <p>
      {props.reviewInfo.body.slice(0, 251) + '... '}
      <span id="reviewBodyShowMoreBtn" onClick={() => handleShowMoreBtnClick()}>Show more</span>
    </p>);

  useEffect(() => {
    if (props.reviewInfo.body.length > 250) {
      setShowFullReviewBody(false);
    }
  }, [props.reviewInfo.body.length]);

  return (
    <div className="review">
      {showImgModal ? imgModal : null}
      <div className="reviewHeader">
        <Stars rating={props.reviewInfo.rating}/>
        <div className="reviewUser">{props.reviewInfo.reviewer_name}, {reviewDate}</div>
      </div>
      <span className="reviewSummary">{props.reviewInfo.summary}</span>
      {showFullReviewBody ? 
        <p>{props.reviewInfo.body}</p> :
        minimizedReviewBody
      }
      {imgs.length > 0 ? <div className="reviewPhotoContainer">
        {imgs}
      </div> : undefined}
      {response ? response : null}
      <div className="feedback">
        <span className="helpful">Helpful? <span className="helpfulResponse" onClick={(e) => markAsHelpful(e)}>Yes</span> ({props.reviewInfo.helpfulness})</span>
        {props.reviewInfo.recommend ? 
          <span className="reviewRecommendedSection">I recommend this product <img src="./assets/checkmark.svg" alt="" className="recommendedCheck"/></span>
          : null}
      </div>
    </div>
  );
};

export default Review;