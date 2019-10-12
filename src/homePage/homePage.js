import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import './homePage.css';


class HomePage extends Component {


  render() {
  return (
      <section className='homePage'>
          {
            TokenService.hasAuthToken()?
            null
            : <p>With MediGenda, you can give your memory a rest by storing details regarding upcoming doctors appointments, past doctors visits, billing, and medication intake with our easy to use record keeper.
              <Link to='/login' className="demoFont">Demo</Link>
              </p>   
          } 
      <section className="pillImage"></section>
      </section>
  );
}
}

export default HomePage;