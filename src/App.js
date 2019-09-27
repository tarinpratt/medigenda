import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import Header from './Header/header';
import RegistrationForm from './registrationForm/registrationForm'
import LoginPage from './loginPage/loginPage'
import MedLog from './medLog/medLog'
import UpcomingAppts from './upcomingAppts/upcomingAppts'
import AddAppt from './addAppt/addAppt'
import EditPastAppt from './editPastAppt/editPastAppt'
import AddMedForm from './addMedForm/addMedForm'
import EditUpcomingAppt from './editUpcomingAppt/editUpcomingAppt'
import PastAppts from './pastAppts/pastAppts'
import Nav from './Nav/nav'
import HomePage from './homePage/homePage'
import PrivateRoute from './Utils/PrivateRoute'
import PublicOnlyRoute from './Utils/PublicOnlyRoute'
import './App.css';


class App extends Component {

  render() {

  return (
    <main className='App'>
      <Header />
      <Nav />
      
      <Route exact path='/' component={HomePage}/>
      <PublicOnlyRoute path='/register' component={RegistrationForm} />
      <PublicOnlyRoute path='/login' component={LoginPage}
  />
      <PrivateRoute path='/medlog' component={MedLog}
      />
      <PrivateRoute path='/upcomingAppts' component={UpcomingAppts}
       />
      <PrivateRoute path='/addAppt' component={AddAppt} />
      <PrivateRoute path='/pastAppts' component={PastAppts}/>
      <PrivateRoute path='/addMed' component={AddMedForm} />
      <PrivateRoute path='/editPastAppt/:upcomingApptId' component={EditPastAppt} />
      <PrivateRoute path='/editUpcomingAppt/:upcomingApptId' component={EditUpcomingAppt} />
      

    </main>
  );
}
}

export default withRouter(App);