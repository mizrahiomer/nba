import React from 'react';

const PlayersList = props => {
  return (
    <div onClick={props.show} className='img-container'>
      <div className='img-overlay'>
        <div className='player-list-name'>{props.name}</div>
      </div>
      <img className='player-list-img' src={props.img} alt={props.name} />
    </div>
  );
};

export default PlayersList;
