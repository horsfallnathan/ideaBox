import React, { Component } from "react";
import { Button, Form, TextArea, FormField } from "semantic-ui-react";

export default class IdeaNeedBenefit extends Component {
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
            <h3>Need</h3>
            <label htmlFor="need">Who is the target group for your idea?</label>
            <input
              type="text"
              name="need"
              value={values.need}
              onChange={this.props.handleChange("need")}
            />
          </FormField>
          <FormField>
            <h3>Benefit</h3>
            <label htmlFor="benefit">
              How will the idea benefit this target group? What is the impact of
              your idea for the company?
            </label>
            <TextArea
              type="TextArea"
              name="benefit"
              value={values.benefit}
              onChange={this.props.handleChange("benefit")}
            />
          </FormField>
          <FormField>
            <h3>Estimated Resources</h3>
            <label htmlFor="estimatedResource">
              What resources do you think are needed to work on this idea?
            </label>
            <input
              type="text"
              name="estimatedResource"
              value={values.estimatedResource}
              onChange={this.props.handleResourceChange}
            />

            <h3>{this.props.estimatedResourcesList}</h3>
          </FormField>
          <Button onClick={this.prevStep}>Back</Button>
          <Button onClick={this.nextStep}>Next</Button>
        </Form>
      </div>
    );
  }
}
