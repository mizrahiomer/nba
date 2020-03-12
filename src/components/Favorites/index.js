import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PlayerCard from '../PlayerCard';
import './index.css';

const Favorites = () => {
  const userId = useSelector(state => state.auth.userId);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const favorites = useSelector(state => state.favorites);
  const [currPlayer, setCurrPlayer] = useState();

  const renderTeams = () => {
    return (
      <div className='favorites-container'>
        {favorites.teams
          .filter(fav => fav.userId === userId)
          .map(fav => (
            <Link
              to={`/Team/${fav.teamId}/${fav.teamName}`}
              key={fav.userId + fav.teamId}
            >
              <img
                className='favorite-img'
                src={fav.teamImg}
                alt={fav.teamName}
              />
            </Link>
          ))}
      </div>
    );
  };
  const renderPlayers = () => {
    return (
      <div className='favorites-container'>
        {favorites.players
          .filter(fav => fav.userId === userId)
          .map(fav => (
            <img
              key={fav.playerId}
              onClick={() => {
                setCurrPlayer(fav.playerId);
              }}
              className='favorite-img'
              src={fav.playerImg}
              alt={fav.playerName}
            />
          ))}
      </div>
    );
  };
  const renderPlayerCard = playerId => {
    return <PlayerCard id={playerId} close={() => setCurrPlayer(null)} />;
  };
  return isSignedIn ? (
    <div>
      {renderTeams()}
      {renderPlayers()}
      {currPlayer ? renderPlayerCard(currPlayer) : null}
    </div>
  ) : (
    <Redirect to='/' />
  );
};

export default Favorites;
