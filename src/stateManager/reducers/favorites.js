import * as actionTypes from '../actions/favorites';
const initialState = {
  teams: [],
  players: []
};
const favorites = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TEAM:
      return {
        ...state,
        teams: state.teams.concat(action.teamObj)
      };
    case actionTypes.REMOVE_TEAM:
      const newTeams = state.teams.filter(
        team => team.userId !== action.userId && team.teamId !== action.teamId
      );

      return {
        ...state,
        teams: newTeams
      };
    case actionTypes.ADD_PLAYER:
      return {
        ...state,
        players: state.players.concat(action.playerObj)
      };
    case actionTypes.REMOVE_PLAYER:
      const newPlayers = state.players.filter(
        player =>
          player.userId !== action.userId && player.playerId !== action.playerId
      );

      return {
        ...state,
        players: newPlayers
      };

    default:
      return state;
  }
};
export default favorites;
