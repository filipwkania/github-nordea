import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid';
import { Dropdown, Responsive } from 'semantic-ui-react';

const MobileMenu = ({ links }, context) => (
  <Responsive
    maxWidth={1023}
    as={Dropdown}
    item
    icon="bars"
    simple
    style={{ minWidth: 68 }}
  >
    <Dropdown.Menu direction="left">
      {
        links.map(({ icon, path, name }) =>
          (<Dropdown.Item
            key={v4()}
            icon={icon}
            content={name}
            onClick={() => context.router.history.push(path)}
          />))
      }
    </Dropdown.Menu>
  </Responsive>
);

MobileMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

MobileMenu.contextTypes = {
  router: PropTypes.object,
};

export default MobileMenu;
