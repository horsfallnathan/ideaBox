import React from 'react';
import './App.css';
import SignUp from './components/Auth/Signup'
import Login from './components/Auth/Login'
import {loggedin} from './services/auth'
import MyIdeas from './components/Ideas/MyIdeas';
import {Switch, Route, Redirect} from 'react-router-dom'
import PublicViewIdea from './components/Ideas/PublicView';
import IdeaForm from "./components/form/IdeaForm";
// import ProtectedRoute from "./components/ProtectedRoute";

class App extends React.Component {
  state = {
    loggedIn: null
  };

  setUser = user => {
    console.log("huhu")
    this.setState({
      loggedIn: user
    })
  }

  getUser = () => {
    loggedin().then(user => {
      this.setState({
        loggedIn: user
      })
    })
  }

  componentDidMount() {
    this.getUser()
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/signup" 
          render={(props) => <SignUp {...props} setUser={this.setUser}  />}
          />
          <Route
          exact path="/login"
          render={(props) => <Login {...props} getUser={this.getUser} />}
          />
        </Switch>
        <Route path="/my-ideas" component={MyIdeas} />
        <Route path="/idea/:ideaId" component={PublicViewIdea} />
        <Route path="/submit-idea" component={IdeaForm} />
      </div>
    )
  }
}

export default App;
