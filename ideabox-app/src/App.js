import React from "react";
import "./App.css";
import SignUp from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { loggedin } from "./services/auth";
import MyIdeas from "./components/Ideas/MyIdeas";
import { Route } from "react-router-dom";
import PublicViewIdea from "./components/Ideas/PublicView";
import IdeaForm from "./components/form/IdeaForm";
import Dashboard from "./components/dashboard/Dashboard"
import IdeaDetail from './components/Ideas/IdeaDetail';
import ManagerDashboard from './components/manager-dashboard/ManagerDashboard';
import ManagerDashboardChallenge from './components/manager-dashboard/ManagerDashboardChallenge';
import challengeForm from './components/manager-dashboard/challengeForm';


class App extends React.Component {
  state = {
    loggedIn: null
  };

  setUser = user => {
    this.setState({
      loggedIn: user
    });
  };

  getUser = () => {
    loggedin().then(user => {
      this.setState({
        loggedIn: user
      });
    });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div>
      <div className="App">
          <Route
            exact
            path="/signup"
            render={props => <SignUp {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/login"
            render={props => <Login {...props} setUser={this.setUser} />}
          />     
        <Route path="/challenge/:challengeId" component={Dashboard} />
        <Route exact path="/my-ideas" component={MyIdeas} />
        <Route path="/my-ideas/:ideaId" component={IdeaDetail} />
        <Route path="/idea/:ideaId" render={props => <PublicViewIdea {...props} loggedIn={this.state.loggedIn} />} />
        <Route path="/submit-idea" component={IdeaForm} />
        <Route exact path="/managerDashboard" component={ManagerDashboard} />
        <Route exact path="/managerDasboard/:challengeId" component={ManagerDashboardChallenge} />
        <Route exact path="/managerDashboard/challengeForm" component={challengeForm} />
      </div>
      </div>
    );
  }
}

export default App;
