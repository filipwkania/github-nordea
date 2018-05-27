import React from 'react';
import { Header, Container, Item, Responsive, Dropdown, Icon, Button } from 'semantic-ui-react';

import SearchPanel from '../SearchPanel';


const HeaderPanel = () => (
  <Header className="app-header ui top fixed menu main center aligned">
    <Container>
      <Button
        basic
        size="small"
        style={{ borderRadius: 0, boxShadow: 'none' }}
        onClick={() => this.props.history.push('/')}
      >
        <Icon
          name="bars"
          style={{
            margin: 0,
            fontSize: 24,
            color: 'grey',
          }}
        />
      </Button>
      <SearchPanel />
      <Responsive as={Item} minWidth={768}>
        <Dropdown
          placeholder="Settings"
          options={[{ text: 'Not implemented yet :)', key: 'first_drop_item' }]}
        />
      </Responsive>
    </Container>
  </Header>
);

export default HeaderPanel;
