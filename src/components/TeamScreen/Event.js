import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Event = props => {
  const result = +props.homeTeam.score - +props.awayTeam.score > 0;
  const logos = useSelector(state => state.logos);
  const isWinner = result
    ? props.currTeam === props.homeTeam.id
      ? 'W'
      : 'L'
    : props.currTeam === props.awayTeam.id
    ? 'W'
    : 'L';

  return (
    <div>
      <div className='event'>
        <div className='event-team'>
          <Link to={`/Team/${props.homeTeam.id}/${props.homeTeam.name}`}>
            <img
              className='event-img'
              src={logos[props.homeTeam.name]}
              alt={props.homeTeam.name}
            />
          </Link>
          <div className='team-name'>{props.homeTeam.name}</div>
        </div>
        <div className='event-details'>
          <div className='event-date'>{props.date}</div>
          {props.homeTeam.score && props.awayTeam.score ? (
            <div className='event-score'>
              <span className={result ? 'win' : 'lose'}>
                {props.homeTeam.score}
              </span>
              -
              <span className={!result ? 'win' : 'lose'}>
                {props.awayTeam.score}
              </span>
              {isWinner}
            </div>
          ) : null}
        </div>
        <div className='event-team'>
          <Link to={`/Team/${props.awayTeam.id}/${props.awayTeam.name}`}>
            <img
              className='event-img'
              src={logos[props.awayTeam.name]}
              alt={props.awayTeam.name}
            />
          </Link>
          <div className='team-name'>{props.awayTeam.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Event;
