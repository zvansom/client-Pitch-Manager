import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { addClientMutation, } from '../queries/queries'

import '../styles/forms.css';

class AddClient extends Component {
  state = {
    name: '',
    editor: '',
    email: '',
  };

  submitForm = e => {
    e.preventDefault();
    const { name, editor, email } = this.state;
    const { user } = this.props;
    this.props.addClientMutation({
      variables: {
        user: user.id,
        name,
        editor,
        email,
      },
    }).then(({ data }) => {
      this.props.refetch();
    }).catch(error => {
      console.error(error);
    });
    
    this.setState({
      name: '',
      editor: '',
      email: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <div className="field">
          <label>Client name:</label>
          <input 
            type="text" 
            onChange={ e => this.setState({ name: e.target.value })}
            value={this.state.name} />
        </div>
        <div className="field">
          <label>Editor name:</label>
          <input 
            type="text" 
            onChange={ e => this.setState({ editor: e.target.value })}
            value={this.state.editor} />
        </div>
        <div className="field">
          <label>Editor email:</label>
          <input 
            type="text" 
            onChange={ e => this.setState({ email: e.target.value })}
            value={this.state.email} />
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default graphql(addClientMutation, { name: "addClientMutation"})(AddClient);