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
];

class HeaderPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchHistory: [],
    };
  }

  componentDidMount() {
    this.getSearchHistory();
  }

  getSearchHistory = () => {
    if (window) {
      const searchHistory = JSON.parse(sessionStorage.getItem('githubSearchHistory')) || [];
      this.setState({ searchHistory });
    }
  };

  render() {
    return (
      <Header className="app-header ui top menu fixed center aligned">
        <Container>
          <MobileMenu links={links} />
          <SearchPanel updateHistory={this.getSearchHistory} />
          <WebMenu links={links} searchHistory={this.state.searchHistory} />
        </Container>
      </Header>
    );
  }
}

export default HeaderPanel;
