import React from 'react';
import Stars from './Stars.jsx';

class AddReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempRating: 0,
      rating: 0,
      recommended: 'true',
      Size: undefined,
      Width: undefined,
      Comfort: undefined,
      Quality: undefined,
      Length: undefined,
      Fit: undefined,
      reviewSummary: '',
      reviewBody: ''
    };
    
    this.characteristicDescriptions = {
      Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
      Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
      Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      Quality: ['Poor', 'Below average', 'Average', 'Pretty great', 'Perfect'],
      Length: ['Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Long'],
      Fit: ['Tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Long']
    };
  }

  handleClose() {
    this.setState({
      tempRating: 0,
      rating: 0,
      recommended: 'true',
      Size: undefined,
      Width: undefined,
      Comfort: undefined,
      Quality: undefined,
      Length: undefined,
      Fit: undefined,
      reviewSummary: '',
      reviewBody: ''
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
    case 'Size':
      this.setState({[targetName]: targetValue});
      break;
    case 'Width':
      this.setState({[targetName]: targetValue});
      break;
    case 'Comfort':
      this.setState({[targetName]: targetValue});
      break;
    case 'Quality':
      this.setState({[targetName]: targetValue});
      break;
    case 'Length':
      this.setState({[targetName]: targetValue});
      break;
    case 'Fit':
      this.setState({[targetName]: targetValue});
      break;
    case 'reviewSummary':
      this.setState({[targetName]: targetValue});
      break;
    case 'reviewBody':
      this.setState({[targetName]: targetValue});
      break;
    }

  }


  render () {
    let characteristics = [];
    for (let i = 0; i < this.props.characteristics.length; i++) {
      let characteristicName = this.props.characteristics[i];
      let characteristic = (
        <div key={i} className="formCharacteristic">
          <label htmlFor={characteristicName} className="formCharacteristicName">{characteristicName + ' '}</label>
          <span className="formChosenCharacteristicDesciprtion">{this.state[characteristicName] ? ' - ' + this.state[characteristicName] : undefined}</span>
          <div className="formCharacteristicBtnContainer">
            <input type="radio" id={this.characteristicDescriptions[characteristicName][0]} name={characteristicName} value={this.characteristicDescriptions[characteristicName][0]} 
              onChange={e => this.handleChange(e)} 
              checked={this.state[characteristicName] === this.characteristicDescriptions[characteristicName][0]}></input>
            <input type="radio" id={this.characteristicDescriptions[characteristicName][1]} name={characteristicName} value={this.characteristicDescriptions[characteristicName][1]} 
              onChange={e => this.handleChange(e)} 
              checked={this.state[characteristicName] === this.characteristicDescriptions[characteristicName][1]}></input>
            <input type="radio" id={this.characteristicDescriptions[characteristicName][2]} name={characteristicName} value={this.characteristicDescriptions[characteristicName][2]} 
              onChange={e => this.handleChange(e)} 
              checked={this.state[characteristicName] === this.characteristicDescriptions[characteristicName][2]}></input>
            <input type="radio" id={this.characteristicDescriptions[characteristicName][3]} name={characteristicName} value={this.characteristicDescriptions[characteristicName][3]} 
              onChange={e => this.handleChange(e)} 
              checked={this.state[characteristicName] === this.characteristicDescriptions[characteristicName][3]}></input>
            <input type="radio" id={this.characteristicDescriptions[characteristicName][4]} name={characteristicName} value={this.characteristicDescriptions[characteristicName][4]} 
              onChange={e => this.handleChange(e)} 
              checked={this.state[characteristicName] === this.characteristicDescriptions[characteristicName][4]}></input>
          </div>
          <div className="formCharacteristicDescriptionBar">
            <span className="formCharacteristicDescription">{this.characteristicDescriptions[characteristicName][0]}</span>
            <span className="formCharacteristicDescription">{this.characteristicDescriptions[characteristicName][4]}</span>
          </div>
        </div>);
      characteristics.push(characteristic);
    }

    return (
      <div id="addReviewModal">
        <div id="closeReviewModalBtn" onClick={() => this.handleClose()}>X</div>
        <div id="formContent">
          <h1>Write Your Review</h1>
          <h4>About the {this.props.itemName}</h4>
          <form>
            <div className="formSection">
              <span className="formSectionTitle">Overall Rating</span>
              <Stars 
                rating={this.state.tempRating > 0 ? this.state.tempRating : this.state.rating} 
                handleMouseEnter={this.handleStarMouseEnter.bind(this)} 
                handleMouseLeave={this.handleStarMouseLeave.bind(this)} 
                handleClick={this.handleStarClick.bind(this)}
              />
            </div>
            <div className="formSection">
              <span className="formSectionTitle">Do you recommend this product?</span>
              <input type="radio" id="recommended" name="recommended" value="true" 
                onChange={e => this.handleChange(e)} 
                checked={this.state.recommended === 'true'}></input>
              <label htmlFor="recommened">Yes</label>
              <input type="radio" id="notRecommended" name="recommended" value="false" 
                onChange={e => this.handleChange(e)} 
                checked={this.state.recommended === 'false'}></input>
              <label htmlFor="notRecommened">No</label>
            </div>
            <div className="formSection">
              <span className="formSectionTitle">Characteristics</span>
              {characteristics}
            </div>
            <div className="formSection">
              <span className="formSectionTitle">Review summary</span>
              <input id="reviewSummaryInput" name="reviewSummary" type="text" maxLength="60" placeholder="Example: Best purchase ever!"
                onChange={e => this.handleChange(e)}
                value={this.state.reviewSummary}
              ></input>
            </div>
            <div className="formSection">
              <span className="formSectionTitle">Review body</span>
              <textarea id="reviewBodyInput" name="reviewBody" minLength="50" maxLength="1000" placeholder="Why did you like the product or not?"
                onChange={e => this.handleChange(e)}
                value={this.state.reviewBody}
              ></textarea>
              {
                this.state.reviewBody.length < 50 ? 
                  <span id="textBodyCharCount">Minimum required characters left: {50 - this.state.reviewBody.length}</span> 
                  : <span>Minimum reached</span>
              }
            </div>
            <div className="formSection">
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddReviewModal;