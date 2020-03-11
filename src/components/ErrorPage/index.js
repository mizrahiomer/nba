import React from 'react';
import { Link } from 'react-router-dom';
import nbaLogo from '../../assets/nbaLogo.png';
import './index.css';
const ErrorPage = () => {
  return (
    <div className='error-screen'>
      <img className='error-logo' alt='NBA Logo' src={nbaLogo} />
      <div className='error-title'>404</div>
      <div className='error-text'>
        oops, The page you are looking for does not exist
      </div>
      <Link className='error-btn' to='/'>
        Back to homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
