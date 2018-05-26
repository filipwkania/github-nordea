const defaultState = require('./defaultState');

const searchPanelReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'SET_SEARCH_RESULT':
    return Object.assign({}, { ...state }, { searchResults: action.searchResults });
  case 'GET_SEARCH_RESULT':
    return Object.assign({}, { ...state });
  default:
    return state;
  }
};

module.exports = searchPanelReducer;
