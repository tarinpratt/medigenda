import React, { Component } from 'react';
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from '../Utils/Utils'
import './loginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }
     state = { 
       loading: false,
       error: null }
  
  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ 
      loading: true, 
      error: null })
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
        this.setState({
          loading: false
        })
           
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
    
    render() {

        const { error } = this.state

  return (
    <section className="loginContainer">
    <form id='loginForm' role='post' onSubmit={this.handleSubmitJwtAuth}>
      {this.state.loading? 
      <div><FontAwesomeIcon icon={faSpinner}/>Loading...</div>
    : null}
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
         <Button type='submit' className='loginButton'>
             Log In
         </Button>
         </section> 
      </form>

      <form id='demoForm' role='post' onSubmit={this.handleSubmitJwtAuth}>
                  <Button type='submit' className="demoButton">
                      Demo
                  </Button> 
                  <section className="loginInputsDemo">
                  <div className='username'>
                      <label htmlFor='loginForm_username'>
                          Username 
                          <Input 
                          defaultValue='demo'
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
                          defaultValue='Demo123#'
                          name='password'
                          type='password'
                          required
                          id='loginForm_password'>
                          </Input>
                      </label>
                  </div>
                  </section>  
              </form>
      </section>
    );
  }
}

export default LoginForm