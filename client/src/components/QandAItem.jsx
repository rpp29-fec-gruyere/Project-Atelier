import React from 'react';


const QandAItem = ({ questionsAndAnswers }) => (
  <div className='q-and-a-items' data-testid='QAndAItems'>
    {
      questionsAndAnswers.map((item, i) => (
        <div key={i}>
          <div className='q-and-a-item-question-detail'>Helpful? Yes({item.question_helpfulness}) | Add Answer</div>
          <div className='q-and-a-item-question'>Q: {item.question_body}</div>
          <div className='q-and-a-item-answer'><b>A:</b> {item.answers.body}</div>
          <div className='q-and-a-item-user'> by {item.answers.answerer_name} | Helpful?({item.answers.helpfulness}) | Report</div>
        </div>
      ))
    }
    <div className='q-and-a-more-answers'>
      <button>LOAD MORE ANSWERS</button>
    </div>

  </div>
);

export default QandAItem;



// {/* <div className='q-and-a-item-answer'><b>A:</b> {item}</div>
// <div className='q-and-a-posted-date'>{item} | Helpful? Yes(0) | Report </div>
// <div className='q-and-a-picture'></div> */} */}

