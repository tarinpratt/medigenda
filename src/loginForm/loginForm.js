import React, { Component } from 'react';
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import { Button, Input } from '../Utils/Utils'
import './loginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

     state = { error: null }
  
       handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { username, password } = ev.target
        AuthApiService.postLogin({
          username: username.value,
          password: password.value,
        })
          .then(res => {
            username.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.onLoginSuccess()
           
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
      }
    
    
    render() {
        const { error } = this.state
  return (
     <form id='loginForm' onSubmit={this.handleSubmitJwtAuth}>
         <h3>Log In</h3>
         <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <section className="loginInputs">
         <div className='username'>
             <label htmlFor='loginForm_username'>
                 Username 
                 <Input 
                 name='username'
                 type='text'
                 required
                 id='loginForm_username'>
                 </Input>
             </label>
         </div>
         <div className='password'>
             <label htmlFor='loginForm_password'>
                 Password 
                 <Input 
                 name='password'
                 type='password'
                 required
                 id='loginForm_password'>
                 </Input>
             </label>
         </div>
         <Button type='submit'>
             Log In
         </Button>
         </section>
        
     </form>
  );
}
}

export default LoginForm