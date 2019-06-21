import React, { Component } from 'react';

import getName from './GetName';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: ''
		}
	}

	componentDidMount() {
		const payload = {
	      token: window.localStorage.getItem('token')
	    }
	    getName(payload)
	      .then(res => {
	        if(res.userFirstName)
	          this.setState({userName: res.userFirstName})
	      })
	}

	render() {
		return(
			<div>
				The userName is {this.state.userName}
			</div>
		)
	}
}

export default Dashboard;