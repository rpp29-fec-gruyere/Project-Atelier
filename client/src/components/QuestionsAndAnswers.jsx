import React from 'react';

import QandAForm from './QandAForm.jsx';
import QandAList from './QandAList.jsx';
import QandAButtons from './QandAButtons.jsx';
import exampleData from '../../../helpers/QandAExample.js';

// HELPER FUNCTION

let sortAnswerArr = (answersObj) => {
  let answerArr = [];
  for (let id in answersObj) {
    answerArr.push(answersObj[id]);
  }
  answerArr.sort((a, b) => parseFloat(b.helpfulness) - parseFloat(a.helpfulness));
  return answerArr;
};

let sortQuestions = (questionsArr) => {
  questionsArr.sort((a, b) => parseFloat(b.question_helpfulness) - parseFloat(a.question_helpfulness));
};

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsAndAnswers: [],
      questionsAndAnswersDisplay: []
    };

    this.handleLoadAnswer = this.handleLoadAnswer.bind(this);
    this.handleAddQuesion = this.handleAddQuesion.bind(this);
    this.handleMoreAnsQ = this.handleMoreAnsQ.bind(this);
    this.handleYes = this.handleYes.bind(this);
    // this.handleAddAnswer = this.handleAddAnswer.bind(this);
  }

  handleLoadAnswer(e) {
    let currLength = this.state.questionsAndAnswersDisplay.length;
    let newDisplay = this.state.questionsAndAnswersDisplay.slice();
    for (let i = currLength; i < currLength + 2; i++) {
      newDisplay.push(this.state.questionsAndAnswers[i]);
    }
    this.setState({ questionsAndAnswersDisplay: newDisplay });
  }

  handleAddQuesion(e) {

  }

  handleMoreAnsQ(e) {

  }

  handleYes(e) {


  }

  handleAddAnswer(e) {

  }





  static getDerivedStateFromProps(props, state) {
    console.log('props', props.questionsAndAnswers);
    if (props.questionsAndAnswers !== state.questionsAndAnswers) {
      let newState = {
        questionsAndAnswers: [],
        questionsAndAnswersDisplay: []

      };
      newState.questionsAndAnswers = props.questionsAndAnswers;
      if (JSON.stringify(newState.questionsAndAnswers) !== '{}') {
        sortQuestions(newState.questionsAndAnswers);
        for (let i = 0; i < 2; i++) {
          newState.questionsAndAnswersDisplay.push(newState.questionsAndAnswers[i]);
        }
        // sort answers in each question //
        newState.questionsAndAnswers.forEach((item) => {
          let answersObj = item.answers;
          item.answers = sortAnswerArr(answersObj);
        });
      }

      // console.log('newstate:', newState);
      // console.log('newstateDisplay:', newState.questionsAndAnswersDisplay);
      return newState;
    } else {
      return null;
    }
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
          <span className='q-and-a-title'>QUESTIONS & ANSWERS</span>
          <QandAForm />
          <QandAList questionsAndAnswers={this.state.questionsAndAnswersDisplay} />
          <QandAButtons handleLoadAnswer={this.handleLoadAnswer} />
        </div>

      );
    }
  }
}


export default QuestionsAndAnswers;



