import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to={'/'}>
        <i className='fas fa-home icon' />
      </Link>
    </div>
  );
};
export default Navbar;
