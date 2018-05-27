import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import request from 'axios/index';
import { withRouter } from 'react-router-dom';
import { Search } from 'semantic-ui-react';

import formatSearchResults from '../../utils/formatSearchResults';

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

  onSelect = ({ title, image }) => {
    this.addSearchToStorage(title, image);
    this.props.history.push(`/${title}`);
  };

  addSearchToStorage = (login) => {
    if (window) {
      let data = sessionStorage.getItem('githubSearchHistory');
      if (data) {
        data = JSON.parse(data).filter(item => item.text !== login);
        data = [{
          key: login, text: login, value: login,
        }, ...data];
        if (data.length > 10) {
          data.pop();
        }
      } else {
        data = [{
          key: login, text: login, value: login,
        }];
      }
      sessionStorage.setItem('githubSearchHistory', JSON.stringify(data));
      this.props.updateHistory();
    }
  };

  fetchSuggestions = debounce(() => {
    this.setState({ isLoading: true }, () => {
      request.get(`https://api.github.com/search/users?q=${this.state.searchPhrase}&access_token=${accessToken}`)
        .then((res) => {
          if (res.statusText === 'OK') {
            this.setState({
              searchResults: formatSearchResults(res.data.items, 'user'),
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
  }, 400);

  render() {
    const {
      searchPhrase, searchResults, isLoading,
    } = this.state;

    return (
      <Search
        className="search-panel-input item"
        value={searchPhrase}
        results={searchResults}
        loading={isLoading}
        showNoResults={searchResults.length === 0}
        onSearchChange={({ target: { value } }) => this.onChange(value)}
        onResultSelect={(e, { result }) => this.onSelect(result)}
        style={{ flexGrow: 1 }}
        placeholder="Type github username..."
      />
    );
  }
}

SearchPanel.propTypes = {
  updateHistory: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(SearchPanel);
