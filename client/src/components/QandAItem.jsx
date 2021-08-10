import React from 'react';


const QandAItem = ({ questionsAndAnswers }) => (
  <div className='q-and-a-items' data-testid='QAndAItems'>
    {
      questionsAndAnswers.map((item, i) => (
        <div key={i}>
          <div className='q-and-a-item-question-detail'>Helpful? <button className='q-and-a-question-helpful'>Yes</button>({item.question_helpfulness}) | <button className='q-and-a-question-addAnswer'>Add Answer</button></div>
          <div className='q-and-a-item-question'>Q: {item.question_body}</div>
          {
            item.answers.slice(0, 2).map((answer, i) => (
              <div key={i}>
                <div className='q-and-a-item-answer'><b>A:</b> {answer.body}</div>
                <div className='q-and-a-item-answer-pics'>
                  {
                    answer.photos.map((photo, i) => (
                      <div id="q-an-a-item-img-container" key={i}>
                        <img src={photo} width='100' height='70' ></img>
                      </div>
                    ))
                  }

                </div>
                <div className='q-and-a-item-user'> by: {answer.answerer_name + ', ' + new Date(answer.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  | Helpful? <button className='q-and-a-question-helpful-answer'>Yes</button>({answer.helpfulness}) | <button className='q-and-a-question-report'>Report</button>
                </div>
              </div>
            ))
          }

        </div>
      ))
    }

  </div>
);

export default QandAItem;
