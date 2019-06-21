import React, { Component } from 'react';

import getSignInResponse from './GetSignInResponse.js';
import getSuccessResponse from './GetSuccessResponse.js';

import Dashboard from './Dashboard.js';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      emailError: false,
      passError: false,
      success: false,
      clicked: false
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.submit = this.submit.bind(this);
    this.error = this.error.bind(this);
  }

  handleEmail(e) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(e.target.value.toLowerCase()))
        this.setState({email: e.target.value, emailError: false, clicked: false});
    else {
      this.setState({email: e.target.value, emailError: true, clicked: false});
    }
  }

  handlePass(e) {
    var regex = /^[A-Za-z]\w{7,14}$/;
    if(regex.test(e.target.value))
        this.setState({pass: e.target.value, passError: false, clicked: false});
    else {
      this.setState({pass: e.target.value, passError: true, clicked: false});
    }
  }

  submit() {
    getSuccessResponse()
      .then(res => {
        window.localStorage.setItem('token', res.token);
        this.setState({clicked: true, success: true})
      })
  }

  error() {
    getSignInResponse()
      .then(res => {
        this.setState({clicked: true, success: false})
      })
  }

  render() {
    const container = {
      textAlign: 'left',
      width: '100%',
      marginLeft: '30%'
    }

    const indDiv = {
      width: '100%',
      margin: '20px'
    }

    const label = {
      marginRight: '20px',
      display: 'inline-block',
      width: '30%'
    }

    const error = {
      color: 'red',
      fintSize: '10pt',
      marginBottom: '15px'
    }

    const success = {
      marginTop: '20px',
      marginLeft: '20%',
      color: 'blue'
    }

    const buttonDiv = {
      marginLeft: '15%'
    }

    const sbutton = {
      height: '30px',
      width: '100px',
      borderRadius: '5px',
      fontWeight: 'bold',
      backgroundColor: 'green',
      color: 'white',
      marginRight: '20px'
    }

    const ebutton = {
      height: '30px',
      width: '100px',
      borderRadius: '5px',
      fontWeight: 'bold',
      backgroundColor: 'red',
      color: 'white'
    }
    if(this.state.clicked && this.state.success) {
      return(
        <Dashboard />
      )
    } else {
        return(
          <div style={container}>
            <div style={indDiv}>
              <label for="email" style={label}>Email</label>
              <input name="email" placeholder="Email" id="email" type="email" onChange={this.handleEmail}/>
            </div>
            <div style={error}>
              {
                this.state.emailError ? 'Invalid email format' : null
              }
            </div>
            <div style={indDiv}>
              <label for="password" style={label}>Password</label>
              <input name="password" placeholder="Password" id="pass" type="password" onChange={this.handlePass}/>
            </div>
            <div style={error}>
              {
                this.state.passError ? 'Invalid password format' : null
              }
            </div>
            <div style={buttonDiv}>
               <button style={sbutton} onClick={this.submit}>Successful</button>
                <button style={ebutton} onClick={this.error}>Error</button>
            </div>
            <div style={success}>
              {
                this.state.clicked && this.state.success ? 'Token: 1234' : null
              }
              {
                this.state.clicked && !this.state.success ? 'Could be any error here' : null
              }
            </div>
          </div>
        )
      }
    }
  }

export default SignIn;
