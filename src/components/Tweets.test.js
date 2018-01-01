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
});