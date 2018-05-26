import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

require('dotenv').config();

ReactDOM.render(
  (
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  ), document.getElementById('root'),
);

registerServiceWorker();
