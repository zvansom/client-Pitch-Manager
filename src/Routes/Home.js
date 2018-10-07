import React, { Component } from 'react'

import PitchList from '../components/PitchList';
import AddPitch from '../components/AddPitch';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <PitchList />
        <AddPitch />
      </div>
    )
  }
}
