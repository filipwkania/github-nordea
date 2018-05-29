/* eslint max-len: 0 */
/* eslint react/no-unescaped-entities: 0 */
import React from 'react';
import { Container, List, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const InfoPage = (props, context) => (
  <Container className="info-page">
    <h2> Github Repo Viewer </h2>
    <p style={{ fontSize: 20 }}>
          Welcome. <br />This is a short summary of what features we can find in this application:
    </p>
    <List size="big">
      <List.Item>
        <List.Icon name="checkmark" />
        <List.Content>
          <List.Header>Searching for users</List.Header>
          <List.Description>
              The main search bar is aimed at users. Search is connected to the
              GitHub API, and is listing suggestions as we type. <br />GitHub by
              default is sorting suggestions with the best match according to their algorithm.
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="checkmark" />
        <List.Content>
          <List.Header>Displaying repositories</List.Header>
          <List.Description>
              On a user page, we can see the list of public repositories, fetched 20 at a time, as well as basic user info.
            <br />
              If a user has more than 20 repos, we will autoload next batch when scrolling reaches the bottom of the current list.
            <br />
              We can turn off autoload in settings, which will cause the regular pagination to appear.
            <br />
              If user has more than 5 pages (100 repos) of content, a "Jump to page" component will appear.
            <br />
              Autoloading is fixed in the menu pages: "Most starred" and "Most forked".
            <br />
              Aforementioned pages are fetching top starred and top forked repos from whole GitHub.
            <br />
              We can also sort fetched repos on user page by last created, last updated or default (by name).
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="checkmark" />
        <List.Content>
          <List.Header>Search history</List.Header>
          <List.Description>
              List of last 10 searches is accessible from the menu under "Recent searchers". History is bound to our session.
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="checkmark" />
        <List.Content>
          <List.Header>Responsiveness</List.Header>
          <List.Description>
              This application is operative on most computers, tablets and mobile phones.
          </List.Description>
        </List.Content>
      </List.Item>
      <br />
      <List.Item>
        <List.Icon name="wrench" />
        <List.Content>
          <List.Header>Tools</List.Header>
          <List.Description>
            JavaScript, React, Semantic UI, GitHub APIv3
          </List.Description>
        </List.Content>
      </List.Item>
    </List>
    <h2>Enjoy! </h2>
    <br />
    <br />
    <p>Example searches:</p>
    <Grid style={{ paddingLeft: '1rem' }}>
      <Grid.Row>
        <Button
          icon="windows"
          content="Microsoft"
          onClick={() => context.router.history.push('/microsoft')}
        />
        <Button
          icon="google"
          content="Google"
          onClick={() => context.router.history.push('/google')}
        />
        <Button
          icon="smile"
          content="Me"
          onClick={() => context.router.history.push('/filipwkania')}
        />
      </Grid.Row>
    </Grid>
  </Container>
);

InfoPage.contextTypes = {
  router: PropTypes.object,
};

export default InfoPage;
