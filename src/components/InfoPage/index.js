/* eslint max-len: 0 */
/* eslint react/no-unescaped-entities: 0 */
import React from 'react';
import { Container, List } from 'semantic-ui-react';

const InfoPage = () => (
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
              Pagination is included at the bottom of the page, allowing to fetch next batch of repos.
            <br />
              An example of autoloading new content is included in the menu
              pages: "Most starred" and "Most forked".
            <br />
              Aforementioned pages are fetching top starred and top forked repos from whole GitHub.
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="checkmark" />
        <List.Content>
          <List.Header>Search history</List.Header>
          <List.Description>
              List of last 10 searches is accessible from the menu under "Recent searchers". History is bound to session.
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
  </Container>
);

export default InfoPage;
