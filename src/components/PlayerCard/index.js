import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { createPlayerObject } from '../../include/createObject';
import { removePlayer, addPlayer } from '../../stateManager/actions/favorites';
import Fade from 'react-reveal/Fade';
import noImg from '../../assets/noImg.png';
import {
  fetchPlayerDetails,
  fetchPlayerHonors
} from '../../include/generateEndPoints';
import './index.css';

const PlayerCard = props => {
  const userId = useSelector(state => state.auth.userId);
  const favoritesArr = useSelector(state => state.favorites.players);
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  const [honors, setHonors] = useState();
  const playerId = props.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsUrl = fetchPlayerDetails(playerId);
        const honorsUrl = fetchPlayerHonors(playerId);
        const details = axios.get(detailsUrl);
        const honors = axios.get(honorsUrl);

        const [fetchedDeatils, fetchedHonors] = await Promise.all([
          details,
          honors
        ]);

        setDetails(fetchedDeatils.data.players[0]);
        setHonors(fetchedHonors.data.honors);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [playerId]);
  const getAge = dob => {
    const now = new Date();
    const x = new Date(dob);
    const yearsDiff = now.getFullYear() - x.getFullYear();
    const monthsDiff = now.getMonth() - x.getMonth();
    const daysDiff = now.getDate() - x.getDate();
    let age = yearsDiff;
    age =
      monthsDiff < 0
        ? --age
        : monthsDiff === 0
        ? daysDiff < 0
          ? --age
          : age
        : age;
    return age;
  };
  const checkIfFavorite = () => {
    const isFavorite = favoritesArr.find(
      favorite => favorite.userId === userId && favorite.playerId === props.id
    );
    return isFavorite;
  };
  const toggleFavorite = () => {
    console.log(checkIfFavorite());
    const { idPlayer, strPlayer, strCutout } = details;
    checkIfFavorite()
      ? dispatch(removePlayer(userId, idPlayer))
      : dispatch(
          addPlayer(createPlayerObject(userId, idPlayer, strPlayer, strCutout))
        );
  };
  const renderPlayer = () => {
    const favoriteClass = checkIfFavorite() ? 'isFavorite' : null;
    return details ? (
      <Fragment>
        <div className='modal-overlay' onClick={props.close} />
        <Fade>
          <div className='modal'>
            <div className='player-screen'>
              <span className='close-modal-btn' onClick={props.close}>
                <i className='fa fa-times' />
              </span>
              <div className='player-name'>
                {details.strPlayer}
                <i
                  onClick={() => {
                    toggleFavorite();
                  }}
                  className={`fa fa-heart player-favorite ${favoriteClass}`}
                />
              </div>

              <div className='player-details'>
                <img
                  className='player-img'
                  src={details.strThumb ? details.strThumb : noImg}
                  alt={details.strPlayer}
                />
                <div>
                  <p> Born: {details.dateBorn}</p>
                  <p>Age: {getAge(details.dateBorn)}</p>
                  <p>Position: {details.strPosition}</p>
                  <p> Height: {details.strHeight}</p>
                  <p> Weight: {details.strWeight}</p>
                  <p> From: {details.strBirthLocation}</p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Fragment>
    ) : (
      <ClipLoader color='#fff' />
    );
  };

  return <div>{renderPlayer()}</div>;
};

export default PlayerCard;
