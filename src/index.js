import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TwitterSearch from './TwitterSearch';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TwitterSearch />, document.getElementById('twitterSearch'));
registerServiceWorker();
