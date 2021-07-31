import React from 'react';

import QandAForm from './QandAForm.jsx';
import QandAList from './QandAList.jsx';
import QandAButtons from './QandAButtons.jsx';
import exampleData from '../../../helpers/QandAExample.js';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qAndAList: exampleData
    };
  }



  render() {
    return (
      <div data-testid='QuestionsAndAnswers' className='q-and-a-container'>
        <span className='q-and-a-title'>QUESTIONS &#38; ANSWERS</span>
        <QandAForm />
        <QandAList questionsAndAnswers={exampleData}/>
        <QandAButtons />

      </div>
    );
  }
}

export default QuestionsAndAnswers;


