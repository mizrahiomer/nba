import * as actionTypes from '../actions/auth';
const initialState = {
  isSignedIn: null,
  userId: null,
  userName: null
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        isSignedIn: true,
        userId: action.userId,
        userName: action.userName
      };

    case actionTypes.SIGN_OUT:
      return {
        isSignedIn: false,
        userId: null,
        userName: null
      };

    default:
      return state;
  }
};
export default auth;
