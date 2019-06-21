import React, { Component } from 'react';

import getSignInResponse from './GetSignInResponse.js';
import getSuccessResponse from './GetSuccessResponse.js';
import getName from './GetName';

import SignIn from './SignIn.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      name: '',
      confirm: '',
      emailError: false,
      passError: false,
      nameError: false,
      confirmError: false,
      success: false,
      clicked: false,
      loginSuccessful: false
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleName = this.handleName.bind(this);
    this.getName = this.getName.bind(this);
    this.submit = this.submit.bind(this);
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

  handleConfirm(e) {
    if(this.state.pass !== e.target.value)
        this.setState({confirm: e.target.value, confirmError: true})
    else {
        this.setState({confirm: e.target.value, confirmError: false})
    }
  }

  handleName(e) {
    var regex = /^[A-Za-z\s]+$/;
    if(regex.test(e.target.value))
        this.setState({name: e.target.value, nameError: false})
    else {
        this.setState({name: e.target.value, nameError: true})
    }
  }

  submit() {
    if(this.state.emailError || this.state.passError || this.state.nameError || this.state.confirmError) {
        getSignInResponse()
          .then(res => {
            this.setState({clicked: true, success: false})
          })
    }
    else {
        getSuccessResponse()
          .then(res => {
            window.localStorage.setItem('token', res.token)
          })
        this.setState({clicked: true, success: true})
    }
  }

  getName() {
    const payload = {
      token: window.localStorage.getItem('token')
    }
    getName(payload)
      .then(res => {
        if(res.userFirstName)
          this.setState({loginSuccessful: true})
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
      marginLeft: '20%'
    }

    const button = {
      height: '30px',
      width: '100px',
      borderRadius: '5px',
      fontWeight: 'bold'
    }

    const successButton = {
      height: '30px',
      width: '100px',
      borderRadius: '5px',
      fontWeight: 'bold',
      backgroundColor: 'green',
      color: 'white'
    }

    const successCont = {
      textAlign: 'center',
      width: '100%',
      color: 'green',
      marginTop: '50px'
    }

    if(window.location.href.includes('signin')) {
      return(
        <div style={successCont}>
          <SignIn />
        </div>
      )
    } else {
      return(
        <div style={container}>
          <div style={indDiv}>
            <label for="name" style={label}>Full Name</label>
            <input name="name" placeholder="Full Name" type="text" id="name" onChange={this.handleName}/>
          </div>
          <div style={error}>
            {
              this.state.nameError ? 'Your name should not contain any special character or numbers' : null
            }
          </div>
          <div style={indDiv}>
            <label for="email" style={label}>Email</label>
            <input name="email" placeholder="Email" type="email" onChange={this.handleEmail}/>
          </div>
          <div style={error}>
            {
              this.state.emailError ? 'Invalid email format' : null
            }
          </div>
          <div style={indDiv}>
            <label for="password" style={label}>Password</label>
            <input name="password" placeholder="Password" type="password" onChange={this.handlePass}/>
          </div>
          <div style={error}>
            {
              this.state.passError ? 'Invalid password format' : null
            }
          </div>
          <div style={indDiv}>
            <label for="cpassword" style={label}>Confirm Password</label>
            <input name="cpassword" placeholder="Password" type="password" onChange={this.handleConfirm}/>
          </div>
          <div style={error}>
            {
              this.state.confirmError ? 'Passwords dont match' : null
            }
          </div>
        </div>
      )
    }
  }
}

export default App;
