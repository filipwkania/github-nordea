import React from 'react';
import propTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const ResultRow = ({ details }) => (
  <Grid.Column mobile={16} computer={8}>
    <p>
        Name: {details.name}
    </p>
    <p>
        Description: {details.description}
    </p>
  </Grid.Column>
);

ResultRow.propTypes = {
  details: propTypes.shape({
    name: propTypes.string,
    description: propTypes.string,
  }).isRequired,
};

export default ResultRow;
