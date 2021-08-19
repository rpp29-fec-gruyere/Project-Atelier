import React from 'react';
import Stars from './Stars.jsx';
import $ from 'jquery';
import { IMGBB_KEY, EMAIL_VALIDATION_API_KEY } from '../../../config';

class AddReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempRating: 0,
      rating: 0,
      recommended: 'true',
      tempCharacteristics: {},
      characteristics: {},
      reviewSummary: '',
      reviewBody: '',
      imgs: [],
      nickname: '',
      email: '',
      invalidInputs: []
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
      tempCharacteristics: {},
      characteristics: {},
      reviewSummary: '',
      reviewBody: '',
      imgs: [],
      imgThumbnails: [],
      nickname: '',
      email: '',
      invalidInputs: []
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

  handleAddImage() {
    document.getElementById('imgInputBtn').click();
  }

  handleImageUpload (img) {
    var form = new FormData();
    form.append('image', img);
    $.ajax({
      url: `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
      method: 'POST',
      timeout: 0,
      processData: false,
      mimeType: 'multipart/form-data',
      contentType: false,
      data: form,
      success: response => {
        response = JSON.parse(response);
        let imgs = this.state.imgs;
        imgs.push(response.data.image.url);
        this.setState({
          imgs: imgs
        });
      }
    });
  }

  handleChange({target}) {
    let targetName = target.name;
    let targetValue = target.value;

    if (target.classList[0] === 'characteristicInput') {
      let characteristics = this.state.characteristics;
      let tempCharacteristics = this.state.tempCharacteristics;
      characteristics[this.props.characteristics[targetName].id] = Number.parseInt(target.value) + 1;
      tempCharacteristics[targetName] = this.characteristicDescriptions[targetName][Number.parseInt(target.value)];
      this.setState({
        characteristics: characteristics,
        tempCharacteristics: tempCharacteristics,
      });
    } else if (targetName === 'imgs') {
      if (target.value !== undefined) {
        this.handleImageUpload(target.files[0]);
      }
    } else {
      this.setState({[targetName]: targetValue});
    }
  }

  handleSubmit () {

    this.checkForMandatoryInputs()
      .then(invalidInputs => {
        if (invalidInputs.length === 0) {
          const reviewData = {
            'product_id': this.props.itemInfo.id,
            'rating': this.state.rating,
            'summary': this.state.reviewSummary,
            'body': this.state.reviewBody,
            'recommend': this.state.recommended === 'true' ? true : false,
            'name': this.state.nickname,
            'email': this.state.email,
            'photos': this.state.imgs,
            'characteristics': this.state.characteristics
          };
          this.props.handlePost({endpoint: 'reviews', params: reviewData});
          setTimeout(() => this.props.updateReviews(), 1000);
          this.handleClose();
        }
      });
  }

  checkForMandatoryInputs() {
    this.setState({invalidInputs: []});
    return new Promise(res => {
      let invalidInputs = [];

      this.validateEmail(this.state.email)
        .then(emailIsValid => {
          if (!emailIsValid) {
            invalidInputs.push('Please enter valid email');
          }
        })
        .then(() => {
          for (let dataPoint in this.state) {
            switch (dataPoint) {
            case 'rating':
              if (this.state[dataPoint] === 0) {
                invalidInputs.push('Overall rating');
              }
              break;
            case 'reviewBody':
              if (this.state[dataPoint].length < 50) {
                invalidInputs.push('Review body must be at least 50 characters');
              }
              break;
            case 'nickname':
              if (this.state[dataPoint].length < 1) {
                invalidInputs.push('Nickname');
              }
              break;
            case 'tempCharacteristics':
              for (let characteristic in this.state[dataPoint]) {
                if (this.state[dataPoint][characteristic] === undefined) {
                  invalidInputs.push(`Characteristic: ${characteristic}`);
                }
              }
              break;
            }
          }
          this.setState({invalidInputs: invalidInputs});
          res(invalidInputs);
        });
    });
  }

  validateEmail (email) {
    return new Promise((res, rej) => {
      if (email.length < 1) {
        res(false);
      } else {
        $.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${EMAIL_VALIDATION_API_KEY}&email=${email}`,
          result => {
            res(result['is_valid_format'].value);
          })
          .fail(err => {
            rej(new Error('Could not validate email', { cause: err }));
          });
      }
    });
  }

  componentDidMount() {
    let characteristics = {};
    let tempCharacteristics = {};
    for (let characteristic in this.props.characteristics) {
      characteristics[this.props.characteristics[characteristic].id] = undefined;
      tempCharacteristics[characteristic] = undefined;
    }
    this.setState({
      characteristics: characteristics,
      tempCharacteristics: tempCharacteristics
    });
  }


  render () {

    // Handles dynamically rendering characteristics distinct to each item
    let characteristics = [];
    let characteristicNames = Object.keys(this.props.characteristics);
    for (let i = 0; i < characteristicNames.length; i++) {
      let characteristicName = characteristicNames[i];
      let characteristic = (
        <div key={i} className="formCharacteristic">
          <label htmlFor={characteristicName} className="formCharacteristicName">{characteristicName + ' '}</label>
          <span className="formChosenCharacteristicDescription">{this.state.tempCharacteristics[characteristicName] ? ' - ' + this.state.tempCharacteristics[characteristicName] : undefined}</span>
          <div className="formCharacteristicBtnContainer">
            <input type="radio" name={characteristicName} value={0} className="characteristicInput"
              onChange={e => this.handleChange(e)} 
              checked={this.state.tempCharacteristics[characteristicName] === this.characteristicDescriptions[characteristicName][0]}></input>
            <input type="radio" name={characteristicName} value={1} className="characteristicInput"
              onChange={e => this.handleChange(e)} 
              checked={this.state.tempCharacteristics[characteristicName] === this.characteristicDescriptions[characteristicName][1]}></input>
            <input type="radio" name={characteristicName} value={2} className="characteristicInput"
              onChange={e => this.handleChange(e)} 
              checked={this.state.tempCharacteristics[characteristicName] === this.characteristicDescriptions[characteristicName][2]}></input>
            <input type="radio" name={characteristicName} value={3} className="characteristicInput"
              onChange={e => this.handleChange(e)} 
              checked={this.state.tempCharacteristics[characteristicName] === this.characteristicDescriptions[characteristicName][3]}></input>
            <input type="radio" name={characteristicName} value={4} className="characteristicInput"
              onChange={e => this.handleChange(e)} 
              checked={this.state.tempCharacteristics[characteristicName] === this.characteristicDescriptions[characteristicName][4]}></input>
          </div>
          <div className="formCharacteristicDescriptionBar">
            <span className="formCharacteristicDescription">{this.characteristicDescriptions[characteristicName][0]}</span>
            <span className="formCharacteristicDescription">{this.characteristicDescriptions[characteristicName][4]}</span>
          </div>
        </div>);
      characteristics.push(characteristic);
    }

    // Handles dynamically rendering uploaded thumbnails to newReview form modal
    let addReviewImgThumbnails = [];

    for (let i = 0; i < this.state.imgs.length; i++) {
      addReviewImgThumbnails.push(<img src={this.state.imgs[i]} alt="" className='imgThumbnail' key={i} />);
    }

    // Handles dynamically rendering invalidInput list to newReview form modal
    let invalidInputListItems = [];

    for (let i = 0; i < this.state.invalidInputs.length; i++) {
      invalidInputListItems.push(<li className='invalidInputListItem' key={i}>{this.state.invalidInputs[i]}</li>);
    }

    return (
      <div id="addReviewModal">
        <div id="addReviewHeader">
          <img id="closeReviewModalBtn" src="./assets/closeBtn.png" onClick={() => this.handleClose()}/>
        </div>
        <div id="formContent">
          <h1>Write Your Review</h1>
          <h4>About the {this.props.itemInfo.name}</h4>
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
            <div className="formSection" id="recommendedSection">
              <span className="formSectionTitle" id="recommendedTitle">Do you recommend this product?</span>
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
              <input type="file" id="imgInputBtn" name="imgs" accept="image/*"
                onChange={e => this.handleChange(e)}
              ></input>
              {this.state.imgs.length < 5 ? <button id="imgAddVisibleBtn" type="button" onClick={this.handleAddImage.bind(this)}>Add image</button> : undefined}
              <div id="thumbnailDisplay">
                {addReviewImgThumbnails}
              </div>
            </div>
            <div className="formSection">
              <span className="formSectionTitle">What is your nickname?</span>
              <input id="nicknameInput" name="nickname" type="text" maxLength="60" placeholder="Example: jackson11!" required
                onChange={e => this.handleChange(e)}
                value={this.state.nickname}
              ></input>
              <span>For privacy reasons, do not use your full name or email address</span>
            </div>
            <div className="formSection">
              <span className="formSectionTitle">Your email</span>
              <input id="emailInput" name="email" type="email" pattern=".+@\.com" maxLength="60" placeholder="Example: jackson11@email.com" required
                onChange={e => this.handleChange(e)}
                value={this.state.email}
              ></input>
              <span>For authentication reasons, you will not be emailed</span>
            </div>
            {this.state.invalidInputs.length > 0 ? <div className="formSection" id="invalidReviewInputSection">
              <span className="formSectionTitle">You must enter the following:</span>
              <ul id="invalidInputList">
                {invalidInputListItems}
              </ul>
            </div> : undefined}
            <div className="formSection">
              <div>
                <button type="button" onClick={this.handleSubmit.bind(this)} id="submitBtn">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddReviewModal;