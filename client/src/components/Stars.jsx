import React from 'react';
// expected props:
//   rating: [number] the star rating out of 5 (i.e. 4.31)
//   starId [string] this will give the stars div its own unique "id" and "key" attributes (i.e. "review-meta-overview")
//     (a random id is generated if none is provided)
const Stars = (props) => {
  let rating = props.rating;
  let renderedStars = [];
  for (let i = 0; i < 5; i++) {
    renderedStars.push((<img src={`./assets/stars/star${Math.round(Math.min(1, Math.max(0, rating - i)) * 4)}.png`}></img>));
  }
  let starId = props.starId !== undefined ? props.starId : String(Math.random()).slice(2);
  return (<div className="stars" data-testid={starId} id={starId}>
    {renderedStars}
  </div>);
};

export default Stars;