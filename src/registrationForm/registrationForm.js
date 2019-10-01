import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';

import './registrationForm.css';

class RegistrationForm extends Component {
    static defaultProps = {
        history: {
          push: () => {},
        },
      }

      state = { error: null }
    
      handleRegistrationSuccess = user => {
        const { history } = this.props
        history.push('/login')
      }

      handleSubmit = ev => {
        ev.preventDefault()
        const { username, email, password } = ev.target
    
        this.setState({ error: null })
         AuthApiService.postUser({
           username: username.value,
           email: email.value,
           password: password.value,
         })
           .then(user => {
    
        username.value = ''
        email.value = ''
        password.value = ''
        this.handleRegistrationSuccess()
           })
          .catch(res => {
            this.setState({ error: res.error})
          })
      }


    render() {

      const { error } = this.state

  return (
     <form id='registrationForm'
     onSubmit={this.handleSubmit}>
         <h3>Register</h3>
         <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <section className="registerInputs">
         <div className='userName'>
             <label htmlFor='registrationForm_userName'>
                 Username 
                 <input 
                 name='username'
                 type='text'
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
                 required
                 id='registrationForm_email'>
                 </input>
             </label>
         </div>
         <div className='registrationPassword'>
             <label htmlFor='registrationForm_password'>
                 Password 
                 <input 
                 name='password'
                 type='password'
                 required
                 id='registrationForm_password'>
                 </input>
             </label>
         </div>
         <button type='submit'>
             Sign Up
         </button>
         </section>        
     </form>
    );
  }
}

export default RegistrationForm;