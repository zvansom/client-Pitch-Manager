import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql, Query, Mutation } from 'react-apollo';
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

  redirect() {
    this.setState({
      title: '',
      description: '',
      client: null,
      redirect: true,
    })
  }
  
  render() {
    const { redirect, ...formData } = this.state;
    if(redirect) { return <Redirect to="/pitches" /> }
    const { id } = this.props.user;
    formData.user = id;
    return (
      <Mutation mutation={addPitchMutation} variables={formData}>
      {(createPitch, { loading, error }) => (
        <form className="form" onSubmit={ async e => {
          e.preventDefault();
          const res = await createPitch();
          console.log(res);
          this.redirect();
          }
        }>
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
      )}
      </Mutation>
    )
  }
}

export default graphql(addPitchMutation, { name: "addPitchMutation"})(CreatePitch);
