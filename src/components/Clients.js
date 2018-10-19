import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddClient from './AddClient';
import ClientDetails from './ClientDetails';
import Toggle from './utilities/Toggle';
import Modal from './utilities/Modal';
import Portal from './utilities/Portal';

import { getClientsQuery } from '../queries/queries';

import '../styles/pitch-list.css'

class Clients extends Component {
  displayClients() {
    const { data } = this.props;
    if(data.loading) {
      return ( <div>Loading clients...</div>);
    } else {
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
                    <ClientDetails 
                      clientId={client.id} 
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
    }
  }
  render() {
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
                  refetch={this.props.data.refetch} 
                  user={this.props.user} />
                </Modal>
              </Portal>
            </>
          )}
        </Toggle>

        <ul>
          {this.displayClients()}
        </ul>
      </>
    )
  }
}

export default graphql(getClientsQuery, {
    options: (props) => {
      if(props.user) {
        return { variables: {
          id: props.user.id,
        }}
      }
    }
  })(Clients)