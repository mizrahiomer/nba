import React from 'react';
import { Link } from 'react-router-dom';

const PlayersList = props => {
  return (
    <Link key={props.id} to={`/Player/${props.id}/${props.name}`}>
      <div className='img-container'>
        <div className='overlay'>
          <div className='player-name'>{props.name}</div>
        </div>
        <img className='player-img' src={props.img} alt={props.name} />
      </div>
    </Link>
  );
};

export default PlayersList;
