import React, { Component } from 'react';
import logo from './logo.svg';
import './TwitterSearch.css';

import { Twitter } from './api/Twitter';
import Tweets from './components/Tweets';

class TwitterSearch extends Component {
  constructor(){
    super();

    this.state = {
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

  componentDidMount() {
    // load default user timeline
    this.fetchTimelineData();
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
    let { timeline } = this.state;
    
    // resolves after `timeline` updated
    return Twitter.fetchUserTimeline( timeline.user ).then(success => {

      // resolves after `setState` changes applied
      return this.setStatePromise({
        timeline: {
          user: timeline.user,
          tweets: success
        }
      });
    });
  }

  fetchSearchData() {
    let { search } = this.state;

    // resolves after `search` updated
    return Twitter.searchTweets( search.text ).then(success => {

      // resolves after `setState` changes applied
      return this.setStatePromise({
        search: {
          text: search.text,
          tweets: success.statuses
        }
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
        <Tweets tweetList={this.state.timeline.tweets} />
      </div>
    );
  }
}

export default TwitterSearch;
