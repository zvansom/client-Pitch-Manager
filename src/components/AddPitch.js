import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { addPitchMutation, getPitchesQuery } from '../queries/queries'


class AddPitch extends Component {
  state = {
    title: '',
    description: '',
  };

  submitForm = e => {
    e.preventDefault();
    const { title, description } = this.state;
    const { user } = this.props;
    this.props.addPitchMutation({
      variables: {
        user: user.id,
        title,
        description,
      },
      refetchQueries: [{ query: getPitchesQuery },]
    });
    
    this.setState({
      title: '',
      description: '',
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
        <button>+</button>
      </form>
    )
  }
}

export default graphql(addPitchMutation, { name: "addPitchMutation"})(AddPitch);