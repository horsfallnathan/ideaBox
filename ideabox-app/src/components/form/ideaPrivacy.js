import React, { Component } from "react";
import { Button, Form, Checkbox, FormField, Radio } from "semantic-ui-react";

export default class IdeaPrivacy extends Component {
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values } = this.props;
    console.log(values);
    return (
      <div>
        <Form>
          <h3>Who should see this idea?</h3>
          <FormField>
            <Radio
              label="Make Idea Public"
              name="ideaPrivacy"
              value="public"
              checked={values.ideaPrivacy === "public"}
              onChange={this.props.handleResourceChange}
            />
            <p>Your idea will be shared with all Siemens employees</p>
          </FormField>
          <FormField>
            <Radio
              label="Keep Idea Private"
              name="ideaPrivacy"
              value="private"
              checked={values.ideaPrivacy === "private"}
              onChange={this.props.handleResourceChange}
            />
            <p>
              Only you, your selected team members, and managers can view this
            </p>
          </FormField>
          <Button onClick={this.prevStep}>Back</Button>
          <Button onClick={"/"}>Save as draft</Button>
          <Button onClick={this.nextStep}>Next</Button>
        </Form>
      </div>
    );
  }
}
