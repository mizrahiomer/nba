import * as actionTypes from '../actions/favorites';
const initialState = {
  teams: null,
  players: null
};
const favorites = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FAVORITES:
      const fetchedPlayers = [];
      if (action.payload) {
        for (let key in action.payload.players) {
          fetchedPlayers.push({
            ...action.payload.players[key],
            id: key
          });
        }
      }
      const fetchedTeams = [];
      if (action.payload) {
        for (let key in action.payload.teams) {
          fetchedTeams.push({
            ...action.payload.teams[key],
            id: key
          });
        }
      }
      return {
        teams: fetchedTeams,
        players: fetchedPlayers
      };

    default:
      return state;
  }
};
export default favorites;
