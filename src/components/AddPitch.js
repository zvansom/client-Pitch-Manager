import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getUsersQuery = gql`
  {
    users {
      name
      id
    }
  }
`;

class AddPitch extends Component {
  displayUsers() {
    const { data } = this.props;
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

  render() {
    return (
      <form id="add-pitch">
        <div className="field">
          <label>Pitch title:</label>
          <input type="text" />
        </div>
        <div className="field">
          <label>Description:</label>
          <textarea></textarea>
        </div>
        <div className="field">
          <label>User:</label>
          <select>
            <option>Select user</option>
            { this.displayUsers() }
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default graphql(getUsersQuery)(AddPitch);