import React from 'react';
import request from 'axios';
import debounce from 'lodash.debounce';

import SearchSuggestionRow from '../SearchSuggestionRow';

import './styles.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchPhrase: '',
      suggestions: [],
    };
  }

  onChange = (searchPhrase) => {
    this.setState({ searchPhrase }, () => {
      this.fetchSuggestions();
    });
  };

  handleKeyDown = (event) => {
    const { searchPhrase } = this.state;
    switch (event.key) {
    case 'Enter':
      this.fetchRepos(searchPhrase);
      break;
    default:
      break;
    }
  };

  fetchSuggestions = debounce(() => {
    request.get(`https://api.github.com/search/users?q=${this.state.searchPhrase}&page=1&per_page=5`)
      .then((res) => {
        if (res.statusText === 'OK') {
          this.setState({
            suggestions: res.data.items,
            suggestionsOpen: true,
          });
        }
      }).catch(() => {
        this.setState({ suggestions: [] });
      });
  }, 300);

  fetchRepos = (username) => {
    if (username.length > 0) {
      console.log(username);
    }
  };


  render() {
    return (
      <header className="app-header" />
    );
  }
}

export default Header;
