import React from "react";
import { login } from "../../services/auth";
import { currentChallenge } from "../../services/challenge";
import { Link } from "react-router-dom";
class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password)
      .then(user => {
        this.props.setUser(user);
      })
      .then(() => {
        currentChallenge().then(challenge => {
          this.props.setCurrentChallenge(challenge.data);
          this.props.history.push("/dashboard");
        });
      });
  };

  render() {
    return (
      <div className="landingPage">
        <div className="col-50 flexed-div flexed-center">
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                placeholder="Username"
                type="text"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </div>
            <div>
              <input
                placeholder="password"
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <div className="flexed-div spacedBetween margin-top-15">
              <button type="submit" value="Login">
                Login
              </button>
              <button>
                <Link to="/signup" className="allLinks">
                  Sign up
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
