import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
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
          
          {
            TokenService.hasAuthToken()?
            this.renderLogoutLink()
            : this.renderLoginLink()
          } 
<Link to='/'><h1 className="title"></h1></Link>
<p className="caption">Your very own personal medical agenda</p>
          {
            TokenService.hasAuthToken() ?
            this.renderPrivateNav()
            : null
          }    
          
      </header>   
    )
  }
}

export default Header;