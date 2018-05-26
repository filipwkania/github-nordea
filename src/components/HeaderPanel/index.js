import React from 'react';
import { Header } from 'semantic-ui-react';

import SearchPanel from '../SearchPanel';


const HeaderPanel = () => (
  <Header className="app-header ui top fixed menu main center aligned">
    <SearchPanel />
  </Header>
);

export default HeaderPanel;
