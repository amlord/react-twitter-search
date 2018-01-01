import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Tweets from './Tweets';

describe('Twitter Search App', () => {
  const TWEETS = shallow(<Tweets />);

  it('renders correctly', () => {
    expect( TWEETS ).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Tweets />, div);
  });

  describe('no tweets', () => {
    it('display "no tweets" message', () => {
        expect( TWEETS.find('.Tweets_noneFound').length ).toBe(1);
    });
  });

  describe('tweets', () => {
    // it('displays list of tweets', () => {
    //     expect( TWEETS.find('.Tweets__list').to.have.length(1) ).toBe(true);
    // });
  });
});