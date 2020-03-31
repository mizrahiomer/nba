import React from 'react';
import './index.css';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import { getAuth, googleOAuth } from '../../Firebase/auth';

const SignInModal = props => {
  const authClickHandler = () => {
    getAuth().signInWithPopup(googleOAuth());
  };
  return (
    <Fade>
      <div className='signin-modal-overlay'>
        <Bounce top>
          <div className='signin-modal'>
            <span className='close-signin-btn' onClick={props.close}>
              <i className='fa fa-times' />
            </span>
            <div className='signin-modal-title'>Please Sign In to continue</div>
            <div className='signin-btn' onClick={authClickHandler}>
              Sign In
              <i className='fab fa-google'></i>
            </div>
          </div>
        </Bounce>
      </div>
    </Fade>
  );
};

export default SignInModal;
