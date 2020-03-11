import React from 'react';
import { useSelector } from 'react-redux';
import Slide from 'react-reveal/Slide';

const Header = props => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const isFavorite = props.isFavorite ? 'team-favorite' : '';
  return (
    <div className='team-header'>
      <Slide left>
        <div className='social-links'>
          <a href={'//' + props.facebook} target='_blang'>
            <i className='fab fa-facebook social-icon'></i>
          </a>
          <a href={'//' + props.instagram} target='_blang'>
            <i className='fab fa-instagram social-icon'></i>
          </a>
          <a href={'//' + props.youtube} target='_blang'>
            <i className='fab fa-youtube social-icon'></i>
          </a>
          <a href={'//' + props.twitter} target='_blang'>
            <i className='fab fa-twitter social-icon'></i>
          </a>
          {isSignedIn ? (
            <span className='social-icon'>
              <i
                onClick={props.toggleFavorite}
                className={`fa fa-heart ${isFavorite}`}
              ></i>
            </span>
          ) : null}
        </div>
      </Slide>
      <div className='team-logo-container'>
        <img className='team-logo' src={props.logo} alt={'Logo'} />
      </div>
    </div>
  );
};

export default Header;
