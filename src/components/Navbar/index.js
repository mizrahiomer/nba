import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../../stateManager/actions/auth';
import { getAuth, googleOAuth } from '../../Firebase/auth';
import './index.css';
const Navbar = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
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
      {isSignedIn ? <span className='hello'>Hello, {userName}</span> : null}
      <Link to={'/'}>
        <i className='fa fa-home icon' />
      </Link>
      {isSignedIn ? (
        <Link to='/Favorites'>
          <i className='far fa-heart icon' />
        </Link>
      ) : null}
      <div className='authBtn' onClick={authClickHandler}>
        {isSignedIn ? 'Sign Out' : 'Sign In'}
        <i className='fab fa-google'></i>
      </div>
    </div>
  );
};
export default Navbar;
