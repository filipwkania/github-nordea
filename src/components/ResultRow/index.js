import React from 'react';
import propTypes from 'prop-types';
import Timeago from 'react-timeago';
import CopyToClip from 'react-copy-to-clipboard';
import { Grid, Item, Label, Segment, Popup, Icon } from 'semantic-ui-react';

const ResultRow = ({ repo }) => (
  <Grid.Column mobile={16} computer={8}>
    <Segment
      style={{ height: '100%' }}
      className="result-item"
    >
      <Item style={{ height: '100%' }}>
        <Item.Content
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Item.Header
            className="ui header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{repo.name}</span>
            <div style={{
              minWidth: 80,
              marginLeft: 5,
            }}
            >
              <Popup
                content="Git clone link"
                size="small"
                trigger={
                  <CopyToClip text={repo.clone_url}>
                    <Icon
                      color="grey"
                      name="clipboard"
                      style={{
                        fontSize: '0.9em',
                        cursor: 'pointer',
                        marginRight: '0.75rem',
                      }}
                    />
                  </CopyToClip>
                }
              />
              <Popup
                content="Download as ZIP"
                size="small"
                trigger={
                  <a
                    href={`${repo.svn_url}/archive/master.zip`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon
                      color="grey"
                      name="download"
                      style={{
                        fontSize: '0.9em',
                      }}
                    />
                  </a>}
              />
              <Popup
                content="Open on GitHub"
                size="small"
                trigger={
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon
                      color="grey"
                      name="external"
                      style={{
                        fontSize: '0.9em',
                        margin: 0,
                      }}
                    />
                  </a>}
              />
            </div>
          </Item.Header>
          <Item.Meta style={{ fontSize: 12, color: 'rgba(0,0,0,.4)' }}>
                last updated {<Timeago date={repo.updated_at} />}
          </Item.Meta>
          <Item.Description
            style={{
              margin: '10px 0',
              flexGrow: 1,
            }}
            content={repo.description || 'No description provided.'}
          />
          <Item.Extra>
            {
              repo.language
                &&
                <Popup
                  content="Top language"
                  size="small"
                  trigger={
                    <Label
                      icon="code"
                      content={repo.language}
                    />}
                />
            }
            {
              repo.stargazers_count > 0
                &&
                <Popup
                  content="Stars"
                  size="small"
                  trigger={
                    <Label
                      icon="star"
                      content={repo.stargazers_count}
                    />}
                />
            }
            {
              repo.forks_count > 0
            &&
            <Popup
              content="Forks"
              size="small"
              trigger={
                <Label
                  icon="fork"
                  content={repo.forks_count}
                />}
            />
            }
          </Item.Extra>
        </Item.Content>
      </Item>
    </Segment>
  </Grid.Column>
);

ResultRow.propTypes = {
  repo: propTypes.shape({
    name: propTypes.string,
    description: propTypes.string,
  }).isRequired,
};

export default ResultRow;
