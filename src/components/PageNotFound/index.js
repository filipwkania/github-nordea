import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Item, Image } from 'semantic-ui-react';

import spaceman from '../../res/spacemanSmall.gif';

const PageNotFound = ({ message }) => (
  <Segment className="404-page fill-content">
    <Item
      className="fill-content"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image src={spaceman} />
      <h3 style={{ textAlign: 'center' }}>
        {message}
      </h3>
    </Item>
  </Segment>
);

PageNotFound.propTypes = {
  message: PropTypes.string,
};

PageNotFound.defaultProps = {
  message: 'Page not found!',
};

export default PageNotFound;
