import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddPitch from './AddPitch';

import { getPitchesQuery } from '../queries/queries';

import '../styles/pitch-list.css'

class Pitches extends Component {
  state = {
    selected: null,
    open: false,
  }

  displayPitches() {
    const { data } = this.props;
    if(data.loading) {
      return ( <div>Loading pitches...</div>);
    } else {
      return data.user.pitches.map(pitch => {
        return(
          <div className="pitch" key={ pitch.id } onClick={e => this.setState({ selected: pitch.id }) }>
            <h2 className="pitch__title">{pitch.title}</h2>
            <p className="pitch__status">Status</p>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <>
        <div className="pitch-container">
          {this.displayPitches()}
        </div>
        <button onClick={e => this.setState({ open: !this.state.open})}> + </button>
        {this.state.open && 
          <AddPitch refetch={this.props.data.refetch} user={this.props.user} />
        }
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