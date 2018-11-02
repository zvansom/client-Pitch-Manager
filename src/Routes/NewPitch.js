import React from 'react';
import CreatePitch from '../components/CreatePitch';

const NewPitch = (props) => (
  <div>
    <CreatePitch user={props.user} />
  </div>
)

export default NewPitch;