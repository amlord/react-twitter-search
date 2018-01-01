import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import TwitterSearch from './TwitterSearch';

describe('Twitter Search App', () => {
  const TWITTER = shallow(<TwitterSearch />);

  it('renders correctly', () => {
    expect(TWITTER).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TwitterSearch />, div);
  });
});