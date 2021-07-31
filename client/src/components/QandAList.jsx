import React from 'react';
import QandAItem from './QandAItem.jsx';


const QandAlist = ( {questionsAndAnswers} ) => (
  <div className='q-and-a-list' data-testid='QAndAList'>
    <QandAItem questionsAndAnswers={questionsAndAnswers}/>
  </div>
);

export default QandAlist;