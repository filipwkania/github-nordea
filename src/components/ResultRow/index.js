import React from 'react';
import propTypes from 'prop-types';
import { Grid, Item, Label, Segment } from 'semantic-ui-react';

const ResultRow = ({ repo }) => (
  <Grid.Column mobile={16} computer={8}>
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Segment>
        <Item>
          <Item.Content>
            <Item.Header
              className="ui header"
              content={repo.name}
            />
            <Item.Meta style={{ fontSize: 12, color: 'rgba(0,0,0,.4)' }}>
           updated on {new Date(repo.updated_at).toLocaleDateString()}
            </Item.Meta>
            <Item.Description
              style={{ margin: '10px 0' }}
              content={repo.description}
            />
            <Item.Extra>
              {
                repo.language
                &&
                <Label
                  icon="code"
                  content={repo.language}
                />
              }
              {
                repo.stargazers_count > 0
                &&
                <Label
                  icon="star"
                  content={repo.stargazers_count}
                />
              }
              {
                repo.forks_count > 0
                &&
                <Label
                  icon="fork"
                  content={repo.forks_count}
                />
              }
            </Item.Extra>
          </Item.Content>
        </Item>
      </Segment>
    </a>
  </Grid.Column>
);

ResultRow.propTypes = {
  repo: propTypes.shape({
    name: propTypes.string,
    description: propTypes.string,
  }).isRequired,
};

export default ResultRow;
