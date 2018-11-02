import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';

// Import Components
import CreatePitch from '../components/CreatePitch';
import UpdatePitch from './UpdatePitch';
import Modal from '../components/utilities/Modal';
import Portal from '../components/utilities/Portal';
import Toggle from '../components/utilities/Toggle';

// Import CSS
import '../styles/pitch-list.css'

const getUsersPitchesQuery = gql`
  query($id: ID) {
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
                <CreatePitch 
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
                          <UpdatePitch
                            user={user}
                            pitchId={pitch.id} 
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

Pitches.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default Pitches;