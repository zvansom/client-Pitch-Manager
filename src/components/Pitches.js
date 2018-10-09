import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getPitchesQuery } from '../queries/queries';

import '../styles/pitch-list.css'

class Pitches extends Component {
  state = {
    selected: null,
  }

  displayPitches() {
    const { data } = this.props;
    if(data.loading) {
      return ( <div>Loading pitches...</div>);
    } else {
      return data.user.pitches.map(pitch => {
        return(
          <li key={ pitch.id } onClick={e => this.setState({ selected: pitch.id }) }>{pitch.title}</li>
        );
      });
    }
  }
  render() {
    return (
      <>
        <ul>
          {this.displayPitches()}
        </ul>
      </>
    )
  }
}

export default graphql(getPitchesQuery, {
    options: (props) => {
      if(props.user) {
        return { variables: {
          id: props.user.id,
        }}
      }
    }
  })(Pitches)