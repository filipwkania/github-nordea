import React from 'react';
import PropTypes from 'prop-types';
import request from 'axios';

import ResultRow from '../../components/ResultRow/index';

import './styles.scss';

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

  fetchResults = (name) => {
    const { page, perPage } = this.state;
    request.get(`https://api.github.com/users/${name}`)
      .then((userRes) => {
        if (userRes.statusText === 'OK' && userRes.data.public_repos > 0) {
          request.get(`https://api.github.com/users/${name}/repos?page=${page}&per_page=${perPage}`)
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
    const { reposList, userData } = this.state;
    return (
      <div className="result-list container-fluid">
        {
          this.state.userData
            &&
            <div>
              ResultList for {userData.name} from {userData.location}
              {
                reposList.map(repo => <ResultRow details={repo} key={`result_row_${repo.id}`} />)
              }
            </div>
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
