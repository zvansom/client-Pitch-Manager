import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { 
  getPitchQuery,
  deletePitchMutation,
} from '../queries/queries';

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

  handleDelete() {
    console.log('delete pressed');
    this.props.deletePitchMutation()
      .then( () => this.props.refetch() )
      .catch( err => console.error(err) );
    this.props.toggle();
  }
  
  render() {
    return (
      <div id="pitch-details">
        <button onClick={() => this.handleDelete()}>Delete</button>
        {this.displayPitchDetails()}
      </div>
    )
  }
}

export default compose(
  graphql(getPitchQuery, {
    options: (props) => {
      return { 
        variables: {
          id: props.pitchId,
        },
      };
    },
  }),
  graphql(deletePitchMutation, {
    name: "deletePitchMutation",
    options: (props) => {
      return {
        variables: {
          id: props.pitchId,
        },
      };
    },
  }),
)(PitchDetails)