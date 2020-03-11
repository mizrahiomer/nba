export const ADD_TEAM = 'ADD_TEAM';
export const REMOVE_TEAM = 'REMOVE_TEAM';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export const addTeam = teamObj => {
  return {
    type: ADD_TEAM,
    teamObj
  };
};
export const removeTeam = (userId, teamId) => {
  return {
    type: REMOVE_TEAM,
    userId,
    teamId
  };
};
export const addPlayer = playerObj => {
  return {
    type: ADD_PLAYER,
    playerObj
  };
};
export const removePlayer = (userId, playerId) => {
  return {
    type: REMOVE_PLAYER,
    userId,
    playerId
  };
};
