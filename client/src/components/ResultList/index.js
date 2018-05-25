import React from 'react';
import PropTypes from 'prop-types';
import request from 'axios';

import { Alert } from 'reactstrap';

import ResultRow from '../ResultRow';

const githubApi = 'https://api.github.com/';

class ResultList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      perPage: 20,
      reposList: [],
    };
  }

  componentDidMount() {
    const { page, perPage } = this.state;
    const { name } = this.props.match.params;

    if (name) {
      request.get(`${githubApi}users/${name}?page=${page}&per_page=${perPage}`)
          .then((res) => {
            if (res.statusText === 'OK') {
              console.log(res);
            }
          });
    }
  }

  render() {
    console.log(this.props.match.params);
    return (
      <div className="result-list">
        <Alert color="secondary">
        ResultList
      </Alert>
        {
          this.state.reposList.map(repo => <ResultRow details={repo} />)
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
  }),
};

export default ResultList;
