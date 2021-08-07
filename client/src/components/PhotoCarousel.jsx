import React from 'react';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: props.photos,
      currentPhoto: 0,
      expanded: false
    };
    this.rotatePhotos = this.rotatePhotos.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    newState.photos = props.photos;
    newState.currentPhoto = props.photos[0].url === state.photos[0].url ? state.currentPhoto : 0;
    newState.expanded = state.expanded;
    return newState;
  }

  rotatePhotos(event) {
    let stateUpdate = (state, props) => {
      let photoArrayLength = state.photos.length;
      let nextPhotoIndex = (state.currentPhoto + (event.target.id.slice(0, 1) === 'r' ? 1 : -1)) % photoArrayLength;
      if (nextPhotoIndex === -1) {
        nextPhotoIndex = photoArrayLength - 1;
      }
      let newState = state;
      newState.currentPhoto = nextPhotoIndex;
      return newState;
    };
    this.setState(stateUpdate);
  }

  selectPhoto(event) {
    this.setState({currentPhoto: Number(event.target.id.slice(-1))});
  }

  toggleExpansion(event) {
    let changeExpansionInState = (state, props) => {
      let newState = state;
      newState.expanded = !state.expanded;
      return newState;
    };
    if (event.target.id === 'photo-catalog-outer-container') {
      console.log('expansion click registered\nevent: ', event);
      this.setState(changeExpansionInState);
    }
  }

  render() {
    let {photos, currentPhoto, expanded} = this.state;
    return (<div id={expanded ? 'overview-carousel-expanded' : 'overview-carousel'} >
      <div id="image-display">
        <div className="alignment-helper"></div>
        <img id="spotlight-image" src={photos[currentPhoto].url}></img>
      </div>
      <div id="carousel-controls-outer" onClick={this.toggleExpansion}>
        <div id="carousel-controls-inner" >
          {
            currentPhoto === 0 ? (<div className="filler"></div>) :
              <div className="arrow-container" key="left-arrow-container">
                <div className="alignment-helper"></div>
                <img className="arrow-button" id="left-arrow-button" src="./assets/leftarrow.png" onClick={this.rotatePhotos}></img>
              </div>
          }
          <div id="photo-catalog-outer-container">
            <div id="photo-catalog-inner-container">
              <div id="photo-catalog">
                <div className="alignment-helper"></div>
                <img className="catalog-scroll" id="left-scroll" key="left" src="./assets/leftarrow.png"></img>
                {
                  photos.map((photo, i) => (
                    <img className={`photo-catalog-item${currentPhoto === i ? ' spotlight-thumbnail' : ''}`}
                      key={`photo-catalog-item-${i}`}
                      id={`photo-catalog-item-${i}`}
                      src={photo.thumbnail_url}
                      onClick={this.selectPhoto}>
                    </img>
                  ))
                }
                <img className="catalog-scroll" id="right-scroll" key="right" src="./assets/rightarrow.png"></img>
              </div>
            </div>
          </div>
          {
            currentPhoto === photos.length - 1 ? (<div className="filler"></div>) :
              <div className="arrow-container" key="right-arrow-container">
                <div className="alignment-helper"></div>
                <img className="arrow-button" id="right-arrow-button" src="./assets/rightarrow.png" onClick={this.rotatePhotos}></img>
              </div>
          }
        </div>
      </div>
    </div>);
  }
}

export default PhotoCarousel;