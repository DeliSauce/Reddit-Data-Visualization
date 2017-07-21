import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {username: 'delisauce', userComments: {}, userPosts: {}};
    this.updateUsername = this.updateUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUpdate() {
    console.log(this.state.username);
  }

  handleSubmit(e) {

  }

  updateUsername (e) {
    let username = e.currentTarget.value;
    this.setState({username});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Reddit Grapher!!</h2>
        </div>

        <form onSubmit={ this.handleSubmit } >
          <label>Enter Reddit User Name
           <input
             className="username"
             value={this.state.username}
             onChange={this.updateUsername}
             ></input>
          </label>
          <input type='submit' value='Get Data'></input>
        </form>

      </div>
    );
  }
}

export default App;
