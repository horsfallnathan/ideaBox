import React, { Component } from "react";
import { Button, Form, TextArea, FormField } from "semantic-ui-react";

export default class IdeaCompetition extends Component {
  nextStep = event => {
    event.preventDefault();
    this.props.nextStep();
  };
  prevStep = event => {
    event.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    return (
      <div>
        <Form>
          <FormField>
            <h3>Competition</h3>
            <label htmlFor="need">
              Are there any other products trying to solve the same problem?
            </label>
            <TextArea
              type="TextArea"
              name="competition"
              value={values.competition}
              onChange={this.props.handleChange("competition")}
            />
          </FormField>
          <Button onClick={this.prevStep}>Back</Button>
          <Button onClick={this.props.handleDraft}>Save as draft</Button>
          <Button onClick={this.nextStep}>Next</Button>
        </Form>
      </div>
    );
  }
}
