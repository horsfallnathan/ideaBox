import React from "react";
import { signup } from "../../services/auth";
import { fileUpload } from "../../services/ideaSubmission";
import { currentChallenge } from "../../services/challenge";

class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    profileImage:
      "https://res.cloudinary.com/nthnh/image/upload/v1557486717/ideaBox/defaultProfileImage_sde62e.png",
    role: "employee"
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };
  handleImageUpload = event => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("files", file);
    fileUpload(data).then(response => {
      this.setState({
        profileImage: response
      });
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    currentChallenge().then(challenge => {
      this.props.setCurrentChallenge(challenge.data);
    });

    const { firstName, lastName, username, password, email, role } = this.state;

    signup(firstName, lastName, username, password, email, role).then(user => {
      this.props.setUser(user);
      this.props.history.push("/");
    });
  };

  render() {
    // const { classes } = this.props;
    return (
      <div className={"fullHeightWidth signupBackground"}>
        <form onSubmit={this.handleSubmit} className={"signupForm"}>
          <img
            src={this.state.profileImage}
            width="30px"
            alt={"ProfileImage"}
          />
          <div>
            <input
              placeholder={"First Name"}
              value={this.state.firstName}
              onChange={this.handleChange}
              type="text"
              name="firstName"
            />
          </div>
          <div>
            <input
              placeholder={"Last Name"}
              value={this.state.lastName}
              onChange={this.handleChange}
              type="text"
              name="lastName"
            />
          </div>
          <div>
            <input
              placeholder={"Username"}
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              name="username"
            />
          </div>
          <div>
            <input
              placeholder={"Password"}
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </div>
          <div>
            <input
              placeholder={"Email"}
              value={this.state.email}
              onChange={this.handleChange}
              type="text"
              name="email"
            />
          </div>
          <div>
            <h3>Set Profile Image</h3>
            <input type="file" name="files" onChange={this.handleImageUpload} />
          </div>
          <button type="submit" className={"sButton"}>
            {"SignUp"}
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
