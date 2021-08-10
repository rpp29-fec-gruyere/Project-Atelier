import React from 'react';
import QandAItem from './QandAItem.jsx';


const QandAlist = ( {questionsAndAnswers} ) => (

  <div className='q-and-a-list' data-testid='QAndAList'>
    {/* {console.log('qandA', questionsAndAnswers)} */}
    <QandAItem questionsAndAnswers={questionsAndAnswers}/>
    <div className='q-and-a-more-answers'>
      <button className='q-and-a-more-answers-button'>LOAD MORE ANSWERS</button>
    </div>
  </div>
);

export default QandAlist;