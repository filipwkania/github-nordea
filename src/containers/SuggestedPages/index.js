import React from 'react';
import PropTypes from 'prop-types';
import request from 'axios/index';
import v4 from 'uuid';
import { Grid, Container } from 'semantic-ui-react';

import ResultRow from '../../components/ResultRow';
import InfoPanel from '../../components/InfoPage';
import LoaderIndicator from '../../components/LoaderIndicator';

const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

const gitRequests = {
  starred: `https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&per_page=10&access_token=${accessToken}`,
  forked: `https://api.github.com/search/repositories?q=forks%3A%3E0&sort=forks&per_page=10&access_token=${accessToken}`,
  followed: `https://api.github.com/search/users?q=followers%3A>0&type:org&sort=followers&per_page=10&access_token=${accessToken}`,
};

class SuggestedPages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starred: [],
      forked: [],
      followed: [],
      loading: {
        starred: true,
        forked: true,
        followed: true,
      },
      activeItem: 'info',
    };
  }

  componentDidMount() {
    const { name } = this.props;

    if (name) {
      this.fetchContent(name);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { name } = nextProps;
    console.log(name);
    if (name && this.props.name !== name && this.state[name].length === 0) {
      this.fetchContent(name);
    }
  }

  fetchContent = (name) => {
    request.get(gitRequests[name])
      .then((res) => {
        if (res.statusText === 'OK') {
          this.setState({
            [name]: res.data.items,
            loading: { ...this.state.loading, [name]: false },
          });
        }
      }).catch(() => {
        this.setState({
          [name]: [],
          loading: { ...this.state.loading, [name]: false },
        });
      });
  };

  renderItem = (name) => {
    const {
      starred, forked, followed,
    } = this.state;

    switch (name) {
    case 'starred':
      return starred.map(repo => <ResultRow key={v4()} repo={repo} />);
    case 'forked':
      return forked.map(repo => <ResultRow key={v4()} repo={repo} />);
    // case 'followed':
    //   return followed.map(repo => <ResultRow key={v4()} repo={repo} />);
    default:
      return <InfoPanel />;
    }
  };

  render() {
    return (
      <Container className="fill-content">
        <Grid className="home-page-content fill-content">
          {
            this.state.loading[this.props.name] ?
              <LoaderIndicator />
              : this.renderItem(this.props.name)
          }
        </Grid>
      </Container>
    );
  }
}

SuggestedPages.propTypes = {
  name: PropTypes.string,
};

export default SuggestedPages;
