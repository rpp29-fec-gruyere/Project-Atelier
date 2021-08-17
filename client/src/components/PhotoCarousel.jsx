import React from 'react';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: props.photos,
      currentPhoto: 0,
      expanded: false,
      description: props.description,
      catalogStartingIndex: 0
    };
    this.rotatePhotos = this.rotatePhotos.bind(this);
    this.rotateCatalog = this.rotateCatalog.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let newState = state;
    newState.photos = props.photos;
    newState.description = props.description;
    newState.currentPhoto = props.photos.length > state.currentPhoto ? state.currentPhoto : 0;
    if (!(newState.photos.length >= newState.catalogStartingIndex + 7)) {
      newState.catalogStartingIndex = newState.currentPhoto < 7 ? 0 : Math.min(Math.max(0, newState.currentPhoto - 3), newState.photos.length - 7);
    }
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
      if (newState.currentPhoto > newState.catalogStartingIndex + 6) {
        newState.catalogStartingIndex = Math.min(newState.currentPhoto, newState.photos.length - 7);
      }
      return newState;
    };
    this.setState(stateUpdate);
  }

  rotateCatalog(event) {
    let changeCatalogPage = (state, props) => {
      let newState = state;
      if (event.target.id.charAt(0) === 'l') {
        newState.catalogStartingIndex = Math.max(0, state.catalogStartingIndex - 7);
      } else {
        newState.catalogStartingIndex = Math.min(Math.max(0, state.photos.length - 7), state.catalogStartingIndex + 7);
      }
      return newState;
    };
    this.setState(changeCatalogPage);
  }

  selectPhoto(event) {
    this.setState({currentPhoto: Number(event.target.id.slice(event.target.id.lastIndexOf('-') + 1))});
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
    let {photos, currentPhoto, expanded, description, catalogStartingIndex} = this.state;
    return (<div id={expanded ? 'overview-carousel-expanded' : 'overview-carousel'}>
      <div id="image-display">
        <div className="alignment-helper"></div>
        <img id="spotlight-image" src={photos[currentPhoto].url} alt={`Photo of ${description}`}></img>
      </div>
      <div id="carousel-controls-outer" onClick={this.toggleExpansion}>
        <div id="carousel-controls-inner">
          {
            currentPhoto === 0 ? (<div className="filler"></div>) :
              <div className="arrow-container" key="left-arrow-container">
                <div className="alignment-helper"></div>
                <img className="arrow-button" id="left-arrow-button" src="./assets/leftarrow.png" onClick={this.rotatePhotos} alt="Cycle carousel left"></img>
              </div>
          }
          <div id="photo-catalog-outer-container">
            <div id="photo-catalog-inner-container">
              <div id="photo-catalog">
                <div className="alignment-helper"></div>
                <img className="catalog-scroll"
                  id="left-scroll"
                  key="left"
                  src="./assets/leftarrow.png"
                  alt='Cycle photo catalog left'
                  onClick={this.rotateCatalog}>
                </img>
                {
                  photos.slice(catalogStartingIndex, catalogStartingIndex + 7).map((photo, i) => (
                    <img className={`photo-catalog-item${currentPhoto === i + catalogStartingIndex ? ' spotlight-thumbnail' : ''}`}
                      key={`photo-catalog-item-${i + catalogStartingIndex}`}
                      id={`photo-catalog-item-${i + catalogStartingIndex}`}
                      src={photo.thumbnail_url}
                      alt={`${description} photo thumbnail ${i + (catalogStartingIndex * 7) + 1}`}
                      onClick={this.selectPhoto}>
                    </img>
                  ))
                }
                <img className="catalog-scroll"
                  id="right-scroll"
                  key="right"
                  src="./assets/rightarrow.png"
                  alt='Cycle photo catalog right'
                  onClick={this.rotateCatalog}>
                </img>
              </div>
            </div>
          </div>
          {
            currentPhoto === photos.length - 1 ? (<div className="filler"></div>) :
              <div className="arrow-container" key="right-arrow-container">
                <div className="alignment-helper"></div>
                <img className="arrow-button" id="right-arrow-button" src="./assets/rightarrow.png" onClick={this.rotatePhotos} alt="Cycle carousel right"></img>
              </div>
          }
        </div>
      </div>
    </div>);
  }
}

export default PhotoCarousel;