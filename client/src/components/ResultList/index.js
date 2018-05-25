import React from 'react';
import { Alert } from 'reactstrap';

import ResultRow from '../ResultRow';

class ResultList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reposList: [],
    };
  }

  render() {
    return (
      <div className="result-list">
        <Alert color="secondary">
        ResultList
      </Alert>
        {
              this.state.reposList.map((repo) => {
                <ResultRow details={repo} />;
              })
          }
      </div>
    );
  }
}

export default ResultList;
