import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import PublicNav from '../publicNav/publicNav'
import Nav from '../Nav/nav'
import './header.css';

class Header extends Component {
  handleLogoutClick = e => {
    TokenService.clearAuthToken() 
  }

  renderPrivateNav() {
    return (
      <div className="privateNav">
      <Nav /> 
      </div>
    )
  }
  renderPublicNav() {
    return (
      <div className="publicNav">
      <PublicNav /> 
      </div>
    )
  }


  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/register'>
          Register
        </Link>
        <Link
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }
  render() {
  return (
    
      <header className='Header' role="banner">
          <Link to='/'><h1>MediGenda</h1></Link>
          <h2>Your very own personalized medical agenda</h2>
          {
            TokenService.hasAuthToken()?
            this.renderLogoutLink()
            : this.renderLoginLink()
          } 

          {
            TokenService.hasAuthToken() ?
            this.renderPrivateNav()
            : this.renderPublicNav()
          }
          
      </header>
   
  )
}
}

export default Header;