import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateAccount extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword =this.setPassword.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  createUser(e) {
    e.preventDefault();
    const saveUser = {username: this.state.username, password: this.state.password};
    axios.post('http://localhost:3030/new-user', saveUser)
      .then((res) => {
        console.log('Creation Successful!');
        this.props.history.push('/posts');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Welcome Account Tester</h2>
        <form className="Login-form">
          <FormGroup className="Login-group">
            Username:
            <FormControl
              type="text"
              placeholder="Username"
              className="Username-form"
              onChange={this.setUsername}
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup>
            Password:
            <FormControl
              type="text"
              placeholder="Password"
              className="Username-form"
              onChange={this.setPassword}
              value={this.state.password}
            />
          </FormGroup>
          <button className="account-button" onClick={this.createUser}>Create Account</button>
          <br />
          <Link to="/">Login</Link>
        </form>
      </div>
    );
  }
}
