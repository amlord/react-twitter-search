import React, { Component } from 'react';
import logo from './logo.svg';
import './TwitterSearch.css';

import { Twitter } from './api/Twitter';
import { CONSUMER_KEY, CONSUMER_SECRET, AUTH_URL, TIMELINE_URL, SEARCH_URL } from './api/Twitter.conf';

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

  fetchTimelineData() {
    let { token, timeline } = this.state;
    
    // if token already exists
    if( token ) {
      // resolves after `timeline` updated
      return Twitter.fetchUserTimeline( TIMELINE_URL, timeline.user, token ).then(success => {
        // resolves after `setState` changes applied
        return new Promise((resolve) => {
          this.setState({
            timeline: {
              user: timeline.user,
              tweets: success
            }
          }, () => {
              resolve();
          });
        });
      });
    }

    // encode the authorisation key
    const SECRET = Twitter.encodeSecret( CONSUMER_KEY, CONSUMER_SECRET );

    // get the bearer token
    return Twitter.fetchBearerToken( AUTH_URL, SECRET ).then(newToken => {
      token = newToken;

      // resolves after `timeline` updated
      return Twitter.fetchUserTimeline( TIMELINE_URL, timeline.user, token ).then(success => {
        // resolves after `setState` changes applied
        return new Promise((resolve) => {
          this.setState({
            token,
            timeline: {
              user: timeline.user,
              tweets: success
            }
          }, () => {
              resolve();
          });
        });
      });
    });
  }

  fetchSearchData() {
    return true;
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
