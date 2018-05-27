import React from 'react';
import PropTypes from 'prop-types';
import v4 from 'uuid';
import { Menu, Responsive, Dropdown, Item } from 'semantic-ui-react';

const WebMenu = ({ links, searchHistory }, context) => {
  const options = searchHistory ? searchHistory.map((item) => {
    item.onClick = () => context.router.history.push(`/${item.value}`);
    return item;
  }) : {};

  return (
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
      <Item>
        <Dropdown
          placeholder="Recent searches..."
          selection
          options={options}
          selectOnNavigation={false}
          disabled={searchHistory && searchHistory.length === 0}
        />
      </Item>
    </Responsive>
  );
};
WebMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    path: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  searchHistory: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
    image: PropTypes.string,
  })),
};

WebMenu.contextTypes = {
  router: PropTypes.object,
};

export default WebMenu;
