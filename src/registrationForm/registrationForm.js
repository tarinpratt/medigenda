import React, { Component } from 'react';
import './registrationForm.css';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        };
    }

    handleChangeUserName = e => {
        this.setState({ username: e.target.value })
      };
    
      handleChangeEmail = e => {
        this.setState({ email: e.target.value })
      };
    
      handleChangePassword = e => {
        this.setState({ password: e.target.value })
      };

    render() {
 
  return (
     <form id='registrationForm'>
         <h3>Register</h3>
         <div className='userName'>
             <label htmlFor='registrationForm_userName'>
                 Username 
                 <input 
                 name='username'
                 type='text'
                 value={this.state.username}
                 onChange={this.handleChangeUserName}
                 required
                 id='registrationForm_userName'>
                 </input>
             </label>
         </div>
         <div className='email'>
             <label htmlFor='registrationForm_email'>
                 Email 
                 <input 
                 name='email'
                 type='email'
                 value={this.state.email}
                 onChange={this.handleChangeEmail}
                 required
                 id='registrationForm_email'>
                 </input>
             </label>
         </div>
         <div className='password'>
             <label htmlFor='registrationForm_password'>
                 Password 
                 <input 
                 name='password'
                 type='password'
                 value={this.state.password}
                 onChange={this.handleChangePassword}
                 required
                 id='registrationForm_password'>
                 </input>
             </label>
         </div>
         <button type='submit'>
             Sign Up
         </button>
        
     </form>
  );
}
}

export default RegistrationForm;