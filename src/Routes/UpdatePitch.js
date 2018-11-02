import React, { Component } from 'react';
import { graphql, Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import { 
  getPitchQuery,
  deletePitchMutation,
} from '../queries/queries';

class UpdatePitch extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    toggle: PropTypes.func.isRequired,
    pitchId: PropTypes.string.isRequired,
  }

  handleDelete() {
    this.props.deletePitchMutation()
      .then( () => this.props.refetch() )
      .catch( err => console.error(err) );
    this.props.toggle();
  }
  
  render() {
    const { pitchId } = this.props;
    return (
      <Query query={getPitchQuery} variables={{id: pitchId}}>
        {({ loading, error, data }) => {
          console.log(pitchId);
          console.log(loading);
          console.log(data);
          if (loading) return <p>Loading...</p>;
          if (error) return <p> Error: {error}</p>;
          return (
            <>
              <h2>{ data.pitch.title }</h2>
              <p>{ data.pitch.description }</p>
            </>
          )
        }}
      </Query>
    )
  }
}

export default graphql(deletePitchMutation, {
    name: "deletePitchMutation",
    options: (props) => {
      return {
        variables: {
          id: props.pitchId,
        },
      };
    },
  })(UpdatePitch)