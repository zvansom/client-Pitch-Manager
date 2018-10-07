import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getPitchQuery } from '../queries/queries';

class PitchDetails extends Component {
  render() {
    return (
      <div id="pitch-details">
        <p>Output pitch details here</p>
      </div>
    )
  }
}

export default graphql(getPitchQuery)(PitchDetails)