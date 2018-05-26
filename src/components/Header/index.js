import React from 'react';

import SearchPanel from '../SearchPanel';

import './styles.scss';

class Header extends React.Component {
  fetchRepos = (username) => {
    if (username.length > 0) {
      console.log(username);
    }
  };

  render() {
    return (
      <header className="app-header">
        <SearchPanel />
      </header>
    );
  }
}

export default Header;
