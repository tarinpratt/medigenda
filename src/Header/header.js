import React from 'react';
import './header.css';

function Header() {
  return (
    
      <header className='Header' role="banner">
          <a href='/'><h1>MediGenda</h1></a>
          <h2>Your very own personalized medical agenda</h2>
          
          <a href='/login'>Log In</a>
        
          <a href='/register'>Register</a>
        

      </header>
   
  );
}

export default Header;