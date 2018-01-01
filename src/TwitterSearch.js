import React, { Component } from 'react';
import logo from './logo.svg';
import './TwitterSearch.css';

import { Twitter } from './api/Twitter';
import { CONSUMER_KEY, CONSUMER_SECRET, AUTH_URL } from './api/Twitter.conf';

class TwitterSearch extends Component {
  constructor(){
    super();

    this.state = {
      token: null,
      timeline: {
        user: 'twitterapi',
        tweets: []
      },
      search: {
        text: 'React',
        tweets: []
      },
      loading: true
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default TwitterSearch;
