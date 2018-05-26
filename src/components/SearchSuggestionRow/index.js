import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const SearchSuggestionRow = ({ suggestion: { login, avatar_url }, fetchRepos, selected }) => (
  <div
    className="search-suggestion"
    onClick={() => fetchRepos(login)}
    id={`dropdown_${login}`}
    style={{ background: selected ? '#cce5ff' : '' }}
  >
    <img src={avatar_url} alt={`avatar_of_${login}`} /> <span>{login}</span>
  </div>
);

SearchSuggestionRow.propTypes = {
  suggestion: PropTypes.shape({
    username: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
  selected: PropTypes.bool,
  fetchRepos: PropTypes.func,
};

export default SearchSuggestionRow;
