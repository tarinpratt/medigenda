import React, { Component } from 'react';
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
              <span className="demo">Try out our demo in the login page.</span>
              </p>   
          } 
      <section className="pillImage"></section>
      </section>
  );
}
}

export default HomePage;