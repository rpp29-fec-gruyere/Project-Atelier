import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProductOverview from './components/ProductOverview.jsx';
import AdditionalProducts from './components/AdditionalProducts.jsx';
import QuestionsAndAnswers from './components/QuestionsAndAnswers.jsx';
import Reviews from './components/Reviews.jsx';


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
    console.log('[App] initiating direct query');
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
    return (
      <div className="app">
        <header>
          <span className="title">Atelier</span>
        </header>
        <ProductOverview />
        <AdditionalProducts />
        <QuestionsAndAnswers />
        <Reviews />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));