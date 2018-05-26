import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import ResultList from '../../containers/ResultList';
import SuggestedPages from '../../containers/SuggestedPages';

const Main = () => (
  <main>
    <Container style={{ marginBottom: 30 }}>
      <Switch>
        <Route exact path="/" component={SuggestedPages} />
        <Route path="/:name" component={ResultList} />
      </Switch>
    </Container>
  </main>
);

export default Main;
