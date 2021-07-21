import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import GroupEdit from './GroupEdit';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './GroupList';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/pessoas' exact={true} component={GroupList}/>
          <Route path='/pessoas/:id' component={GroupEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
