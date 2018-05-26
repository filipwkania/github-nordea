import React from 'react';
import PropTypes from 'prop-types';

import { Card, Image, Icon } from 'semantic-ui-react';

const UserInfoPanel = ({ userData }) => (
  <Card className="user-info-panel">
    <Card>
      <Image src={userData.avatar_url} />
      <Card.Content>
        <Card.Header>{userData.name}</Card.Header>
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
        <a>
          <Icon name="github" />
          {userData.public_repos} public repos
        </a>
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
