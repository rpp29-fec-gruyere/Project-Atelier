import React from 'react';
import QandAItem from './QandAItem.jsx';


const QandAlist = ( {questionsAndAnswers} ) => (

  <div className='q-and-a-list' data-testid='QAndAList'>
    {console.log('qandA', questionsAndAnswers)}
    <QandAItem questionsAndAnswers={questionsAndAnswers}/>
  </div>
);

export default QandAlist;