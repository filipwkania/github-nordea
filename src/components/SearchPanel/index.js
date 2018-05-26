import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import request from 'axios/index';
import { Search } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchPhrase: '',
      searchResults: [],
      isLoading: false,
    };
  }

  onChange = (value) => {
    this.setState({ searchPhrase: value }, () => {
      this.fetchSuggestions();
    });
  };

  onSelect = (value) => {
    console.log(value);
    this.props.history.push(`/${value}`);
  }

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
              searchResults: this.formatSearchResults(res.data.items),
              isLoading: false,
            });
          }
        }).catch(() => {
          this.setState({
            searchResults: [],
            isLoading: false,
          });
        });
    });
  }, 350);

  render() {
    const {
      searchPhrase, searchResults, isLoading,
    } = this.state;

    return (
      <Search
        value={searchPhrase}
        results={searchResults}
        loading={isLoading}
        showNoResults={searchResults.length === 0}
        onSearchChange={({ target: { value } }) => this.onChange(value)}
        onResultSelect={(e, { result: { title } }) => this.onSelect(title)}
      />
    );
  }
}

SearchPanel.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(SearchPanel);
