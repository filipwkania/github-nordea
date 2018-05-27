import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import request from 'axios';

import { Pagination, Grid, Sticky, Divider } from 'semantic-ui-react';

import ResultRow from '../../components/ResultRow/index';
import UserInfoPanel from '../../components/UserInfoPanel';

const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

class ResultList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      perPage: 20,
      reposList: [],
      userData: false,
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
      this.fetchResults(name);
    }
  }

  changePage = data => this.setState(
    { page: data.activePage },
    () => this.fetchResults(this.state.userData.login),
  );

  fetchResults = (name) => {
    const { page, perPage } = this.state;
    request.get(`https://api.github.com/users/${name}?access_token=${accessToken}`)
      .then((userRes) => {
        if (userRes.statusText === 'OK' && userRes.data.public_repos > 0) {
          request.get(`https://api.github.com/users/${name}/repos?page=${page}&per_page=${perPage}&access_token=${accessToken}`)
            .then((reposRes) => {
              if (reposRes.statusText === 'OK') {
                this.setState({ reposList: reposRes.data, userData: userRes.data });
              }
            });
          this.setState({ reposList: [], userData: userRes.data });
        }
      });
  };

  render() {
    const { reposList, userData, perPage } = this.state;
    return (
      <div
        className="result-list container-fluid"
        ref={resultList => this.resultList = resultList}
      >
        {
          this.state.userData
          &&
          <Fragment>
            <Grid
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
                  offset={75}
                >
                  <UserInfoPanel userData={userData} />
                </Sticky>
              </Grid.Column>
              <Grid.Column
                mobile={16}
                tablet={8}
                computer={12}
              >
                <Grid>
                  {
                    reposList.map(repo =>
                      (<ResultRow
                        key={`result_row_${repo.id}`}
                        repo={repo}
                      />))
                  }
                </Grid>
              </Grid.Column>
              <Grid.Column className="center aligned" mobile={16}>
                <Divider section />
                <Pagination
                  siblingRange={0}
                  boundaryRange={1}
                  onPageChange={(e, data) => this.changePage(data)}
                  totalPages={userData.public_repos / perPage}
                  activePage={this.state.page}
                  firstItem={null}
                  lastItem={null}
                />
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
    }),
  }).isRequired,
};

export default ResultList;
