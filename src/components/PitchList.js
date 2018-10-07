import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getPitchesQuery } from '../queries/queries'

class PitchList extends Component {
  displayPitches() {
    const { data } = this.props;
    if(data.loading) {
      return ( <div>Loading books...</div>);
    } else {
      return data.pitches.map(pitch => {
        return(
          <li key={ pitch.id }>{pitch.title}</li>
        );
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="pitch-list">
          { this.displayPitches() }
        </ul>
      </div>
    )
  }
}

export default graphql(getPitchesQuery)(PitchList)