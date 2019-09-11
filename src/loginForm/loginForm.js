import React, { Component } from 'react';
import './loginForm.css';

class LoginForm extends Component {
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
     <form id='loginForm'>
         <h3>Log In</h3>
         <div className='userName'>
             <label htmlFor='loginForm_userName'>
                 Username 
                 <input 
                 name='userName'
                 type='text'
                 value={this.state.username}
                 onChange={this.handleChangeUserName}
                 required
                 id='loginForm_userName'>
                 </input>
             </label>
         </div>
         <div className='email'>
             <label htmlFor='loginForm_email'>
                 Email 
                 <input 
                 name='email'
                 type='email'
                 value={this.state.email}
                 onChange={this.handleChangeEmail}
                 required
                 id='loginForm_email'>
                 </input>
             </label>
         </div>
         <div className='password'>
             <label htmlFor='loginForm_password'>
                 Password 
                 <input 
                 name='password'
                 type='password'
                 value={this.state.password}
                 onChange={this.handleChangePassword}
                 required
                 id='loginForm_password'>
                 </input>
             </label>
         </div>
         <button type='submit'>
             Log In
         </button>
        
     </form>
  );
}
}

export default LoginForm;