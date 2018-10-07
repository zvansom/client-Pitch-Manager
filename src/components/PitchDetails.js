import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getPitchQuery } from '../queries/queries';

class PitchDetails extends Component {

  displayPitchDetails() {
    const { pitch } = this.props.data;
    if(pitch) {
      return(
        <div>
          <h2>{ pitch.title }</h2>
          <p>{ pitch.description }</p>
          <p>{ pitch.user.name }</p>
          <p>All pitches by user</p>
          <ul className="other-pitches">
            {pitch.user.pitches.map(item => {
              return <li key={item.id}>{item.title}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return(
        <div>No pitch selected...</div>
      )
    }
  }

  render() {
    console.log(this.props);
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