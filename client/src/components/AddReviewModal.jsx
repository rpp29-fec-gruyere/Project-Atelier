import React from 'react';
import Stars from './Stars.jsx';

class AddReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempRating: 0,
      rating: 0,
      recommended: 'true'
    };
  }

  handleClose() {
    this.setState({
      tempRating: 0,
      rating: 0,
      recommended: 'true'
    });
    this.props.handleClose();
  }

  handleStarMouseEnter (starNum) {
    this.setState({tempRating: starNum + 1});
  }

  handleStarMouseLeave() {
    this.state.tempRating = 0;
    this.setState({tempRating: 0});
  }

  handleStarClick() {
    this.setState({rating: this.state.tempRating});
  }

  handleChange({target}) {
    let targetName = target.name;
    let targetValue = target.value;

    switch (targetName) {
    case 'recommended':
      this.setState({[targetName]: targetValue});
      break;
    }

  }


  render () {
    return (
      <div id="addReviewModal">
        <div id="closeReviewModalBtn" onClick={() => this.handleClose()}>X</div>
        <h1>Write Your Review</h1>
        <h4>About the {this.props.itemName}</h4>
        <form>
          <p>Overall Rating</p>
          <Stars 
            rating={this.state.tempRating > 0 ? this.state.tempRating : this.state.rating} 
            handleMouseEnter={this.handleStarMouseEnter.bind(this)} 
            handleMouseLeave={this.handleStarMouseLeave.bind(this)} 
            handleClick={this.handleStarClick.bind(this)}
          />
          <p>Do you recommend this product?</p>
          <input type="radio" id="recommended" name="recommended" value="true" 
            onChange={e => this.handleChange(e)} 
            checked={this.state.recommended === 'true'}></input>
          <label htmlFor="recommened">Yes</label>
          <input type="radio" id="notRecommended" name="recommended" value="false" 
            onChange={e => this.handleChange(e)} 
            checked={this.state.recommended === 'false'}></input>
          <label htmlFor="notRecommened">No</label>
          <p>Characteristics</p>
        </form>
      </div>
    );
  }
}

export default AddReviewModal;