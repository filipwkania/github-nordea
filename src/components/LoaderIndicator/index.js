import React from 'react';

import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const LoaderIndicator = () => (
  <Segment className="fill-content">
    <Dimmer active inverted>
      <Loader inverted content="Loading" />
    </Dimmer>
  </Segment>
);

export default LoaderIndicator;
