import React, { Component } from 'react';

import PitchList from './components/PitchList';
require('dotenv').config();

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Test</h1>
        <PitchList />
      </div>
    );
  }
}

export default App;
