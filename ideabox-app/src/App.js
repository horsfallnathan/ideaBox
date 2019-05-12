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
import IdeaFeed from "./components/Ideas/IdeaFeed";
import AllChallenges from "./components/manager-dashboard/AllChallenges"

class App extends React.Component {
  state = {
    loggedIn: {},
    currentChallenge: {}
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

          {/* AUTH ROUTES */}
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

          {/* IDEA ROUTES */}
          <Route path="/submit-idea" component={IdeaForm} />
          <Route exact path="/my-ideas" component={MyIdeas} />
          <Route
            path="/my-ideas/:ideaId"
            render={props => (
              <IdeaDetail {...props} loggedIn={this.state.loggedIn} />
            )}
          />
          <Route path="/idea-feed" component={IdeaFeed} />
          <Route exact path="/edit-idea/:ideaId" component={IdeaForm} />
          <Route
            path="/idea/:ideaId"
            render={props => (
              <PublicViewIdea {...props} loggedIn={this.state.loggedIn} />
            )}
          />
          <Route exact path="/drafts" component={Drafts} />

          <Route
            path={`/challenge/${currentChallengeId}`}
            render={props => (
              <Dashboard
                {...props}
                currentChallenge={this.state.currentChallenge}
              />
            )}
          />

          {/* MANAGER ROUTES */}
          <Route exact path="/managerDashboard" component={ManagerDashboard} />
          <Route exact path="/managerDasboard/:challengeId" component={ManagerDashboardChallenge} />
          <Route exact path="/managerDashboard/challengeForm" component={ChallengeForm} />
          <Route path="/managerDashborad/all-challenges" component={AllChallenges} />
        </div>
      </div>
    );
  }
}

export default App;
