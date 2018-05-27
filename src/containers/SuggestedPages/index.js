import React from 'react';
import request from 'axios/index';
import v4 from 'uuid';
import { Grid, Container } from 'semantic-ui-react';

import ResultRow from '../../components/ResultRow';
import HomeInfoPanel from '../../components/InfoPage';

const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

const gitRequests = {
  mostStarred: `https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&per_page=10&access_token=${accessToken}`,
  mostForked: `https://api.github.com/search/repositories?q=forks%3A%3E0&sort=forks&per_page=10&access_token=${accessToken}`,
  mostFollowed: `https://api.github.com/search/users?q=followers%3A>0&type:org&sort=followers&per_page=10&access_token=${accessToken}`,
};

class SuggestedPages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starred: [],
      forked: [],
      followed: [],
      loadingStarred: true,
      loadingForked: true,
      loadingFollowed: true,
      activeItem: 'info',
    };
  }

  componentDidMount() {
    this.fetchContent();
  }

  fetchContent = () => {
    request.get(gitRequests.mostStarred)
      .then((res) => {
        if (res.statusText === 'OK') {
          this.setState({
            starred: res.data.items,
            loadingStarred: false,
          });
        }
      }).catch(() => {
        this.setState({
          starred: [],
          loadingStarred: false,
        });
      });
  };

  renderHomeItem = (name) => {
    switch (name) {
    case 'info':
      return <HomeInfoPanel />;
    case 'starred':
      return this.state.starred.map(repo => <ResultRow key={v4()} repo={repo} />);
    default:
      break;
    }
  };

  render() {
    const {
      starred, forked, followed, loadingStarred, loadingForked, loadingFollowed, activeItem,
    } = this.state;
    return (
      <Container className="fill-content">
        <Grid className="home-page-content fill-content">
          {
            this.renderHomeItem(activeItem)
          }
        </Grid>
      </Container>
    );
  }
}

export default SuggestedPages;
