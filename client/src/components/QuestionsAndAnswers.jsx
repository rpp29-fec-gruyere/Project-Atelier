import React from 'react';

import QandAForm from './QandAForm.jsx';
import QandAList from './QandAList.jsx';
import QandAButtons from './QandAButtons.jsx';
import exampleData from '../../../helpers/QandAExample.js';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsAndAnswers: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = { questionsAndAnswers: [] };
    newState.questionsAndAnswers = props.questionsAndAnswers;
    return newState;
  }

  render() {
    if (JSON.stringify(this.state.questionsAndAnswers) === '{}') {
      return (
        <div id="overview">
          <div id="overview-loading-container">
            <img id="overview-loading-icon" src="./assets/loading.gif"></img>
          </div>
        </div>
      );
    } else {
      return (
        <div data-testid='QuestionsAndAnswers' className='q-and-a-container'>
          <span className='q-and-a-title'>QUESTIONS &#38; ANSWERS</span>
          <QandAForm />
          <QandAList questionsAndAnswers={this.state.questionsAndAnswers} />
          <QandAButtons />
        </div>

      );
    }
  }
}

// const QuestionsAndAnswers = ({ questionsAndAnswers }) => (
//   <div data-testid='QuestionsAndAnswers' className='q-and-a-container'>
//     <span className='q-and-a-title'>QUESTIONS &#38; ANSWERS</span>
//     <QandAForm />
//     <QandAList questionsAndAnswers={exampleData} />
//     <QandAButtons />
//   </div>
// );

export default QuestionsAndAnswers;



