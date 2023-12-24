import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Newscomponent from './components/Newscomponent'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export class App extends Component {
  pageSize = 5;
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          {/* //key is added to rebound the page */}
          <Route path="/" exact element={<Newscomponent key="general" pageSize={this.pageSize} country="in" category="general" />} />
          <Route path="/business" exact element={<Newscomponent key="business" pageSize={this.pageSize} country="in" category="business" />} />
          <Route path="/entertainment" exact element={<Newscomponent key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
          <Route path="/general" exact element={<Newscomponent key="general" pageSize={this.pageSize} country="in" category="general" />} />
          <Route path="/health" exact element={<Newscomponent key="health" pageSize={this.pageSize} country="in" category="health" />} />
          <Route path="/science" exact element={<Newscomponent key="science" pageSize={this.pageSize} country="in" category="science" />} />
          <Route path="/sports" exact element={<Newscomponent key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
          <Route path="/technology" exact element={<Newscomponent key="technology" pageSize={this.pageSize} country="in" category="technology" />} />

        </Routes>
      </Router>
    )
  }
}

export default App
