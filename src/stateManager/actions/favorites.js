import { databaseRef } from '../../Firebase/firebase';
export const ADD_TEAM = 'ADD_TEAM';
export const REMOVE_TEAM = 'REMOVE_TEAM';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const FETCH_FAVORITES = 'FETCH_FAVORITES';

export const fetchFavorites = () => async dispatch => {
  databaseRef.on('value', snapshot => {
    dispatch({
      type: FETCH_FAVORITES,
      payload: snapshot.val()
    });
  });
};
export const addTeam = teamObj => {
  databaseRef
    .child('teams')
    .push()
    .set(teamObj);
  return {
    type: ADD_TEAM,
    teamObj
  };
};
export const removeTeam = favoriteId => async dispatch => {
  databaseRef
    .child('teams')
    .child(favoriteId)
    .remove();
};
export const addPlayer = playerObj => {
  databaseRef
    .child('players')
    .push()
    .set(playerObj);
  return {
    type: ADD_PLAYER,
    playerObj
  };
};
export const removePlayer = favoriteId => async dispatch => {
  databaseRef
    .child('players')
    .child(favoriteId)
    .remove();
};
