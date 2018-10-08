import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import PitchDetails from './PitchDetails';
import { getPitchesQuery } from '../queries/queries'

import '../styles/pitch-list.css'

class PitchList extends Component {
  state = {
    selected: null,
  }

  displayPitches() {
    const { data } = this.props;
    if(data.loading) {
      return ( <div>Loading pitches...</div>);
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
      <>
        <h1>User-name's Pitches</h1>
        <ul className="pitches">
          {/* { this.displayPitches() } */}
        </ul>
        <PitchDetails pitchId={this.state.selected} />
      </>
    )
  }
}

export default graphql(getPitchesQuery)(PitchList)