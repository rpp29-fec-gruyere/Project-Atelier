import React from 'react';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: props.photos,
      currentPhoto: 0,
      expanded: false,
      zoomed: false,
      description: props.description,
      catalogStartingIndex: 0
    };
    this.rotatePhotos = this.rotatePhotos.bind(this);
    this.rotateCatalog = this.rotateCatalog.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.toggleZoom = this.toggleZoom.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let newState = state;
    if (newState.photos[0].url !== props.photos[0].url) {
      newState.expanded = false;
      newState.zoomed = false;
    }
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
      if (newState.expanded === false) {
        newState.zoomed = false;
      }
      return newState;
    };
    if (event.target.id === 'photo-catalog-outer-container' || event.target.id === 'minimize-carousel') {
      this.setState(changeExpansionInState);
    }
  }

  toggleZoom() {
    let changeZoomInState = (state, props) => {
      let newState = state;
      newState.zoomed = !state.zoomed;
      return newState;
    };
    if (event.target.id === 'photo-catalog-outer-container') {
      this.setState(changeZoomInState);
    }
  }

  render() {
    let {photos, currentPhoto, expanded, zoomed, description, catalogStartingIndex} = this.state;
    return (<div className={zoomed ? 'zoomed' : 'not-zoomed'} id={expanded ? 'overview-carousel-expanded' : 'overview-carousel'}>
      <div id="image-display">
        <div className="alignment-helper"></div>
        <img
          id="spotlight-image"
          src={photos[currentPhoto].url}
          alt={`Photo of ${description}`}
          loading="lazy"></img>
      </div>
      <div id="carousel-controls-outer" onClick={!expanded ? this.toggleExpansion : this.toggleZoom}>
        {
          expanded ? (<img
            id="minimize-carousel"
            alt="Minimize carousel"
            src="./assets/minimize.png"
            onClick={this.toggleExpansion}>
          </img>) : ''
        }
        <div id="carousel-controls-inner">
          {
            currentPhoto === 0 ? (<div className="filler"></div>) :
              <div className="arrow-container" key="left-arrow-container">
                <div className="alignment-helper"></div>
                <img
                  className="arrow-button"
                  id="left-arrow-button"
                  src="./assets/leftarrow.png"
                  onClick={this.rotatePhotos}
                  alt="Cycle carousel left"
                  loading="lazy"
                ></img>
              </div>
          }
          <div id="photo-catalog-outer-container">
            <div id="photo-catalog-inner-container">
              <div id="photo-catalog">
                {
                  expanded ? (<React.Fragment>
                    {
                      photos.map((photo, i) => (
                        <div className={currentPhoto === i ? 'spotlight-circle' : 'catalog-circle'}
                          key={`photo-catalog-item-${i}`}
                          id={`photo-catalog-item-${i}`}
                          onClick={this.selectPhoto}>
                        </div>
                      ))
                    }
                  </React.Fragment>) :
                    (<React.Fragment>
                      <div className="alignment-helper"></div>
                      <img className="catalog-scroll"
                        id="left-scroll"
                        key="left"
                        src="./assets/leftarrow.png"
                        alt='Cycle photo catalog left'
                        onClick={this.rotateCatalog}
                        loading="lazy">
                      </img>
                      {
                        photos.slice(catalogStartingIndex, catalogStartingIndex + 7).map((photo, i) => (
                          <img className={`photo-catalog-item${currentPhoto === i + catalogStartingIndex ? ' spotlight-thumbnail' : ''}`}
                            key={`photo-catalog-item-${i + catalogStartingIndex}`}
                            id={`photo-catalog-item-${i + catalogStartingIndex}`}
                            src={photo.thumbnail_url}
                            alt={`${description} photo thumbnail ${i + (catalogStartingIndex * 7) + 1}`}
                            onClick={this.selectPhoto}
                            loading="lazy">
                          </img>
                        ))
                      }
                      <img className="catalog-scroll"
                        id="right-scroll"
                        key="right"
                        src="./assets/rightarrow.png"
                        alt='Cycle photo catalog right'
                        onClick={this.rotateCatalog}
                        loading="lazy">
                      </img>
                    </React.Fragment>)
                }
              </div>
            </div>
          </div>
          <div className="arrow-container" key="right-arrow-container">
            <div className="alignment-helper"></div>
            <img
              className="arrow-button"
              id="right-arrow-button"
              src="./assets/rightarrow.png"
              onClick={this.rotatePhotos}
              alt="Cycle carousel right"
              loading="lazy"
            ></img>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default PhotoCarousel;