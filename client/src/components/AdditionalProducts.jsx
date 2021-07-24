import React, { useState } from 'react';


const AdditionalProducts = (props) => {
  {console.log(props.relatedItems[0])}

  const [current, setCurrent] = useState(0)
  const length = props.relatedItems[0] !== undefined ? props.relatedItems.length : null
  {console.log('length', length)}
  return (
    <div data-testid="AdditionalProducts">
      AdditionalProducts
      <div>
        {props.relatedItems[0] !== undefined ? props.relatedItems.map(item => {
          return (
            <div>
              {item.id}, {item.name}, {item.default_price}
            </div>
          );
        }) : null }
      </div>
    </div>
  )
};

export default AdditionalProducts;