import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SingleNote from './SingleNote/SingleNote';
import Home from './Home/Home';
import './App.css';
import Error from './Error404/Error';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/note/:userId/:id' component={SingleNote} />
        <Route path='*' component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
