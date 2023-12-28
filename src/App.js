import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Newscomponent from './components/Newscomponent'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export class App extends Component {
  pageSize = 6;
  apikey = '5ca7b939216440fbad3aaa5a1460f14a'
state = {
  progress : 0
}
  setProgress = (progress) => {
   this.setState({progress:progress});

  }
  render() {
    
    return (
      <Router>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
         
        />
        <Navbar />
        <Routes>
          {/* //key is added to rebound the page */}
          <Route path="/" exact element={<Newscomponent apikey={this.apikey} setProgress={this.setProgress}   key="general" pageSize={this.pageSize} country="in" category="general" />} />
          <Route path="/business" exact element={<Newscomponent apikey={this.apikey} setProgress={this.setProgress}   key="business" pageSize={this.pageSize} country="in" category="business" />} />
          <Route path="/entertainment" exact element={<Newscomponent apikey={this.apikey} setProgress={this.setProgress}   key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
          <Route path="/general" exact element={<Newscomponent apikey={this.apikey} setProgress={this.setProgress}   key="general" pageSize={this.pageSize} country="in" category="general" />} />
          <Route path="/health" exact element={<Newscomponent apikey={this.apikey} setProgress={this.setProgress}   key="health" pageSize={this.pageSize} country="in" category="health" />} />
          <Route path="/science" exact element={<Newscomponent apikey={this.apikey} setProgress={this.setProgress}   key="science" pageSize={this.pageSize} country="in" category="science" />} />
          <Route path="/sports" exact element={<Newscomponent apikey={this.apikey} setProgress={this.setProgress}   key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
          <Route path="/technology" exact element={<Newscomponent apikey={this.apikey} setProgress={this.setProgress}   key="technology" pageSize={this.pageSize} country="in" category="technology" />} />

        </Routes>
      </Router>
    )
  }
}

export default App
