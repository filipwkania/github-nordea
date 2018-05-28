import React from 'react';
import PropTypes from 'prop-types';

import { Card, Image, Icon, Popup } from 'semantic-ui-react';

const UserInfoPanel = ({ userData }) => (
  <Card className="user-info-panel">
    <Card>
      <Popup
        content="Visit this user on GitHub!"
        trigger={
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={userData.avatar_url} />
          </a>}
      />
      <Card.Content>
        <Card.Header>{userData.name || userData.login}</Card.Header>
        <Card.Meta>Joined {new Date(userData.created_at).toLocaleDateString()}</Card.Meta>
        {
          userData.bio && userData.bio.length > 0
          &&
          <Card.Description>
            {userData.bio}
          </Card.Description>
        }
      </Card.Content>
      <Card.Content extra>
        <Icon name="github" />
        {userData.public_repos} public repos
      </Card.Content>
    </Card>
  </Card>
);

UserInfoPanel.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    avatar_url: PropTypes.string,
  }).isRequired,
};

export default UserInfoPanel;
