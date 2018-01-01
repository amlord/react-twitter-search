import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import TwitterSearch from './TwitterSearch';

describe('Twitter Search App', () => {
  const TWITTER = shallow(<TwitterSearch />);

  it('renders correctly', () => {
    expect( TWITTER ).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TwitterSearch />, div);
  });

  describe('initial state', () => {
    it('`timeline` user set to `twitterapi`', () => {
      expect(TWITTER.state().timeline.user).toEqual('twitterapi');
    });

    it('`timeline` tweets are empty', () => {
      expect(TWITTER.state().timeline.tweets).toBeInstanceOf(Array);
      expect(TWITTER.state().timeline.tweets).toHaveLength(0);
    });

    it('`search` text set to `React`', () => {
      expect(TWITTER.state().search.text).toEqual('React');
    });

    it('`search` tweets are empty', () => {
      expect(TWITTER.state().search.tweets).toBeInstanceOf(Array);
      expect(TWITTER.state().search.tweets).toHaveLength(0);
    });

    it('`loading` set to true', () => {
      expect(TWITTER.state().loading).toEqual(true);
    });
  });

  describe('`state` after initial load', () => {
    describe('`timeline` API', () => {
      beforeAll(() => {
        // promise to get the initial load data
        return TWITTER.instance().fetchTimelineData();
      });

      it('array of `tweets` exist', () => {
        expect(TWITTER.state().timeline.tweets).toBeInstanceOf(Array);
        expect(TWITTER.state().timeline.tweets).toHaveLength(20);
        expect(TWITTER.state().timeline.tweets[0]).toHaveProperty('created_at');
        expect(TWITTER.state().timeline.tweets[0]).toHaveProperty('text');
      });
    });

    describe('`search` API', () => {
      beforeAll(() => {
        // promise to get the initial load data
        return TWITTER.instance().fetchSearchData();
      });
  
      it('array of `tweets` exist', () => {
        expect(TWITTER.state().search.tweets).toBeInstanceOf(Array);
        expect(TWITTER.state().search.tweets).toHaveLength(15);
        expect(TWITTER.state().search.tweets[0]).toHaveProperty('created_at');
        expect(TWITTER.state().search.tweets[0]).toHaveProperty('text');
      });
    });
  });
});