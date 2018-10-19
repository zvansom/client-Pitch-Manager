import { gql } from 'apollo-boost';

const getUsersPitchesQuery = gql`
  query($id:ID) {
    user(id:$id) {
      pitches {
        title
        status
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
  mutation($title:String!, $description:String, $user:ID!, $client:ID, $status:String){
    addPitch(title: $title, description: $description, user: $user, client: $client, status: $status) {
      title
      id
    }
  }
`;

const addClientMutation = gql`
  mutation(
    $name:String!, 
    $editor:String, 
    $email:String, 
    $user:ID!, 
    $editingNotes:String, 
    $invoicingNotes: String
  ){
    addClient(
      name: $name, 
      editor: $editor, 
      email: $email, 
      user: $user, 
      editingNotes: $editingNotes, 
      invoicingNotes: $invoicingNotes
    ) {
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