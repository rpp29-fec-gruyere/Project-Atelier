import React from 'react';


const QandAButtons = ({handleLoadAnswer}) => (
  <div className='q-and-a-buttons' data-testid='QAndAButtons'>
    <button onClick={handleLoadAnswer} className='q-and-a-more-answered-questions'>MORE ANSWERED QUESTIONS</button>
    <button className='q-and-a-add-a-question'>ADD A QUESTION +</button>
  </div>
);

export default QandAButtons;