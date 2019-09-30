import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import Header from './../Header/header';
import RegistrationForm from '../registrationForm/registrationForm'
import LoginPage from '../loginPage/loginPage'
import MedLog from '../routes/medLog/medLog'
import UpcomingAppts from '../routes/upcomingAppts/upcomingAppts'
import AddAppt from '../addForms/addAppt/addAppt'
import EditPastAppt from '../editForms/editPastAppt/editPastAppt'
import AddMedForm from '../addForms/addMedForm/addMedForm'
import EditUpcomingAppt from '../editForms/editUpcomingAppt/editUpcomingAppt'
import PastAppts from '../routes/pastAppts/pastAppts'
import MedLogDemo from '../demoRoutes/medlogDemo/medlogDemo'
import UpcomingApptsDemo from '../demoRoutes/upcomingApptsDemo/upcomingApptsDemo'
import PastApptsDemo from '../demoRoutes/pastApptsDemo/pastApptsDemo'
import HomePage from '../homePage/homePage'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import './App.css';


class App extends Component {

  render() {

  return (
    <main className='App'>
      <Header />
 
      
      <Route exact path='/' component={HomePage}/>
      <PublicOnlyRoute path='/register' component={RegistrationForm} />
      <PublicOnlyRoute path='/login' component={LoginPage}
  />
      <PublicOnlyRoute path='/medlogDemo' component={MedLogDemo} />
      <PublicOnlyRoute path='/upcomingApptsDemo' component={UpcomingApptsDemo} />
      <PublicOnlyRoute path='/pastApptsDemo' component={PastApptsDemo} />
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