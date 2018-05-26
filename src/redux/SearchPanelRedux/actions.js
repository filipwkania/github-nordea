const setSearchResult = resultList => ({ type: 'SET_SEARCH_RESULT', resultList });
const getSearchResult = () => ({ type: 'GET_SEARCH_RESULT' });

export default { setSearchResult, getSearchResult };
