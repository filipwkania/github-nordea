import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import ResultList from '../../containers/ResultList';
import SuggestedPages from '../../containers/SuggestedPages';
import PageNotFound from '../../components/PageNotFound';

const Main = () => (
  <main className="fill-content">
    <Container style={{ marginBottom: 30 }} className="fill-content">
      <Switch>
        <Route exact path="/" render={props => <SuggestedPages {...props} />} />
        <Route exact path="/starred"render={props => <SuggestedPages name="starred" {...props} />} />
        <Route exact path="/forked"render={props => <SuggestedPages name="forked" {...props} />} />
        <Route exact path="/404" render={props => <PageNotFound message="User not found! Try another search." {...props} />} />
        <Route path="/:name" component={ResultList} />
      </Switch>
    </Container>
  </main>
);

export default Main;
