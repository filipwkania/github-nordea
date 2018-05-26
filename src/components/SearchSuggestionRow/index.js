import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';

import './styles.css';

const SearchSuggestionRow = ({ suggestion: { login, avatar_url }, fetchRepos, selected }) => (
  <DropdownItem
    className="search-suggestion"
    onClick={() => fetchRepos(login)}
    id={`dropdown_${login}`}
    style={{ background: selected ? '#cce5ff' : '' }}
  >
    <img src={avatar_url} alt={`avatar_of_${login}`} /> <span>{login}</span>
  </DropdownItem>
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
