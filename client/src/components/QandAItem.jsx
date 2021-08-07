import React from 'react';


const QandAItem = ({ questionsAndAnswers }) => (
  <div className='q-and-a-items' data-testid='QAndAItems'>
    {
      questionsAndAnswers.map((item, i) => (
        <div key={i}>
          <div className='q-and-a-item-question-detail'>Helpful? Yes({item.question_helpfulness}) | Add Answer</div>
          <div className='q-and-a-item-question'>Q: {item.question_body}</div>
          {
            item.answers.map((answer, i) => (
              <div key={i}>
                <div className='q-and-a-item-answer'><b>A:</b> {answer.body}</div>
                <div className='q-and-a-item-user'> by: {answer.answerer_name + ', ' + new Date(answer.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} | Helpful?({answer.helpfulness}) | Report</div>
              </div>
            ))
          }

        </div>
      ))
    }

  </div>
);

export default QandAItem;

// answer.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})
