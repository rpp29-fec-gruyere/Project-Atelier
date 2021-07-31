import React from 'react';
import $ from 'jquery';
import ProductOverview from './ProductOverview.jsx';
import AdditionalProducts from './AdditionalProducts.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import Reviews from './Reviews.jsx';


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

  }

  // For directly querying the API
  // Example of requestInfo:
  //   {
  //     endpoint: [string] api url endpoint (i.e. 'products', 'reviews', etc.),
  //     params: [object] api uri parameters (i.e. {page: 2, count: 5})
  //   }
  fetch(requestInfo, successCB = (data) => { console.log('[App] data recieved: ', data); }, errorCB = (error) => { throw error; }) {
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

  // For updating the state of App with all page data
  // productId: [integer] the id of the new page's main product
  loadPage(productId) {
    let pageDataRetrievalAttempts = 0;
    console.log('[App] initiating retrieval of all page data');
    $.ajax({
      url: `/page-data/?id=${productId}`,
      type: 'GET',
      success: (pageData) => {
        console.log('[App] page data retrieval successful', pageData);
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

  componentDidMount() {
    let initialFetchAttempts = 0;
    this.fetch({endpoint: 'products', params: {count: 1}},
      (data) => {
        console.log('[App] data recieved: ', data);
        this.loadPage(data[0].id);
      },
      (error) => {
        throw error;
        initialFetchAttempts++;
        if (initialFetchAttempts < 3) {
          this.componentDidMount();
        }
      });
  }

  render() {
    if (JSON.stringify(this.state.item) !== '{}') {
      $(document).prop('title', this.state.item.name);
    }
    return (
      <div className="app" data-testid="app">
        <header>
          <div id="mainHeader">
            <span className="title">Atelier</span>
            <div id="headerSearchBar">
              <input type="text"></input>
              <button>
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </div>
          </div>
          <div id="promo">
            <span>SITE-WIDE ANNOUNCEMENT MESSAGE! - SALE / DISCOUNT <strong>OFFER</strong> - <a>NEW PRODUCT HIGHLIGHT</a></span>
          </div>
        </header>
        <ProductOverview item={this.state.item} reviews={this.state.reviews} />
        <AdditionalProducts />
        <QuestionsAndAnswers />
        <Reviews />
      </div>
    );
  }
}

export default App;