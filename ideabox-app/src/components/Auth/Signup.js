import React from "react";
import { signup } from "../../services/auth";
import { Form } from "semantic-ui-react";
import { fileUpload } from "../../services/ideaSubmission";
import { currentChallenge } from "../../services/challenge"

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
    console.log(event.target.files);
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
      this.props.setCurrentChallenge(challenge.data)
    })

    const { firstName, lastName, username, password, email, role } = this.state;

    signup(firstName, lastName, username, password, email, role).then(user => {
      this.props.setUser(user);
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div>
        <img src={this.state.profileImage} width="30px" alt={"ProfileImage"} />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>first name:</label>
            <input
              value={this.state.firstName}
              onChange={this.handleChange}
              type="text"
              name="firstName"
            />
          </Form.Field>
          <Form.Field>
            <label>last name:</label>
            <input
              value={this.state.lastName}
              onChange={this.handleChange}
              type="text"
              name="lastName"
            />
          </Form.Field>
          <Form.Field>
            <label>username:</label>
            <input
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              name="username"
            />
          </Form.Field>
          <Form.Field>
            <label>password:</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </Form.Field>
          <Form.Field>
            <label>email:</label>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="text"
              name="email"
            />
          </Form.Field>
          <Form.Field>
            <h3>Set Profile Image</h3>
            <input type="file" name="files" onChange={this.handleImageUpload} />
          </Form.Field>
          <Form.Field>
            <label>role:</label>
            <select
              value={this.state.role}
              onChange={this.handleChange}
              name="role"
            >
              <option value="employee">employee</option>
              <option value="manager">manager</option>
            </select>
          </Form.Field>
          <input type="submit" value="signup" />
        </Form>
      </div>
    );
  }
}

export default Signup;
