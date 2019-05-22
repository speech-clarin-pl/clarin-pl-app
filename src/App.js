import React from 'react';
import './App.css';
import HomePage from './containers/HomePage/HomePage';
import {Route, Switch} from 'react-router-dom';
import ProjectPage from './containers/ProjectPage/ProjectPage';
import ProjectsListPage from './containers/ProjectsListPage/ProjectsListPage';
import HelpPage from './components/HelpPage/HelpPage';


function App() {
  return (
    <div className="App">
      <Switch>
              <Route path="/projectsList" exact component={ProjectsListPage} />
              <Route path="/project" component={ProjectPage} />
              <Route path="/help" component={HelpPage} />
              <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
