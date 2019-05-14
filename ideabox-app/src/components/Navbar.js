import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

export default class Navbar extends Component {
  state = {
    loggedIn: this.props.loggedIn
  };

  componentDidUpdate(prevProps) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      this.setState({ loggedIn: this.props.loggedIn });
    }
  }

  handleLogout = () => {
    logout().then(() => {
      this.setState({ loggedIn: null });
      this.props.setUser(null);
    });
  };
  render() {
    //const currentChallengeId = this.props.currentChallenge._id
    return (
      <div>
        {this.state.loggedIn ? (
          <div className="navBar">
            <div className="navBarLogo">
              <Link to="/"><img src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557764459/IdeaBox/logo_pwottr.png" alt="" /></Link>
            </div>
            {this.state.loggedIn.role === "manager" && (
              <Link to="/managerDashboard">Manager Dashboard</Link>
            )}
            {this.state.loggedIn.role === "super-manager" && (
              <React.Fragment>
                <Link to="/">Admin Roles</Link>
                <Link to="/">Dashboard</Link>
              </React.Fragment>
            )}
            <ul className="navBarLinks">
              <div className="navBarIcons">
                <img src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557764443/IdeaBox/lightbulb-new_jkbzyw.png" alt="" />
                <li><Link to="/idea-feed">Idea Feed</Link></li>
              </div>
              <div className="navBarIcons">
                <img src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557765939/IdeaBox/Group_twzivq.png" alt="" />
                <li><Link to="/my-ideas">My Ideas</Link></li>
              </div>
              <div className="navBarIcons">
                <img src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557765939/IdeaBox/ProfileIcon_n7k0lx.png" alt="" />
                <li><Link to="/">Profile</Link></li>
              </div>
              <div className="navBarIcons">
                <img src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557762768/IdeaBox/comment_schndj.png" alt="" />
                <li><Link to="/">Notification</Link></li>
              </div>
              <div className="navBarIcons">
                <img src="" alt="" />
                <li onClick={this.handleLogout}>
                  <Link to="/">Logout</Link>
                </li>
              </div>
            </ul>
          </div>
        ) : (
            <ul>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
      </div>
    );
  }
}
