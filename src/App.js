import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import SingleNote from './SingleNote';

import Home from './Home/Home';
import Login from './Authentication/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route exact path='/login' component={Login} /> */}
        <Route exact path='/note/:userId/:id' component={SingleNote} />
      </Switch>
    </Router>
  );
};

export default App;
