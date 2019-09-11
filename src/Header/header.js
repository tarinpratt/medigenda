import React from 'react';
import { Link } from 'react-router-dom'
import './header.css';

function Header() {
  return (
    
      <header className='Header' role="banner">
          <Link to='/'><h1>MediGenda</h1></Link>
          <h2>Your very own personalized medical agenda</h2>
          
          <Link to='/login'>Log In</Link>
        
          <Link to='/register'>Register</Link>
        

      </header>
   
  );
}

export default Header;