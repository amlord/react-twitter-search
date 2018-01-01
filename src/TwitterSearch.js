import React, { Component } from 'react';
import logo from './logo.svg';
import './TwitterSearch.css';

import { Twitter } from './api/Twitter';
import { CONSUMER_KEY, CONSUMER_SECRET, AUTH_URL, TIMELINE_URL, SEARCH_URL } from './api/Twitter.conf';
import Tweets from './components/Tweets';

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

  setStatePromise(newState) {
    // resolves after `setState` changes applied
    return new Promise((resolve) => {
      this.setState(newState, () => {
          resolve();
      });
    });
  }

  fetchTimelineData() {
    let { token, timeline } = this.state;
    
    // if token already exists
    if( token ) {

      // resolves after `timeline` updated
      return Twitter.fetchUserTimeline( TIMELINE_URL, timeline.user, token ).then(success => {

        // resolves after `setState` changes applied
        return this.setStatePromise({
          timeline: {
            user: timeline.user,
            tweets: success
          }
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
        return this.setStatePromise({
          token,
          timeline: {
            user: timeline.user,
            tweets: success
          }
        });
      });
    });
  }

  fetchSearchData() {
    let { token, search } = this.state;
    
    // if token already exists
    if( token ) {

      // resolves after `search` updated
      return Twitter.searchTweets( SEARCH_URL, search.text, token ).then(success => {

        // resolves after `setState` changes applied
        return this.setStatePromise({
          search: {
            text: search.text,
            tweets: success.statuses
          }
        });
      });
    }

    // encode the authorisation key
    const SECRET = Twitter.encodeSecret( CONSUMER_KEY, CONSUMER_SECRET );

    // get the bearer token
    return Twitter.fetchBearerToken( AUTH_URL, SECRET ).then(newToken => {
      token = newToken;

      // resolves after `search` updated
      return Twitter.searchTweets( SEARCH_URL, search.user, token ).then(success => {

        // resolves after `setState` changes applied
        return this.setStatePromise({
          token,
          search: {
            text: search.text,
            tweets: success.statuses
          }
        });
      });
    });
  }

  render() {
    return (
      <div className="TwitterSearch">
        <header className="TwitterSearch__header">
          <img src={logo} className="TwitterSearch__logo" alt="logo" />
          <h1 className="TwitterSearch__title">Welcome to React</h1>
        </header>
        <p className="TwitterSearch__intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Tweets />
      </div>
    );
  }
}

export default TwitterSearch;
