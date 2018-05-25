import React from 'react';

import { Alert } from 'reactstrap';

const ResultRow = ({ details }) => (
  <div>
    <Alert color="success">
      <p>
        Name: {details.name}
      </p>
      <p>
S        Description: {details.description}
      </p>
    </Alert>
  </div>
);

export default ResultRow;
