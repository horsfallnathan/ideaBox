import React from "react";
import { signup } from "../../services/auth";
// import {Redirect} from 'react-router-dom'

class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    role: "employee"
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { firstName, lastName, username, password, email, role } = this.state;

    signup(firstName, lastName, username, password, email, role).then(user => {
      this.props.setUser(user);
      this.props.history.push("/");
    });
    //     .then( data => {

    //    // <Redirect to={{pathname: "/", state: {from: this.props.loaction} }} />
    //     })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>first name:</label>
            <input
              value={this.state.firstName}
              onChange={this.handleChange}
              type="text"
              name="firstName"
            />
          </div>
          <div>
            <label>last name:</label>
            <input
              value={this.state.lastName}
              onChange={this.handleChange}
              type="text"
              name="lastName"
            />
          </div>
          <div>
            <label>username:</label>
            <input
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              name="username"
            />
          </div>
          <div>
            <label>password:</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </div>
          <div>
            <label>email:</label>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="text"
              name="email"
            />
          </div>
          <div>
            <label>role:</label>
            <select
              value={this.state.role}
              onChange={this.handleChange}
              name="role"
            >
              <option value="employee">employee</option>
              <option value="manager">manager</option>
            </select>
          </div>
          <input type="submit" value="signup" />
        </form>
      </div>
    );
  }
}

export default Signup;
