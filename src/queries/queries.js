import { gql } from 'apollo-boost';


const getPitchesQuery = gql`
  {
    pitches {
      title
      id
    }
  }
`;

const getUsersQuery = gql`
  {
    users {
      name
      id
    }
  }
`;

export { getPitchesQuery, getUsersQuery };