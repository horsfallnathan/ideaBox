import React, { Component } from "react";
import { Button, Form, TextArea, FormField, Dropdown } from "semantic-ui-react";

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
        <Form>
          <FormField>
            <h3>Add Team Members</h3>
            <label htmlFor="teamMember">
              Choose team members to work with you on this idea
            </label>
            <Dropdown
              placeholder="Select team member"
              fluid
              multiple
              selection
              options={userList}
              onChange={this.props.handleTeamChange}
            />
            <label htmlFor="teamMemberMessage">
              Leave them a message! They will reveive it as soon as you submit
              your idea.
            </label>
            <TextArea
              type="TextArea"
              name="teamMemberMessage"
              value={values.teamMemberMessage}
              onChange={this.props.handleChange("teamMemberMessage")}
            />
          </FormField>
          <Button onClick={this.prevStep}>Back</Button>
          <Button>Save as draft</Button>
          <Button onClick={this.nextStep}>Next</Button>
        </Form>
      </div>
    );
  }
}
