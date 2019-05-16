import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landingPage">
        <h1 className="landingPageFont">IDEA SHARING TOOL</h1>
        <img
          src="https://res.cloudinary.com/nthnh/image/upload/v1557877811/ideaBox/Logo1_soiz0u.svg"
          alt="brand logo"
          width="400px"
        />
        <div className="flexed-div col-40 spacedEvenly">
          <button>
            <Link className="allLinks" to="/login">
              Login
            </Link>
          </button>
          <button>
            <Link className="allLinks" to="/signup">
              Sign up
            </Link>
          </button>
        </div>
      </div>
    );
  }
}
