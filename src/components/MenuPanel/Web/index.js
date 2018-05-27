import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Responsive } from 'semantic-ui-react';

const WebMenu = (props, context) => (
  <Responsive
    minWidth={1024}
    as={Menu}
    style={{
      border: 'none',
      boxShadow: 'none',
    }}
  >
    {
      props.links.map(({ icon, path, name }) => (
        <Menu.Item
          icon={icon}
          content={name}
          onClick={() => context.router.history.push(path)}
        />))
    }
  </Responsive>
);

WebMenu.propTypes = {
  links: PropTypes.shape({
    icon: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

WebMenu.contextTypes = {
  router: PropTypes.object,
};

export default WebMenu;
