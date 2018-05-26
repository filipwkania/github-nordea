import React from 'react';
import propTypes from 'prop-types';

const ResultRow = ({ details }) => (
  <div>
    <p>
        Name: {details.name}
    </p>
    <p>
        Description: {details.description}
    </p>
  </div>
);

ResultRow.propTypes = {
  details: propTypes.shape({
    name: propTypes.string,
    description: propTypes.string,
  }).isRequired,
};

export default ResultRow;
