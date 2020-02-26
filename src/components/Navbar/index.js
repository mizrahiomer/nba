import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../../stateManager/actions/auth';
import { getAuth, googleOAuth } from '../../Firebase/auth';
import './index.css';
const Navbar = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  console.log(isSignedIn);
  const userName = useSelector(state => state.auth.userName);

  const dispatch = useDispatch();
  useEffect(() => {
    const onAuthChange = user => {
      user ? dispatch(signIn(user.uid, user.displayName)) : dispatch(signOut());
    };
    getAuth().onAuthStateChanged(user => onAuthChange(user));
  }, [dispatch]);

  const authClickHandler = () => {
    isSignedIn ? getAuth().signOut() : getAuth().signInWithPopup(googleOAuth());
  };

  return (
    <div className='navbar'>
      <Link to={'/'}>
        <i className='fas fa-home icon' />
      </Link>
      {isSignedIn ? <i className='fa fa-heart icon' /> : null}
      <button className='authBtn' onClick={authClickHandler}>
        {isSignedIn ? 'Sign Out' : 'Sign In'}
        <i className='fab fa-google'></i>
      </button>
    </div>
  );
};
export default Navbar;
