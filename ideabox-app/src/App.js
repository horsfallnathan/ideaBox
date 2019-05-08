import React from 'react';
import './App.css';
import MyIdeas from './components/Ideas/MyIdeas';
import { Route } from 'react-router-dom'
import PublicViewIdea from './components/Ideas/PublicView';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path="/my-ideas" component={MyIdeas} />
        <Route path="/idea/:ideaId" component={PublicViewIdea} />
      </div>
    );
  }
}

export default App;
