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

const addPitchMutation = gql`
  mutation($title:String!, $description:String, $user:ID!){
    addPitch(title: $title, description: $description, user: $user) {
      title
      id
    }
  }
`;

export { getPitchesQuery, getUsersQuery, addPitchMutation };