import React, { Component } from "react";

export default class AddTeam extends Component {
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };
  prevStep = event => {
    event.preventDefault();
    this.props.prevStep();
  };
  componentWillMount() {
    this.props.getUserList();
  }
  render() {
    const { values } = this.props;
    const userList = this.props.users.map((user, index) => ({
      key: user._id,
      text: user.username,
      value: user._id
    }));
    return (
      <div>
        <form>
          <div>
            <h3>Add Team Members</h3>
            <label htmlFor="teamMember">
              Choose team members to work with you on this idea
            </label>
            {/* <Dropdown
              placeholder="Select team member"
              fluid
              multiple
              selection
              options={userList}
              onChange={this.props.handleTeamChange}
            /> */}
            <label htmlFor="message">
              Leave them a message! They will reveive it as soon as you submit
              your idea.
            </label>
            <textarea
              type="TextArea"
              name="message"
              value={values.message}
              onChange={this.props.handleChange("message")}
            />
          </div>
          <p>Got here: {this.props.draftId}</p>
          <button onClick={this.prevStep}>Back</button>
          <button onClick={this.props.handleDraft}>Save as draft</button>
          <button onClick={this.nextStep}>Next</button>
        </form>
      </div>
    );
  }
}
