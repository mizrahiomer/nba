import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Scores from './components/Scores';
import TeamsList from './components/TeamsList';
import TeamScreen from './components/TeamScreen';
import PlayerScreen from './components/PlayerScreen';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Scores />
        <Switch>
          <Route path='/' exact component={TeamsList}></Route>
          <Route path='/Team/:id/:name' exact component={TeamScreen}></Route>
          <Route
            path='/Player/:id/:name'
            exact
            component={PlayerScreen}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
