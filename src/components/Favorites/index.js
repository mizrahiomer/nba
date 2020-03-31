import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { fetchFavorites } from '../../stateManager/actions/favorites';
import PlayerCard from '../PlayerCard';
import './index.css';

const Favorites = () => {
  const userId = useSelector(state => state.auth.userId);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const favorites = useSelector(state => state.favorites);
  const [currPlayer, setCurrPlayer] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);
  const renderTeams = () => {
    return favorites.teams ? (
      <div className='favorites-container'>
        {favorites.teams
          .filter(fav => fav.userId === userId)
          .map(fav => (
            <Link to={`/Team/${fav.teamId}/${fav.teamName}`} key={fav.id}>
              <img
                className='favorite-img'
                src={fav.teamImg}
                alt={fav.teamName}
              />
            </Link>
          ))}
      </div>
    ) : (
      <div className='favorite-loader'>
        <ClipLoader size={70} color={'#f5f5f5'} />
      </div>
    );
  };
  const renderPlayers = () => {
    return favorites.players ? (
      <div className='favorites-container'>
        {favorites.players
          .filter(fav => fav.userId === userId)
          .map(fav => (
            <img
              key={fav.id}
              onClick={() => {
                setCurrPlayer(fav.playerId);
              }}
              className='favorite-img player'
              src={fav.playerImg}
              alt={fav.playerName}
            />
          ))}
      </div>
    ) : null;
  };
  const renderPlayerCard = playerId => {
    return <PlayerCard id={playerId} close={() => setCurrPlayer(null)} />;
  };

  return isSignedIn !== null ? (
    isSignedIn ? (
      <div>
        {renderTeams()}
        {renderPlayers()}
        {currPlayer ? renderPlayerCard(currPlayer) : null}
      </div>
    ) : (
      <Redirect to='/' />
    )
  ) : null;
};

export default Favorites;
