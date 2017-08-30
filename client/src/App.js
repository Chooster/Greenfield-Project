import React, { Component } from 'react';
import * as Pages from './pages'
import { Route }  from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Pages.Login}></Route>
        <Route path="/new-user" component={Pages.CreateAccount}></Route>
        <Route path="/posts" component={Pages.Posts}></Route>
      </div>
    );
  }
}

export default App;
