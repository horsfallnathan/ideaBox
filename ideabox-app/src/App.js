import React from "react";
import "./App.css";
import SignUp from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { loggedin } from "./services/auth";
import MyIdeas from "./components/Ideas/MyIdeas";
import { Route } from "react-router-dom";
import PublicViewIdea from "./components/Ideas/PublicView";
import IdeaForm from "./components/form/IdeaForm";
import Dashboard from "./components/dashboard/Dashboard";
import IdeaDetail from "./components/Ideas/IdeaDetail";
import ManagerDashboard from "./components/manager-dashboard/ManagerDashboard";
import ManagerDashboardChallenge from "./components/manager-dashboard/ManagerDashboardChallenge";
import challengeForm from "./components/manager-dashboard/challengeForm";
import Drafts from "./components/Ideas/Drafts";
import Navbar from "./components/Navbar";

class App extends React.Component {
  state = {
    loggedIn: null,
    currentChallenge: null
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

  setCurrentChallenge = currentChallenge => {
    this.setState({
      currentChallenge
    });
  };

  render() {
    const currentChallengeId =
      this.state.currentChallenge && this.state.currentChallenge._id;
    return (
      <div>
        <div className="App">
          <Navbar setUser={this.setUser} loggedIn={this.state.loggedIn} />
          <Route
            exact
            path="/signup"
            render={props => (
              <SignUp
                {...props}
                setUser={this.setUser}
                setCurrentChallenge={this.setCurrentChallenge}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                {...props}
                setUser={this.setUser}
                setCurrentChallenge={this.setCurrentChallenge}
              />
            )}
          />
          <Route
            exact
            path={`/challenge/${currentChallengeId}`}
            render={props => (
              <Dashboard
                {...props}
                currentChallenge={this.state.currentChallenge}
              />
            )}
          />
          <Route exact path="/my-ideas" component={MyIdeas} />
          <Route exact path="/drafts" component={Drafts} />
          <Route exact path="/my-ideas/:ideaId" component={IdeaDetail} />
          <Route
            exact
            path="/idea/:ideaId"
            render={props => (
              <PublicViewIdea {...props} loggedIn={this.state.loggedIn} />
            )}
          />
          <Route exact path="/edit-idea/:ideaId" component={IdeaForm} />
          <Route exact path="/submit-idea" component={IdeaForm} />
          <Route exact path="/managerDashboard" component={ManagerDashboard} />
          <Route
            exact
            path="/managerDasboard/:challengeId"
            component={ManagerDashboardChallenge}
          />
          <Route
            exact
            path="/managerDashboard/challengeForm"
            component={challengeForm}
          />
        </div>
      </div>
    );
  }
}

export default App;
