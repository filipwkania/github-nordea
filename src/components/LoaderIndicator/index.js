import React from 'react';

import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const LoaderIndicator = () => (
  <Segment
    className="fill-content"
    style={{ minHeight: 100 }}
  >
    <Dimmer active inverted>
      <Loader inverted content="Loading" />
    </Dimmer>
  </Segment>
);

export default LoaderIndicator;
