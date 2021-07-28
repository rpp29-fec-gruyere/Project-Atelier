import React from 'react';
// expected props:
//   rating: [number] the star rating out of 5 (i.e. 4.31)
//   starId [string] this will give the stars div its own unique "id" and "key" attributes (i.e. "review-meta-overview")
//     (a random id is generated if none is provided)
const Stars = (props) => {
  let rating = props.rating;
  let starsToBeRendered = [];
  let starId = props.starId !== undefined ? props.starId : String(Math.random()).slice(2);
  for (let i = 0; i < 5; i++) {
    let starSource = `./assets/stars/star${Math.round(Math.min(1, Math.max(0, rating - i)) * 4)}.png`;
    starsToBeRendered.push((<img className="star" key={`${starId}-star${i + 1}`} data-testid={`${starId}-star${i + 1}`} src={starSource}></img>));
  }
  return (<div className="stars" data-testid={starId} id={starId}>
    {starsToBeRendered}
  </div>);
};

export default Stars;