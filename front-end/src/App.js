import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css'
import Login from "./components/component-login";

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
