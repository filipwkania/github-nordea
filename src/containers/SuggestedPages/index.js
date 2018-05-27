import React from 'react';
import request from 'axios/index';
import v4 from 'uuid';
import { Tab, Grid } from 'semantic-ui-react';

import LoaderIndicator from '../../components/LoaderIndicator';

import formatSearchResults from '../../utils/formatSearchResults';
import ResultRow from '../../components/ResultRow';

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

  render() {
    const {
      starred, forked, followed, loadingStarred, loadingForked, loadingFollowed,
    } = this.state;
    const panes = [
      {
        menuItem: { key: v4(), icon: 'star', content: 'Most starred repos' },
        render: () => (
          <Tab.Pane className="fill-content">
            {
              loadingStarred ? <LoaderIndicator key={v4()} />
                : (
                  <Grid>
                    {
                      starred.map(repo => <ResultRow key={v4()} repo={repo} />)
                    }
                  </Grid>
                )
            }
          </Tab.Pane>),
      },
      {
        menuItem: { key: v4(), icon: 'fork', content: 'Most forked repos' },
        render: () => (
          <Tab.Pane className="fill-content">
            {
              loadingForked ? <LoaderIndicator key={v4()} />
                : forked.map(Item => <Item />)
            }
          </Tab.Pane>),
      },
      {
        menuItem: { key: v4(), icon: 'users', content: 'Most followed users' },
        render: () => (
          <Tab.Pane className="fill-content">
            {
              loadingFollowed ? <LoaderIndicator key={v4()} />
                : followed.map(Item => <Item />)
            }
          </Tab.Pane>),
      },
    ];
    return (
      <Tab
        className="fill-content"
        panes={panes}
      />
    );
  }
}

export default SuggestedPages;
