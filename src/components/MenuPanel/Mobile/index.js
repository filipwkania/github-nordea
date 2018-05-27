import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Dropdown, Responsive } from 'semantic-ui-react';

const MobileMenu = (props, context) => (
  <Responsive
    maxWidth={1023}
    as={Dropdown}
    item
    icon="bars"
    simple
  >
    <Dropdown.Menu>
      {
        props.links.map(({ icon, path, name }) =>
          (<Dropdown.Item
            icon={icon}
            content={name}
            onClick={() => context.router.history.push(path)}
          />))
      }
    </Dropdown.Menu>
  </Responsive>
);

MobileMenu.propTypes = {
  links: PropTypes.shape({
    icon: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

MobileMenu.contextTypes = {
  router: PropTypes.object,
};

export default withRouter(MobileMenu);
