import React from 'react';
import propTypes from 'prop-types';
import { Grid, Item, Label } from 'semantic-ui-react';

const ResultRow = ({ repo }) => (
  <Grid.Column mobile={16} computer={8}>
    <Item>
      <Item.Content>
        <Item.Header as="a" content={repo.name} />
        <Item.Meta>
           updated at {new Date(repo.updated_at).toLocaleDateString()}
        </Item.Meta>
        <Item.Description content={repo.description} />
        <Item.Extra>
          {
            repo.language
            &&
            <Label icon="code" content={repo.language} />
          }
          {
            repo.stargazers_count > 0
            &&
            <Label icon="star" content={repo.stargazers_count} />
          }

          {
            repo.forks_count > 0
            &&
            <Label icon="fork" content={repo.forks_count} />
          }
        </Item.Extra>
      </Item.Content>
    </Item>
  </Grid.Column>
);

ResultRow.propTypes = {
  repo: propTypes.shape({
    name: propTypes.string,
    description: propTypes.string,
  }).isRequired,
};

export default ResultRow;
