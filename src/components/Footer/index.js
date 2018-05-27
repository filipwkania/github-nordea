import React from 'react';

import { Item, Button } from 'semantic-ui-react';

const Footer = () => (
  <footer
    className="app-footer ui vertical footer inverted"

  >
    <a
      href="https://www.linkedin.com/in/filip-kania-876a5095/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        content="LinkedIn"
        color="linkedin"
        icon="linkedin"
        size="tiny"
      />
    </a>
    <Item
      style={{
        textAlign: 'center',
        margin: '0 15px',
      }}
    >
      <Item.Content verticalAlign="middle">
              &copy; Filip Kania 2018
      </Item.Content>
    </Item>
    <a
      href="https://github.com/filipwkania"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        content="GitHub"
        color="grey"
        icon="github"
        size="tiny"
      />
    </a>
  </footer>
);

export default Footer;
