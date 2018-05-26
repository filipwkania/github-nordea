import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './redux';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const middleware = [reduxThunk];

const store = createStore(
  reducers,
  applyMiddleware(...middleware),
);

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);

registerServiceWorker();
