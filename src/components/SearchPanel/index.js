import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import request from 'axios/index';
import { Search, Dropdown, Item, Image, Container, Popup, Responsive } from 'semantic-ui-react';
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

  onSelect = value => this.props.history.push(`/${value}`);

  formatSearchResults = data => data.map(item => ({
    title: item.login,
    image: item.avatar_url,
  }));

  fetchSuggestions = debounce(() => {
    this.setState({ isLoading: true }, () => {
      request.get(`https://api.github.com/search/users?q=${this.state.searchPhrase}&access_token=${accessToken}`)
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
  }, 400);

  render() {
    const {
      searchPhrase, searchResults, isLoading,
    } = this.state;

    return (
      <Container>
        <Responsive minWidth={768}>
          <Popup
            trigger={
              <Item data-content="">
                <a
                  href="https://www.linkedin.com/in/filip-kania-876a5095/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image avatar src="https://avatars1.githubusercontent.com/u/1859589?s=100&u=2d4be0f7b0207dcd0c9f5f17ed20a1027c9e27e5&v=4" />
                </a>
              </Item>
            }
            content="Visit my LinkedIn"
          />
        </Responsive>
        <Search
          className="search-panel-input item"
          value={searchPhrase}
          results={searchResults}
          loading={isLoading}
          showNoResults={searchResults.length === 0}
          onSearchChange={({ target: { value } }) => this.onChange(value)}
          onResultSelect={(e, { result: { title } }) => this.onSelect(title)}
          style={{ flexGrow: 1 }}
          placeholder="Type github username..."
        />
        <Responsive as={Item} minWidth={768}>
          <Dropdown
            placeholder="Recent queries"
            options={[{ text: 'Not implemented yet :)' }]}
          />
        </Responsive>
      </Container>
    );
  }
}

SearchPanel.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(SearchPanel);
