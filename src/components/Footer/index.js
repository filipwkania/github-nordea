import React from 'react';

import { Item } from 'semantic-ui-react';

const Footer = () => (
  <footer className="app-footer ui vertical footer">
    <Item
      content="&copy; Filip Kania 2018"
      style={{
        padding: '15px 0',
        textAlign: 'center',
      }}
    />
  </footer>
);

export default Footer;
