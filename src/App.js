import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Newscomponent from './components/Newscomponent'

export class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Newscomponent />
      </div>
    )
  }
}

export default App
