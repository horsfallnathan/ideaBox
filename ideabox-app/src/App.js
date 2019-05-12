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
import ChallengeForm from "./components/manager-dashboard/ChallengeForm";
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
            path={`/challenge/${currentChallengeId}`}
            render={props => (
              <Dashboard
                {...props}
                currentChallenge={this.state.currentChallenge}
              />
            )}
          />
          <Route exact path="/my-ideas" component={MyIdeas} />
          <Route
            path="/my-ideas/:ideaId"
            render={props => (
              <IdeaDetail {...props} loggedIn={this.state.loggedIn} />
            )}
          />
          <Route exact path="/drafts" component={Drafts} />
          <Route exact path="/edit-idea/:ideaId" component={IdeaForm} />
          <Route
            path="/idea/:ideaId"
            render={props => (
              <PublicViewIdea {...props} loggedIn={this.state.loggedIn} />
            )}
          />
          <Route path="/submit-idea" component={IdeaForm} />
          <Route exact path="/managerDashboard" component={ManagerDashboard} />
<<<<<<< HEAD
          <Route exact path="/managerDasboard/:challengeId" component={ManagerDashboardChallenge} />
          <Route exact path="/managerDashboard/challengeForm" component={ChallengeForm} />
=======
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
>>>>>>> 991c545274e25132acac9a68617d380f6f0591d9
        </div>
      </div>
    );
  }
}

export default App;
