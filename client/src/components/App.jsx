import React from 'react';
import $ from 'jquery';
import ProductOverview from './ProductOverview.jsx';
import AdditionalProducts from './AdditionalProducts.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import ReviewSection from './ReviewSection.jsx';

let widgetNamesByClass = {
  'product-overview': 'Product Overview',
  'additional-products': 'Additional Products',
  'q-and-a-container': 'Questions and Answers',
  'reviewSection': 'Reviews',
  'modal-marker': 'Additional Products'
};

let widgetClassnames = Object.keys(widgetNamesByClass);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      relatedItems: {},
      questionsAndAnswers: {},
      reviews: {},
      cart: []
    };

    this.loadPage = this.loadPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.registerClick = this.registerClick.bind(this);
  }

  // For directly querying the API
  // Example of requestInfo:
  //   {
  //     endpoint: [string] api url endpoint (i.e. 'products', 'reviews', etc.),
  //     params: [object] api uri parameters (i.e. {page: 2, count: 5})
  //   }
  fetch(requestInfo, successCB = (data) => { /*console.log('[App] data recieved: ', data);*/ }, errorCB = (error) => { throw error; }) {
    let query = requestInfo.params === undefined ? {} : requestInfo.params;
    query.endpoint = requestInfo.endpoint;
    const queryString = Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join('&');
    // console.log('[App] initiating direct query');
    $.ajax({
      url: `/direct-query/?${queryString}`,
      type: 'GET',
      success: successCB,
      error: errorCB
    });
  }

  // For sending post requests to the API
  // Example of requestInfo:
  //   {
  //     endpoint: [string] api url endpoint (i.e. 'cart'),
  //     params: [object] api uri parameters (i.e. {sku_id: 941214})
  //   }
  post(requestInfo, successCB = (data) => { /*console.log('[App] post successful.', data);*/ }, errorCB = (error) => { throw error; }) {
    $.ajax({
      url: '/post-data',
      type: 'POST',
      data: JSON.stringify(requestInfo),
      contentType: 'application/json',
      success: successCB,
      error: errorCB
    });
  }

  // For sending put requests to the API
  // Example of requestInfo:
  //   {
  //     endpoint: [string] api url endpoint (i.e. 'qa/questions/[QUESTION_ID]/helpful'),
  //     params: [object] api uri parameters (i.e. {question_id: 290539})
  //   }
  put(requestInfo, successCB = (data) => { /*console.log('[App] put successful.', data);*/ }, errorCB = (error) => { throw error; }) {
    $.ajax({
      url: '/put-data',
      type: 'PUT',
      data: JSON.stringify(requestInfo),
      contentType: 'application/json',
      success: successCB,
      error: errorCB
    });
  }

  // For updating the state of App with all page data
  // productId: [integer] the id of the new page's main product
  loadPage(productId) {
    let pageDataRetrievalAttempts = 0;
    $.ajax({
      url: `/page-data/?id=${productId}`,
      type: 'GET',
      success: (pageData) => {
        this.setState(pageData);
      },
      error: (error) => {
        throw error;
        pageDataRetrievalAttempts++;
        if (pageDataRetrievalAttempts < 3) {
          this.componentDidMount();
        }
      }
    });
  }

  //Registers click events and sends relevant data to the API via POST request
  registerClick(event) {
    // console.log('[app] click registered: ', event);
    let element = event.target;
    let params = {};
    params.element = element.id !== '' ? element.id : element.classList.length > 0 ? element.classList[0] : 'unnamed element';
    params.time = new Date().toString();

    let findWidget = (currentElement) => {
      if (widgetClassnames.includes(currentElement.classList[0])) {
        return widgetNamesByClass[currentElement.classList[0]];
      }
      if (currentElement.parentElement.id === 'root') {
        return 'App';
      }
      return findWidget(currentElement.parentElement);
    };
    params.widget = findWidget(element);

    this.post({endpoint: 'interactions', params: params});
  }

  nextPage() {
    this.loadPage(this.state.item.id + 1);
  }

  componentDidMount() {
    this.loadPage(36307);
  }

  render() {
    if (JSON.stringify(this.state.item) !== '{}') {
      $(document).prop('title', this.state.item.name);
    } else {
      return (
        <div className="app" data-testid="app" onClick={this.registerClick}>
          <header>
            <div id="mainHeader">
              <span id="headerTitle">Atelier</span>
              <img id="search-icon" src="./assets/search.png" alt="Search Atelier" onClick={this.nextPage}></img>
            </div>
            <div id="promo">
              <span>SITE-WIDE ANNOUNCEMENT MESSAGE! - SALE / DISCOUNT <strong>OFFER</strong> - <a>NEW PRODUCT HIGHLIGHT</a></span>
            </div>
          </header>
          <div id="page-loading-container">
            <img id="app-loading" src="./assets/loading.gif" alt="Atelier is currently loading"></img>
          </div>
        </div>
      );
    }
    return (
      <div className="app" data-testid="app" onClick={this.registerClick}>
        <header>
          <div id="mainHeader">
            <span id="headerTitle">Atelier</span>
            <img id="search-icon" src="./assets/search.png" alt="Search Atelier" onClick={this.nextPage}></img>
          </div>
          <div id="promo">
            <span>SITE-WIDE ANNOUNCEMENT MESSAGE! - SALE / DISCOUNT <strong>OFFER</strong> - <a>NEW PRODUCT HIGHLIGHT</a></span>
          </div>
        </header>
        {
          this.state.item.styles.length < 1 ?
            (<React.Fragment>
              <div id="bad-data-consulation">We're sorry, this item is no longer available.</div>
              <button id="link-to-valid-product" onClick={this.nextPage}>Click here to see all the great items still up for grabs!</button>
            </React.Fragment>) :
            (<React.Fragment>
              <ProductOverview item={this.state.item} reviews={this.state.reviews} post={this.post} />
              <AdditionalProducts
                relatedItems={this.state.relatedItems}
                fetch={this.fetch}
                loadPage={this.loadPage}
                item={this.state.item}
                reviews={this.state.reviews}
              />
              <ReviewSection
                reviewData={this.state.reviews}
                itemInfo={this.state.item}
                handlePost={this.post.bind(this)}
                handlePut={this.put.bind(this)}
                handleFetch={this.fetch.bind(this)}/>
            </React.Fragment>)
        }
      </div>
    );
  }
}

export default App;