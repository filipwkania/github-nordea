import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ResultList from '../ResultList';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={ResultList} />
      <Route path="/repo/:name" component={ResultList} />
    </Switch>
  </main>
);

export default Main;
