import React from 'react';
import request from 'axios';
import debounce from 'lodash.debounce';
import { Alert, Input, InputGroup, InputGroupAddon, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import SearchSuggestionRow from '../SearchSuggestionRow';

import './styles.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchPhrase: '',
      suggestions: [],
      suggestionsOpen: false,
      selectedIndex: 0,
    };
  }

  onChange = (searchPhrase) => {
    this.setState({ searchPhrase }, () => {
      this.fetchSuggestions();
    });
  };

  handleKeyDown = (event) => {
    const { searchPhrase, suggestions, selectedIndex } = this.state;
    switch (event.key) {
    case 'Enter':
      if (selectedIndex > 0) {
        this.fetchRepos(suggestions[selectedIndex - 1]);
      } else {
        this.fetchRepos(searchPhrase);
      }
      break;
    case 'ArrowDown':
      if (suggestions.length > 0 && selectedIndex < suggestions.length) {
        event.preventDefault();
        this.setState({ selectedIndex: selectedIndex + 1 });
      }
      break;
    case 'ArrowUp':
      if (selectedIndex > 0) {
        event.preventDefault();
        this.setState({ selectedIndex: selectedIndex - 1 });
      }
      break;
    case 'Escape':
      if (selectedIndex > 0) {
        this.setState({ selectedIndex: 0 });
      }
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

  toggle = () => {
    if (this.state.suggestionsOpen) {
      this.setState({ suggestionsOpen: false });
    } else if (this.state.suggestions.length > 0) {
      this.setState({ suggestionsOpen: true });
    }
  };

  render() {
    return (
      <header className="app-header">
        <Alert color="primary">
          <Dropdown isOpen={this.state.suggestionsOpen} toggle={this.toggle}>
            <DropdownToggle className="search-dropdown">
              <InputGroup>
                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                <Input
                  id="searchInput"
                  placeholder="username"
                  defaultValue={this.state.searchPhrase}
                  onChange={({ target: { value } }) => this.onChange(value)}
                  onKeyDown={event => this.handleKeyDown(event)}
                />
              </InputGroup>
            </DropdownToggle>
            <DropdownMenu>
              {
                this.state.suggestions.map((item, index) => (
                  <SearchSuggestionRow
                    key={item.id}
                    suggestion={item}
                    fetchRepos={this.fetchRepos}
                    selected={index === this.state.selectedIndex - 1}
                  />
                ))
              }
            </DropdownMenu>
          </Dropdown>
        </Alert>
      </header>
    );
  }
}

export default Header;
