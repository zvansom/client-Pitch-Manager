import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

// Import Components
import AddPitch from './AddPitch';
import Toggle from './utilities/Toggle';
import Portal from './utilities/Portal';
import Modal from './utilities/Modal';

// Import CSS
import '../styles/pitch-list.css'

const getUsersPitchesQuery = gql`
  query Pitches($id: ID) {
    user(id:$id) {
      pitches {
        title
        description
        client {
          name
          id
        }
        status
        id
      }
    }
  }
`;

const Pitches = ({ user }) => {
  const { id } = user;
  return (
    <>
      <Toggle>
        {({on, toggle}) => (
          <>
            <button onClick={toggle}>Add New Pitch</button>
            <Portal>
              <Modal on={on} toggle={toggle}>
                <AddPitch 
                  user={user} 
                  toggle={toggle}
                />
              </Modal>
            </Portal>
          </>
        )}
      </Toggle>
      <Query query={getUsersPitchesQuery} variables={{id}}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p> Error: {error}</p>;
          if (data.user.pitches.length) {
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
                          <AddPitch
                            user={user}
                            pitch={pitch} 
                            toggle={toggle} 
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
        }}
      </Query>
    </>
  )
}


export default Pitches;