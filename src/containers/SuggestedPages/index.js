import React from 'react';
import PropTypes from 'prop-types';
import request from 'axios/index';
import v4 from 'uuid';
import { Grid, Container, Segment } from 'semantic-ui-react';

import ResultRow from '../../components/ResultRow';
import InfoPanel from '../../components/InfoPage';
import LoaderIndicator from '../../components/LoaderIndicator';

const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

const gitRequests = {
  starred: `https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&access_token=${accessToken}`,
  forked: `https://api.github.com/search/repositories?q=forks%3A%3E0&sort=forks&access_token=${accessToken}`,
  followed: `https://api.github.com/search/users?q=followers%3A>0&type:org&sort=followers&access_token=${accessToken}`,
};

class SuggestedPages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      perPage: 20,
      page: 1,
      starred: [],
      forked: [],
      loading: {
        starred: true,
        forked: true,
      },
      loadingMore: false,
      activeItem: this.props.name || 'info',
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

    if (name && this.props.name !== name) {
      if (this.state[name].length === 0) {
        document.removeEventListener('scroll', this.trackScrolling);
        this.fetchContent(name);
      } else {
        if (window) {
          window.scrollTo(0, 0);
        }
        document.addEventListener('scroll', this.trackScrolling);
        this.setState({ activeItem: name });
      }
    } else {
      document.removeEventListener('scroll', this.trackScrolling);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  fetchContent = (name) => {
    request.get(`${gitRequests[name]}&per_page=${this.state.perPage}&page=${this.state.page}`)
      .then((res) => {
        if (res.statusText === 'OK') {
          this.setState({
            [name]: [...this.state[name], ...res.data.items],
            loading: { ...this.state.loading, [name]: false },
            loadingMore: false,
            activeItem: name,
          });
          document.addEventListener('scroll', this.trackScrolling);
        }
      }).catch(() => {
        this.setState({
          [name]: [...this.state[name]],
          loading: { ...this.state.loading, [name]: false },
          loadingMore: false,
          activeItem: name,
        });
      });
  };

  trackScrolling = () => {
    const wrappedElement = document.getElementById('results');
    if (this.isBottom(wrappedElement)) {
      document.removeEventListener('scroll', this.trackScrolling);
      this.setState({ page: this.state.page + 1, loadingMore: true }, () => {
        this.fetchContent(this.state.activeItem);
      });
    }
  };

  isBottom = el => el.getBoundingClientRect().bottom <= window.innerHeight;

  renderItem = (name) => {
    const { starred, forked } = this.state;

    switch (name) {
    case 'starred':
      return starred.map(repo => <ResultRow key={v4()} repo={repo} />);
    case 'forked':
      return forked.map(repo => <ResultRow key={v4()} repo={repo} />);
    default:
      return <InfoPanel />;
    }
  };

  render() {
    return (
      <Container className="fill-content">
        <Grid
          className="home-page-content fill-content"
          id="results"
          style={{ overflow: 'hidden' }}
        >
          {
            this.state.loading[this.props.name] ?
              <LoaderIndicator />
              : this.renderItem(this.props.name)
          }
        </Grid>
        {
          this.state.loadingMore
            &&
            <Segment style={{ minHeight: 100 }}>
              <LoaderIndicator />
            </Segment>
        }
      </Container>
    );
  }
}

SuggestedPages.propTypes = {
  name: PropTypes.string,
};

export default SuggestedPages;
