import { gql } from 'apollo-boost';

const getUsersPitchesQuery = gql`
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
      client {
        name
      }
    }
  }
`;

const addPitchMutation = gql`
  mutation($title:String!, $description:String, $user:ID!, $client:ID){
    addPitch(title: $title, description: $description, user: $user, client: $client) {
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

const deletePitchMutation = gql`
  mutation($id:ID!) {
  deletePitch(id: $id) {
    id
  }
}
`;

export { 
  deletePitchMutation,
  getUsersPitchesQuery, 
  getClientsQuery, 
  getUsersQuery, 
  getPitchQuery, 
  addPitchMutation,
  addClientMutation, 
};