import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import PitchDetails from './PitchDetails';
import { getPitchesQuery } from '../queries/queries'

class PitchList extends Component {
  state = {
    selected: null,
  }

  displayPitches() {
    const { data } = this.props;
    if(data.loading) {
      return ( <div>Loading books...</div>);
    } else {
      return data.pitches.map(pitch => {
        return(
          <li key={ pitch.id } onClick={e => this.setState({ selected: pitch.id }) }>{pitch.title}</li>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <ul id="pitch-list">
          { this.displayPitches() }
        </ul>
        <PitchDetails pitchId={this.state.selected} />
      </div>
    )
  }
}

export default graphql(getPitchesQuery)(PitchList)