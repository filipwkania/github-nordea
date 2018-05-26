import React from 'react';
import debounce from 'lodash.debounce';
import request from 'axios/index';

import { Search } from 'semantic-ui-react';

const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchPhrase: '',
      suggestions: [],
      isLoading: false,
    };
  }

  onChange = (value) => {
    this.setState({ searchPhrase: value }, () => {
      this.fetchSuggestions();
    });
  };

  formatSearchResults = data => data.map(item => ({
    title: item.login,
    image: item.avatar_url,
  }));

  fetchSuggestions = debounce(() => {
    this.setState({ isLoading: true }, () => {
      request.get(`https://api.github.com/search/users?q=${this.state.searchPhrase}&page=1&per_page=5&access_token=${accessToken}`)
        .then((res) => {
          if (res.statusText === 'OK') {
            this.setState({
              suggestions: this.formatSearchResults(res.data.items),
              isLoading: false,
            });
          }
        }).catch(() => {
          this.setState({
            suggestions: [],
            isLoading: false,
          });
        });
    });
  }, 300);

  render() {
    const { searchPhrase, suggestions, isLoading } = this.state;
    return (
      <Search
        value={searchPhrase}
        results={suggestions}
        loading={isLoading}
        showNoResults={suggestions.length === 0}
        onSearchChange={({ target: { value } }) => this.onChange(value)}
      />
    );
  }
}

export default SearchPanel;
