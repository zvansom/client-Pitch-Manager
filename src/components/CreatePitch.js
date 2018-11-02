import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql, Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { 
  addPitchMutation,
  getClientsQuery
 } from '../queries/queries';

import '../styles/forms.css';
import '../styles/helpers.css';

class CreatePitch extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  };
  
  state = {
    title: '',
    description: '',
    client: null,
    redirect: false,
  };

  submitForm = e => {
    e.preventDefault();
    const { title, description, client } = this.state;
    const { user } = this.props;
    this.props.addPitchMutation({
      variables: {
        user: user.id,
        title,
        description,
        client,
        status: client ? 'In Review' : 'Not Pitched',
      },
    }).then(({ data }) => {
      console.log(data);
      // TODO: resync cache with server
      this.setState({ redirect: true });
    }).catch(error => {
      console.error(error);
    });

    this.setState({
      title: '',
      description: '',
      client: '',
    });
  }

  render() {
    if(this.state.redirect) { return <Redirect to="/pitches" /> }
    const { id } = this.props.user;
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
            <Query query={getClientsQuery} variables={{id}}>
              {({ loading, error, data }) => {
                if(loading) return <option disabled>Loading Clients...</option>;
                if(error) return <option>Oops.  Something went wrong.</option>;
                if(data.user.clients.length){
                  return data.user.clients.map(client => {
                    return(
                      <option key={client.id} value={client.id}>{client.name}</option>
                    );
                  });
                } else {
                  return <option disabled>You don't have any clients</option>
                }
              }}
            </Query>
          </select> 
        </div>
        <input type="submit" value="Save Pitch" />
      </form>
    )
  }
}

export default graphql(addPitchMutation, { name: "addPitchMutation"})(CreatePitch);
