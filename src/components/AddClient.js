import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { addClientMutation, } from '../queries/queries'

import '../styles/forms.css';

class AddClient extends Component {
  state = {
    name: '',
    editor: '',
    email: '',
    editingNotes: '',
    invoicingNotes: '',
  };

  submitForm = e => {
    e.preventDefault();
    const { name, editor, email, editingNotes, invoicingNotes } = this.state;
    const { user, toggle } = this.props;
    this.props.addClientMutation({
      variables: {
        user: user.id,
        name,
        editor,
        email,
        editingNotes,
        invoicingNotes,
      },
    }).then(({ data }) => {
      this.props.refetch();
    }).catch(error => {
      console.error(error);
    });
    toggle();
    this.setState({
      name: '',
      editor: '',
      email: '',
      editingNotes: '',
      invoicingNotes: '',
    });
  }

  render() {
    return (
      <form className="form" onSubmit={this.submitForm}>
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
        <div className="field">
          <label>Editing Notes:</label>
          <textarea 
            onChange={ e => this.setState({ editingNotes: e.target.value })}
            value={this.state.editingNotes}>
          </textarea>
        </div>
        <div className="field">
          <label>Invoicing notes:</label>
          <textarea 
            onChange={ e => this.setState({ invoicingNotes: e.target.value })}
            value={this.state.invoicingNotes}>
          </textarea> 
        </div>
        <input type="submit" onClick={this.submitForm} value="Add Client" />
      </form>
    )
  }
}

export default graphql(addClientMutation, { name: "addClientMutation"})(AddClient);