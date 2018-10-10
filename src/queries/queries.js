import { gql } from 'apollo-boost';

const getPitchesQuery = gql`
query($id:ID) {
  user(id:$id) {
    pitches {
      title
      id
    }
  }
}
`;

const getClientsQuery = gql`
query($id:ID) {
  user(id:$id) {
    clients {
      name
      editor
      id
    }
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

const getPitchQuery = gql`
  query($id:ID) {
    pitch(id:$id) {
      id
      title
      description
      user {
        id
        name
        pitches {
          title
          id
        }
      }
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

const addClientMutation = gql`
  mutation($name:String!, $editor:String, $email:String, $user:ID!){
    addClient(name: $name, editor: $editor, email: $email, user: $user) {
      name
      id
    }
  }
`;

export { 
  getPitchesQuery, 
  getClientsQuery, 
  getUsersQuery, 
  getPitchQuery, 
  addPitchMutation,
  addClientMutation, 
};