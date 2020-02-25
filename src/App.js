import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Scores from './components/Scores';
import TeamsList from './components/TeamsList';
import TeamScreen from './components/TeamScreen';
import './App.css';

const App = () => {
  return (
    <Router basename='/'>
      <div className='App'>
        <Navbar />
        <Scores />
        <Switch>
          <Route path='/' exact component={TeamsList}></Route>
          <Route path='/Team/:id/:name' exact component={TeamScreen}></Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
