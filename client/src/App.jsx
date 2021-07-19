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

    };

  }

  // Example of requestInfo:
  //   {
  //     endpoint: [string] api url endpoint (i.e. 'products', 'reviews', etc.),
  //     params: [object] api uri parameters (i.e. {page: 2, count: 5})
  //   }
  fetch(requestInfo, successCB = (data) => { console.log('[App] data recieved: ', data); }, errorCB = (error) => { throw error; }) {
    console.log('[App] initiating direct query');
    $.ajax({
      url: '/direct-query',
      type: 'GET',
      data: JSON.stringify(requestInfo),
      contentType: 'application/json',
      success: successCB,
      error: errorCB
    });
  }

  componentDidMount() {
    this.fetch({endpoint: 'products', params: {page: 2, count: 10}});
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