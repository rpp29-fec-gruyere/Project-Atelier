import React from 'react';
// required props:
//   rating: [number] the star rating out of 5 (i.e. 4.31)

// optional props:
//   starId: [string] this will give the stars div its own unique "id" and "key" attributes (i.e. "review-meta-overview")
//     (a random id is generated if none is provided)
//   onMouseEnter: [function] this will 
//     
//   starId [string] this will give the stars div its own unique "id" and "key" attributes (i.e. "review-meta-overview")
//     (a random id is generated if none is provided)
const Stars = (props) => {
  let rating = props.rating;
  let starsToBeRendered = [];
  let starId = props.starId !== undefined ? props.starId : String(Math.random()).slice(2);
  for (let i = 0; i < 5; i++) {
    let starSource = `./assets/stars/star${Math.round(Math.min(1, Math.max(0, rating - i)) * 4)}.png`;
    let star = (<img 
      className="star" 
      key={`${starId}-star${i + 1}`} 
      data-testid={`${starId}-star${i + 1}`}
      id={`${starId}-star${i + 1}`}  
      src={starSource}
      onMouseEnter={props.handleMouseEnter ? () => props.handleMouseEnter(i) : null} 
      onMouseLeave={props.handleMouseEnter ? () => props.handleMouseLeave() : null }
      onClick={props.handleClick ? () => props.handleClick() : null}
    ></img>);

    starsToBeRendered.push(star);
  }
  return (<div className="stars" data-testid={starId} id={starId}>
    {starsToBeRendered}
  </div>);
};

export default Stars;