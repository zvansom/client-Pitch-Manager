import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { 
  addPitchMutation,
  getClientsQuery,
 } from '../queries/queries';

import '../styles/forms.css';
import '../styles/helpers.css';

class AddPitch extends Component {
  state = {
    title: '',
    description: '',
    client: null,
  };

  displayClients() {
    const data = this.props.getClientsQuery;
    if(data.loading) {
      return(
        <option disabled>Loading Clients...</option>
      );
    } else {
      return data.user.clients.map(client => {
        return(
          <option key={client.id} value={client.id}>{client.name}</option>
        );
      });
    }
  }

  submitForm = e => {
    e.preventDefault();
    const { title, description, client } = this.state;
    const { user, toggle } = this.props;
    this.props.addPitchMutation({
      variables: {
        user: user.id,
        title,
        description,
        client,
        status: client ? 'In Review' : 'Not Pitched',
      },
    }).then(({ data }) => {
      this.props.refetch();
    }).catch(error => {
      console.error(error);
    });
    
    toggle();
    
    this.setState({
      title: '',
      description: '',
      client: '',
    });
  }

  render() {
    return (
      <form className="form" onSubmit={this.submitForm}>
        <div className="field">
          <label>Pitch title:</label>
          <input 
            type="text" 
            onChange={ e => this.setState({ title: e.target.value })}
            value={this.state.title} />
        </div>
        <div className="field">
          <label>Description:</label>
          <textarea 
            onChange={ e => this.setState({ description: e.target.value })}
            value={this.state.description}>
          </textarea>
        </div>
        <div className="field">
          <label>Client:</label>
          <select onChange={ e => this.setState({ client: e.target.value })}>
            <option>Select client</option>
            { this.displayClients() }
          </select> 
        </div>
        <input type="submit" value="Save Pitch" />
      </form>
    )
  }
}

export default compose(
  graphql(getClientsQuery, { 
    name: "getClientsQuery",
    options: (props) => {
      if(props.user) {
        return { 
          variables: {
            id: props.user.id,
          } 
        }
      }
    },
  }),
  graphql(addPitchMutation, { name: "addPitchMutation"}),
)(AddPitch);
