import React, { Component } from 'react';
import './Tweets.css';

class Tweets extends Component {

  renderTweets() {
    return (
        <ul className="Tweets_list">
            <li>TWEET</li>
        </ul>
    );
  }

  renderNoTweets() {
    return (
        <div className="Tweets_noneFound">(no tweets found)</div>
    );
  }

  render() {
    let { tweetList } = this.props;

    return (
      <div className="Tweets">
        {(tweetList && tweetList.length) ? this.renderTweets() : this.renderNoTweets()}
      </div>
    );
  }
}

export default Tweets;
