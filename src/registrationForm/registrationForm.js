import React, { Component } from 'react';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthApiService from '../services/auth-api-service';

import './registrationForm.css';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false // will be true when ajax request is running
    }
  }
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
    
        this.setState({ 
          loading: true,
          error: null })
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
        this.setState({
          loading: false
        })
           })
          .catch(res => {
            this.setState({ error: res.error})
          })
      }


    render() {

      const { error } = this.state

  return (
     <form id='registrationForm' role='post' onSubmit={this.handleSubmit}>
       { this.state.loading? 
       <div><FontAwesomeIcon icon={faSpinner}/>Loading...</div>
       : null
       }       
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
         <section className='passwordReq'>Password must contain 1 upper case, lower case, number and special character</section>
         <button type='submit'>
             Sign Up
         </button>
         </section>        
     </form>
    );
  }
}

export default RegistrationForm;