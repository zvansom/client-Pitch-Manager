import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { 
  getClientQuery,
  deleteClientMutation,
} from '../queries/queries';

class ClientDetails extends Component {
  displayClientDetails() {
    const { client } = this.props.data;
    if(client) {
      return(
        <>
          <h2>{ client.name }</h2>
          <p>{ client.editor }</p>
        </>
      )
    } else {
      return(
        <p>Loading client...</p>
      )
    }
  }

  handleDelete() {
    this.props.deleteClientMutation()
      .then( () => this.props.refetch() )
      .catch( err => console.error(err) );
    this.props.toggle();
  }
  
  render() {
    return (
      <div id="pitch-details">
        <button onClick={() => this.handleDelete()}>Delete</button>
        {this.displayClientDetails()}
      </div>
    )
  }
}

export default compose(
  graphql(getClientQuery, {
    options: (props) => {
      return { 
        variables: {
          id: props.clientId,
        },
      };
    },
  }),
  graphql(deleteClientMutation, {
    name: "deleteClientMutation",
    options: (props) => {
      return {
        variables: {
          id: props.clientId,
        },
      };
    },
  }),
)(ClientDetails)