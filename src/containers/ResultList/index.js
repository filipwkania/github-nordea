import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import request from 'axios';

import { Pagination, Grid, Sticky, Divider, Item, Dropdown, Segment, Icon } from 'semantic-ui-react';

import ResultRow from '../../components/ResultRow/index';
import UserInfoPanel from '../../components/UserInfoPanel';
import LoadingIndicator from '../../components/LoaderIndicator';
import PageNotFound from '../../components/PageNotFound';

class ResultList extends React.Component {
  constructor(props) {
    super(props);

    let { page } = this.props.match.params;
    page = (page && !isNaN(+page)) ? +page : 1;

    this.accessToken = process.env.REACT_APP_GITHUB_TOKEN;

    this.sortByOptions = {
      created: {
        text: 'Last created',
        value: '&sort=created',
      },
      updated: {
        text: 'Last updated',
        value: '&sort=updated',
      },
      default: {
        text: 'Default',
        value: '',
      },
    };

    this.state = {
      page,
      perPage: 20,
      reposList: [],
      userData: false,
      loading: true,
      jumpToOptions: [],
      sortBy: '',
    };
  }


  componentDidMount() {
    const { name } = this.props.match.params;

    if (name) {
      this.fetchResults(name);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { name } = nextProps.match.params;

    if (name && this.props.match.params.name !== name) {
      this.setState({ page: 1 }, () => {
        this.fetchResults(name);
      });
    }
  }

  changePage = (page) => {
    if (page !== this.state.page) {
      this.setState(
        { page },
        () => {
          this.fetchResults(this.state.userData.login);
          this.context.router.history.push(`/${this.props.match.params.name}/${page}`);
        },
      );
    }
  };

  changeSortMethod = (sortBy) => {
    if (sortBy !== this.state.sortBy) {
      this.setState(
        { sortBy },
        () => {
          this.fetchResults(this.state.userData.login);
        },
      );
    }
  };

  fetchResults = (name) => {
    const { page, perPage } = this.state;

    this.setState({ loading: true }, () => {
      request.get(`https://api.github.com/users/${name}?access_token=${this.accessToken}`)
        .then((userRes) => {
          if (userRes.statusText === 'OK' && userRes.data.public_repos > 0) {
            request.get(`https://api.github.com/users/${name}/repos?access_token=${this.accessToken}&page=${page}&per_page=${perPage}${this.state.sortBy}`)
              .then((reposRes) => {
                if (reposRes.statusText === 'OK') {
                  const jumpToOptions = [];
                  const totalPages = Math.ceil(userRes.data.public_repos / perPage);
                  if (totalPages > 5) {
                    for (let i = 1; i <= totalPages; i++) {
                      jumpToOptions.push({
                        text: i,
                        value: i,
                      });
                    }
                  }
                  this.setState({
                    reposList: reposRes.data, userData: userRes.data, loading: false, jumpToOptions,
                  });
                } else {
                  this.setState({ reposList: [], userData: userRes.data, loading: false });
                }
              });
          } else {
            this.setState({ reposList: [], userData: userRes.data, loading: false });
          }
        }).catch(() => {
          this.context.router.history.push('/404');
        });
    });
  };

  render() {
    const {
      reposList, userData, perPage, jumpToOptions, page,
    } = this.state;

    return (
      <div
        className="result-list container-fluid fill-content"
        ref={resultList => this.resultList = resultList}
      >
        {
          userData
          &&
          <Fragment>
            <Grid
              className="fill-content"
              centered
              columns={3}
            >
              <Grid.Column
                mobile={16}
                tablet={8}
                computer={4}
              >
                <Sticky
                  context={this.resultList}
                  className="result-profile-sticky"
                  offset={90}
                >
                  <UserInfoPanel userData={userData} />
                  <Segment>
                    <Icon name="options" /> <span>Settings</span>
                    <Item style={{ marginTop: '1em' }}>
                      <Dropdown
                        placeholder="Sort method"
                        selection
                        onChange={(e, { value }) => this.changeSortMethod(value)}
                        options={this.sortByOptions}
                      />
                    </Item>
                  </Segment>
                </Sticky>
              </Grid.Column>
              <Grid.Column
                className="fill-content"
                mobile={16}
                tablet={8}
                computer={12}
              >
                {
                  this.state.loading ? <LoadingIndicator />
                    : (
                      <Grid>
                        {
                          reposList.map(repo =>
                            (<ResultRow
                              key={`result_row_${repo.id}`}
                              repo={repo}
                            />))
                        }
                      </Grid>)
                }
                {
                  userData.public_repos === 0
                  &&
                  <PageNotFound
                    message="This user has no public repos!"
                    style={{ marginTop: '2em' }}
                  />
                }
              </Grid.Column>
              <Grid.Column className="center aligned" mobile={16}>
                <Divider section />
                {
                  userData.public_repos > perPage
                  &&
                    <Pagination
                      siblingRange={0}
                      boundaryRange={1}
                      onPageChange={(e, { activePage }) => this.changePage(activePage)}
                      totalPages={Math.ceil(userData.public_repos / perPage)}
                      activePage={page}
                      firstItem={null}
                      lastItem={null}
                    />
                }
                {
                  userData.public_repos / perPage > 5
                  &&
                  <Item style={{ marginTop: '1em' }}>
                    <span>Jump to page: </span>
                    <Dropdown
                      upward
                      placeholder="1"
                      compact
                      selection
                      defaultValue={page}
                      onChange={(e, { value }) => this.changePage(value)}
                      options={jumpToOptions}
                    />
                  </Item>
                }
              </Grid.Column>
            </Grid>
          </Fragment>
        }
      </div>
    );
  }
}

ResultList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      page: PropTypes.string,
    }),
  }).isRequired,
};

ResultList.contextTypes = {
  router: PropTypes.object,
};

export default ResultList;
