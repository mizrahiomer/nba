import React from 'react';
import Slide from 'react-reveal/Slide';

const TeamHeader = props => {
  return (
    <div>
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
        </div>
      </Slide>
      <div className='team-logo-container'>
        <img className='team-logo' src={props.banner} alt={'Banner'} />
      </div>
    </div>
  );
};

export default TeamHeader;
