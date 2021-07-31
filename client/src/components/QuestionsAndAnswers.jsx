import React from 'react';

import QandAForm from './QandAForm.jsx';
import QandAList from './QandAList.jsx';
import QandAButtons from './QandAButtons.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qAndAList: []
    };
  }



  render() {
    return (
      <div data-testid='QuestionsAndAnswers' className='q-and-a-container'>
        <span className='q-and-a-title'>QUESTIONS &#38; ANSWERS</span>
        <QandAForm />
        <QandAList />
        <QandAButtons />

      </div>
    );
  }
}

export default QuestionsAndAnswers;


