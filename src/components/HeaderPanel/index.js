import React from 'react';
import { Header, Container } from 'semantic-ui-react';

import SearchPanel from '../SearchPanel';
import WebMenu from '../MenuPanel/Web';
import MobileMenu from '../MenuPanel/Mobile';

const links = [
  {
    name: 'Home',
    icon: 'home',
    path: '/',
  }, {
    name: 'Most starred',
    icon: 'star',
    path: '/starred',
  },
  {
    name: 'Most forked',
    icon: 'fork',
    path: '/forked',
  },
  {
    name: 'Most followed',
    icon: 'users',
    path: '/followed',
  },
];

const HeaderPanel = () => (
  <Header className="app-header ui top menu fixed center aligned">
    <Container>
      <MobileMenu links={links} />
      <SearchPanel />
      <WebMenu links={links} />
    </Container>
  </Header>
);

export default HeaderPanel;
