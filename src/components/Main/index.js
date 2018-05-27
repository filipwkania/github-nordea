import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import ResultList from '../../containers/ResultList';
import SuggestedPages from '../../containers/SuggestedPages';

const Main = () => (
  <main className="fill-content">
    <Container style={{ marginBottom: 30 }} className="fill-content">
      <Switch>
        <Route exact path="/" component={SuggestedPages} />
        <Route exact path="/info" component={SuggestedPages} />
        <Route exact path="/starred" component={SuggestedPages} />
        <Route exact path="/forked" component={SuggestedPages} />
        <Route exact path="/followed" component={SuggestedPages} />
        <Route path="/:name" component={ResultList} />
      </Switch>
    </Container>
  </main>
);

export default Main;
