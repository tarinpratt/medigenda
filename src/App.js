import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Header from './Header/header';
import RegistrationForm from './registrationForm/registrationForm'
import LoginForm from './loginForm/loginForm'
import MedLog from './medLog/medLog'
import UpcomingAppts from './upcomingAppts/upcomingAppts'
import AddAppt from './addAppt/addAppt'
import EditPastAppt from './editPastAppt/editPastAppt'
import PastAppts from './pastAppts/pastAppts'
import Nav from './Nav/nav'
import HomePage from './homePage/homePage'
import './App.css';

class App extends Component {
  static defaultProps = {
    store: {
      medLog: [],
      upcomingAppts: [],
      pastAppts: [],
    }
  };

  render() {
const { store } = this.props
  return (
    <main className='App'>
      <Header />
      <Nav />
      
      <Route exact path='/' component={HomePage}/>
      <Route path='/register' component={RegistrationForm} />
      <Route path='/login' component={LoginForm} />
      <Route path='/medLog'
      render={(props) => <MedLog {...props} store={store} />}
      />
      <Route path='/upcomingAppts'
       render={(props) => <UpcomingAppts {...props} store={store} />}
       />
      <Route path='/addAppt' component={AddAppt} />
      <Route path='/pastAppts' 
      render={(props) => <PastAppts {...props} store={store} />}
      />
      <Route path='/editPastAppt' component={EditPastAppt} />

    </main>
  );
}
}

export default App;