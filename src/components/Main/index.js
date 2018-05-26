import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ResultList from '../../containers/ResultList';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={ResultList} />
      <Route path="/:name" component={ResultList} />
    </Switch>
  </main>
);

export default Main;
