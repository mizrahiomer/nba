export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const signIn = (userId, userName) => {
  return {
    type: SIGN_IN,
    userId,
    userName
  };
};
export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
