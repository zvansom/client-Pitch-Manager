import React, { Component } from 'react'

import PitchList from '../components/PitchList';
import AddPitch from '../components/AddPitch';

import '../styles/pitch-list.css'

export default class Home extends Component {
  render() {
    return (
      <>
        <PitchList />
        <AddPitch />
      </>
    )
  }
}
