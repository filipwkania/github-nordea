import React from 'react';
import PropTypes from 'prop-types';

const UserInfoPanel = ({ userData }) => (
  <div className="user-info-panel">
      ResultList for {userData.name} from {userData.location}
  </div>
);

UserInfoPanel.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

export default UserInfoPanel;
