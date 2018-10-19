import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddPitch from './AddPitch';
import PitchDetails from './PitchDetails';
import Toggle from './utilities/Toggle';
import Portal from './utilities/Portal';
import Modal from './utilities/Modal';
import { getUsersPitchesQuery } from '../queries/queries';

import '../styles/pitch-list.css'

class Pitches extends Component {
  displayPitches() {
    const { data } = this.props;
    if(data.loading) {
      return ( <div>Loading pitches...</div>);
    } else {
      if (data.user.pitches.length > 0) {
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
                      <PitchDetails 
                        pitchId={pitch.id} 
                        toggle={toggle} 
                        refetch={this.props.data.refetch}
                      />
                    </Modal>
                  </Portal>
                </>
              )}
            </Toggle>
          );
        });
      } else {
        return <h2>You dont have any pitches.  Better write some!</h2>
      }
    }
  }
  render() {
    return (
      <>

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
        <div className="pitch-container">
          {this.displayPitches()}
        </div>
      </>
    )
  }
}

export default graphql(getUsersPitchesQuery, {
    options: (props) => {
      if(props.user) {
        return { 
          variables: {
            id: props.user.id,
          }
        }
      }
    }
  })(Pitches)