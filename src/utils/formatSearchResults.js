const formatSearchResults = (data, type) => {
  switch (type) {
  case 'user':
    return data.map(item => ({
      title: item.login,
      image: item.avatar_url,
    }));
  default:
    return data;
  }
};

export default formatSearchResults;
