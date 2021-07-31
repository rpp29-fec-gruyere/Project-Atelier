import React from 'react';

const AddReviewModal = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div id="addReviewModal">
      <h1>Write Your Review</h1>
      <p>About the {props.itemName}</p>
    </div>
  );
};

export default AddReviewModal;