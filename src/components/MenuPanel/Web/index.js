import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid';
import { Menu, Responsive } from 'semantic-ui-react';

const WebMenu = ({ links }, context) => (
  <Responsive
    minWidth={1024}
    as={Menu}
    style={{
      border: 'none',
      boxShadow: 'none',
    }}
  >
    {
      links.map(({ icon, path, name }) => (
        <Menu.Item
          key={v4()}
          icon={icon}
          content={name}
          onClick={() => context.router.history.push(path)}
        />))
    }
  </Responsive>
);

WebMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

WebMenu.contextTypes = {
  router: PropTypes.object,
};

export default WebMenu;
