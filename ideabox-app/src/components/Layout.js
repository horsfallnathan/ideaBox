import React, { Component } from "react";
import Navbar from "./Navbar";

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar
          setUser={this.props.setUser}
          loggedIn={this.props.loggedIn}
          currentChallenge={this.props.currentChallenge}
        />
        {this.props.children}
        <div className="footer margin-top-30" />
      </div>
    );
  }
}

export default Layout;
