import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AddClient from './AddClient';

import { getClientsQuery } from '../queries/queries';

import '../styles/pitch-list.css'

class Clients extends Component {
  state = {
    selected: null,
  }

  displayClients() {
    const { data } = this.props;
    if(data.loading) {
      return ( <div>Loading clients...</div>);
    } else {
      return data.user.clients.map(client => {
        return(
          <li key={ client.id } onClick={e => this.setState({ selected: client.id }) }>
            {client.name} - {client.editor}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <>
        <AddClient refetch={this.props.data.refetch} user={this.props.user} />
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