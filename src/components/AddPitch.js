import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getUsersQuery, addPitchMutation, getPitchesQuery } from '../queries/queries'


class AddPitch extends Component {
  state = {
    title: '',
    description: '',
    user: '',
  };

  displayUsers() {
    const data = this.props.getUsersQuery;
    if(data.loading) {
      return(
        <option disabled>Loading Users...</option>
      );
    } else {
      return data.users.map(user => {
        return(
          <option key={user.id} value={user.id}>{user.name}</option>
        );
      });
    }
  }

  submitForm = e => {
    e.preventDefault();
    const { title, description, user } = this.state;
    this.props.addPitchMutation({
      variables: {
        user,
        title,
        description,
      },
      refetchQueries: [{ query: getPitchesQuery },]
    });

    this.setState({
      title: '',
      description: '',
      user: '',
    });
  }

  render() {
    return (
      <form id="add-pitch" onSubmit={this.submitForm}>
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
          <label>User:</label>
          <select onChange={ e => this.setState({ user: e.target.value })}>
            <option>Select user</option>
            { this.displayUsers() }
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getUsersQuery, { name: "getUsersQuery"}),
  graphql(addPitchMutation, { name: "addPitchMutation"}),
)(AddPitch);