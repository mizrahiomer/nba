import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { createPlayerObject } from '../../include/createObject';
import { removePlayer, addPlayer } from '../../stateManager/actions/favorites';
import noImg from '../../assets/noImg.png';
import { fetchPlayerDetails } from '../../include/generateEndPoints';
import './index.css';
import SignInModal from '../SignInModal';

const PlayerCard = props => {
  const userId = useSelector(state => state.auth.userId);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const [showModal, setShowModal] = useState(false);
  const favoritesArr = useSelector(state => state.favorites.players);
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  const playerId = props.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = fetchPlayerDetails(playerId);
        const res = await axios.get(url);
        setDetails(res.data.players[0]);
      } catch (e) {
        console.log(e);
      }
    };
    const escFunction = e => {
      return e.keyCode === 27 ? props.close() : null;
    };
    fetchData();
    document.addEventListener('keydown', escFunction, false);
  }, [playerId, props]);
  const getAge = dob => {
    const now = new Date();
    const tempDob = new Date(dob);
    const yearsDiff = now.getFullYear() - tempDob.getFullYear();
    const monthsDiff = now.getMonth() - tempDob.getMonth();
    const daysDiff = now.getDate() - tempDob.getDate();
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
    if (favoritesArr) {
      const isFavorite = favoritesArr.find(
        favorite => favorite.userId === userId && favorite.playerId === props.id
      );
      return isFavorite;
    }
  };
  const getFavoriteId = () => {
    const player = favoritesArr.find(
      favorite =>
        favorite.userId === userId && favorite.playerId === details.idPlayer
    );
    return player.id;
  };
  const toggleFavorite = () => {
    const { idPlayer, strPlayer, strCutout } = details;
    checkIfFavorite()
      ? dispatch(removePlayer(getFavoriteId()))
      : dispatch(
          addPlayer(createPlayerObject(userId, idPlayer, strPlayer, strCutout))
        );
  };
  const renderPlayer = () => {
    const favoriteClass = checkIfFavorite() ? 'isFavorite' : '';

    return details ? (
      <Fragment>
        <div className='modal-overlay' onClick={props.close} />
        <Fade>
          <div className='player-screen'>
            <span className='close-modal-btn' onClick={props.close}>
              <i className='fa fa-times' />
            </span>
            <div className='player-name'>{details.strPlayer}</div>
            <div className='player-position'>{details.strPosition}</div>

            <div className='player-img-container'>
              <img
                className={`player-img ${favoriteClass}`}
                src={details.strThumb ? details.strThumb : noImg}
                alt={details.strPlayer}
              />
              <i
                onClick={() => {
                  isSignedIn ? toggleFavorite() : setShowModal(true);
                }}
                className={`fa fa-heart player-favorite ${favoriteClass}`}
              />
            </div>
            <div className='player-details'>
              <span>
                <b>Age: </b>
                {getAge(details.dateBorn)}
              </span>
              <span>
                <b>Born:</b> {details.dateBorn}
              </span>
              <span>
                <b>Height: </b>
                {details.strHeight}
              </span>
              <span>
                <b>Weight: </b>
                {details.strWeight}
              </span>
              <span>
                <b>From: </b>
                {details.strBirthLocation}
              </span>
              <span>
                <b>Nationality:</b> {details.strNationality}
              </span>
            </div>
          </div>
        </Fade>
      </Fragment>
    ) : null;
  };
  const renderSignInModal = () => {
    return (
      <SignInModal
        close={() => {
          setShowModal(false);
        }}
      />
    );
  };
  return (
    <div>
      {!showModal ? renderPlayer() : null}
      {!isSignedIn ? (showModal ? renderSignInModal() : null) : null}
    </div>
  );
};

export default PlayerCard;
