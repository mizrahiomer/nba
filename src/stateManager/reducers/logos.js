import * as actionTypes from '../actions/logos';

const logos = (state = null, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LOGOS_ARRAY:
      const logos = {};
      action.teams.map(team => {
        return (logos[team.strTeam] = team.strTeamBadge);
      });

      return logos;

    default:
      return state;
  }
};
export default logos;
