import React from "react";
import { createChallenge, getAllChallenges } from "../../services/challenge";
// import SetDeadline from "./SetDeadline";
// import {getUsers} from "../../services/ideaSubmission"

class ChallengeForm extends React.Component {
  state = {
    title: "",
    description: "",
    startDate: Date.now(),
    deadline: Date.now(),
    managerPanel: []
  };

  // getUserList = () => {
  //   getUsers().then(response => {
  //     this.setState({
  //       users: response
  //     });
  //   });
  // };

  // handleManagerPanelChange = (e, option) => {
  //   const { value } = option;
  //   this.setState({
  //     teamMembers: value
  //   });
  // };

  

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { title, description, startDate, deadline, managerPanel } = this.state;
    event.preventDefault();
    getAllChallenges().then(allChallenges => {
      const conflictingChallenge = allChallenges.data.filter(
        el => el.startDate < startDate && el.deadline > deadline
      );
      conflictingChallenge.length > 0
        ? alert("Challenge timeline conflicts with another challenge")
        : createChallenge(title, description, startDate, deadline, managerPanel).then(
            challenge => {
              let challengeId = challenge._id;
              this.props.history.push(`/managerDashboard/${challengeId}`);
            }
          );
    });
  };

  // componentWillMount() {
  //   this.getUserList();
  // }

  render() {
    const { title, description, startDate, deadline, managerPanel } = this.state;
    // const userList = this.props.users.map((user, index) => ({
    //   key: user._id,
    //   text: user.username,
    //   value: user._id
    // }));
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <label>description</label>
          <input
            type="text"
            maxLength="300"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <label>start Date</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={this.handleChange}
          />
          <label>deadline</label>
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={this.handleChange}
          />
          
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default ChallengeForm;
