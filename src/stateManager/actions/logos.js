export const CREATE_LOGOS_ARRAY = 'CREATE_LOGOS_ARRAY';

export const createLogosArray = teams => {
  return {
    type: CREATE_LOGOS_ARRAY,
    teams
  };
};
