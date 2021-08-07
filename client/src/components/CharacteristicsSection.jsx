import React from 'react';

const CharacteristicsSection = props => {

  let characteristicDescriptions = {
    Size: ['Small', 'Perfect', 'Large'],
    Width: ['Narrow', 'Perfect', 'Wide'],
    Comfort: ['Uncomfortable', 'Ok', 'Perfect'],
    Quality: ['Poor', 'Average', 'Perfect'],
    Length: ['Short', 'Perfect', 'Long'],
    Fit: ['Tight', 'Perfect', 'Long']
  };

  return (
    <div data-testid="characteristicsSection" className="characteristicsSection">
      {props.characteristicsData ? Object.keys(props.characteristicsData).map(characteristic => {
        return (
          <div className="characteristic" key={props.characteristicsData[characteristic].id}>
            <span>{characteristic}</span>
            <div className="characteristicBar">
              <div className="indicator" style={{width: ((props.characteristicsData[characteristic].value / 5) * 100) + '%'}}></div>
            </div>
            <div className="characteristicDetails">
              <div className={['characteristicDetail', 'first'].join(' ')}>{characteristicDescriptions[characteristic][0]}</div>
              <div className={['characteristicDetail', 'middle'].join(' ')}>{characteristicDescriptions[characteristic][1]}</div>
              <div className={['characteristicDetail', 'last'].join(' ')}>{characteristicDescriptions[characteristic][2]}</div>
            </div>
          </div>
        );
      }) : null}
    </div>
  );
};

export default CharacteristicsSection;