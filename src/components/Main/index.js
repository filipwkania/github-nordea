import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import ResultList from '../../containers/ResultList';

const Main = () => (
  <main>
    <Container style={{ marginBottom: 30 }}>
      <Switch>
        <Route exact path="/" component={ResultList} />
        <Route path="/:name" component={ResultList} />
      </Switch>
    </Container>
  </main>
);

export default Main;
