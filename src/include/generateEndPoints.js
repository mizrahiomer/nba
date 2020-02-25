export const fetchTeams = () => {
  return 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=NBA';
};
export const fetchLastEvents = () => {
  return 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4387';
};
export const fetchNextEvents = () => {
  return 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4387';
};
export const fetchTeamDetails = teamName => {
  return `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${teamName}`;
};

export const fetchTeamLastEvents = teamId => {
  return `https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${teamId}
  `;
};
export const fetchTeamNextEvents = teamId => {
  return `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${teamId}
  `;
};
export const fetchPlayersByTeamName = teamName => {
  return `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=${teamName}&p`;
};
