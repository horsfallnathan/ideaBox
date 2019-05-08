import React from 'react';
import './App.css';
import SignUp from './components/Auth/Signup'
import Login from './components/Auth/Login'
import {loggedin} from './services/auth'
import {Switch, Route, Redirect} from 'react-router-dom'
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
      </div>
    )
  }
}

export default App;
