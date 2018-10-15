import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getPitchQuery } from '../queries/queries';

class PitchDetails extends Component {
  displayPitchDetails() {
    const { pitch } = this.props.data;
    if(pitch) {
      return(
        <>
          <h2>{ pitch.title }</h2>
          <p>{ pitch.description }</p>
        </>
      )
    } else {
      return(
        <p>Loading pitch...</p>
      )
    }
  }

  render() {
    return (
      <div id="pitch-details">
        {this.displayPitchDetails()}
      </div>
    )
  }
}

export default graphql(getPitchQuery, {
  options: (props) => {
    return { variables: {
      id: props.pitchId,
    }}
  }
})(PitchDetails)