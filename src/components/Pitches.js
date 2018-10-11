import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddPitch from './AddPitch';
import PitchDetails from './PitchDetails';
import Toggle from './utilities/Toggle';
import Portal from './utilities/Portal';
import Modal from './utilities/Modal';
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
          <Toggle key={pitch.id}>
            {({on, toggle}) => (
              <>
                <div className="pitch" onClick={toggle}>
                  <h2 className="pitch__title">{pitch.title}</h2>
                  <p className="pitch__status">{pitch.status}</p>
                </div>
                <Portal>
                  <Modal on={on} toggle={toggle}>
                    <PitchDetails pitchId={pitch.id} />
                  </Modal>
                </Portal>
              </>
            )}
          </Toggle>
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

        <Toggle>
          {({on, toggle}) => (
            <>
              <button onClick={toggle}>Add New Pitch</button>
              <Portal>
                <Modal on={on} toggle={toggle}>
                  <AddPitch 
                    user={this.props.user} 
                    toggle={toggle}
                    refetch={this.props.data.refetch} 
                  />
                </Modal>
              </Portal>
            </>
          )}
        </Toggle>
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