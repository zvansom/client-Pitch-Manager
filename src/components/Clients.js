import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';

// Import Components
import AddClient from './AddClient';
import Modal from './utilities/Modal';
import Portal from './utilities/Portal';
import Toggle from './utilities/Toggle';

import '../styles/pitch-list.css'

// GraphQL Query
const getUsersClientsQuery = gql`
  query($id:ID) {
    user(id:$id) {
      clients {
        name
        editor
        id
      }
    }
  }
`;

const Clients = ({ user }) => {
  const { id } = user;
  return (
    <>
      <Toggle>
        {({on, toggle}) => (
          <>
            <button onClick={toggle}>Add New Client</button>
            <Portal>
              <Modal on={on} toggle={toggle}>
              <AddClient 
                toggle={toggle}
                user={user} />
              </Modal>
            </Portal>
          </>
        )}
      </Toggle>
      <Query query={getUsersClientsQuery} variables={{id}}>
        {({ loading, error, data }) => {
          if(loading) return <p>Loading clients...</p>;
          if(error) return <p>Something went wrong.  Please try again.</p>
          if (data.user.clients.length) {
            return data.user.clients.map(client => {
              return(
                <Toggle key={client.id}>
                  {({on, toggle}) => (
                    <>
                      <div className="pitch" onClick={toggle}>
                        <h2 className="pitch__title">{client.name}</h2>
                        <p className="pitch__status">{client.editor}</p>
                      </div>
                      <Portal>
                        <Modal on={on} toggle={toggle}>
                        {/* Need an 'Edit Client' component */}
                          <AddClient
                            client={client} 
                            user={user}
                            toggle={toggle} 
                          />
                        </Modal>
                      </Portal>
                    </>
                  )}
                </Toggle>
              );
            });
          }
        }}
      </Query>
    </>
  )
}

Clients.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
}

export default Clients;