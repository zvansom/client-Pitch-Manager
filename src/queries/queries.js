import { gql } from 'apollo-boost';

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

const getClientQuery = gql`
  query($id:ID) {
    client(id:$id) {
      id
      name
      editor
    }
  }
`;

const addPitchMutation = gql`
  mutation(
    $title:String!, 
    $description:String, 
    $user:ID!, 
    $client:ID, 
    $status:String
  ) {
    addPitch(
      title: $title, 
      description: $description, 
      user: $user, 
      client: $client, 
      status: $status
    ) {
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

const deleteClientMutation = gql`
  mutation($id:ID!) {
    deleteClient(id: $id) {
      id
    }
  }
`;

export { 
  deletePitchMutation,
  deleteClientMutation,
  getClientsQuery, 
  getPitchQuery, 
  getClientQuery, 
  addPitchMutation,
  addClientMutation, 
};