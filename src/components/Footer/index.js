import React from 'react';

import { Segment, Item } from 'semantic-ui-react';

const Footer = () => (
  <footer className="app-footer ui vertical footer">
    <Segment className="inverted">
      <Item
        content="&copy; Filip Kania 2018"
        style={{
          padding: '30px 0',
          textAlign: 'center',
        }}
      />
    </Segment>
  </footer>
);

export default Footer;
