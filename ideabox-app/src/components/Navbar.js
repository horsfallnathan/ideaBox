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
    console.log(this.props);
    return (
      <div>
        {this.state.loggedIn ? (
          <ul>
            <Link to="/">Logo</Link>
            {this.state.loggedIn.role === "manager" && (
              <Link to="/">Dashboard</Link>
            )}
            {this.state.loggedIn.role === "super-manager" && (
              <React.Fragment>
                <Link to="/">Admin Roles</Link>
                <Link to="/">Dashboard</Link>
              </React.Fragment>
            )}
            <Link to="/">Idea Feed</Link>
            <Link to="/my-ideas">My Ideas</Link>
            <Link to="/">Profile</Link>
            <Link to="/">Notification</Link>
            <li onClick={this.handleLogout}>
              <Link to="/">Logout</Link>
            </li>
          </ul>
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
